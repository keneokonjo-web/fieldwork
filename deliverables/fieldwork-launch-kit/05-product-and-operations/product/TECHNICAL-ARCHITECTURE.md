# Technical architecture

Version 0.1, 14 October 2026. Everything below was read from the repository. Status words: **Completed**, **Tested** (automated or scripted check recorded in `qa/` or `tests/`), **Prepared but unconnected**, **Deferred**.

## 1. Stack

| Layer | Choice | Source |
|---|---|---|
| Framework | Next.js `^16.4.1`, App Router, React `^19.3.1` | `package.json` |
| Language | TypeScript `^6.0.3` | `package.json`, `tsconfig.json` |
| Node | `>=20.9` required; Node 22.22.0 present in the build environment | `package.json` engines |
| Styling | Hand-written CSS in `src/styles/{tokens,base,components,pages}.css`; no CSS framework | `layout.tsx` imports |
| Fonts | `@fontsource` self-hosted | `layout.tsx` |
| Tests | Vitest `^5.0.4` (unit), Playwright `^1.56.1` + `@axe-core/playwright` (browser/accessibility scripts) | `package.json` |
| Image tooling | `sharp` (build scripts) | scripts |
| Hosting target | Vercel (not deployed) | see `docs/operations/DEPLOYMENT-AND-CONFIGURATION.md` |
| Database | None | no DB code in `src` |
| Auth / payments | None | none in `src` |

## 2. Rendering model

- All marketing pages are server components with no `use client` at page level; interactivity lives in client components under `src/components` (`FirstWorkflow`, `Assessment`, `LeadForm`, `ConsumerPricing`, `Analytics`, `ConsentSettings`, `SiteHeader`, `MotionInit`, `CopyButton`).
- `field-notes/[slug]` uses `generateStaticParams()` over `articles`; unknown slugs call `notFound()`.
- `/api/lead` is `runtime = 'nodejs'` and `dynamic = 'force-dynamic'`; responses carry `cache-control: no-store`.
- `sitemap.ts`, `robots.ts`, `manifest.ts` are Next metadata routes.
- Content is TypeScript data (`src/content/**`), not a CMS. Edits require a deploy.

## 3. Configuration

All environment-dependent values come from `src/config/site.ts`, read via `process.env` at build/runtime. `NEXT_PUBLIC_*` values are inlined at build time, so changing them requires a rebuild/redeploy. Full variable table: `docs/operations/DEPLOYMENT-AND-CONFIGURATION.md`. **There is no `.env.example` in the repository** (checked 14 October 2026) although `.gitignore` whitelists one (`!.env.example`) and source comments refer to one.

## 4. Lead data flow

```
Browser form (LeadForm)
  1. client validateLead()                       src/lib/validation.ts
  2. attribution = readAttribution()             src/lib/attribution.ts (sessionStorage `fw-attribution`)
  3. POST /api/lead  (JSON)                      src/app/api/lead/route.ts
Server
  a. Origin check: if Origin and Host present, hosts must match, else 403 {error:'forbidden'}
  b. Content-Length > 30,000 -> 413 'too_large'
  c. IP = first value of x-forwarded-for (or 'unknown'); in-memory limiter 8 requests / 10 min per IP -> 429 'rate_limited'
  d. Parse JSON (400 'invalid_json'); validateLead() again (422 with fieldErrors)
  e. Spam: honeypot field `website` filled, or startedAt < 1200 ms ago -> returns {ok:true} and delivers nothing
  f. deliverLead(): toRecord() builds LeadRecord; runs every configured adapter:
       - viaWebhook  (LEAD_WEBHOOK_URL, optional LEAD_WEBHOOK_SECRET sent as header x-fieldwork-secret; 8 s timeout)
       - viaResend   (RESEND_API_KEY + LEAD_NOTIFY_EMAIL + LEAD_FROM_EMAIL; notification email to founder, reply_to = lead email)
       - viaDevFile  (LEAD_DEV_FILE=true and NODE_ENV != production; appends .data/leads.jsonl)
  g. No adapter configured -> 503 {error:'not_configured'} ("nothing was saved")
     Adapter configured but all that were attempted failed -> 502 'delivery_failed'
     At least one succeeded -> {ok:true}
  h. 405 for GET
Client: success -> fires form event (consent permitting); 'not_configured' shows an honest "Not connected yet" alert with optional fallback mailto
```

