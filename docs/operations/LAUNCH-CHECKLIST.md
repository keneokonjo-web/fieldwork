# Launch checklist

Version 0.1, 14 October 2026. Status values: `done` (verified in the repo/QA files), `open`, `blocked` (waiting on a decision/account), `n/a`. Owner column uses roles: Founder, Developer (whoever edits the repo), Adviser (solicitor/accountant), Designer. **Status reflects this repository on 14 October 2026; nothing external exists yet.** Evidence = file, URL or screenshot that proves the status; fill in as items complete.

## A. Pre-launch: decisions

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| A1 | Decide the name path: proceed with "Fieldwork" now or wait for trademark advice | Founder | open | |
| A2 | Choose legal structure and account ownership (company vs founder) | Founder + Adviser | open | |
| A3 | Choose primary domain | Founder | open | `DOMAIN-DNS-EMAIL-SOCIAL-SETUP.md` section 3 |
| A4 | Choose lead destination (webhook receiver/CRM/Resend) | Founder | open | |
| A5 | Choose analytics approach (on with consent, or off at launch) | Founder | open | |
| A6 | Choose email platform for the list (and unsubscribe handling) | Founder | open | |
| A7 | Decide launch scope: public site only, or also business outreach | Founder | open | |
| A8 | Decide launch audience order (UK, Nigeria, both) and channels | Founder | open | `docs/marketing/` |

## B. Pre-launch: product and content (repository)

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| B1 | All pages built and rendering | Developer | done | 19 pages + 404 in `qa/link-results.json` |
| B2 | `npm run check` passes (typecheck, lint, unit tests) | Developer | open (re-run before release; not re-run while writing this) | |
| B3 | Production build succeeds | Developer | done on 14 Oct (`.next` exists); re-run | |
| B4 | Browser tests 18/18 | Developer | done | `qa/browser-results.json` |
| B5 | axe: zero violations | Developer | done | `qa/axe-results.json` |
| B6 | Link crawl clean | Developer | done | `qa/link-results.json` |
| B7 | Fix OG image path (`/brand/og/...` vs `/brand/social/...`) | Developer | open | `metadata.ts` |
| B8 | Create `.env.example` with all variables | Developer | open | |
| B9 | Fix broken npm scripts (`docs:pdf`, `qa:links`, `kit:build`) | Developer | open | |
| B10 | Update `manifest.ts` colours to current palette | Developer | open | |
| B11 | Review titles/descriptions (long titles, duplicate brand) | Developer + Founder | open | `SEO-METADATA-CHECKLIST.md` |
| B12 | Add JSON-LD (Organization, WebSite, Article) once details real | Developer | blocked | |
| B13 | Copy read-through of all pages by a human (typos, claims, tone) | Founder | open | |
| B14 | Verify every claim: durations ("15 minutes"), "no account", "works with free tools" | Founder | open | |
| B15 | Photographer credits filled; confirm Unsplash ids still licensed | Founder / Designer | open | `docs/website/IMAGE-CREDITS.md` |
| B16 | Fix the accessibility statement reference to a QA report that does not exist | Developer | open | `src/app/accessibility/page.tsx` |
| B17 | Consider CSP header; confirm HSTS after deploy | Developer | open | |
| B18 | Time the free exercise with 3 to 5 real people (UK and Nigeria) | Founder | open | notes |
| B19 | Test on mid-range Android and iPhone | Founder / Developer | open | |

