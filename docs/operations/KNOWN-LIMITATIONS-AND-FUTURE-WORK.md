# Known limitations and future work

Version 0.1, 14 October 2026. A register of what is not connected, not built, needs review, is a known defect or gap, or is only an idea. The same items, one per row, are in `ROADMAP-REGISTER.csv` (columns: id, category, item, status, priority, dependency). Priorities: P0 = blocks public launch, P1 = needed soon after or for quality/safety, P2 = important, P3 = later, P4 = nice to have. Priorities are the author's proposals for the founder to change.

## Status vocabulary

- **Completed**: built in the repository.
- **Tested**: covered by an automated test or a recorded QA script run (see `QA-HOW-TO-RERUN.md`).
- **Prepared but unconnected**: code exists but needs an external account/credential/decision.
- **Deferred**: consciously not built yet.

## What is completed and tested (for contrast)

Site with 19 pages plus 404; lead API with validation, honeypot, rate limit, same-origin check, and honest 503 when no adapter is set; webhook adapter (tested against a mock with secret and attribution); consent-gated analytics wiring (tested: nothing loads without config and consent); noindex-by-default (tested); free exercise (tested end to end and persistence); assessment (unit and browser tested); pricing toggle; zero axe violations on 20 routes at 2 widths; link crawl clean; 18 browser tests passing. Recorded 14 October 2026 in `qa/*.json`.

Things that are only **prepared, not proven**: the Resend adapter (never run against the live API), the analytics provider integration (never run against a real account), and all external services.

## Not Connected

| ID | Item | Status | Priority | Dependency |
|---|---|---|---|---|
| NC-01 | Lead delivery: no webhook, Resend or CRM configured; forms return honest 503 'not_configured' | prepared, unconnected | P0 | Lead destination decision; webhook receiver or Resend account + domain |
| NC-02 | Analytics: no provider account or NEXT_PUBLIC_PLAUSIBLE_DOMAIN; no data ever collected | prepared, unconnected | P2 | Provider choice; domain |
| NC-03 | Deployment: no Vercel project, no live URL | not done | P0 | Vercel account; env vars |
| NC-04 | Domain: not purchased; DNS not configured | not done | P0 | Name decision; payment method |
| NC-05 | Email: no mailboxes or aliases (hello@, business@, privacy@) | not done | P0 | Domain; email provider |
| NC-06 | Email list platform: nobody is subscribed anywhere; no confirmation, welcome or unsubscribe flow | not built | P0 | Email platform decision; legal wording |
| NC-07 | Social accounts: none created; footer links hidden until env vars set | not done | P2 | Handle availability (unchecked) |
| NC-08 | Search Console / Bing: not set up | not done | P1 | Domain |
| NC-09 | Payment provider: none chosen (UK and Nigeria need separate research) | deferred | P3 | Paid-product validation |
| NC-10 | Monitoring/alerts for lead failures and uptime | not done | P1 | Deployment |

## Not Built

| ID | Item | Status | Priority | Dependency |
|---|---|---|---|---|
| NB-01 | Onboarding and knowledge platform (PRD only) | deferred | P3 | Discovery interviews; paid pilots |
| NB-02 | Guided projects (paid) and membership | deferred | P3 | Evidence gates in CONSUMER-ROADMAP |
| NB-03 | User accounts, saved progress across devices | deferred | P3 | Auth, DB, privacy review |
| NB-04 | Second and further free exercises | not built | P2 | Interviews showing a clear next task |
| NB-05 | Durable lead queue/retry if adapters fail | not built | P2 | Traffic volume |
| NB-06 | Double opt-in for list signup | not built | P1 | Email platform |
| NB-07 | Lead types business_enquiry and assessment_report are defined but no form submits them | not built | P3 | Product need |
| NB-08 | Analytics event purchase_completed has no trigger | not built | P4 | Payments |
| NB-09 | JSON-LD structured data | not built | P2 | Real entity and author details |
| NB-10 | Per-article OG images | not built | P4 | Design time |
| NB-11 | Nigeria-specific landing content and examples | not built | P2 | Nigeria research |
| NB-12 | CMS or non-code content editing | not built | P4 | Content volume |
| NB-13 | Cookie/consent preference reachable from every page footer (only on /cookies and banner) | not built | P3 | Legal advice |
| NB-14 | CI pipeline (no .github) | not built | P2 | Repository host settings |

## Needs Review

| ID | Item | Status | Priority | Dependency |
|---|---|---|---|---|
| NR-01 | Privacy notice (draft-0.1) not reviewed by a solicitor | needs review | P0 | Solicitor |
| NR-02 | Terms of use draft: governing law/liability missing | needs review | P0 | Solicitor |
| NR-03 | Cookies/storage wording and analytics consent approach | needs review | P1 | Solicitor; analytics choice |
| NR-04 | Accessibility statement claims; refers to a QA report file that does not exist | needs review | P1 | Developer + adviser |
| NR-05 | Trademark/name risk (UK market research 'fieldwork') | needs review | P0 | IP solicitor |
| NR-06 | Image credits: photographer names unknown; no model releases | needs review | P1 | Founder lookup |
| NR-07 | Unverified duration claims ('15 minutes', 'five-minute assessment') | needs review | P1 | User testing |
| NR-08 | Test prices on /pricing are hypotheses with no market evidence | needs review | P2 | Phase 2 pricing tests |
| NR-09 | Sales and marketing documents are templates; terms unreviewed | needs review | P2 | Solicitor |
| NR-10 | Font and stock licence confirmation | needs review | P2 | Founder / adviser |

