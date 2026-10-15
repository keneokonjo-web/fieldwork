# Prompt: scrap the design, start again, 33 reference-led concepts

Paste everything below the line into the other chat. Use Opus 5.5 or the strongest model available. A smaller model will skip the inspection work and fall back on generic design, which is what went wrong last time.

---

You already know the Fieldwork brand, its audiences, its two sides (individuals, and businesses starting with real estate), its honesty rules and the site's functional layer. This task is about **design only**.

## The instruction

**Scrap the current design completely.** Do not refine it, do not reuse its layout, type, palette, logo, graphic devices, imagery treatment, component styling or page compositions, and do not use it as a starting point or a fallback. Treat the repository's visual layer (CSS, logo, brand assets, page layouts, templates, guidelines) as deleted. Keep only: the brand strategy and voice, the copy and content, and the functional code (forms, API, exercise logic, assessment, analytics, config, tests). Then **start the design process from zero** and **come up with 33 different concepts**.

Last time the design came out generic and did not truly take inspiration from the reference sites. This time the references must change your decisions. If a concept could have been designed without looking at the references, it fails.

## Step 1. Inspect the references for real (no summaries from memory)

Open each reference in a real browser (Playwright with the installed Chromium; if a site blocks you, say so, try a different route such as search-found pages or its other pages, and never invent what you could not see):

- Anwulika Field Notes
- Anveril
- Compound (compoundafrica.com)
- At least 12 further sites you find through design galleries and searches (Awwwards, Godly, Siteinspire, Lapa, Land-book, Minimal Gallery, Typewolf, Httpster, Savee, Dribbble and Behance for identity work). Choose a wide spread: editorial, gallery and museum, property and architecture, education and learning, African and diaspora brands, brutalist, quiet luxury, publishing, tools and software, and at least three that look nothing like the others.

For every site capture, at 1440x900 and 390x844: the first viewport, the full page, and a scroll-through of frames every 600px, then compress to JPG. Extract computed styles to JSON: fonts and weights, type scale, colours (with contrast), spacing rhythm, grid and container widths, border and radius use, button and link styles, image treatment, motion and hover behaviour. Save everything under `research/`.

Then view the screenshots yourself (read the images) and write one audit entry per site: what the site does that is distinctive, the structural principle behind it (for example "everything is a numbered object" or "type is the image"), 3 specific things worth borrowing in principle, 3 things to avoid, and what would be a lazy copy. Never copy a site's logo, photography, copy, illustrations or exact layout. Borrow principles, not pixels.

## Step 2. Extract design principles

From the audit, write a principles document: 20 or more distinct principles, each tied to the site(s) it came from (typography, grid, imagery, colour logic, navigation, motion, labelling, density, rhythm, tone). This is the raw material for the concepts.

## Step 3. Make 33 concepts

Each concept must be a **different design direction**, not a colour change. Before building, write a one-paragraph brief for each of the 33 and a table showing how they differ on: typeface families, type scale and case, grid and density, colour logic, imagery treatment (photography, illustration, type-only, generative, texture), signature graphic device, logo approach (wordmark, monogram, symbol, lettering), navigation pattern, and the two registers (consumer and business). No two concepts may share the same combination of typeface family, palette logic and signature device. State, for each, which references and principles it draws on and what it deliberately rejects.

Build each concept as a real **HTML board**, not a description:
- Home hero at desktop and mobile (side by side), a logo exploration (primary mark plus a small-size test), palette with contrast ratios, type specimen, the signature device, one inner-page section (for example the exercise step or the business problem/practice/result block), and one component set (button, form field, card).
- Real fonts, self-hosted (SIL OFL or similar free licences). Real stock photography where the direction needs it (free-licence sources only; label it stock and illustrative). Generative or hand-built vector art where it does not.
- Render every board to PNG with Playwright and compile a contact sheet of all 33.

Quality rules: no emoji; no gradient-orb, glassmorphism or "AI startup" clichés; no stock handshake or glowing-brain imagery; no concept that is just the previous design re-skinned; every logo must be checked at 16px and in one colour; every colour pair used for text must pass WCAG AA; the layouts must hold at 390px with no horizontal scroll. Brand honesty applies throughout: no invented clients, testimonials or numbers.

## Step 4. Review before showing me

Critique all 33 yourself against the brief: originality, fit with the brand (practical, honest, learning by doing, UK and Nigeria, real estate first), memorability, accessibility, buildability in plain CSS. Rate each out of 10 on those five measures with one line of reasoning. Cut obvious duplicates and replace them so there are still 33 distinct ones. Then recommend a shortlist of 5, and say which 3 you would combine and how.

## Step 5. Stop at the gate

Do not rebuild the website, the logo system, the guidelines or any documents yet. Present: the contact sheet, the 33 board PNGs, the audit, the principles, the ratings and your shortlist, all in one folder plus a zip, and wait for me to choose. After I choose (and say how to blend), you will do the full identity, guidelines and website rebuild, and visual QA.

## Working method

- Work in stages and commit and push after each stage to the designated branch.
- If a step fails (blocked site, missing font, rate limit), say what failed and what you did instead. Never claim you inspected something you did not.
- Report at the end: what you inspected, what you could not, how many concepts you built, and where the files are.
