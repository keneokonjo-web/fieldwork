# Business pricing (current)

Set by the founder on 18 October 2026 for the GBP and NGN figures marked **set**. Figures marked **proposed** were filled in to keep the three markets consistent and need the founder's confirmation. Payments are not connected; nothing is on sale until a payment provider and terms are in place. The same data drives the website (`src/content/pricing.ts`, shown on `/pricing` and `/business/course`) and is covered by `tests/builder.test.ts`.

## Plans (per employee, per month)
| Plan | Who | UK (GBP) | Nigeria (NGN) | USA (USD) | Minimum spend |
|---|---|---|---|---|---|
| Starter pack | Any team size | £25 (set) | ₦30,000 (set) | $30 (proposed) | None |
| Team pack | 11 to 15 employees | £18 (set) | ₦22,000 (set) | $22 (proposed) | £200 a month (set); ₦242,000 and $250 (proposed) |
| Business bundle | 51 to 200 employees | £12 (set) | ₦14,500 (proposed) | $15 (proposed) | £500 a month (set); ₦600,000 and $650 (proposed) |
| Enterprise | 200 or more employees | Quoted | Quoted | Quoted | Quoted |

**Gap:** 16 to 50 employees is not covered by a plan. The site says it is quoted, priced between Team and Business, until the founder decides.

**Included**
- Starter: access to the relevant industry course; AI guided exercises and assessments; personal workflow library; basic completion tracking.
- Team: everything in Starter; manager dashboard and team progress reports; multiple learning paths; quarterly updates.
- Business bundle: everything in Team; department-specific learning paths; more detailed reporting; priority support; scheduled programme reviews.
- Enterprise: priced on employee number, security requirements, integrations, reporting and support commitments.

## Low-risk corporate pilot
30-day team pilot: one team of up to 10 employees, one training pathway, a closing progress report. **£250 to £500** (set); ₦300,000 to ₦600,000 and $300 to $650 (proposed). The fee can be credited towards an annual contract if the customer approves within an agreed period (period to be agreed).

## Optional premium add-ons
| Add-on | GBP (set) | NGN (proposed) | USD (proposed) |
|---|---|---|---|
| 60-minute group Q&A | £150 | ₦180,000 | $190 |
| 90-minute tailored workshop | £350 to £600 | ₦420,000 to ₦720,000 | $450 to $750 |
| Bespoke industry training module | £500 to £1,500 | ₦600,000 to ₦1,800,000 | $650 to $1,900 |
| Custom workflow implementation | Quoted separately | Quoted separately | Quoted separately |

## Individuals (for reference)
Free: the basic Build a business flow (the free exercise is not part of the pricing plans). Business Builder (full): £99 one-off or £19 a month (proposed). AI learning: £20 per workshop, £15 a month, £45 every three months. NGN equivalents are set separately in `src/content/pricing.ts`. None of this is on sale; see `docs/operations/PAYMENTS-PLAN.md`.

## Open decisions
USD figures; NGN figures marked proposed; the 16 to 50 employee range; the pilot credit period; whether pilot and plans are billed monthly or annually; refund terms; VAT treatment per market (verify with an accountant).