## Defect

| ID | Item | Status | Priority | Dependency |
|---|---|---|---|---|
| DF-01 | OG/Twitter image path /brand/og/og-default.png does not exist (file is public/brand/social/og-default.png) | open | P0 | One-line fix in src/lib/metadata.ts |
| DF-02 | No .env.example although .gitignore and comments expect one | open | P1 | Developer |
| DF-03 | npm scripts docs:pdf, qa:links, kit:build point at files not found (checked 14 Oct) | open | P2 | Developer |
| DF-04 | manifest.ts colours (#6B1D2B, #F6F0E4) are not current palette | open | P2 | Developer |
| DF-05 | ?topic=business query on contact links is not read by the contact page | open | P3 | Developer |
| DF-06 | Source comments reference docs that do not exist under those names | open | P3 | Developer |
| DF-07 | sitemap lastModified for fixed pages is build time | open | P3 | Developer |
| DF-08 | Titles over ~60 chars and duplicated brand name (/about, /contact); descriptions over 160 | open | P2 | Founder decision on wording |
| DF-09 | NEXT_PUBLIC_LEGAL_ADDRESS and NEXT_PUBLIC_COMPANY_NUMBER are read into siteConfig but no page displays them (search of src) | open | P2 | Developer; legal advice on required disclosures |

## Performance/Accessibility

| ID | Item | Status | Priority | Dependency |
|---|---|---|---|---|
| PA-01 | No Lighthouse/Core Web Vitals measurement recorded | not done | P1 | Deployed preview |
| PA-02 | No manual screen-reader testing; no independent audit; no testing with disabled users | not done | P1 | Auditor / volunteers |
| PA-03 | axe covered initial page states only; later exercise steps and consent banner (analytics on) not scanned | known gap | P2 | Extend axe script with interaction |
| PA-04 | Browser tests run Chromium only; no Firefox/Safari; no real-device runs | known gap | P2 | Playwright projects; devices |
| PA-05 | Four font families loaded globally; not audited for payload | known gap | P2 | Lighthouse |
| PA-06 | Screenshots exist for 14 pages x 2 widths; missing terms, cookies, accessibility, 3 articles | known gap | P4 | Run shoot.mjs |
| PA-07 | Free exercise requires JavaScript | known limitation | P3 | Text alternative in Field Notes exists |
| PA-08 | Print of the workflow card prints the page, not only the card | known gap | P4 | Print stylesheet |
| PA-09 | Clay on stone fails contrast for small text; relies on convention to avoid it | known limitation | P3 | Design discipline |

## Security

| ID | Item | Status | Priority | Dependency |
|---|---|---|---|---|
| SE-01 | No Content-Security-Policy; HSTS unverified until deployment | open | P2 | Deployment |
| SE-02 | In-memory rate limiting only (weak on serverless) | open | P1 | Vercel Firewall rule |
| SE-03 | Same-origin check on API relies on headers; no CAPTCHA | accepted for now | P3 | Observe abuse |

## Idea

| ID | Item | Status | Priority | Dependency |
|---|---|---|---|---|
| ID-01 | Lead scoring from assessment answers in the CRM | idea | P4 | CRM |
| ID-02 | Public changelog and 'what's new' for honesty | idea | P4 | none |
| ID-03 | Exercise variants by market (UK vs Nigeria examples, naira prices in tasks) | idea | P3 | Nigeria research |
| ID-04 | Downloadable PDF version of the workflow card | idea | P4 | none |
| ID-05 | Short email course from Field Notes | idea | P3 | Email platform |
| ID-06 | Partner pages (e.g. universities, agencies' professional bodies) | idea | P4 | Relationships |
| ID-07 | Real estate pilot case study when permission exists | idea | P2 | A real pilot |
| ID-08 | Offline-friendly PWA behaviour for the exercise (manifest exists) | idea | P4 | Service worker work |
| ID-09 | A/B test of headline and CTA wording | idea | P4 | Traffic |
| ID-10 | Accessible text-only version toggle | idea | P4 | none |

## Notes on selected items

- **DF-01 (OG image path)**: `src/lib/metadata.ts` uses `/brand/og/og-default.png`. The existing build output contains the same wrong URL. Every social link preview would show no image. One-line fix.
- **NC-06 (email list)**: the forms say "I can unsubscribe at any time" but there is no list platform. Do not send any marketing email, and do not claim a list exists, until one is set up with unsubscribe handling and the consent wording is reviewed.
- **NR-04**: `src/app/accessibility/page.tsx` says "The full results are in the project's QA report", but `qa/` contains only JSON results and screenshots. Either publish a short QA summary or change the sentence.
- **PA-03**: the browser test exercises later exercise steps functionally, but axe is run only on initial page loads.
- **SE-01/SE-02**: security header set is minimal by design (see `TECHNICAL-ARCHITECTURE.md` section 7).
- **NB-07/NB-08**: reserved names in the code that nothing uses; harmless but do not document them as features.
- Market statements in other documents (competitor prices, SEO volumes, regulator procedures) are not verified; each is marked "verify" where it appears.
