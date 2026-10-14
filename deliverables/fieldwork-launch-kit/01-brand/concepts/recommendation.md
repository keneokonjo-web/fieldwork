# Stage 4: recommendation (round 2)

Round 1 (concepts A, B, C) was scrapped. Round 2 was built **after inspecting the references in a real browser**: see `../research/design-reference-audit.md` and the captures in `../research/screenshots/`.

Open `index.html`, then `concept-1.html`, `concept-2.html`, `concept-3.html` in a browser (self-contained, fonts embedded). Desktop and mobile screenshots sit beside them. All three boards were checked at 390px and 768px wide with no horizontal overflow.

## What the research changed

The references share one thing the first round lacked: **their interface is a system of named, numbered objects**. Anwulika's Field Notes are filed cards (*No. 06, Filed, Reading 7 minutes, G-01*). The AI in Design Report is chapters with giant numerals. DES is seasons. The Lookback is a timeline index. Anveril has "frontiers" and a "stack". The rest of what they do (colour blocks, narrow serif display, tiny tracked labels, cards as objects, a monumental wordmark, one image treatment) supports that.

Fieldwork had no equivalent, and no photography to carry the image language. So I invented one thing none of them have: **the field**, a generative contour terrain seeded by each exercise or note number, so No. 01 and No. 02 never look alike. It is original, it is the literal meaning of the name, it is free to produce at any size, and it replaces photography as the image language. It is built (`scripts/brand/field-generator.mjs`) and used in all three boards.

## The three directions

| | 1. Field Index | 2. The Brief | 3. Specimen Room |
|---|---|---|---|
| Idea | Numbered field cards filed in an index, in colour chapters | A brief: Problem, Practice, Result. Giant wordmark, hairlines | A gallery: framed plates with museum labels |
| Learned most from | Anwulika Field Notes, AI in Design Report | Anveril, DES, The Lookback, Vide Infra | Compound, Anwulika |
| Palette | Paper #FBF7F0, Aubergine ink #1E1026, Vermilion #F2502B, Marigold #FFB627, Lilac #CDB7F4, Sage #CFE1D2 | Paper #F3F2ED, Ink #121212, Cobalt #2340FF, Grey #6B6A63 | Chalk #F1EFEA, Charcoal #262422, Indigo #25306E, Clay #A8512F |
| Type | Gloock, Hanken Grotesk, Geist Mono | Schibsted Grotesk, Geist Mono | Cormorant Garamond, Hanken Grotesk, Geist Mono |
| Wordmark | Gloock with the o as a **contour summit** with a vermilion core | Lower-case, the i-dot is a halftone terrain disc | Tracked caps with a survey-benchmark mark |
| Field as | Bold colour terrain on cards and chapters | Halftone dot terrain | Framed fine-line prints |

Fonts were chosen by rendering the actual headline in 16 faces (not from names): Instrument Serif is Anwulika's own display face, so I avoided it. All fonts are SIL Open Font Licence.

## Evaluation (1 to 5, my judgement)

| Criterion | 1 | 2 | 3 |
|---|---|---|---|
| Distinctiveness: recognisable without the name | 5 | 3 | 3 |
| Usability: reading, exercises, forms, accessibility | 4 | 5 | 4 |
| Versatility: web, social, PDF, deck, video graphics | 5 | 3 | 3 |
| Feasible without photography | 5 | 5 | 3 |
| Fit with individuals and business | 5 | 4 | 3 |
| **Total** | **24** | **20** | **16** |

## Recommendation: Concept 1, Field Index, with Concept 2's restraint as the business register

**Why Concept 1.**
1. It is the closest to what you said you wanted (the editorial colour-and-serif direction you preferred in round 1), but it is now grounded in how the strongest references actually work.
2. It gives the product a **learning grammar in colour**: vermilion for the brief, lilac for the example, marigold for the note, sage for the checked result. The method is visible.
3. The **summit wordmark** is the best logo idea in either round: the "o" and the standalone symbol are the same organic shape taken from the artwork system, so the brand is recognisable without the name, and it survives down to 20px.
4. The colour **chapters** (full-width, one job per colour, giant folio numeral) are the strongest single device, and they work on mobile as simple stacked blocks.
5. Everything is SVG and CSS, so it is cheap to produce a thousand covers, social posts and slides.

**How it handles two audiences in one brand.** *Individuals* get the expressive register: colour chapters, tilted cards, the field in full colour. *Business and real estate* get the calm register: Paper and Ink, the field in a single tone, and **Problem / Practice / Result** from Concept 2 (borrowed from Anveril's pairing). Board 1, section 10 shows the proposal cover and a slide. Same fonts, same cards, same mark.

**What I take from the others.** From Concept 2: restraint, the index list with counts for Field Notes, the monumental cropped wordmark for the footer. From Concept 3: framed plates for the highest-value moments (Field Notes hero, proposal cover), and photography treatment if we later commission it.

**When to choose differently.** Choose **2** if business is the priority and you want maximum credibility with the least decoration. Choose **3** only once real photography exists.

## Risks in Concept 1 and mitigations

| Risk | Mitigation |
|---|---|
| Close in spirit to Anwulika's archive language | Own palette, own type (Gloock, not Instrument Serif), the generated field and the summit are ours; avoid tilted-photo-with-tape as the only card style; vary card forms |
| Scrapbook feel from tilt, tape and torn edges | Rules: tilt only on exercise cards and only ±5°; one torn edge per page; tape only on the hero card |
| Vermilion fails as small text (3.4:1 on paper) | Vermilion is for blocks and display only; text on vermilion is ink (5.7:1) |
| Fatigue from heavy colour on small screens | Chapters are one per viewport, with a paper break every second chapter; test with users |
| Generated contours can look mechanical | Index contours heavier, per-colourway line weights, seeds curated and hand-picked rather than random |
| Gloock has one weight | Hierarchy by size and colour; underline accent; never fake italics |

## Not done, and what I could not verify

- Awwwards.com could not be opened (its host drops the connection). Awwwards-listed sites were found through search and opened directly. See the audit.
- Four candidate references were unusable in a headless browser (Floema blocked; Mouthful of Dust and Obys show only a gate/preloader; Vide Infra's video is DRM).
- No user testing of any direction.
- The logo is a concept, not a finished asset: outlines, optical alignment of the summit to the x-height, favicon tests and exports come in Stage 5.

## Decisions I need from you

1. **Pick a direction** (1 recommended), or name a blend and its priority.
2. Any reaction to **the field** idea itself (generated terrain as the signature artwork). It is the core of the identity; if it does not suit, say so now.
3. Anything you disliked in the references that I should avoid.

I have not started the final logo exports, the graphic asset library, the guidelines PDF or the website rebuild. They follow your choice.
