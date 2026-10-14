# Consumer pricing assumptions

Version 0.1, 14 October 2026. **Everything here is a hypothesis.** Nothing is on sale. Payments are not connected. This file must stay consistent with `src/content/pricing.ts`; if the two disagree, `pricing.ts` is the public statement and this file must be updated.

## 1. Current test prices (copied from `src/content/pricing.ts`)

| Tier | Status | UK (GBP) | Nigeria (NGN) |
|---|---|---|---|
| Free exercise | Available | Free | Free |
| Guided project | Planned, not on sale | £14 one-off | ₦7,500 one-off |
| Membership | Planned, under consideration | £9 a month | ₦4,500 a month |

Per the code: NGN values are **not converted** from GBP; UK and Nigeria are separate pricing contexts. Membership "will only be offered once the cancellation and support process is ready."

These are the only prices to show publicly. The ranges below are for **testing** (interviews, surveys), not for display.

## 2. Reasoning (and its limits)

### Purchasing power (ASSUMPTIONS, not data)

- **UK.** Work-related learning is often bought from personal or employer budgets. A one-off project at £14 sits near the price of a single paperback/book or a lunch (ASSUMPTION; not measured). Price tolerance for a clearly useful, finished output is plausibly higher than for a generic course (hypothesis).
- **Nigeria.** Many people have limited foreign currency, card access may be restricted for some, and the naira has been volatile against the pound and dollar (verify current rates and trends; do not quote rates in marketing). Pricing in naira with local payment methods matters more than a "converted" number. The ₦7,500 test price was set on its own and has not been validated against local wages or tool costs. Do not state what it "is worth" in pounds in public copy.
- **Both.** The product runs on free AI tools, so the buyer pays for structure, checking guidance and a finished output, not for tool access. Hypothesis: the value is highest for people who have a specific task and little time.

### Why one-off before subscription

A one-off project has a clear promise (finish this thing), is easier to test, and avoids cancellation/support obligations. A subscription is justified only if there are enough projects and workflows to be worth recurring payment. Until then it remains "under consideration".

### Hypotheses to test

| ID | Hypothesis | How to test | Pass if (placeholder) |
|---|---|---|---|
| P1 | People who finished the exercise would pay £14 / ₦7,500 for a guided project on a task they care about | Interviews + fake door | At least some say yes without prompting on price; fake door click-through 3% to 10% of the warm list |
| P2 | UK and Nigerian price points should differ in structure, not just in currency | Interviews in each market | Clear differences in stated range or payment preference |
| P3 | The most valued project is one of: business plan, document or deck, simple website | Poll + interviews | One cluster named by ≥10 of 20 interviewees |
| P4 | A subscription is premature | Ask who would pay monthly for an unspecified library | Few commit; "I'd buy a project, not a subscription" is common |
| P5 | Payment methods matter more than the price in Nigeria | Interview question: "what do you usually use to pay online?" | Majority name a local method |

## 3. Tests to run before pricing is final

### 3.1 Willingness-to-pay interviews (target 15 to 20, split UK and Nigeria; target, not guaranteed)

Recruit from people who completed the exercise, replied to emails, or answered a question sticker. Do not pay for interviews with products; thank people. Obtain consent to take notes.

Script (30 minutes max; do not pitch):
1. Tell me about the last time you used AI for something you needed to finish. What happened?
2. What did you try to check, if anything?
3. What did you spend (money or time) trying to learn this?
4. If a guided project helped you finish [task], what would you expect it to include?
5. Without prices in mind: what would be a fair price? (Record the number without reacting.)
6. At £14 / ₦7,500, would that feel cheap, fair, expensive, too expensive? (Van Westendorp style questions; use four standard questions; verify method.)
7. How would you prefer to pay? What stops you paying online?
8. What would make you ask for a refund?
9. Who else would you tell?

Log in a spreadsheet: segment, task, range stated, payment method, objection. Do not paste transcripts into AI tools without removing names.

### 3.2 Fake-door test (honest version)

A fake door tests interest in a product that does not exist. Done dishonestly it is deceptive. Rules:
- The page says clearly: **"Planned. Not on sale yet. Nothing will be charged."**
- The button says "Tell me when it's ready", not "Buy".
- Show the planned price as "planned test price" and keep it consistent with `pricing.ts`.
- Do not collect payment details.
- Follow up with an email saying the product isn't ready and what you learned.
- Track `pricing_viewed` and button clicks.

