# Repository guide

Version 0.1, 14 October 2026. Written from a directory listing and the files named. The repository is being added to by several people/agents at the same time as this was written (new files appeared in `docs/`, `scripts/docs/` and `deliverables/` while reading), so re-list before relying on any "this file does not exist" statement.

Git remote: `https://github.com/keneokonjo-web/fieldwork`. Package name `fieldwork-web`, version `0.1.0`, `private: true`.

## 1. Top-level tree

```
fieldwork/
├─ src/                 Application code (Next.js App Router)
│  ├─ app/              Routes, layout, metadata routes, API
│  ├─ components/       brand, forms, layout, learn, assessment, pricing, ui
│  ├─ config/site.ts    Env-driven site config and navigation
│  ├─ content/          Field notes, exercise, pricing, workflows, image register
│  ├─ lib/              validation, leads, rate-limit, analytics, attribution, storage, assessment, metadata, images, prompt, workflow-card
│  └─ styles/           tokens.css, base.css, components.css, pages.css
├─ tests/               Vitest unit tests (3 files)
├─ public/              Static files: images/, art/, brand/ (logo, favicon, social)
├─ brand/               Brand deliverables: guidelines (HTML+PDF), templates, graphics
├─ docs/                Documentation (brand, product, website, operations, marketing, sales, prompts)
├─ scripts/             Build, brand-generation, QA and doc scripts
├─ qa/                  QA results (JSON) and screenshots
├─ deliverables/        Launch kit packaging and research captures (large)
├─ design-lab/          Source of the three early design concepts (build.mjs + src/concept-*.html)
├─ assets/              fonts-build (font files for logo generation), imagery/candidates (git-ignored)
├─ research/            Placeholder for market research (currently empty)
├─ next.config.mjs  tsconfig.json  eslint.config.mjs  vitest.config.ts  package.json  package-lock.json
└─ .gitignore           ignores .next, node_modules, .env*, .data, .vercel, assets/imagery/candidates, tsbuildinfo
```
Not present: `.env.example`, `README.md` at the root, `vercel.json`, `.github/` (no CI), `LICENSE`.

## 2. Source layout details

- `src/app`: `layout.tsx` (fonts, global CSS, header/footer, analytics, motion), `page.tsx` (home), one folder per route, `api/lead/route.ts`, `sitemap.ts`, `robots.ts`, `manifest.ts`, `not-found.tsx`, `favicon.ico`.
- `src/content/images.json`: photograph register (file, subject, alt, group, size, Unsplash id, licence, photographer note).
- `scripts/brand/build-identity.mjs` also copies `favicon.ico` to `src/app/`.
- Path alias `@/*` -> `src/*` (tsconfig and vitest).
- ESLint ignores `.next`, `node_modules`, `public`, `deliverables`, `qa`, `scripts`: scripts are not linted.

## 3. npm scripts (from `package.json`)

| Script | Runs | Status |
|---|---|---|
| `dev` | `next dev` | works |
| `build` | `next build` | works (a build exists in `.next`, built 2026-10-14) |
| `start` | `next start` | works |
| `lint` | `eslint .` | works |
| `typecheck` | `tsc --noEmit` | works |
| `test` | `vitest run` | works |
| `check` | typecheck + lint + test | works |
| `brand:build` | `build-identity.mjs`, `build-art.mjs`, `build-templates.mjs`, `build-guidelines.mjs` | regenerates logos, favicons, terrain art, templates, graphics and the guidelines |
| `docs:pdf` | `node scripts/docs/build-pdfs.mjs` | **script file not found** when checked (only `md-to-pdf.mjs` and `build-deck.mjs` exist in `scripts/docs/`). Use `node scripts/docs/md-to-pdf.mjs <in.md> <out.pdf> [--title "..."] [--landscape]` |
| `qa:browser` | `node scripts/qa/browser-tests.mjs` | works with server on 3100 |
| `qa:links` | `node scripts/qa/link-check.mjs` | **script file not found**; use `scripts/qa/links.mjs` |
| `kit:build` | `node scripts/docs/build-launch-kit.mjs` | **script file not found** when checked |

Fix suggestion (not applied): correct the three paths in `package.json` or add the files.

## 4. Scripts directory

`scripts/brand/`: `palette.mjs` (colour source of truth, tested against CSS), `build-identity.mjs` (logo system, favicons, avatar, Open Graph image -> `public/brand`; part of `npm run brand:build`), `build-art.mjs` + `field-generator.mjs` (halftone dot terrain -> `public/art`), `build-guidelines.mjs` (brand guidelines HTML+PDF -> `brand/guidelines`), `build-templates.mjs` (templates and graphics -> `brand/templates`, `brand/graphics`), `contrast.mjs` (WCAG contrast calculator), `curate-images.mjs` (candidates -> `public/images`), `fetch-imagery.mjs` (Wikimedia Commons PD/CC0 search), `fetch-unsplash-ids.sh` (download Unsplash CDN ids), `image-sheet.mjs` (contact sheets).
`scripts/qa/`: see `QA-HOW-TO-RERUN.md`.
`scripts/docs/`: `md-to-pdf.mjs` (brand-styled Markdown to PDF), `build-deck.mjs` (sales deck builder, added during this work: check its header before use).
`scripts/_ft.mjs`, `_shot.mjs`, `_sm.mjs`: scratch helpers for design experiments (palette in `_ft.mjs` is from rejected concepts).

