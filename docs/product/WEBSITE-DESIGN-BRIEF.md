# Website design brief

Version 0.1, 14 October 2026. Describes the design intent and what is actually implemented in `src/styles/*.css` and `src/components/**`. Companion to `docs/brand/BRAND-STRATEGY.md` (voice, positioning) and `docs/brand/DESIGN-TOKENS.md` (token values). Brand guidelines PDF: `brand/guidelines/fieldwork-brand-guidelines.pdf`.

## 1. Design intent

A blend of two concepts chosen by the founder after reviewing three: **Specimen Room (about 65%)** and **The Brief (about 35%)**. Concept 1 was rejected. The symbol is the Specimen Room "benchmark"; the wordmark mixes both (see `scripts/brand/build-identity.mjs`).

Intent in one line: a calm, editorial, museum-like place where real work is displayed, labelled and examined, with a sharper, more utilitarian voice for business pages.

Principles
1. **Show the work.** Real tasks, real outputs, labelled honestly (status chips: Available now / Planned, not yet available).
2. **Quiet confidence.** Warm neutral ground, serif display type, restrained colour, no gradients, no stock "AI" imagery.
3. **Plain.** Square corners, 1px rules, one gentle reveal animation, no carousels.
4. **Honest.** Nothing looks live that is not. Draft legal pages carry a visible warning box (`LegalReviewBox`).
5. **Usable on modest means.** Light pages, system-safe fallbacks, no required JavaScript to read content.

## 2. Registers

| Register | Weight | Where | Display type | Feel |
|---|---|---|---|---|
| **Specimen Room** (default) | about 65% | Home hero and most sections, `/individuals`, `/learn`, free exercise, Field Notes, About, Pricing, legal | Cormorant Garamond 400/500 + italic for emphasis (`--font-display`); clay italic `<em>` | Editorial, gallery, plates and labels |
| **The Brief** | about 35% | Business pages via the `.reg-brief` class: `/business`, `/business/real-estate`, and some home sections (`src/app/page.tsx` uses it) | Schibsted Grotesk 700, tight tracking (-0.05em), `--font-wordmark`; `<em>` is upright clay | Direct, structural, bracket numerals |

Switching is per `<section className="... reg-brief">`, defined in `src/styles/pages.css` (lines beginning `.reg-brief`). Do not mix registers inside a single section.

## 3. Colour (see DESIGN-TOKENS.md)

Chalk `#F1EFEA` ground (about 60%), Charcoal `#262422` text and rules (about 20%), Indigo `#25306E` result panels and business bands (about 10%), Stone `#E8E4DB` alternate sections, Clay `#A8512F` labels and emphasis, Gallery `#FBFAF7` cards and plate mats, Hairline `#D3CEC3` decorative only. Functional colours (success, warning, error, info) always paired with text. `tests/tokens.test.ts` enforces CSS/palette agreement.

Known: clay on stone is 4.26:1 and fails for small text; use indigo or charcoal for labels on stone sections (per DESIGN-TOKENS.md).

## 4. Type

Loaded in `src/app/layout.tsx` via `@fontsource` (self-hosted, no third-party font requests): Cormorant Garamond 400, 400 italic, 500; Hanken Grotesk variable (body/UI); Geist Mono variable (labels, eyebrows); Schibsted Grotesk variable (wordmark, Brief register). Fluid scale `--step--1` to `--step-6`. Body 16 to 17px / 1.6.

## 5. Graphic devices

| Device | Purpose | Implementation |
|---|---|---|
| **Plate** | A framed print: gallery mat, 1px dark border, soft shadow; holds a stock photo or generated field art | `Plate` component (`src/components/ui/Plate.tsx`); classes `.plate`, `.plate__frame`, `.plate__img`, `.plate__cap`, modifiers `.plate--inset`, `--main`, `--tall`, `--wide`, `--square`, `--pano`, `--bleed`, `--art`, `--dark` |
| **Museum label** | Monospace caption box that says what a thing is and its status | `Label` component, `.label`, `.label--float`, `.label--dark` |
| **Bracket numerals / eyebrows** | `[01]`-style numbering and section markers | `.bn` (large Brief numerals), `.index`, `.eyebrow` (pseudo-elements add the brackets) |
| **Index list** | Ruled list with numeral column, like a catalogue index | `.index-list` |
| **Ruled grid** | Grid with 1px dividing rules | `.ruled-grid`, `.ruled-grid--3` |
| **Problem / practice / result** | Three-part panel, last cell indigo | `.ppr` |
| **Corner letters** | Tiny mono letters in panel corners | `.corners` with `<i class="tl|tr|bl|br">` |
| **Giant wordmark** | Footer statement | `.footer-giant` in `SiteFooter` |
| **Field art** | Generated contour and halftone terrain, decorative | `public/art/field-*.svg`; generator `scripts/brand/field-generator.mjs`, `build-art.mjs` |

## 6. Imagery rules

