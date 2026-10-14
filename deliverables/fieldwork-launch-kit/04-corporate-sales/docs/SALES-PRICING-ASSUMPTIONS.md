# Sales pricing assumptions

Version 0.1, 14 October 2026. **Every figure here is an ASSUMPTION or hypothesis to test with real prospects. Nothing is a published price.** The website says business pilots are "scoped and priced after a conversation", and this document does not change that: it gives the founder a starting point for those conversations. UK (GBP) and Nigeria (NGN) are separate pricing contexts. NGN figures are not converted from GBP. Anything about local market conditions that cannot be verified is marked **verify before use**.

## 1. Principles

1. **Fixed fee, small and easy to stop.** A pilot is one fixed fee the owner can approve without a committee. Avoid day rates in front of clients.
2. **Price by team size and workflows, not by "AI".** Hours of preparation and support scale with the number of participants and workflows.
3. **Price from cost up, then test willingness to pay down.** Start with the delivery-hours model (section 5), then check against what real prospects say.
4. **We are new, so we are honest about it, but we do not under-price to apologise.** A very low price signals low value and attracts buyers who will not commit time. The discount (section 4) is a trade for feedback, not an apology.
5. **No promise of savings in the price conversation.** Never justify the fee by an ROI number. Offer to measure against the client's own baseline.
6. **Pricing is per market.** Test UK and Nigerian prices separately, in local currency, using local payment methods once a payment provider is set up (not yet).

## 2. Offers and hypotheses (all ASSUMPTIONS)

Offers match `src/content/pricing.ts` (practice session, tailored enablement, implementation support). Prices exclude tax. [Verify VAT position: UK VAT registration threshold and rules, and Nigerian VAT, before any invoice.]

### 2.1 Practice session (one workflow, up to about 12 people, one live or remote session plus workflow cards)

| | UK (GBP) | Nigeria (NGN) |
|---|---|---|
| Low test price | £650 | ₦300,000 |
| Mid test price | £900 | ₦450,000 |
| High test price | £1,200 | ₦650,000 |

### 2.2 Tailored enablement, 4-week pilot (matches the real estate page outline: Week 0 conversation, Week 1 rules and briefs, Weeks 2 to 3 practice, Week 4 review)

| Team size | Workflows | UK (GBP) | Nigeria (NGN) |
|---|---|---|---|
| 5 to 8 people | 2 | £2,800 | ₦1,300,000 |
| 9 to 15 people | 2 to 3 | £3,800 | ₦1,800,000 |
| 16 to 25 people (two cohorts) | 2 to 3 | £5,200 | ₦2,500,000 |

### 2.3 Implementation support (several teams or branches; written rules, owners, measures)

Scoped individually after a pilot. Starting hypothesis: from £8,000 / from ₦4,000,000 for up to three branches, plus a per-branch add-on. Do not quote this before a pilot has been delivered and reviewed.

### 2.4 Not for sale

The onboarding and knowledge platform. Do not price it, do not accept deposits and do not suggest it exists. If asked, "planned, not built, not for sale; I can add you to the list".

## 3. Reasoning behind the numbers

