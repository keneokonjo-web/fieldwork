# Consumer roadmap

Version 0.1, 14 October 2026. Covers Fieldwork for Individuals (UK and Nigeria). The business track is in `PRD-ONBOARDING-PLATFORM.md` and `docs/sales/`. Dates are not given: each phase starts when its gate passes. Prices shown on `/pricing` (`src/content/pricing.ts`) are **test hypotheses, not on sale**: guided project GBP 14 one-off / NGN 7,500 one-off; membership GBP 9 a month / NGN 4,500 a month. NGN is not converted from GBP. No evidence yet supports any price: **verify before use**.

## Where things stand

| Item | Status |
|---|---|
| Free exercise (5 starter tasks, 6 checks, workflow card) | Completed and Tested locally; not deployed |
| Individuals page, learn hub, 4 Field Notes | Completed locally |
| Email capture forms | Prepared but unconnected (return honest 503 until a lead adapter exists) |
| Analytics | Prepared but unconnected (no account, no domain configured) |
| Guided projects, membership, payments, accounts | Deferred; not built; no payment provider chosen |

## Phase 0: Go live and listen (needs: domain, deployment, lead adapter, legal review, analytics choice)
- Deploy; connect one lead destination; send a test lead end to end.
- Publish only what exists. Keep "Planned" labels.
- Start collecting: free-exercise starts and completions, email signups, copy events, source/medium via UTM.
- **Gate to Phase 1** (all hypotheses; set thresholds before looking at data):
  - at least a few hundred (number to decide) real visitors from at least two channels;
  - at least 20 people (decide) complete the exercise;
  - at least 10 qualitative conversations with people who completed it (what they used it for, did they reuse the card, what was missing);
  - the lead adapter has run for 2 weeks without a lost submission.

## Phase 1: Learn what people want (no paid product yet)
- Short interviews, UK and Nigeria separately. Test the prompts: do they come back? Do they reuse the workflow card?
- Add one or two further free exercises only if interviews point to a clear second task. Reuse the same step component (see FREE-EXERCISE-SPEC.md, V2 table).
- Field Notes: publish on a schedule the founder can keep (see `docs/website/SEO-KEYWORD-MAP.md`). Avoid volume for its own sake.
- Test messaging in organic channels; no paid ads until conversion from visit to completion is understood.
- **Gate to Phase 2**: a named, repeated pain that people say they would pay to solve; at least some who volunteer a price range; evidence the free exercise is used more than once by some.

## Phase 2: Smallest paid test
- Run a **manual** pre-sale or pilot before building delivery: one guided project written as a document and delivered by email/PDF, sold in small numbers to people from the email list, in one market first.
- Needs: payment provider decision (UK and Nigeria are separate; Nigerian card/bank-transfer reality to be researched, **verify** providers and fees), terms for digital content including consumer cancellation rights (solicitor), refund policy, support inbox, tax/VAT treatment (accountant), updated privacy notice.
- **Gate to Phase 3**: number of paying customers and refund/complaint rate agreed in advance; clear signal on price (try at least two price points across cohorts, not on the same page for the same person); customer feedback shows the project produced a usable output.

## Phase 3: Product build (only after Phase 2 passes)
- Guided project delivery (accounts or secure links), basic progress saving, receipts, email.
- Membership only if there are enough projects and workflows to justify it and the cancellation/support process exists (the pricing page already promises this).
- Accessibility and low-bandwidth testing on real mid-range Android devices in Nigeria.

## Phase 4: Scale or branch
- Community/cohorts, partnerships (universities, employers), localisation, learner certificates (if demand, with quality safeguards).
- Link to business: individuals who complete become internal champions in agencies; test this assumption.

## Evidence required before building paid products

| Question | Minimum evidence | How to get it |
|---|---|---|
| Do people finish the free exercise? | Completion rate by source, measured via events | Analytics after consent (note: opt-in will undercount) |
| Do they get value? | Self-report plus reuse (returning visits to the exercise, card downloads are not tracked) | Interviews, follow-up email question |
| Will they pay? | Real money from strangers, not friends | Phase 2 pre-sale |
| Is Nigeria viable at the test price? | Payment success, local willingness to pay | Separate test; do not assume naira price from pounds |
| Is the product defensible against free content? | Differentiation holds in interviews (task-first, checking, free-tool friendly) | Interviews |
| Is the name safe to build on? | Trademark advice received | Solicitor/IP attorney; see `docs/operations/DOMAIN-DNS-EMAIL-SOCIAL-SETUP.md` |

## Not now

Paid advertising; app; AI tutor; prompt marketplace; affiliate deals with AI tool vendors (conflicts with the independence promise); claims of results or outcomes; certificates; webinars as a core product.

## Risks specific to the consumer track

- One-person content production load.
- Free AI content is abundant; differentiation must be felt in the first five minutes.
- Search competition for generic terms; "Fieldwork" collides with the market-research term (SEO and trademark).
- Payment friction in Nigeria and currency volatility affecting NGN pricing.
- AI tool interfaces change quickly; exercises must stay tool-agnostic and dated.
