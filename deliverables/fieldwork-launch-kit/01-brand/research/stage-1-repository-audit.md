# Stage 1: repository and design audit

Date: 14 October 2026. Branch `claude/exciting-maxwell-l5r45m`. The repository was empty at the start of the project, so everything below was created in this project. A snapshot of the pre-reset state is committed as `9138bfb` so nothing is lost and the reset is traceable.

## What exists

| Area | Location | Verdict |
|---|---|---|
| Next.js 16 / React 19 / TypeScript app, Vercel-compatible, no unnecessary infrastructure | `package.json`, `next.config.mjs`, `tsconfig.json` | **Keep** |
| Central configuration (domain, emails, legal details, analytics, social) from environment variables, default noindex | `src/config/site.ts`, `src/app/robots.ts`, `src/app/sitemap.ts` | **Keep** |
| Lead capture: validation, honeypot, rate limit, adapters (webhook, Resend, dev file), honest `503 not_configured` | `src/lib/validation.ts`, `leads.ts`, `rate-limit.ts`, `src/app/api/lead/route.ts` | **Keep** |
| Consent-aware analytics, event allow-list, attribution capture | `src/lib/analytics.ts`, `attribution.ts`, `src/components/ui/Analytics.tsx` | **Keep** |
| Free exercise logic and content (5-part brief, prompt builder, checks, worked example, workflow card export, local-only storage) | `src/lib/prompt.ts`, `workflow-card.ts`, `storage.ts`, `src/content/learn/` | **Keep logic and copy. Redesign presentation entirely.** |
| Real estate assessment logic and workflow catalogue | `src/lib/assessment.ts`, `src/content/corporate/workflows.ts` | **Keep** |
| Field Notes content (4 articles with honest "how this note was made" statements) | `src/content/field-notes/` | **Keep content. Redesign reading experience.** |
| Pricing hypotheses structure (UK/NG separate, planned vs available) | `src/content/pricing.ts` | **Keep** |
| Legal draft pages with review boxes | `src/app/{privacy,terms,cookies,accessibility}` | **Keep copy. Restyle.** |
| Unit tests (26 passing) | `tests/` | **Keep** |
| Brand strategy, voice, positioning, tagline recommendation | `docs/brand/BRAND-STRATEGY.md` | **Keep** (strategy is not the problem) |
| Logo, favicon, avatar, concept sheet | `public/brand/`, `scripts/brand/build-brand-assets.mjs` | **Replace** |
| Palette and design tokens | `src/styles/tokens.css`, `scripts/brand/palette.mjs` | **Replace** |
| Component CSS and page compositions | `src/styles/components.css`, `pages.css` | **Replace** |
| `MethodPlot`, route cards, statement band, card grids, footer | `src/components/home`, page files | **Replace** |
| Design brief | former `research/design-references/DESIGN-BRIEF.md` (deleted) | **Replace** with the new direction |

## Why the previous visual direction failed (a designer's critique)

I have reviewed the implementation I built and agree with the rejection. The reasons are specific:

1. **The palette is the default "warm studio" palette.** Cream paper, burgundy, terracotta, saffron and moss is exactly what an AI picks when told "warm, creative, earthy". It is pleasant and anonymous. It carries no point of view.
2. **The logo is a stock idea.** A square with a quarter circle and a dot is generic Bauhaus clip-art. It does not relate to anything Fieldwork does, and it needed tick marks to feel designed. The wordmark was a standard Fraunces setting with one tweaked dot.
3. **The hero graphic is a decorative diagram.** Four flat geometric shapes (quarter circle, square, dome, circle) labelled Brief, Run, Check, Keep. The shapes carry no meaning, and the composition is the standard "illustration in a box on the right".
4. **The page structure is the template.** Hero, two cards, dark statement band, feature split, three-column card grid, before/after, coloured band, three article cards, dark CTA, dark footer. Every section is a centred or symmetrical block. The sequence is the one the brief explicitly warned against.
5. **Components are component-library defaults wearing a border.** Boxed cards, outlined buttons with an offset shadow, chips. Nothing ties them to learning or making.
6. **No imagery, no artefacts, no texture.** The brief called for tactile, human, art-directed work. The result was flat vector blocks and text.
7. **Typography is competent but unremarkable.** A single serif plus a neutral sans, with large display type used on every H2.

## What was never validated

Visual QA was only started. A first screenshot of the homepage was reviewed and found to be competent but generic. The remaining pages were not reviewed. No claim of visual QA completion is made for the old design.

## Reuse plan

The reset replaces the visual layer only. The functional layer (config, lead capture, analytics, exercise logic, assessment, content, tests, Vercel readiness) stays. Pages will be rewritten to consume the existing content modules with new components and a new stylesheet, so no behaviour needs to be rebuilt.