**UK.** Assumed internal value of founder delivery time: £50 an hour (a hypothesis for the cost of the founder's time, not a salary). Small estate and letting agencies often spend on training in the hundreds to low thousands of pounds for a team event [verify before use: no data gathered]. A pilot priced between £2,800 and £5,200 sits below the cost of hiring a junior admin for a month but is a real decision for a small owner, which should filter for commitment. Practice sessions at £650 to £1,200 are priced to be approved by an owner without sign-off.

**Nigeria.** Assumed internal value of delivery time: ₦15,000 an hour [assumption; verify before use against local rates for professional training and consulting]. NGN price points are set from the same delivery-hours model but tested independently because incomes, currency movement, and willingness to pay in naira differ. [Verify before use: current NGN exchange-rate volatility and inflation may mean quoted prices need review at each proposal; consider a validity of 14 days rather than 30.] Many Nigerian businesses may prefer a lower entry point: consider a smaller "practice session for up to 8 people" test at ₦200,000 as an additional hypothesis.

**Why these team-size bands.** The assessment (`src/lib/assessment.ts`) recommends one guided session for 1 to 5, a tailored package for 6 to 15, and a pilot group of 6 to 10 for larger teams. Bands follow that logic.

**Why not a monthly subscription.** There is no product to subscribe to yet. Service pricing is simpler and more honest.

## 4. Discount policy

| Situation | Discount | Condition |
|---|---|---|
| Founding partner (first 3 pilots) | Up to 25% | Written feedback, a review call, and (optional, separate) permission to describe the pilot, subject to the client's approval of the exact text. No discount if the client wants nothing public AND will not give feedback. |
| Referral from a pilot client | 10% | New client signs within 60 days. |
| Additional cohort inside 30 days | 15% on the extra cohort | Same terms. |
| Annual association or partner rate | Up to 10% | Only under a written partner agreement (PARTNERSHIP-PACK.md). |
| Conversion credit | Up to 100% of pilot fee credited against implementation support signed within 60 days | Optional test; confirm margin first. |

Rules:
1. **Never discount without getting something.** Feedback, a date, a signed SoW, a referral, permission.
2. **Margin floor.** Do not go below 30% margin on delivery hours (section 5) or below 15% on fully loaded hours.
3. **No free pilots.** If a client wants one, offer a paid practice session at the low test price instead. A free pilot attracts non-committal buyers.
4. **One discount at a time.** Do not stack.
5. **Record every discount** in the CRM deal record with the reason.
6. **Do not invent urgency.** No "price rises Friday" unless it is true.

## 5. Delivery-hours and margin model

### 5.1 Hours for a 9 to 15 person tailored pilot (ILLUSTRATIVE; estimates, not measurements)

| Activity | Hours |
|---|---|
| Week 0: conversation and assessment review | 3 |
| Week 1: draft AI-use rule and house briefs for 2 workflows | 8 |
| Build workflow cards (checklists, practice tasks, examples) | 6 |
| Kick-off session (1.5h) with prep (1.5h) | 3 |
| Weeks 2 to 3: support, check-ins, output review | 8 |
| Week 4: review session and written review note | 5 |
| Admin: contracting, invoicing, scheduling | 2 |
| Contingency (15%) | 5 |
| **Total delivery hours** | **about 40** (the worked table below uses 42 for a 9 to 15 person group) |

### 5.2 Illustrative worked table (ILLUSTRATIVE ONLY)

Assumptions: internal value of time £50 an hour; sales effort per won deal 20 hours (5 hours per qualified opportunity divided by an assumed 25% win rate); payment fees ignored; tax ignored.

| Offer / band | Price (GBP, assumed) | Delivery hours | Delivery cost at £50/h | Delivery margin | Sales hours per won deal | Fully loaded hours | Fully loaded cost | Fully loaded margin |
|---|---|---|---|---|---|---|---|---|
| Practice session (low) | £650 | 14 | £700 | -8% | 20 | 34 | £1,700 | not viable |
| Practice session (mid) | £900 | 14 | £700 | 22% | 20 | 34 | £1,700 | -89% |
| Practice session (high) | £1,200 | 14 | £700 | 42% | 20 | 34 | £1,700 | -42% |
| Pilot, 5 to 8 people | £2,800 | 36 | £1,800 | 36% | 20 | 56 | £2,800 | 0% |
| Pilot, 9 to 15 people | £3,800 | 42 | £2,100 | 45% | 20 | 62 | £3,100 | 18% |
| Pilot, 16 to 25 people | £5,200 | 60 | £3,000 | 42% | 20 | 80 | £4,000 | 23% |

**What the illustration says (if the assumptions hold):**
- Practice sessions only make sense as a stepping stone or via referral, where sales effort is far lower than 20 hours. At the low price they lose money.
- Sales effort dominates early economics. Reduce it with warm introductions, the assessment as a qualifier, and partners.
- The 9 to 15 band and above reach a positive fully loaded margin only if sales effort stays near 20 hours. Test it.
- Reuse lowers hours: after the first two pilots, workflow cards and rules templates should cut build time. Do not assume this until it is measured.

### 5.3 Break-even thinking (PLACEHOLDER)

Monthly target income [PLACEHOLDER]. If average fully loaded margin per 9 to 15 person pilot is [measured value], the number of pilots needed per month is target divided by that margin. Capacity check: 62 fully loaded hours per pilot means two pilots a month fills roughly 124 hours before other work. Do not plan more than two concurrent pilots as a solo founder. [Founder to confirm available hours per week.]

## 6. What to test (pricing experiments)

| # | Question | How | Decision rule |
|---|---|---|---|
| 1 | Does the owner recoil at the mid-band price? | Ask for reaction to a range in proposal conversations. Log verbatim. | If 3 of the first 5 qualified prospects say "too much", test a smaller scope, not a lower price. |
| 2 | Do prospects prefer practice session first or direct to pilot? | Offer both; record choice. | If over half choose the session, make it the standard entry. |
| 3 | UK vs Nigeria willingness to pay | Separate proposals in local currency. | Adjust NGN independently of GBP. |
| 4 | Does a founding-partner discount increase close rate? | Offer to alternating prospects. | Keep only if it raises closes without lowering the later price anchor. |
| 5 | Is 50% upfront accepted? | Record pushback. | If resisted, test 30/70. |
| 6 | Hours actually used per pilot | Log time in every pilot. | Replace section 5 estimates after pilot 1. |
| 7 | Does a conversion credit lead to implementation sales? | Track credited pilots. | Keep if conversion at least one in three. [Hypothesis threshold; adjust.] |

## 7. Quoting rules for the founder

1. Quote only after the scorecard is 14+ (DISCOVERY-CALL-GUIDE.md).
2. Always in local currency for the client's country; always as a fixed fee; always excluding tax; always labelled "proposal, valid 30 days (14 for NGN)".
3. Present one recommended option and one smaller alternative.
4. Put the scope and what is not included next to the price.
5. If asked "what is the ROI?", say: "I cannot promise one. We will measure time and quality against your baseline, and you decide with the numbers."
6. Review all prices after the first three pilots with actual hours and client feedback.

## 8. Payment and risk

- Payments by bank transfer or payment link once a provider is set up. [Not yet in place; do not promise card payment.]
- 50% on signing, 50% on delivery of the review note (hypothesis).
- Currency risk (Nigeria): invoice in NGN; do not quote USD-linked prices unless the client asks and the founder accepts the risk. [Verify before use.]
- Keep a simple cashflow sheet; do not buy tools on the assumption a pilot will pay.