1. Photographs are Unsplash stock, curated into `public/images` by `scripts/brand/curate-images.mjs`; the register with alt text is `src/content/images.json`; access only via `photo('<key>')` from `src/lib/images.ts`, which throws on an unknown key so a typo fails the build.
2. Photos are **illustrative**. Never imply a Fieldwork client, agency, result or testimonial. Label "Stock photograph, illustrative" wherever a photo could be read as evidence.
3. Alt text comes from the register. Generated art is `alt=""` and `aria-hidden`.
4. Photographer names are not yet recorded ("to confirm" in `docs/website/IMAGE-CREDITS.md`). Fill before launch; attribution is not required by the Unsplash licence but recommended. Identifiable people appear in some images; no model releases are available; avoid uses implying endorsement.
5. No fake logos, press mentions, ratings or "as seen in".
6. Nigeria and UK are both represented (`city-lagos-aerial`, `city-london-*`); avoid reducing either market to a single cliche.
7. New images: add via the curate script, add alt and subject to `images.json`, update IMAGE-CREDITS.md, compress (target web-sized JPG; EXIF stripped by the script).

## 7. Motion and interaction

One reveal (`.reveal`, class `is-visible` set by `MotionInit`) with a CSS timed fallback; only enabled when `prefers-reduced-motion` is not set (inline script in `layout.tsx` adds `js-motion`). Motion 140 to 560ms. Focus ring colour `--focus` `#0B57D0`. Skip link first in tab order; main has `tabIndex={-1}` and id `main`.

## 8. Layout

Container max 78rem (`.container`, `.container--narrow`). Breakpoints in rem: 40, 48, 60, 62, 64 (see `@media` lines in `components.css`). Mobile first. Verified no horizontal overflow at 390, 768 and 1440 on key pages (`qa/browser-results.json`).

## 9. Component inventory

`src/components`:

| Component | File | Role |
|---|---|---|
| `Logo` | `brand/Logo.tsx` | Lockups/symbol from generated `logo-data.ts` |
| `SiteHeader` | `layout/SiteHeader.tsx` | Nav, header CTA, mobile menu (Escape closes, focus trap, body scroll lock) |
| `SiteFooter` | `layout/SiteFooter.tsx` | Footer nav, giant wordmark, statement |
| `LeadForm` | `forms/LeadForm.tsx` | All forms; client + server validation; honeypot; error summary; honest not-connected state |
| `FirstWorkflow` | `learn/FirstWorkflow.tsx` | Free exercise (see FREE-EXERCISE-SPEC.md) |
| `Assessment` | `assessment/Assessment.tsx` | Business assessment |
| `ConsumerPricing` | `pricing/ConsumerPricing.tsx` | UK/Nigeria toggle and tier cards; stores `fw-market` |
| `Analytics` | `ui/Analytics.tsx` | Consent banner, conditional script load, click tracking |
| `ConsentSettings` | `ui/ConsentSettings.tsx` | Change analytics choice (cookies page) |
| `ArticleBody` | `ui/ArticleBody.tsx` | Renders article blocks |
| `ButtonLink` | `ui/ButtonLink.tsx` | Link styled as button, optional `track` |
| `Chip` / `StatusChip` | `ui/Chip.tsx` | Availability chips |
| `CopyButton` | `ui/CopyButton.tsx` | Copies text; fires `prompt_copied` |
| `LegalReviewBox` | `ui/LegalReviewBox.tsx` | Draft warning on legal pages |
| `MotionInit` | `ui/MotionInit.tsx` | Reveal observer |
| `Plate`, `Label` | `ui/Plate.tsx` | Devices |
| `PromptBlock` | `ui/PromptBlock.tsx` | Prompt text with copy |
| `Reveal` | `ui/Reveal.tsx` | Reveal wrapper |

CSS class families (from `src/styles/components.css` and `pages.css`): layout (`container`, `section`, `section--stone|char|indigo|ink|tight`, `split`, `grid`, `grid--2|3|4`, `stack`, `flow`), type (`lede`, `eyebrow`, `statement`, `small`, `muted`, `prose`), buttons (`btn`, `--secondary|--light|--outline-light|--small`, `btn-row`, `link-arrow`), cards (`card`, `--flat`, `--link`, `card__foot`, `callout`, `callout--safe`, `note-card`, `principle`), alerts (`alert--error|info|success|warning`), forms (`form`, `field`, `field__label|hint|error`, `input`, `textarea`, `select`, `check`, `error-summary`, `form-card`, `form-row`), learning (`learn-shell`, `learn-nav`, `learn-progress`, `learn-step`, `choice`, `choice-grid`, `compare`, `prompt`, `steps`, `ticks`), pricing (`pricing-grid`, `price`, `market-toggle`), tables (`table`, `table-wrap`), misc (`chip`, `consent-banner`, `hero`, `page-hero`, `photo-band`, `mock`, `report`, `route`, `route--biz`, `route-grid`, `visually-hidden`, `skip-link`, `no-print`).

## 10. Accessibility intent

WCAG 2.2 AA target. Evidence on file: axe (wcag2a, 2aa, 21a, 21aa, 22aa tags) zero violations across 20 routes at 390 and 1440 (`qa/axe-results.json`, run 2026-10-14); 18 browser behaviour tests passing (`qa/browser-results.json`). Automated checks do not prove conformance; no manual screen-reader audit or external audit is recorded. The accessibility page text should be reviewed against this reality before launch.

## 11. Print

`.no-print` hides chrome; the workflow card can be printed from the exercise (`window.print()`).

## 12. Do / do not

Do: British English; label status; one idea per section; honest placeholders for missing company details. Do not: invent testimonials, client logos or metrics; use urgency language; use more than two registers in a view; add rounded corners or gradients; load third-party fonts or scripts without consent logic.
