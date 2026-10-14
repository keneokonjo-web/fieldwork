# Fieldwork launch foundation: final report

Branch `claude/exciting-maxwell-l5r45m` of `keneokonjo-web/fieldwork`. Packaged copy: `deliverables/fieldwork-launch-kit/` and `deliverables/fieldwork-launch-kit.zip`. Nothing has been deployed, bought, registered or sent.

## 1. Completed and tested in this environment
- **Identity (blended 65% Specimen Room, 35% The Brief):** logo system (lowercase wordmark, caps lockup, stacked, benchmark symbol, archived Brief wordmark; light, dark, indigo, one-colour; SVG and PNG), favicons and ICO, avatar, Open Graph image, field-art library, 8 templates (social, story, LinkedIn banner, slides, document cover, email signature), 7 graphic assets, brand guidelines (PDF and editable HTML), design tokens (CSS and doc). Tested: rendered and inspected; token test ties CSS to the palette; contrast ratios calculated.
- **Website:** 19 routes on Next.js 16, rebuilt on the blended identity with 29 licensed stock photographs shown in plates with museum labels. Free guided exercise, workflow assessment, GBP/NGN pricing toggle, Field Notes (4 articles), legal drafts, custom 404. Tested: typecheck, lint, 27 unit tests, production build, 18 browser behaviour tests, axe 0 violations, link crawl, overflow checks. Details: `qa/FINAL-QA-REPORT.md`.
- **Documents written:** brand strategy; design review; consumer marketing (strategy, 30-day calendar, video kit, social kit, 5 email sequences, pricing assumptions, funnel and metrics, workflow, trackers); corporate sales kit (capability statement, one-pager, discovery guide, demo script, pilot proposal and SOW templates, pricing assumptions, objections, outreach, follow-ups, marketing plan, partnership pack, CRM and pipeline templates, 14-slide deck as PPTX); product and operations (PRD for the future onboarding platform, sitemap, design brief, architecture, exercise spec, roadmap, SEO keyword map and checklist, analytics spec, deployment guide, domain/DNS/email/social guide, legal review list, launch checklist, repository guide, asset inventory, dependencies, limitations register, CRM definitions, attribution guide, QA re-run guide). PDFs built for the documents that get sent to people.

## 2. Prepared but not connected
Lead capture adapters (webhook, Resend, dev file) are coded and the webhook path is tested against a local mock; none is connected to a real destination, so live forms honestly report "not connected". Analytics is coded, consent-gated and off until a domain is configured. Indexing is off until a URL and a flag are set. Payments are not integrated. No email list platform exists.

## 3. Deferred or not possible from here
Deploying to Vercel (no authorisation); buying or configuring a domain or DNS; creating email, social, analytics or payment accounts; legal review of the privacy, terms and cookie pages; trademark clearance for "Fieldwork" (the word is common, with UK market-research users); photographer lookups for the stock images; testing on real devices, other browsers and screen readers; the onboarding platform (PRD only); real photography, real testimonials and case studies (none exist, and none are invented).

## 4. Assumptions and numbers to confirm
Every price, target and rate in the marketing and sales documents is a labelled hypothesis. Regulatory and market statements are marked "verify before use". The domain checks (14 October 2026) reported fieldworklearn.com, fieldworkhq.co.uk and several .study, .training and .org options available and the exact name unavailable; re-check at purchase. See `docs/operations/OUTSTANDING-DEPENDENCIES.md` for the founder decisions that unblock launch.

## 5. Honest caveats
The design is reviewed by the builder only. The deck is functional, not polished. Stock photography is category-appropriate rather than distinctive. The first design round was rejected and fully reset; the earlier concept 1 recommendation is withdrawn (see `01-brand/concepts/recommendation.md`).
