# Website design brief

## Direction
Concept 2, **The Brief**, chosen by the founder (round 4) over a blend of concepts 2 and 3. Off-white, black and one cobalt blue; hairline rules; tiny mono labels; one huge wordmark; the "field" rendered as halftone dot terrain. Every exercise and sales page is built from **Problem, Practice, Result**. The site is short and plain: few words, straight to the point, especially on the homepage.

## Signature elements
| Element | Where |
|---|---|
| **Black top bar** (wordmark left, pages centre in mono capitals, slogan right; sticky; Menu button on phones) | Every page (`SiteHeader`, `.bar`) |
| **Hero**: corner marks, big headline + short note, dot terrain behind, index of three starter tasks, giant cropped wordmark | Home (`.hero`) |
| **Page hero**: corner marks with page number, terrain, headline, one line | Inner pages (`.page-hero`) |
| **Giant wordmark** footer, cropped at the baseline | Every page except home (home has it in the hero) |
| **Index lists** with bracket numerals instead of card grids | Individuals, business, real estate, field notes |
| **Problem / Practice / Result** rows and strips | Home, about, business bands |
| **Exercise sheet** (key-value rows, cobalt result row) | Home preview, exercise |
| **Shots**: stock photographs in hairline cells with mono captions, labelled illustrative | Individuals, business, real estate, home ways-in |

## Colour and type
See `docs/brand/DESIGN-TOKENS.md`. Cobalt appears once as a full-width band per page at most. Schibsted Grotesk and Geist Mono only, self-hosted.

## Components
`Plate` (a shot: photograph from the image register or pre-generated terrain), `Corners`, `Logo`, `ButtonLink`/`TextLink`, `Chip`, `PromptBlock`, `LeadForm`, `Assessment`, `FirstWorkflow`, `ConsumerPricing`. CSS: `src/styles/tokens.css`, `base.css`, `components.css`, `pages.css`.

## Rules
Square cells, hairlines, pill buttons only. No shadows, no serif, no italics, no emoji. Imagery: real places and working surfaces; stock is captioned as illustrative. Copy: plain British English, short; honest status labels (Available / Planned); no invented clients or results.

## Accessibility and performance
Contrast measured and guarded (grey on wash uses a darker grey). Focus outline 3px. Reduced motion respected. One font family plus one mono. Dot terrain is static SVG (about 25 KB each); photographs are optimised by Next at 2000px sources.