## 5. How to run, build, test

```bash
npm ci
npm run dev                 # http://localhost:3000
npm run check
npm run build && npm run start
```
QA: see `QA-HOW-TO-RERUN.md`. Deploy: see `DEPLOYMENT-AND-CONFIGURATION.md`.

## 6. Regenerating brand assets and guidelines

| Goal | Command | Notes |
|---|---|---|
| Logos, favicons, `logo-data.ts` (whether it also produces the social avatar/OG files was not checked) | `npm run brand:build` | Needs `assets/fonts-build/*.ttf` and `sharp`, `opentype.js`. Output committed in `public/brand/**` |
| Field art SVGs | `node scripts/brand/build-art.mjs` | Deterministic seeds; output `public/art/field-*.svg` |
| Brand guidelines PDF/HTML | `node scripts/brand/build-guidelines.mjs` | Uses Playwright Chromium to print PDF -> `brand/guidelines/` |
| Templates and graphics | `node scripts/brand/build-templates.mjs` | -> `brand/templates/*`, `brand/graphics/*` (HTML source + PNG) |
| Photographs | `bash scripts/brand/fetch-unsplash-ids.sh assets/imagery/candidates <ids...>` then `node scripts/brand/curate-images.mjs` | `candidates` is git-ignored (77 files at last check). Then update `src/content/images.json` and `docs/website/IMAGE-CREDITS.md` |
| Palette change | Edit `scripts/brand/palette.mjs` and `src/styles/tokens.css` together | `tests/tokens.test.ts` fails if they differ. Then rerun brand builds. Also update `src/app/manifest.ts` colours (currently stale) |

Note: the OG image exists at `public/brand/social/og-default.png` (how it was produced was not checked); the app references a different path (see TECHNICAL-ARCHITECTURE.md section 11).

## 7. Conventions

- **Language**: British English in all copy and docs ("practise" verb, "practice" noun, "organise"). No em dash overuse (`BRAND-STRATEGY.md` voice rules). Honest status labels: "Available now" / "Planned, not yet available".
- **Honesty rules**: no fabricated clients, testimonials, metrics, press, certifications. Fictional example data is labelled. Market facts get "verify".
- **Components**: server components by default; `'use client'` only where interaction needs it. Class-based CSS in four files; no inline colour values (use tokens). Square corners.
- **Content**: TypeScript data modules; new Field Notes via `index.ts`; images only through `photo()`.
- **Config**: anything depending on domain, email, company, social or analytics comes from `siteConfig` (env). Do not hard-code.
- **Forms**: all through `LeadForm` and `/api/lead`; add types in `validation.ts`.
- **Analytics**: closed event list; no personal data in events.
- **Accessibility**: labelled controls, visible focus, no colour-only meaning, reduced motion respected; test with axe and keyboard.
- **Docs**: `docs/brand`, `docs/product`, `docs/website`, `docs/operations`, `docs/marketing`, `docs/sales`. Each doc has a version and date; mark unverified facts.
- **Commits**: not governed by a written convention in the repo; existing history uses short imperative messages.

## 8. Things to know before editing

1. `NEXT_PUBLIC_*` are build-time.
2. Changing a route requires updating sitemap and QA route lists.
3. `deliverables/` and `assets/` are large (about 39 MB and 51 MB on disk at last check; `assets/imagery/candidates` is git-ignored). `deliverables/` contains screenshots of third-party websites captured as design research: keep them private, do not publish.
4. No CI. Run `npm run check` and the QA scripts manually.
5. Comments in `site.ts`, `leads.ts`, `rate-limit.ts`, `metadata`/`attribution` point at docs that were planned under other names (`docs/operations/CONFIGURATION.md`, `docs/marketing/CRM-FIELDS.md`, `docs/marketing/ATTRIBUTION.md`, `docs/website/ANALYTICS-EVENTS.md`, `docs/operations/DOMAIN-AND-TRADEMARK.md`, `docs/marketing/CONSUMER-PRICING-ASSUMPTIONS.md`). Current equivalents: `DEPLOYMENT-AND-CONFIGURATION.md`, `CRM-FIELD-DEFINITIONS.md`, `ATTRIBUTION-GUIDE.md`, `ANALYTICS-EVENT-SPEC.md`, `DOMAIN-DNS-EMAIL-SOCIAL-SETUP.md`; the pricing assumptions file exists in `docs/marketing/`. Update comments when convenient.
6. There is no root `README.md`; this guide and `docs/` serve that purpose.
