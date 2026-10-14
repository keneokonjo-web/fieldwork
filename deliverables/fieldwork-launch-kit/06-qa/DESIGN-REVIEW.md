# Design review

Reviewed from real screenshots in `qa/screenshots/` (Chromium, 1440 and 390 wide) against the founder's brief and the reference research in `deliverables/fieldwork-launch-kit/01-brand/research/`. This is a self-review by the builder, not an independent one.

## Against the brief
| Requirement | Result |
|---|---|
| Blend about 65% Specimen Room, 35% The Brief | Met in structure: serif, chalk, plates and labels lead on consumer pages; grotesque display, bracket numerals, ruled grids and indigo/charcoal bands lead on business pages. |
| Symbol from Concept 3 | Benchmark symbol used in header, favicon, 404, avatar. |
| Wordmark mixing C3 and C2; C2 wordmark preserved | Primary lowercase wordmark and caps lockup. The C2 halftone-tittle wordmark is archived at `public/brand/logo/archive/`. |
| Plate and museum label | On every photograph and as the spine of the layout. |
| Concept 2: giant wordmark, bracket numerals, hero composition | Giant cropped wordmark in the footer; `[01]` numerals on principles, index lists, steps; large display headlines. |
| Concept 3 palette | Used exactly. |
| Lots of high-resolution stock photography | 29 Unsplash images at 2000px, shown on home, individuals, business, real estate, about, field notes. Labelled illustrative. |
| Consumer / business registers | Applied via `.reg-brief` and page compositions. |

## What works
- Calm and credible. The plate-and-label device gives every image a reason to be there, and the labels let us say honestly that a photo is stock.
- Strong hierarchy: mono eyebrow, serif or grotesque headline, one clay emphasis phrase.
- The indigo Problem / Practice / Result panel makes the example the most memorable block on the home page.
- Contrast: all text pairs pass AA (see DESIGN-TOKENS.md); axe reports 0 violations.

## Defects found and fixed during review
1. Hero headline at 152px broke to three lines; reduced to the display step below.
2. Hero plate label hid behind the inset plate; made it float top-right, hidden on phones.
3. Section-head eyebrows inherited the serif ledes; scoped the style.
4. Index-list columns varied per row; fixed column widths.
5. Exercise step navigation caused 748px horizontal overflow on phones; fixed (`min-width: 0`).
6. Scrollable tables were not keyboard-reachable; given tabindex, role and label.
7. Business and real-estate headlines too large for long copy; display size reduced for the Brief register.

## Known weaknesses (not fixed)
- Photography is stock. It reads as category-appropriate, not distinctive. Real photography of real work will lift the site more than any CSS change.
- Several stock images show identifiable people; no model releases are available (see IMAGE-CREDITS.md).
- Business pages use the same plate frame as consumer pages, so the register difference is carried by type and layout more than by surface treatment. A future pass could push the Brief register further (denser grids, more mono).
- Mobile hero stacks text then images; the composed overlap of two plates only appears from tablet up.
- The sales deck PPTX is plain by comparison with the site; it needs a designer's pass in PowerPoint or Keynote.
- Not tested: real devices, Safari, Firefox, screen readers, slow-network behaviour.
