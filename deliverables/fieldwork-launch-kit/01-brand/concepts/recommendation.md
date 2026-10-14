# Stage 4: recommendation

**Provisional.** The three supplied references (and Compound) could not be opened, so this recommendation has not been checked against them. See `../research/design-reference-audit.md`. It is built from the brief, the business model, your feedback on the rejected design, and what search results revealed about the references. It should be re-tested once real captures exist.

## The three directions

Open `index.html` in a browser (self-contained, fonts embedded), then `concept-a.html`, `concept-b.html`, `concept-c.html`. Desktop and mobile screenshots sit beside them (`concept-x-desktop.png`, `concept-x-mobile.png`, `preview-x.png`). All three boards were checked at 390px wide with no horizontal overflow.

| | A. The Workbook | B. The Plan Set | C. The Press |
|---|---|---|---|
| Idea | A printed two-ink workbook: you write in it, mark it up, stamp it done | An architectural drawing set: plan, dimension, redline, revision | An independent magazine: colossal serif, saturated spreads, numbered features |
| Palette | Newsprint #F5F1E8, Ink #15130F, Orange #F2481B, Cobalt #2339D2, Highlighter #FFD83D | Sheet #F6F4EE, Wash #E6EBF4, Navy #0E1B3D, Blue #2F52B8, Redline #D8312B | Cream #FAF0E1, Plum #2B1033, Coral #FF6F59, Marigold #FFC21A, Lilac #D9C7F0 |
| Type | Bricolage Grotesque, Newsreader, IBM Plex Mono | Newsreader, DM Sans, IBM Plex Mono | Instrument Serif, Instrument Sans |
| Wordmark | Lower-case grotesque; the o is two misregistered overprinted circles | Serif with a red dimension line beneath | Roman "Field" + italic "work" |
| Device | Overprint, stamp, registration mark, halftone, margin note | Dimension line, redline, title block, section marker | Folio numerals, arch plate, pull quote |
| Learning grammar | Orange = do, cobalt = example, black/yellow = result | Blue = plan, red = check, ink = issued | Coral = your move, lilac = example, marigold = highlight |

## Evaluation (1 to 5, my judgement)

| Criterion | A | B | C |
|---|---|---|---|
| Distinctiveness: recognisable without the name | 5 | 3 | 4 |
| Usability: reading, exercises, forms, accessibility | 4 | 4 | 4 |
| Versatility: web, social, PDF, deck, video graphics | 5 | 3 | 4 |
| Production feasibility with no photography and original SVG/CSS only | 5 | 3 | 5 |
| Fit with the two audiences and the business model | 4 | 4 | 4 |
| **Total** | **23** | **17** | **21** |

Scores are a reasoned judgement, not a measurement. B's lower feasibility score reflects that line diagrams look amateur unless drawn with real care, and the boards show that (its hero diagram is the weakest of the three).

## Recommendation: Concept A, The Workbook

**Why.**
1. **It is the only direction whose visual language is the product's learning method.** Do, Example and Result are things the learner meets in every exercise, so colour and form carry meaning. In B and C the visuals sit beside the learning rather than expressing it.
2. **It is the most ownable.** An overprinted double-circle "o" is a wordmark and a symbol in one, and it works at favicon size. Stamps, worksheets and registration marks are an artefact family you can recognise without a logo, and each is a file you can reuse on a sales deck or a video cover.
3. **It meets "warm but not beige" and "colourful with intention."** Colour has a rule (orange acts, cobalt evidences, yellow notes), not a mood.
4. **It is feasible to ship well.** Everything is SVG and CSS. No photography dependency, no illustration commissioning.
5. **It can be made credible for business.** The corporate version narrows to ink and cobalt, drops overprint and keeps one orange mark per page. Board A section 09 shows this.

**What I would take from the others.**
- From C: large italic Newsreader pull quotes and folio numerals for Field Notes and exercise numbering. These make editorial pages feel published.
- From B: a dimension-line annotation for diagrams (15 min, 4 moves) on the real estate pages.

**When to choose differently.**
- Choose **C** if your priority is elegance and an editorial publication feel over tactility. It is the safer option for a conservative audience and it is the strongest on Field Notes, but it has fewer ideas that belong to Fieldwork specifically.
- Choose **B** only if real estate is the dominant audience. It is the most credible to property people and the hardest to execute well.

## Risks in A, and the mitigations I would apply

| Risk | Mitigation |
|---|---|
| Playful or youthful to a conservative agency owner | Corporate palette is ink + cobalt only, with serif reading text and mono labels; no stamps on proposals except "Draft" |
| Riso is fashionable and may date | Overprint is used once per layout and never as texture; the system rests on type and grammar, not the effect |
| Orange fails contrast as text (3.2:1 on newsprint) | Orange is fill or large display only. Orange text is never below 24px bold. Text on orange is ink (6.4:1) |
| Too many devices at once | Rule: one overprint, one stamp, at most one halftone per screen |
| Not validated against real references | Re-run Stage 2 with access and revise before the guidelines PDF is finalised |