Behaviours worth knowing:
- If one adapter fails and another succeeds the request succeeds; the failure is only logged (`console.error('[lead] delivery adapter failed: ...')`, no personal data in the message).
- If the webhook is configured but down and Resend is not, the visitor sees an error and nothing is stored anywhere (no retry queue, no dead-letter). **Deferred**: durable queue.
- Nothing is stored by Fieldwork itself. The lead exists only in the destination(s).
- `crm` suggestion fields in the record are described in `docs/operations/CRM-FIELD-DEFINITIONS.md`.

Status: code **Completed and Tested** (unit tests for validation/record/limiter in `tests/validation.test.ts`; browser tests for not-configured state, webhook delivery with secret and attribution, honeypot drop in `qa/browser-results.json`). Real adapters (webhook receiver, Resend account, verified sending domain) are **Prepared but unconnected**. Resend delivery has not been tested against the live Resend API (no key in this environment); the code path is untested end to end.

## 5. Consent and analytics

`src/components/ui/Analytics.tsx` renders the Plausible-style `<Script>` only if `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set **and** `fw-consent` is `granted`. Banner appears only if configured and no choice made. `track()` returns silently without `window.plausible` or consent. Event names are a closed allow-list; property keys are filtered to a safe list. Detail: `docs/website/ANALYTICS-EVENT-SPEC.md`. Tested: "no analytics script loads without configuration or consent".

## 6. Browser storage (no cookies are set by the site code)

| Key | Where | Purpose |
|---|---|---|
| `fw-learn-v1` | localStorage (`src/lib/storage.ts`, falls back to memory) | Exercise progress |
| `fw-market` | localStorage | Pricing market toggle |
| `fw-consent` | localStorage | Analytics choice |
| `fw-attribution` | sessionStorage | First-touch UTM/referrer/landing path, sent only on form submit |

Third-party analytics (when enabled and consented) may set its own storage; check the provider's documentation (**verify**).

## 7. Security headers and posture

Set in `next.config.mjs` for all routes: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`. `poweredByHeader: false`. `/brand/*` gets `Cache-Control: public, max-age=86400`.

Not set: **Content-Security-Policy**, **Strict-Transport-Security** (Vercel serves HTTPS and may add HSTS at the platform level; verify after deployment with a header check), `Cross-Origin-*` headers. A CSP would need to allow the analytics host and Next inline scripts (nonces); **Deferred**.

Other: no secrets in client bundles (server env vars are not prefixed `NEXT_PUBLIC_`); HTML in the Resend email is escaped (`esc()`); control characters stripped and fields length-capped in `validateLead`; same-origin check on the API (not a CSRF token; the API accepts JSON only, which is not sendable by simple cross-site forms, but a header check is not a substitute for monitoring).

## 8. Rate limiting

`src/lib/rate-limit.ts` is an in-memory Map. On serverless platforms each instance has its own memory and instances restart, so this only slows casual abuse. Production recommendation: add a Vercel Firewall rate-limit rule on `POST /api/lead` (**verify** plan availability). `x-forwarded-for` can be spoofed if the app is ever served behind something that passes it through; on Vercel the platform sets it.

## 9. Performance notes

- Static generation for all pages; images through `next/image` with explicit dimensions (`images.json` width/height) to avoid layout shift; art SVGs are pre-generated and `unoptimized`.
- Fonts self-hosted; two variable families imported globally in `layout.tsx` (Schibsted Grotesk and Geist Mono). Not yet subsetted or preloaded manually; Next/`@fontsource` imports include all subsets present in the CSS files (**check bundle with a real audit**).
- **No Lighthouse or Core Web Vitals run is recorded in `qa/`.** Any speed claim is unmeasured. Run PageSpeed Insights against the deployed preview before launch.
- Build and bundle sizes were not recorded in the repo.

## 10. Testing

