# Design review

Reviewed from real screenshots in `qa/screenshots/` (Chromium, 1440 and 390 wide) against the founder's final direction (round 4): rebuild everything around **Concept 2, The Brief**; keep the black top bar as navigation (wordmark left, pages centre, slogan right); keep the target as an icon; make the site short and plain, especially the homepage. This is a self-review by the builder, not an independent one.

## Against the direction
| Requirement | Result |
|---|---|
| Everything around Concept 2 | Palette (paper, wash, ink, one cobalt), one grotesque (Schibsted Grotesk) plus Geist Mono, hairline rules, corner marks, dot terrain, giant cropped wordmark, bracket numerals, index lists, Problem / Practice / Result. No serif, no italics, no shadows. |
| The concept 2 hero | Rebuilt: corner marks, headline with a short side note and link, dot terrain behind at the right, three-task index, giant wordmark cropped at the bottom. |
| Black bar kept, with real content | Sticky ink bar on every page: wordmark at left, pages in the centre in mono capitals, slogan at right (hidden under 80rem; Menu button on phones). |
| Target kept as an icon | Favicon, app icon, avatar, 404 mark and the lockup. |
| Whole site rebuilt, everything still there | All 19 routes and every function (exercise, assessment, pricing toggle, Field Notes, forms, legal pages, 404) remain. |
| Short and straightforward | Homepage is hero, a three-line Problem / Practice / Result, two ways in, one exercise preview, one business band, four notes, one closing band. Inner pages were cut to a line or two per section. |

## What works
- Strong, quiet identity. One colour, so each use of cobalt means something. The giant wordmark with the halftone disc is memorable and small enough to use as a header mark.
- Index lists and hairline cells replace card grids, which keeps pages light and scannable.
- Contrast is measured and guarded; axe reports 0 violations across 20 routes at two widths.

## Defects found and fixed during review
1. Hero terrain overlapped the side note and link; moved and faded (and faded further on phones).
2. Hero headline wrapped to four lines; resized to three and the wordmark now sits in the first screen at 1440x900.
3. Grey text on the wash background measured 4.38:1; wash sections now use a darker grey.
4. Pale cobalt on cobalt (3.75:1) failed for small eyebrow text; eyebrows on cobalt use paper.
5. The first version of the disc looked like a smudge; it is now a regular dot grid lit from the upper left, with a coarser version below 56px and a plain circle below 24px.
6. The first webhook browser test raced the anti-bot timing check; tests now wait.

## Known weaknesses (not fixed)
- Stock photography is category-appropriate rather than distinctive, and several images show identifiable people with no model releases (see IMAGE-CREDITS.md). Concept 2 uses little imagery; real photography of real work would help more than anything.
- The disc is fine detail at 16 to 24px; the target icon is the safer small mark.
- Restraint can read as a consultancy; the dot terrain and warm copy are doing the work to prevent that.
- Without a serif or italics there is less typographic variety than the earlier blend; hierarchy depends on scale and rules.
- Corner letters on inner pages spell route fragments (IND, BUS, REA) and may read as arbitrary; revisit.
- The sales deck PPTX is functional, not polished, and needs a designer's pass.
- Not tested: real devices, Safari, Firefox, screen readers, slow networks, users.

## Round 5 review (18 October 2026)
Reviewed from screenshots at 1440 and 390 wide.
- **Entry page:** two large cells (white and ink), dot terrain and the giant wordmark. Clear and quick; the wordmark is cropped at the bottom of the first screen on purpose.
- **Individuals hero:** the heading and graphic the founder disliked were replaced with "Put AI to work for you.", a photograph, and a cobalt Build a business button as the main action.
- **Business hero:** text now starts at the top of the hero instead of centring against the tall photo, which removed the blank space above it.
- **Everyday uses:** photo and list share one centre line; checked by a test.
- **Pricing:** four business plans in one hairline grid with Enterprise in ink, then the pilot and add-ons. Dense but scannable; on phones the plans stack.
- **Loading animation:** the target icon draws itself over about a second. It is a deliberate cost of one second per page.
- **Weaknesses:** the pricing grid is text-heavy; the pop-ups sit over page content and could annoy returning visitors; the builder is long on small screens; dashboards are basic and unconnected; the builder logo presets are generic.
