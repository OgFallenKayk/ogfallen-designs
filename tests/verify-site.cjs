// Start a static server at the repository root, then run:
// node tests/verify-site.cjs http://127.0.0.1:4173/ [test-results/after]
// Optional: CHROME_PATH points to an installed Chrome/Chromium executable.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const url = process.argv[2] || 'http://127.0.0.1:4173/';
  const prefix = path.resolve(process.argv[3] || 'test-results/after');
  fs.mkdirSync(path.dirname(prefix), { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const report = { url, inspectedAt: new Date().toISOString(), checks: [], consoleErrors: [], pageErrors: [], badResponses: [], failedRequests: [], screenshots: [] };
  page.on('pageerror', e => report.pageErrors.push(e.message));
  page.on('console', e => { if (e.type() === 'error') report.consoleErrors.push(e.text()); });
  page.on('response', r => { if (r.status() >= 400) report.badResponses.push({ url: r.url(), status: r.status() }); });
  page.on('requestfailed', r => report.failedRequests.push({ url: r.url(), error: r.failure()?.errorText }));
  async function check(name, run) {
    try { const detail = await run(); report.checks.push({ name, pass: true, detail }); }
    catch (e) { report.checks.push({ name, pass: false, detail: e.message }); }
  }
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  await check('Page loads successfully', async () => { assert.equal(response.status(), 200); return { status: response.status(), title: await page.title() }; });
  await check('Document title and one primary heading', async () => {
    assert.ok((await page.title()).includes('Kayk'));
    assert.equal(await page.locator('h1').count(), 1);
    return await page.locator('h1').innerText();
  });
  await check('PT/EN toggle changes text and document language, then returns', async () => {
    const language = page.locator('#language, [data-language-toggle], button[aria-label*="language" i]').first();
    assert.equal(await language.count(), 1, 'Language toggle is missing');
    const initial = await page.evaluate(() => ({ lang: document.documentElement.lang, h1: document.querySelector('h1').innerText }));
    await language.focus();
    await page.keyboard.press('Enter');
    const toggled = await page.evaluate(() => ({ lang: document.documentElement.lang, h1: document.querySelector('h1').innerText }));
    assert.notEqual(toggled.lang, initial.lang);
    assert.notEqual(toggled.h1, initial.h1);
    assert.ok([initial.lang, toggled.lang].some(x => /^pt/.test(x)), 'Portuguese not available');
    assert.ok([initial.lang, toggled.lang].some(x => /^en/.test(x)), 'English not available');
    await language.press('Space');
    assert.equal(await page.locator('html').getAttribute('lang'), initial.lang);
    assert.equal(await page.locator('h1').innerText(), initial.h1);
    return { initial, toggled };
  });
  await check('All internal anchor destinations exist', async () => {
    const anchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => ({ text: a.innerText.trim(), target: a.getAttribute('href'), exists: a.hash === '' || !!document.getElementById(decodeURIComponent(a.hash.slice(1))) })));
    assert.ok(anchors.length > 0);
    assert.deepEqual(anchors.filter(x => !x.exists && x.target !== '#'), []);
    const target = page.locator('a[href="#work"]').first();
    assert.ok(await target.count(), '#work navigation missing');
    await target.click();
    assert.equal(new URL(page.url()).hash, '#work');
    return anchors;
  });
  await check('Contact email preserved', async () => {
    const mailto = await page.locator('a[href^="mailto:"]').evaluateAll(links => links.map(x => x.getAttribute('href')));
    assert.ok(mailto.length >= 1);
    assert.ok(mailto.every(x => x.toLowerCase().startsWith('mailto:kaykevilgamer8@gmail.com')));
    return mailto;
  });
  await check('PT/EN PDF downloads reachable', async () => {
    const pdfs = await page.locator('a[href*=".pdf"]').evaluateAll(links => links.map(x => x.href));
    assert.ok(pdfs.some(x => x.endsWith('portfolio-en.pdf')), 'EN portfolio missing');
    assert.ok(pdfs.some(x => x.endsWith('portfolio-pt.pdf')), 'PT portfolio missing');
    const results = [];
    for (const pdf of [...new Set(pdfs)]) {
      const r = await context.request.get(pdf, { timeout: 30000 });
      assert.equal(r.status(), 200, pdf);
      assert.ok((r.headers()['content-type'] || '').includes('pdf'), `Not PDF content: ${pdf}`);
      const data = await r.body();
      assert.equal(data.subarray(0, 4).toString(), '%PDF', `Bad PDF signature: ${pdf}`);
      results.push({ url: pdf, status: r.status(), bytes: data.length });
    }
    return results;
  });
  await check('Project dialogs support keyboard, focus containment, Escape and focus return', async () => {
    const openers = page.locator('[aria-haspopup="dialog"], [data-open-project], [data-project], [data-case]');
    const count = await openers.count();
    if (!count) return { dialogs: 0, note: 'No project-dialog openers discovered; check not applicable.' };
    const dialogs = [];
    for (let i = 0; i < count; i++) {
      const opener = openers.nth(i);
      if (!(await opener.isVisible())) continue;
      const label = (await opener.innerText()).trim();
      await opener.focus();
      await page.keyboard.press('Enter');
      const dialog = page.locator('dialog:visible, [role="dialog"]:visible').first();
      await dialog.waitFor({ state: 'visible' });
      const text = await dialog.innerText();
      assert.ok(text.length > 200, `${label}: case-study content too short`);
      const hasName = await dialog.evaluate(x => !!x.getAttribute('aria-label') || !!x.getAttribute('aria-labelledby'));
      assert.ok(hasName, `${label}: dialog has no accessible name`);
      const totalFocusables = await dialog.locator('a[href], button, input, select, textarea, [tabindex="0"]').count();
      for (let j = 0; j < totalFocusables + 2; j++) {
        await page.keyboard.press('Tab');
        // Native dialogs permit a Tab step into browser chrome (activeElement=body).
        // Background page controls must remain inert.
        assert.ok(await dialog.evaluate(x => x.contains(document.activeElement) || document.activeElement === document.body), `${label}: background control received modal focus`);
      }
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      // The native dialog's close event is queued; wait for its focus restoration.
      await page.waitForFunction(el => el === document.activeElement, await opener.elementHandle(), { timeout: 1500 });
      assert.ok(await opener.evaluate(x => x === document.activeElement), `${label}: focus did not return to opener`);
      dialogs.push({ label, textLength: text.length, focusables: totalFocusables });
    }
    return dialogs;
  });
  // A failed modal assertion must not leave a dialog covering later screenshots.
  await page.evaluate(() => document.querySelector('dialog[open]')?.close());
  await check('EN visible text, accessible labels and image descriptions translate', async () => {
    if ((await page.locator('html').getAttribute('lang')) !== 'en') await page.locator('#language').click();
    const stale = await page.evaluate(() => [
      ...[...document.querySelectorAll('[data-pt][data-en]')].filter(x => x.textContent !== x.dataset.en).map(x => ({ kind: 'text', expected: x.dataset.en, actual: x.textContent })),
      ...[...document.querySelectorAll('[data-label-en]')].filter(x => x.getAttribute('aria-label') !== x.dataset.labelEn).map(x => ({ kind: 'label', expected: x.dataset.labelEn, actual: x.getAttribute('aria-label') })),
      ...[...document.querySelectorAll('[data-alt-en]')].filter(x => x.alt !== x.dataset.altEn).map(x => ({ kind: 'alt', expected: x.dataset.altEn, actual: x.alt }))
    ]);
    assert.deepEqual(stale, []);
    const labels = await page.locator('[data-label-en]').evaluateAll(els => els.map(x => x.getAttribute('aria-label')));
    assert.ok(labels.length >= 4);
    return { labels };
  });
  await check('Language selection persists through reload', async () => {
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    await page.locator('#language').click();
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('html').getAttribute('lang'), 'pt-BR');
    return { english: 'retained', portuguese: 'retained' };
  });
  await check('Blocked browser storage does not crash navigation or language controls', async () => {
    const blocked = await browser.newContext({ reducedMotion: 'reduce' });
    await blocked.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Storage blocked for test', 'SecurityError'); } }));
    const p = await blocked.newPage();
    const errors = [];
    p.on('pageerror', e => errors.push(e.message));
    try {
      await p.goto(url, { waitUntil: 'networkidle' });
      assert.equal(await p.locator('html').getAttribute('lang'), 'pt-BR');
      await p.locator('#language').click();
      assert.equal(await p.locator('html').getAttribute('lang'), 'en');
      await p.locator('[data-project="aura"]').first().click();
      assert.equal(await p.locator('dialog[open]').count(), 1);
      await p.keyboard.press('Escape');
      assert.deepEqual(errors, []);
      return { pageErrors: errors };
    } finally { await blocked.close(); }
  });
  await check('All three cases expose readable content and application images in PT and EN', async () => {
    const results = [];
    const ids = await page.locator('[data-project]').evaluateAll(els => [...new Set(els.map(x => x.dataset.project))]);
    assert.deepEqual([...ids].sort(), ['aura', 'entre', 'orbit']);
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const language of ['pt-BR', 'en']) {
        if ((await page.locator('html').getAttribute('lang')) !== language) await page.locator('#language').click();
        for (const id of ids) {
          await page.locator(`[data-project="${id}"]`).first().click();
          const dialog = page.locator('dialog[open]');
          await dialog.locator('.case-applications').scrollIntoViewIfNeeded();
          await page.waitForTimeout(100);
          const state = await dialog.evaluate(d => ({ width: d.clientWidth, contentWidth: d.scrollWidth, text: d.innerText, title: d.querySelector('h2').textContent, sections: d.querySelectorAll('section').length, images: [...d.querySelectorAll('img')].map(x => ({ src: x.currentSrc || x.src, loaded: x.complete && x.naturalWidth > 0, alt: x.alt })) }));
          assert.ok(state.contentWidth <= state.width + 1, `${id}/${language}/${width}: dialog overflow`);
          assert.equal(state.images.length, 3, `${id}: key visual and two applications expected`);
          assert.ok(state.sections >= 5, `${id}: brief/decisions/applications missing`);
          assert.deepEqual(state.images.filter(x => !x.loaded || !x.alt), []);
          assert.match(state.text, language === 'en' ? /Fictional (brand|event)/ : /(?:Marca|Evento) fictíci/);
          assert.match(state.text, language === 'en' ? /How it was made/ : /Como foi produzido/);
          assert.match(state.text, language === 'en' ? /Scope and outcome/ : /Escopo e resultado/);
          if (language === 'pt-BR') {
            const applicationShot = `${prefix}-case-${id}-${width}-applications.png`;
            await page.screenshot({ path: applicationShot });
            report.screenshots.push(applicationShot);
            await dialog.evaluate(d => { d.scrollTop = 0; });
            const topShot = `${prefix}-case-${id}-${width}-top.png`;
            await page.screenshot({ path: topShot });
            report.screenshots.push(topShot);
          }
          results.push({ id, language, viewport: width, title: state.title, dialogWidth: state.width, images: state.images });
          await page.keyboard.press('Escape');
        }
      }
    }
    if ((await page.locator('html').getAttribute('lang')) !== 'pt-BR') await page.locator('#language').click();
    return results;
  });
  await page.evaluate(() => document.querySelector('dialog[open]')?.close());
  await check('Editable source ZIP downloads return valid archive signatures', async () => {
    const results = [];
    for (const id of ['aura', 'orbit', 'entre']) {
      await page.locator(`[data-project="${id}"]`).first().click();
      const link = page.locator('dialog[open] a[download]').first();
      assert.equal(await link.count(), 1);
      const href = await link.getAttribute('href');
      const target = new URL(href, page.url()).href;
      const r = await context.request.get(target);
      assert.equal(r.status(), 200, target);
      const data = await r.body();
      assert.equal(data.subarray(0, 4).toString('hex'), '504b0304', `Bad ZIP signature: ${target}`);
      assert.ok(data.length > 1000, 'Source ZIP suspiciously small');
      results.push({ project: id, url: target, status: r.status(), bytes: data.length });
      await page.keyboard.press('Escape');
    }
    return results;
  });
  await page.evaluate(() => document.querySelector('dialog[open]')?.close());
  await check('ENTRE video requires manual play, advances, pauses and has no decoded audio', async () => {
    await page.locator('[data-project="entre"]').first().click();
    const video = page.locator('dialog[open] video');
    const initial = await video.evaluate(v => ({ autoplay: v.autoplay, paused: v.paused, time: v.currentTime, controls: v.controls, preload: v.preload }));
    assert.equal(initial.autoplay, false);
    assert.equal(initial.paused, true);
    assert.equal(initial.time, 0);
    assert.equal(initial.controls, true);
    await video.evaluate(v => v.play());
    await page.waitForTimeout(600);
    const playing = await video.evaluate(v => ({ time: v.currentTime, paused: v.paused, duration: v.duration, videoWidth: v.videoWidth, videoHeight: v.videoHeight, decodedAudioBytes: v.webkitAudioDecodedByteCount, audioTrackCount: v.audioTracks?.length }));
    assert.ok(playing.time > 0.1 && !playing.paused, 'Manual play did not advance');
    assert.ok(Math.abs(playing.duration - 4) < 0.15, `Expected 4s duration, got ${playing.duration}`);
    assert.equal(playing.decodedAudioBytes, 0, 'Audio stream decoded unexpectedly');
    if (playing.audioTrackCount !== undefined) assert.equal(playing.audioTrackCount, 0);
    await video.evaluate(v => v.pause());
    const pauseTime = await video.evaluate(v => v.currentTime);
    await page.waitForTimeout(250);
    const paused = await video.evaluate(v => ({ time: v.currentTime, paused: v.paused }));
    assert.equal(paused.paused, true);
    assert.equal(paused.time, pauseTime);
    await page.keyboard.press('Escape');
    return { initial, playing, paused, note: 'Chrome decoded no audio; independent media probe is documented in provenance.' };
  });
  await page.evaluate(() => document.querySelector('dialog[open]')?.close());
  await check('Reduced-motion preference disables CSS animation and smooth scrolling', async () => {
    const motion = await page.evaluate(() => ({ preference: matchMedia('(prefers-reduced-motion: reduce)').matches, scroll: getComputedStyle(document.documentElement).scrollBehavior, moving: [...document.querySelectorAll('*')].filter(x => { const s = getComputedStyle(x); return (s.animationName && s.animationName !== 'none') || s.transitionDuration.split(',').some(v => parseFloat(v) > 0); }).map(x => x.className) }));
    assert.equal(motion.preference, true);
    assert.equal(motion.scroll, 'auto');
    assert.deepEqual(motion.moving, []);
    return motion;
  });
  await check('Responsive layouts have no horizontal overflow and all images render', async () => {
    const results = [];
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 800) { scrollTo(0, y); await new Promise(r => setTimeout(r, 35)); } });
      await page.waitForTimeout(300);
      const state = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, overflowing: [...document.querySelectorAll('body *')].filter(x => { const r = x.getBoundingClientRect(); const s = getComputedStyle(x); return s.display !== 'none' && s.position !== 'fixed' && r.width && (r.right > innerWidth + 1 || r.left < -1); }).slice(0, 12).map(x => `${x.tagName}.${x.className}`), images: [...document.images].map(x => ({ src: x.currentSrc || x.src, loaded: x.complete && x.naturalWidth > 0, alt: x.getAttribute('alt') })) }));
      assert.ok(state.documentWidth <= width + 1, `${width}px: content is ${state.documentWidth}px wide; ${state.overflowing.join(', ')}`);
      assert.deepEqual(state.images.filter(x => !x.loaded), [], `${width}px: broken images`);
      assert.deepEqual(state.images.filter(x => x.alt === null), [], 'Image alt attribute missing');
      await page.evaluate(() => scrollTo(0, 0));
      await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
      await page.mouse.move(0, 0);
      const screenshot = `${prefix}-${width}.png`;
      await page.screenshot({ path: screenshot, fullPage: true });
      report.screenshots.push(screenshot);
      results.push(state);
    }
    return results;
  });
  await check('Keyboard navigation reaches interactive content', async () => {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const focus = await page.evaluate(() => ({ tag: document.activeElement.tagName, text: document.activeElement.innerText, style: getComputedStyle(document.activeElement).outlineStyle }));
    assert.ok(['A', 'BUTTON'].includes(focus.tag), 'Tab did not reach an interactive element');
    assert.notEqual(focus.style, 'none', 'First keyboard target has no visible focus outline');
    return focus;
  });
  await check('No browser script errors, console errors or failed assets', () => {
    assert.deepEqual(report.pageErrors, []);
    assert.deepEqual(report.consoleErrors, []);
    assert.deepEqual(report.badResponses, []);
    assert.deepEqual(report.failedRequests, []);
  });
  report.passed = report.checks.filter(x => x.pass).length;
  report.failed = report.checks.filter(x => !x.pass).length;
  fs.writeFileSync(`${prefix}-qa.json`, JSON.stringify(report, null, 2));
  fs.writeFileSync(`${prefix}-qa.md`, [`# Website verification`, '', `URL: ${url}`, `Inspected: ${report.inspectedAt}`, `Passed: ${report.passed}; failed: ${report.failed}`, '', ...report.checks.map(x => `- ${x.pass ? 'PASS' : 'FAIL'} ${x.name}${x.pass ? '' : `: ${x.detail}`}`), '', 'Details are recorded in the adjacent JSON report.'].join('\n'));
  console.log(JSON.stringify({ passed: report.passed, failed: report.failed, checks: report.checks.map(x => ({ name: x.name, pass: x.pass, ...(!x.pass ? { detail: x.detail } : {}) })), screenshots: report.screenshots }, null, 2));
  await browser.close();
  process.exitCode = report.failed ? 1 : 0;
})().catch(e => { console.error(e); process.exitCode = 1; });