## C. Pre-launch: accounts and infrastructure (all blocked on decisions/money)

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| C1 | Password manager set up | Founder | open | |
| C2 | Company formed (if going ahead) | Founder + Adviser | open | certificate |
| C3 | Domain bought, locked, auto-renew, 2FA | Founder | blocked | registrar receipt |
| C4 | Vercel project created from repo | Developer | open | |
| C5 | Env vars set (Preview vs Production) | Developer | blocked | |
| C6 | Domain added; apex/www redirect; TLS valid | Developer | blocked | |
| C7 | Mailboxes/aliases: hello@, business@, privacy@ | Founder | blocked | |
| C8 | SPF, DKIM, DMARC pass on test emails | Developer | blocked | |
| C9 | Lead adapter connected; each form type tested end to end | Developer | blocked | test records |
| C10 | Webhook receiver verifies secret; alerts on failure | Developer | blocked | |
| C11 | Firewall rate limit on `/api/lead` | Developer | blocked | |
| C12 | Uptime monitor and error visibility | Developer | blocked | |
| C13 | Analytics account/domain; consent tested on a preview | Developer | blocked | |
| C14 | Search Console + Bing verified; sitemap ready | Developer | blocked | |
| C15 | Social accounts created, bios, links | Founder | blocked | |
| C16 | Email platform + unsubscribe + confirmation flow | Founder | blocked | |
| C17 | Backup of important config/credentials recorded securely | Founder | blocked | |

## D. Pre-launch: legal and compliance (see `LEGAL-REVIEW-LIST.md`)

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| D1 | Privacy notice reviewed; processors named; retention confirmed | Adviser | blocked | |
| D2 | Terms reviewed; governing law added | Adviser | blocked | |
| D3 | Cookies/storage wording confirmed; analytics consent approach confirmed | Adviser | blocked | |
| D4 | ICO registration decision/fee (UK) | Founder + Adviser | blocked | |
| D5 | NDPC position (Nigeria) | Adviser | blocked | |
| D6 | Entity name/address/number env vars set after the above | Developer | blocked | |
| D7 | `NEXT_PUBLIC_LEGAL_LAST_REVIEWED` set only after real review | Developer | blocked | |
| D8 | Marketing consent wording (PECR) approved | Adviser | blocked | |
| D9 | Trademark advice received (or conscious risk acceptance recorded) | Founder | open | |
| D10 | Remove "(draft)" from legal page titles once reviewed | Developer | blocked | |

## E. Launch day

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| E1 | Production deployment promoted; note deployment URL for rollback | Developer | open | |
| E2 | Smoke test: all pages, mobile menu, exercise, pricing toggle, each form, 404 | Developer | open | |
| E3 | Send a real test lead; confirm arrival with attribution and consent fields | Developer | open | |
| E4 | `view-source`: robots/canonical correct for the stage (index only if intended) | Developer | open | |
| E5 | Set `NEXT_PUBLIC_ALLOW_INDEXING=true`; redeploy; re-verify | Developer | open | |
| E6 | Submit sitemap | Developer | open | |
| E7 | Link preview test (OG image) on LinkedIn/WhatsApp/X | Developer | open | |
| E8 | Publish first social posts (per `docs/marketing/CONTENT-CALENDAR-30-DAY.md`) with tagged links | Founder | open | |
| E9 | Monitor lead inbox/receiver for 24 hours | Founder | open | |
| E10 | Confirm no analytics requests before consent (network panel) | Developer | open | |

## F. First week

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| F1 | Daily: check leads, errors, form failures | Founder | open | |
| F2 | Respond to every enquiry within a stated target (decide: e.g. one working day) | Founder | open | |
| F3 | Review Search Console coverage and any crawl errors | Developer | open | |
| F4 | Record first numbers: visits, exercise starts/completions (consented only), signups | Founder | open | `FUNNEL-AND-METRICS.md` |
| F5 | 5 conversations with people who completed the exercise | Founder | open | notes |
| F6 | Fix top three usability issues found | Developer | open | |
| F7 | DMARC reports reviewed; plan to tighten | Developer | open | |
| F8 | Weekly review (`docs/marketing/WEEKLY-REVIEW-TEMPLATE.csv`) | Founder | open | |
| F9 | Decide next Field Note topics from questions received | Founder | open | |
| F10 | Record rollback test result (promote previous deployment in preview) | Developer | open | |

## G. Stop conditions (do not launch publicly if any is true)

1. The lead path is not connected and tested (visitors would lose their details; today the forms honestly say "Not connected yet", which is acceptable only for a pre-launch preview).
2. No monitored privacy and general contact address.
3. Legal pages still say nothing about who operates the site and no adviser has been consulted.
4. The OG image or other broken assets not fixed.
5. Anything on the site claims clients, results or products that do not exist.
