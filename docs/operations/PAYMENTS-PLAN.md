# Payments plan (planned, nothing is connected)

Status: no payment provider, real sign-in or database is connected. The "Paid (demo)" toggle in the dashboard is a browser-only preview. All provider details below must be verified against current provider terms, fees and country support before use.

## What has to exist first
1. **Real sign-in** (Google, LinkedIn, Apple, plus email) through an auth service. Replaces the demo session in `src/lib/session.ts`.
2. **A database** holding users, organisations and an *entitlement* per user ("builder_full", "learning_monthly", seats for a business). The site checks entitlement, never the browser.
3. **A payment provider that tells the server when money arrives** (webhook), which then writes the entitlement.

## Individuals (UK and Nigeria)
- **GBP (UK):** Stripe Checkout (hosted page) for the one-off Business Builder (£99), Stripe Billing subscriptions for monthly (£19 builder, £15 learning), a one-off price per workshop (£20), and a three-month recurring price (£45). Cards, Apple Pay and Google Pay come with Checkout.
- **NGN (Nigeria):** Paystack or Flutterwave (cards, bank transfer, USSD) with their recurring-charge features. Prices in the pricing data are proposed and set separately.
- **Alternative:** a merchant of record (Paddle, Lemon Squeezy, Polar) that handles VAT/sales tax and invoices for you, at a higher fee. Check Nigeria support before choosing.

## Businesses (UK, Nigeria, USA)
- Pilot and annual plans: send an **invoice** (Stripe Invoicing, or bank transfer / Paystack invoice in Nigeria) after a demo call. Seats are set by hand at first.
- Self-serve Starter/Team seats can move to Stripe subscriptions with per-seat quantity once real accounts exist.
- Pilot (£250–£500) is credited against the annual contract: record it as a credit on the first invoice.

## Build order
1. Auth + database. 2. Stripe Checkout for GBP one-off, webhook sets entitlement, locked areas unlock. 3. Subscriptions and customer portal (cancel, change card). 4. Paystack for NGN. 5. Invoicing for businesses. 6. Receipts, refunds policy, VAT/tax setup.

## Prerequisites outside the code
Registered business and bank account, provider account verification, VAT position (UK threshold), refund and cancellation terms on the Terms page, privacy notice updated for payment processors, tax advice for Nigeria and US sales.
