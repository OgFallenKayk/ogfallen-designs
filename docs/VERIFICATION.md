# Verification — 22 October 2026

## Baseline

Connected GitHub account and renamed repository verified as `OgFallenKayk/ogfallen-designs`. The repository contained one static `index.html`, with bilingual content, anchors, email contact, three external image collections and two external PDFs. The current public Pages site returned HTTP 200. All three previous images and both previous PDFs returned HTTP 200. The original version is preserved in Git history at `225fcdd`.

## Redesign checks

Playwright 1.62.1 with installed Google Chrome: **17 checks passed, 0 failed** on the local HTTP preview.

- Page loads, correct document title and one primary heading.
- PT/EN changes visible text, document language, accessible labels and image descriptions.
- Language preference survives reload; blocked browser storage does not crash the page.
- Navigation destinations exist; contact email is preserved.
- Both new PDF downloads return HTTP 200 with a valid PDF signature.
- Case dialogs open by keyboard, contain focus, close with Escape and restore focus to the opener.
- All three cases display their briefing and application images in both languages.
- All three source ZIPs return HTTP 200 with valid archive signatures. Archive entries were inspected and contain the promised editable formats.
- ENTRE video requires manual play, advances, pauses and decodes without audio; duration is four seconds.
- Reduced-motion preference disables CSS transitions, animations and smooth scrolling.
- No horizontal overflow at 390, 768 and 1440px; all page images render. Independent spot checks also covered 320 and 360px.
- Visible keyboard focus is present.
- No browser script errors, console errors, failed requests or HTTP asset errors during the suite.

Visual review covered desktop/mobile pages, all project applications, ENTRE's full presentation board and AURA's product composition. Mobile application galleries stack into one column for legibility. The case key visual uses `contain` to preserve the full vector board. The final image-fit adjustment was checked separately after the interaction suite.

Both portfolio PDFs contain four pages. All eight pages were rendered and inspected for clipping/overlap, with extractable text, correct page dimensions and working link annotations. Source copies and delivered PDFs are identical.

VectorCraft native documents reopen without warnings, missing fonts or missing glyphs. FilmCraft media probe confirms H.264 High, 600 × 400, 24fps and no audio stream. Beginning/middle/end motion frames were inspected.

`node --check app.js`, test-script syntax validation and `git diff --check` also passed.

## Scope and limitations

This is local verification, not a live production deployment. The changes are prepared on `codex/obsidian-portfolio` for PR review. The existing public Pages site remains unchanged until the PR is merged and the hosting deployment completes. No CI workflow existed in the baseline repository; a portable browser regression script is included under `tests/` with usage in the README.

Browser checks ran in Chrome on Windows; Safari, Firefox, real-device touch and independent screen-reader testing were not performed. The campaigns are fictional AI-assisted studies, with no audience tests or commercial results. The earlier Obsidian proposal's full mockup was not recoverable from the referenced chat, so this implementation follows the selected dark/violet direction given in the request.
