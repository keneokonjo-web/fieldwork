# Final QA report

Run on 14 October 2026 against a production build (`next build`, `next start`) in Chromium (Playwright 1.56). Raw results: `browser-results.json`, `axe-results.json`, `link-results.json`. Screenshots: `screenshots/` (1440 and 390 wide). Re-run commands: `docs/operations/QA-HOW-TO-RERUN.md`.

## Results
| Check | Command | Result |
|---|---|---|
| Type check | `npm run typecheck` | Pass |
| Lint | `npm run lint` | Pass, 0 errors, 0 warnings |
| Unit tests | `npm test` | 27 of 27 pass (assessment logic, validation, design tokens match palette) |
| Production build | `npm run build` | Pass, 25 static pages |
| Browser behaviour | `node scripts/qa/browser-tests.mjs` | 18 of 18 pass |
| Accessibility (axe, WCAG 2.0/2.1/2.2 A and AA) | `node scripts/qa/axe.mjs` | 0 violations, 20 routes x 2 viewports |
| Links and anchors | `node scripts/qa/links.mjs` | 19 pages crawled, 0 problems |
| Horizontal overflow | `node scripts/qa/overflow.mjs` | None at 390, 768, 1440 on any route |

## What the browser tests prove
Every route returns 200 with one h1, a title, no console errors and no broken images; custom 404 with a 404 status; logo returns home; desktop and mobile navigation; Escape closes the mobile menu; skip link and visible focus; reduced motion shows content; the free exercise runs start to finish (copy prompt to clipboard, download the workflow card, state kept in the browser); the assessment produces a report; the market toggle switches GBP and NGN; the contact form validates and, with no adapter configured, says plainly that nothing was saved; a business demo request reaches a mock webhook with the secret header and payload; honeypot submissions are not delivered; the site is noindex by default; no tracker loads without configuration and consent.

## Defects found and fixed in this round
Horizontal overflow on the exercise page at 390px; scrollable tables not keyboard reachable (axe); OG image path wrong (`/brand/og/` vs `/brand/social/`); manifest used old colours; `/about` and `/contact` titles duplicated the brand name; no `.env.example`; three npm scripts pointed at files that did not exist; the real-estate page implied experience from "practice sessions" (reworded). See `DESIGN-REVIEW.md` for visual defects.

## Not tested (do not read this report as covering these)
Real devices; Safari and Firefox; screen readers (VoiceOver, NVDA, TalkBack) and disabled users; slow or lossy networks (the page is light by design but was not throttled); a real deployed environment; a real lead adapter (only a local mock webhook); Resend delivery; analytics with a real provider; load or abuse testing (the rate limiter is in-memory and best-effort); legal correctness of any page; print stylesheets beyond a spot check.

## Known open items
1. No email platform or unsubscribe flow exists, although forms say you can unsubscribe. Launch is blocked until one is connected.
2. Some page titles exceed 60 characters and some descriptions 160; shorter versions are proposed in `docs/website/SEO-METADATA-CHECKLIST.md`.
3. `NEXT_PUBLIC_LEGAL_ADDRESS` and `NEXT_PUBLIC_COMPANY_NUMBER` are read but no page displays them yet.
4. The `?topic=business` contact link parameter is not read.
5. Photographer names for the stock images could not be retrieved; see `docs/website/IMAGE-CREDITS.md`.