## Specification summary for the recommended direction

The full design system and guidelines follow after approval. These are the decisions I will build on.

**Palette and ratios.** Newsprint #F5F1E8 (about 60% of any screen), Stock #EAE4D6 (secondary ground, 10 to 15%), Ink #15130F (text, results, dark panels, 15 to 20%), Orange #F2481B (actions and instructions, under 5%), Cobalt #2339D2 (examples, evidence, links, under 5%), Highlighter #FFD83D (the one noted phrase, under 3%). Muted text #5C564B. Hairline #CFC8B8 (decorative only). Functional: success #1E7A46, warning #9A5B00, error #B3141B, always with an icon and a word. Overprint is orange × cobalt, producing a dark plum, used as a graphic only.

**Type.** Display: Bricolage Grotesque 800, width 88%, tracking −4%, leading 0.88 to 0.95, used for hero lines, section openers and numerals, one display size per screen. Reading: Newsreader 400, italic for emphasis, 18 to 21px, leading 1.55, measure 62ch. Annotation: IBM Plex Mono 500, caps, tracking +8%, 11 to 13px, for labels, step counters and margin notes only. Scale: 12, 14, 18, 21, 28, 40, 64, 104 on desktop; 12, 14, 17, 20, 26, 34, 48, 64 on mobile. All self-hosted (SIL OFL), latin subsets, roughly 175 KB in total.

**Grid.** 12 columns desktop (1240px max, 48px margins, 24px gutters), 6 tablet, 4 mobile (16px margins). Sections break the grid on purpose: asymmetric 7/5 and 8/4 splits, full-bleed ink or colour panels at most once per page, a left rail of mono labels on reading pages. Radius 0 everywhere; 1.5px ink borders; no soft shadows; a hard offset shadow (4px 4px 0 ink) for hover only.

**Components.** Buttons: ink block with Bricolage label, orange for the one primary action per screen, no pills. Links: underlined with a 2px offset, cobalt. Cards are not boxes by default: content sits on the ground separated by rules, and a worksheet frame (header strip, perforation, dotted fields) is used for exercises. Inputs: dotted-underline fields in worksheet contexts, bordered fields in plain forms. Progress: six segment bars. Feedback: stamped labels with icon and text. Tooltips: mono label with a rule.

**Graphic system (six reusable assets, to be built after approval).** 1. Overprint circle pair (hero shape, avatar). 2. Stamp set (Example, Result, Checked, Draft, Method). 3. Registration and corner marks. 4. Halftone fade fields (SVG pattern). 5. Worksheet frame and perforated header (exercise container). 6. Process diagram kit: the four moves drawn as stamped steps with margin notes. Plus: number folios, margin-note component, before/after comparison plate, social and video templates.

**Logo.** The overprinted-o wordmark is the lead concept. Before finalising I will draw it as outlines with careful optical alignment of the circles to the x-height, develop two further genuinely different wordmark concepts for comparison (a custom lettered "fw" mark and a typographic one using the highlighter), then export light, dark, mono, favicon and avatar versions.

**Motion.** Hover: hard-shadow offset and stamp-press on buttons (120ms). Reveals: opacity and 12px translate on first view, once. The overprint circles drift by a few pixels on first load only. A stamp "presses" onto a result when a check passes. Everything disabled under reduced motion. No parallax, no scroll-jacking.

**Homepage outline (so you can judge it is not the template).** 1. An asymmetric opening: a huge headline, the overprint figure with a rotated worksheet and a stamped result overlapping it, a single orange button. 2. A "what you make" strip: three finished outputs as annotated plates, not feature cards. 3. A full-width worked example: raw notes on the left, marked-up result on the right with margin notes. 4. The four moves as one long horizontal diagram. 5. Two routes presented as a split page, individuals on newsprint, business on ink with cobalt, different compositions. 6. Field Notes as a numbered index list with big folios, not cards. 7. A footer built as the back page of the workbook, with registration marks and a sign-off.

## Decisions I need from you

1. **Pick a direction** (A recommended), or a combination with a stated priority.
2. **Network access** so I can run the real reference research (Stage 2 re-run) and test this recommendation against it before anything is finalised. Without it, the direction stays provisional.
3. Confirm the correct URL for the Field Notes reference. Search points to Substack (`anwulikasnotes.substack.com`) and to `anwulika.com`, not beehiiv.

I have not started the guidelines PDF, the logo exports, the graphic assets or any website rebuild, as agreed.
