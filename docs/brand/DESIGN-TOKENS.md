# Design tokens

Source of truth: `scripts/brand/palette.mjs` (colour) and `src/styles/tokens.css` (everything else). `tests/tokens.test.ts` fails if the two disagree.

## Colour
| Token | Hex | Role |
|---|---|---|
| `--chalk` | #F1EFEA | Page ground |
| `--gallery` | #FBFAF7 | Cards, plate mats, inputs |
| `--stone` | #E8E4DB | Alternate sections, table heads |
| `--charcoal` | #262422 | Text, rules, dark sections |
| `--indigo` | #25306E | Result panels, business bands, field art |
| `--clay` | #A8512F | Labels, emphasis, the benchmark centre dot |
| `--clay-light` | #E3A98C | Clay on dark grounds |
| `--mute` | #5F5A53 | Secondary text |
| `--hairline` | #D3CEC3 | Decorative rules only (1.37:1 on chalk, never for text) |
| `--success` `--warning` `--error` | #2F6B3A `#8A5A00` `#A32020` | Product states (always with text or icon) |

Contrast (measured): charcoal on chalk 14.2:1; indigo on chalk 10.9:1; chalk on indigo 10.9:1; clay on chalk 4.6:1 (use at 12px and above, bold or tracked); clay on stone 4.26:1 fails for small text, so use indigo or charcoal for labels on stone sections.

Ratios: chalk about 60%, charcoal 20%, indigo 10%, stone and clay the rest.

## Type
- **Cormorant Garamond** 400/500 + italic: headlines, ledes, plate titles (Specimen Room register, consumer pages).
- **Schibsted Grotesk** 700/800: business headlines, bracket numerals, the wordmark (The Brief register, business pages).
- **Hanken Grotesk** variable: body and UI.
- **Geist Mono** variable: museum labels, indexes, eyebrows.
- Scale: `--step--1` to `--step-6` (fluid clamp). Body 16 to 17px, line height 1.6. Headlines 0.9 to 1.0.

## Space, shape, motion
4px base (`--s-1` to `--s-10`), fluid section padding, container 78rem. Square corners everywhere. Rules are 1px charcoal. Shadow only on plates. Motion: 140 to 560ms, one gentle reveal, disabled under `prefers-reduced-motion`.

## Devices
Plate (`.plate`), museum label (`.label`), bracket numeral (`.bn`, `.index`, `.eyebrow`), index list (`.index-list`), ruled grid, problem/practice/result (`.ppr`), giant wordmark (footer), corner letters (`.corners`).