Variant test (optional, only with a large enough audience): show UK visitors either £14 or £12 as a planned test price to see click differences. Do not run price variants on the public pricing page if it confuses; use separate landing pages. Sample sizes needed to detect differences are large; with a few hundred visitors, expect noise.

### 3.3 Survey on the early-access list (3 to 5 questions)

Which project first? Which price feels fair? Preferred payment method? Not a decision on its own.

### 3.4 Pre-order or paid pilot

Not recommended until payments, terms and refund policy exist. If you later take a paid pilot, sell something that exists.

## 4. Payment provider options (verify availability, fees, terms, settlement before choosing)

| Provider | Likely fit | Notes (all to verify before use) |
|---|---|---|
| **Stripe** | UK cards, wallets, subscriptions | Check UK business requirements, fees, whether Stripe supports your entity and Nigerian customers, payout currency |
| **Paystack** | Nigerian cards, bank transfer, USSD | Check onboarding, fees, settlement in NGN, whether available for your entity, UK customers |
| **Flutterwave** | Nigeria and wider Africa; multiple local methods | Check fees, settlement, availability, dispute handling |
| Others to compare | Lemon Squeezy / Paddle (merchant-of-record models), PayPal | Merchant-of-record tools may simplify VAT/tax; check country coverage and fees |

Questions to answer for each: Which legal entity can sign up? Which currencies can you charge and settle? What are the fees (percent and fixed) in each market? Are local methods (bank transfer, USSD) supported? Payout delay? Chargeback/dispute rules? Support for subscriptions and cancellations? VAT/sales tax handling? KYC time? Refund API? Minimum amounts?

Two currencies likely means two providers or a provider that supports both. Decide after interviews, not before.

## 5. Refund policy considerations

- UK consumers have statutory rights for distance sales and digital content, including cancellation periods and rules about waiving them (verify before use; take professional advice).
- Nigerian consumer protection law applies to Nigerian buyers (verify before use).
- A simple, humane policy builds trust: e.g. "If a guided project does not help you finish the task, ask within [N] days and we will refund" (N is a placeholder; do not publish until agreed and legally checked).
- Define what counts as used; define how refunds are paid back (card, bank transfer) for each provider.
- Subscriptions: easy cancellation, clear renewal reminder, no dark patterns. The code comment already says membership waits for cancellation and support processes.
- Do not promise outcomes (grades, income, jobs). Promise a finished output and a method.

## 6. What must be true before launching any paid offer

1. A real product exists: at least one guided project finished, tested by several people, with a checking guide (not a mock-up).
2. At least some of the target buyers said, in interviews, they would pay, and the price band holds in each market.
3. Payments are connected and tested end to end in GBP and NGN, with `purchase_completed` firing only on real purchases.
4. Terms of use, privacy notice, cookie notice and refund policy are updated and legally checked.
5. Business details (entity name, address, number) filled in `src/config/site.ts` environment variables.
6. Support route (named person, response time) and a way to deliver and update the product.
7. Email tool configured with consent and unsubscribe; receipts and access emails tested.
8. Tax position understood (VAT registration thresholds in the UK; Nigerian tax obligations; verify before use with an accountant).
9. Accessibility checked on purchase flow (see `/accessibility`).
10. The pricing page is updated: status changes from "planned" only when true.
11. Marketing copy reviewed to remove any claim that cannot be supported.

## 7. Decisions log (founder to complete)

| Decision | Options | Owner | Date | Evidence |
|---|---|---|---|---|
| Keep £14 / ₦7,500 | Keep, lower, raise | | | |
| Membership at all? | Yes, later, no | | | |
| Payment provider(s) | | | | |
| Refund window | | | | |
| Launch project 1 | | | | |

## 8. Assumptions the founder must confirm

1. The price points (£14, ₦7,500, £9, ₦4,500) are test values. Confirm no one has treated them as final.
2. Whether guided projects will be delivered as web pages, PDFs or both.
3. Which legal entity will take payments, and in which country.
4. Whether to run interviews through the founder's personal contacts first.
