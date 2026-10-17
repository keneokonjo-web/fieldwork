# Design tokens (Concept 2, The Brief)

Source of truth: `scripts/brand/palette.mjs` (colour) and `src/styles/tokens.css` (everything else). `tests/tokens.test.ts` fails if the two disagree.

## Colour
| Token | Hex | Role |
|---|---|---|
| `--paper` | #F3F2ED | Page ground |
| `--wash` | #E8E7E0 | Panels, alternate sections, table heads |
| `--ink` | #121212 | Text, rules, the top bar, dark bands |
| `--cobalt` | #2340FF | The one signal: results, disc, terrain, links, one band per page |
| `--cobalt-light` | #7C8FFF | Cobalt on ink grounds |
| `--cobalt-pale` | #B8C2FF | Large text on cobalt only |
| `--grey` | #6B6A63 | Muted text, mono captions |
| `--hair` | #D3D2CA | Decorative hairlines only, never text |
| `--success` `--warning` `--error` | #2F6B3A `#8A5A00` `#A32020` | Product states (always with text or icon) |

Measured contrast (`node scripts/brand/contrast.mjs`): ink on paper 16.7:1; cobalt on paper 5.8:1; paper on cobalt 5.8:1; grey on paper 4.8:1; **grey on wash 4.4:1 fails for small text, so wash sections use a darker grey (#55544D)**; cobalt light on ink 6.4:1; cobalt pale on cobalt 3.8:1 (large text only); hairline on paper 1.35:1 (decorative).

Ratios: paper about 70%, ink 20%, wash 6%, cobalt under 4%.

## Type
- **Schibsted Grotesk** variable: everything. Display 700 at -5% to -7% tracking and 0.92 to 0.94 line height; text 400 at 16 to 17px, line height 1.5.
- **Geist Mono** variable: labels, indexes, captions, corner marks. Uppercase, +6% tracking, 11 to 13px.
- No serif and no italics. Scale: `--step--1` to `--step-5` (fluid clamp).

## Space, shape, motion
4px base (`--s-1` to `--s-10`), fluid section padding, container 80rem. Hairline (1px) rules and square cells; pills only for buttons. No shadows. Motion 140 to 520ms, one gentle reveal, disabled under `prefers-reduced-motion`.

## Devices
Top bar (`.bar`), corner marks (`.corners`, `Corners` component), dot terrain (`/art`), giant wordmark (`.hero__big`, `.footer-giant`), index list (`.index-list`, `.idx`, `.lookback`), hairline cells (`.cells`, `.ways`), Problem / Practice / Result (`.ppr`, `.three`), bracket numerals (`.bn`, `.index`, `.eyebrow`), exercise sheet (`.sheet`), shot (`.shot`, the `Plate` component).
