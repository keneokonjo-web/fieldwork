# How to re-run QA

Version 0.1, 14 October 2026. Everything below was read from `package.json`, `vitest.config.ts` and `scripts/qa/*`. The commands were not all re-executed while writing this document; the recorded results are the files in `qa/` (timestamps inside each JSON): axe 2026-10-14T22:06Z, browser 2026-10-14T22:03Z, links 2026-10-14T22:04Z.

## 0. Prerequisites

- Node 20.9+ (22 used), `npm ci` done, Playwright browsers installed (`npx playwright install chromium`; Playwright 1.56.1 was present).
- QA scripts talk to **`http://localhost:3100`** (hard-coded in `axe.mjs`, `links.mjs`, `overflow.mjs`, `shoot.mjs`, `browser-tests.mjs`). `screenshots.mjs` reads `BASE_URL`. To test a deployed site, edit the base constant or use `BASE_URL` where supported.
- `browser-tests.mjs` also starts its own second server on port **3101** with `LEAD_WEBHOOK_URL=http://localhost:4010/hook` and `LEAD_WEBHOOK_SECRET=s3cret`, plus a mock webhook on port 4010. Ports 3100, 3101 and 4010 must be free.

## 1. Build and serve

```bash
cd /home/user/fieldwork
npm run build
bash scripts/qa/serve.sh          # starts `next start -p 3100`, writes /tmp/fw-next.pid, waits up to ~10 s
# pass env pairs: bash scripts/qa/serve.sh LEAD_WEBHOOK_URL=http://...
```
`NEXT_PUBLIC_*` values are fixed at **build** time. To QA "indexing on" or "analytics on", run `NEXT_PUBLIC_SITE_URL=... NEXT_PUBLIC_ALLOW_INDEXING=true npm run build` first; setting them only at `serve.sh` does not change prerendered pages.

## 2. Fast checks (no browser)

| Command | Proves | Does not prove |
|---|---|---|
| `npm run typecheck` | TypeScript compiles (`tsc --noEmit`) | runtime behaviour |
| `npm run lint` | ESLint (`eslint-config-next` rules) passes | style beyond rules |
| `npm test` (`vitest run`, files `tests/**/*.test.ts`) | Assessment scoring and report rules; palette in `scripts/brand/palette.mjs` equals `src/styles/tokens.css`; lead validation, `toRecord` shape, rate limiter, prompt builder, workflow card | UI, API route, adapters, browser behaviour |
| `npm run check` | All three above | |

## 3. Browser behaviour tests

```bash
npm run qa:browser        # = node scripts/qa/browser-tests.mjs
```
Requires the production server on 3100 (section 1). Writes `qa/browser-results.json`; exit code 1 if any fail. 18 tests (all passing in the recorded run):

| Test | What it proves |
|---|---|
| every route returns 200 with one h1, a title, no console errors, no broken images | Basic page health on all routes in the script's list |
| unknown route shows the custom 404 with a 404 status | Not-found handling |
| logo returns to home from an inner page | Logo link |
| desktop navigation reaches every main section | Main nav links work |
| mobile menu opens, traps Escape, navigates and closes | Menu keyboard behaviour |
| skip link is first tab stop and moves focus to main | Keyboard access |
| keyboard focus is visible on links and buttons | Focus styling exists |
| reduced motion shows content immediately and disables reveal transforms | `prefers-reduced-motion` honoured |
| free exercise runs start to finish, copies prompt, downloads card, stores locally | Exercise end-to-end incl. clipboard and download |
| exercise state survives reload (stored on the device only) | Persistence in browser |
| business assessment produces a report | Assessment flow |
| pricing market toggle switches between GBP and NGN | Toggle |
| contact form validates, then reports honest not-configured when no adapter is set | 503 path and message |
| business demo request is delivered to the mock webhook with attribution and secret | Webhook adapter, secret header, UTM capture (port 3101) |
| honeypot submissions are silently dropped, not delivered | Spam control |
| site is noindex and robots disallows by default | Pre-launch safety |
| no analytics script loads without configuration or consent | Consent gating |
| no horizontal overflow at 390, 768 and 1440 on key pages | Layout robustness |

## 4. Accessibility scan

```bash
node scripts/qa/axe.mjs
```
Runs axe-core (tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa) on 20 routes (19 pages plus `/not-a-page`) at 1440 and 390 wide, with reveal animation forced visible. Writes `qa/axe-results.json`. Recorded: zero violations. **Proves** no automatically detectable WCAG violations in initial page states. **Does not prove** WCAG conformance: automated tools find only a minority of issues; later exercise steps, screen reader behaviour, cognitive accessibility and zoom/reflow nuance need manual testing.

## 5. Link crawl

```bash
node scripts/qa/links.mjs        # NOTE: `npm run qa:links` points at scripts/qa/link-check.mjs, which does not exist
```
Crawls from `/`, checks internal link status, in-page fragment targets and images. Writes `qa/link-results.json` (recorded: 19 pages crawled, no problems). Does not check external links or links inside content that is rendered only after interaction.

## 6. Overflow check

```bash
node scripts/qa/overflow.mjs     # exits 1 if scrollWidth > viewport width at 390/768/1440
```
Route list is hard-coded inside the script; update it when adding pages (also in `axe.mjs`).

## 7. Screenshots (visual review)

```bash
node scripts/qa/shoot.mjs qa/screenshots /,/individuals,/pricing 1440   # outDir, comma-separated paths, width
node scripts/qa/shoot.mjs qa/screenshots /,/individuals,/pricing 390
node scripts/qa/screenshots.mjs [filter]                                # PNGs, named routes, both widths, reduced motion
node scripts/qa/compress-shots.mjs <dir>                                # PNG -> JPEG q80
```
The 28 JPGs now in `qa/screenshots/` (14 pages x 390 and 1440) come from `shoot.mjs`; they do not include `/terms`, `/cookies`, `/accessibility` or three of the four articles. A person must look at them; there is no automated visual regression.

## 8. Other QA scripts (research/design tooling)

`capture-reference.mjs`, `capture-scroll.mjs`, `contact-sheet.mjs`, `concept-previews.mjs`, `element-shot.mjs` support design research and concept previews; they write under `deliverables/fieldwork-launch-kit/01-brand/...`. Not part of release QA.

## 9. Manual QA still required (not covered by anything above)

1. Real devices: iPhone Safari, mid-range Android Chrome (Nigeria use case), slow-3G throttling.
2. Screen readers: VoiceOver, NVDA/JAWS, TalkBack across the exercise and forms.
3. Keyboard-only run of every form and the full exercise.
4. Copy review of every page by a human for tone, honesty and typos.
5. Lead path end to end against the real destination (each form type).
6. Email deliverability (SPF/DKIM/DMARC) once mail exists.
7. Performance audit (Lighthouse/PageSpeed) on the deployed site; not recorded anywhere.
8. Consent banner and analytics events with analytics configured on a preview.
9. Print/PDF of the workflow card.
10. Cross-browser: Firefox and Safari (browser tests run Chromium only).

## 10. Release gate (suggested)

`npm run check` -> `npm run build` -> `serve.sh` -> `qa:browser` -> `axe.mjs` -> `links.mjs` -> `overflow.mjs` -> review screenshots -> manual items above. Archive the JSON results with the release note.

## 11. Known script issues

- `package.json` `qa:links` points to a missing file (use `node scripts/qa/links.mjs`).
- `serve.sh` stores its PID in `/tmp/fw-next.pid` and kills the previous server; it is for local QA only.
- Scripts hard-code `localhost:3100`.
- Browser tests run in Chromium only, with a headless default user agent.
