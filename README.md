# Kayk Canova / OGFallen Designs

Independent visual portfolio. Static HTML, CSS and JavaScript, compatible with the existing GitHub Pages project path `/ogfallen-designs/`. No framework, build step, analytics, form backend or third-party runtime dependency.

## Preview

Serve this directory with any static HTTP server, for example `python -m http.server 4173 --bind 127.0.0.1`, and open `http://127.0.0.1:4173/`. Default language: Portuguese. English is available through the navigation toggle or `?lang=en`; `?lang=pt` forces Portuguese. The preference is stored locally when storage is available.

## Content and functionality

- Obsidian direction: near-black surfaces, violet accents, locally hosted Manrope type and original campaign imagery.
- Three independent fictional studies: AURA (beauty), ORBIT (audio) and ENTRE (culture).
- Case dialogs include fictional briefs, imagined audiences, visual choices, applications, provenance and limits. Native dialog supports keyboard containment, Escape, backdrop close and focus return.
- PT/EN UI, navigation, image descriptions, contact email and two PDF download options are retained. Campaign artwork itself remains Portuguese and is identified accordingly in both UI languages.
- Legacy `#work`, `#beauty`, `#travel` and `#culture` anchors still resolve. The three previous collection images and remote PDFs are superseded by the new locally hosted portfolio assets; the original version remains in Git history at `225fcdd`.
- ENTRE motion is four seconds, silent, manually played, with native controls and a static poster. There is no autoplay. Reduced motion disables animated UI transitions and smooth scrolling.
- All project assets are local; there are no expiring service URLs in the page.

## Truthful scope

The work was created for this redesign with AI assistance. These are not client engagements, commercially launched products or a real cultural event. No business results, audience numbers, employment history or software mastery are claimed. Product images are concept renders, without validated manufacturing or performance specifications.

Actual production tools: connected Runway image generation for AURA and ORBIT; installed VectorCraft 0.12.0 for ENTRE vectors; EffectCraft 0.10.0 for its motion study; FilmCraft for a media probe. AURA/ORBIT application layouts are editable SVGs. PDFs are generated with ReportLab. DesignCraft and the main ArtCraft studio were researched, not used to produce these assets. See [asset provenance](docs/PROVENANCE.md) and [ArtCraft research](docs/ARTCRAFT.md).

## Editing

- Page structure and bilingual copy: `index.html`.
- Case-study content and accessible interaction: `app.js`.
- Design system and breakpoints: `styles.css`.
- Optimized images, vector applications, native-source ZIPs, video and PDFs: `assets/`.
- Editable downloads include original prompts and source files; the site uses outlined ENTRE SVG exports to avoid visitor font dependencies.
- Manrope is distributed under the bundled SIL Open Font License at `assets/OFL-Manrope.txt`. No Windows font files are redistributed.

## Validation

Install the pinned development dependency with `npm install` and Chrome with `npx playwright install chromium`. With the static server running, execute `npm test`. You can pass a different URL and artifact prefix: `npm test -- http://127.0.0.1:4173/ test-results/after`. Set `CHROME_PATH` to use an already installed Chrome executable instead of the bundled browser. Playwright is a development dependency only; the published site needs no JavaScript packages.

See [verification](docs/VERIFICATION.md) for tested viewport sizes, interactions, asset checks and deployment status. A local preview does not deploy the redesign. The PR must be reviewed and merged before the existing Pages deployment can publish it.