| Layer | Command | Covers |
|---|---|---|
| Type check | `npm run typecheck` | `tsc --noEmit` |
| Lint | `npm run lint` | `eslint .` with `eslint-config-next` |
| Unit | `npm test` | `tests/assessment.test.ts`, `tests/tokens.test.ts`, `tests/validation.test.ts` (validation, record, limiter, prompt, workflow card) |
| Aggregate | `npm run check` | typecheck + lint + test |
| Browser | `npm run qa:browser` (needs production server on 3100) | 18 behaviour tests |
| Accessibility | `node scripts/qa/axe.mjs` | axe on 20 routes x 2 viewports |
| Links | `node scripts/qa/links.mjs` | crawl internal links, fragments, images |
| Overflow | `node scripts/qa/overflow.mjs` | no horizontal scroll at 390/768/1440 |
| Screenshots | `node scripts/qa/shoot.mjs <outDir> <paths> [width]` (the 28 JPGs in `qa/screenshots/` match its naming: 14 pages x widths 390 and 1440); `scripts/qa/screenshots.mjs` writes PNGs for 15 named routes | visual review only; no pixel comparison |

Details in `docs/operations/QA-HOW-TO-RERUN.md`. Note: three `package.json` scripts point at files that do not exist at the time of writing (see `docs/operations/REPOSITORY-GUIDE.md`, "Known script mismatches").

## 11. Known defect found while writing this document

`src/lib/metadata.ts` sets the Open Graph and Twitter image to `/brand/og/og-default.png`, but the file in the repo is `public/brand/social/og-default.png` and no `public/brand/og/` directory exists. Social previews would 404 until the path is corrected (change to `/brand/social/og-default.png`) or the file is moved. Not fixed here (documents only task); logged in `docs/operations/KNOWN-LIMITATIONS-AND-FUTURE-WORK.md`. Also no JSON-LD structured data is emitted yet.

## 12. How to add things

**Add a page**
1. Create `src/app/<route>/page.tsx`. Export `metadata = pageMetadata({ title, description, path })` from `@/lib/metadata`; use one `<h1>`.
2. Add the route to `routes` in `src/app/sitemap.ts`, to the nav in `src/config/site.ts` if it belongs there, and to the route arrays in `scripts/qa/axe.mjs` and `scripts/qa/overflow.mjs`.
3. Update `docs/product/SITEMAP-AND-INFORMATION-ARCHITECTURE.md` and `docs/website/SEO-KEYWORD-MAP.md`.
4. Run `npm run check`, build, QA scripts.

**Add a Field Notes article**
1. Create `src/content/field-notes/<slug>.ts` exporting an `Article` (fields in `types.ts`: `slug`, `title`, `description`, `audience`, `category` (`Method | Checking | Real estate | Safety`), `published` (ISO date), optional `updated`, `readingMinutes`, `basis` (honest statement of how it was made), optional `related`, `blocks`).
2. Block kinds: `p`, `h2`, `h3`, `ul`, `ol`, `prompt`, `note`, `table`.
3. Import it in `src/content/field-notes/index.ts` and add to the `articles` array. The sitemap, static params and index page pick it up.
4. Add to the QA route lists. Do not invent facts, statistics or quotations; state the `basis` truthfully.

**Add a free-exercise starter task**
1. Add an object to `STARTER_TASKS` in `src/content/learn/first-workflow.ts` (`id`, `title`, `blurb`, `context`, `problem`, `materialLabel`, `brief`, optional `fictionalNote`). Use fictional material only.
2. No component change is needed; keep ids unique and stable (they are stored in user state).
3. If you add a check to `CHECKS`, note that the workflow card lists every check (`workflow-card.ts`).

**Add a form / lead type**
Add the type to `LEAD_TYPES` and rules in `validateLead`, add an event mapping in `EVENT_FOR` in `LeadForm.tsx`, update `docs/operations/CRM-FIELD-DEFINITIONS.md` and tests.

**Add an analytics event**
Append to `EVENTS` in `src/lib/analytics.ts`, call `track()` or add `data-track`, update the event spec, update the privacy notice if properties change.

## 13. Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| Content as TypeScript | Type safety, zero services | Non-developers cannot edit; deploy per change |
| No database | No data to protect or breach; honest simplicity | No lead history if adapters are down; no accounts |
| Client-only exercise state | Strong privacy; works offline after load; no accounts | State lost if storage cleared; no cross-device; no analytics on content entered |
| In-memory rate limit | No dependency | Weak on serverless |
| Webhook-first lead delivery | Works with any CRM/automation tool | Founder must build the receiver; failures are not queued |
| Hand-written CSS | Small, exact to design | Manual consistency work; no design-system library |
| Consent-gated analytics | Lower legal risk, clean | Less data; consent banner friction |
| noindex by default | Safe pre-launch | Must remember to enable (see launch checklist) |
