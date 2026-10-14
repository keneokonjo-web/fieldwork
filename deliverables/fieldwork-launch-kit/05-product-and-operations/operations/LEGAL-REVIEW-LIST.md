# Legal and professional review list

Version 0.1, 14 October 2026. **This is a list of questions for a solicitor, accountant or other qualified adviser. It is not legal, tax or financial advice, and it does not say what the law requires.** Statutory references appear only to help an adviser find the topic; every one is marked **verify**. Nothing here has been reviewed by a professional. The draft legal pages on the site say so.

How to use it: give this list plus the live site (or the `src/app/{privacy,terms,cookies,accessibility}/page.tsx` text), `CRM-FIELD-DEFINITIONS.md`, `ATTRIBUTION-GUIDE.md` and `ANALYTICS-EVENT-SPEC.md` to the adviser. Record the answer, date and adviser in the right-hand column. Priority: A = before any public launch; B = before collecting money or running business pilots; C = before scaling.

## 1. Business set-up and status (accountant / solicitor)

| # | Question | Prio | Answer / date / adviser |
|---|---|---|---|
| 1.1 | Which structure suits the plan: sole trader, UK limited company, Nigerian company (CAC), both, or a UK company with Nigerian presence later? Consequences for liability, tax, banking and IP ownership? | A | |
| 1.2 | Company name availability and conflicts (Companies House; CAC in Nigeria **verify**) given the common word "Fieldwork" | A | |
| 1.3 | Founder IP: is everything created so far (brand, code, content) owned by the founder or by whom? Assignment into the company; contributor/contractor agreements; licences of generated content | A | |
| 1.4 | Registered office address and director details that will become public; whether a registered-office service is advisable | A | |
| 1.5 | Where is the business "established" for UK and Nigerian law purposes, and what follows for data protection, consumer law and tax? | B | |
| 1.6 | Professional indemnity / public liability / cyber insurance for training and advice-adjacent services | B | |
| 1.7 | Business bank account and payment-provider onboarding requirements (UK; Nigeria) | B | |

## 2. Trade marks and name (IP solicitor / trade mark attorney)

| # | Question | Prio |
|---|---|---|
| 2.1 | Clearance search and opinion for "Fieldwork" in classes 41, 35, 9/42 in the UK and Nigeria; known users in UK market research (see `DOMAIN-DNS-EMAIL-SOCIAL-SETUP.md` section 2) | A |
| 2.2 | Registrability of the word mark vs logo mark; recommended filings and timing | A |
| 2.3 | Risk of using "Fieldwork" in ads and search against market-research competitors | B |
| 2.4 | "Field Notes" (a common phrase, and a well-known notebook brand exists: **verify**) and "Fieldwork Onboard" | B |
| 2.5 | Use of third-party tool names (ChatGPT, Claude, Gemini etc.) in articles and ads: nominative use, disclaimers | A |

## 3. Privacy notice and data protection

Drafted at `src/app/privacy/page.tsx` (version `draft-0.1`).

| # | Question | Prio |
|---|---|---|
| 3.1 | **UK GDPR / Data Protection Act 2018** (**verify**): is the notice complete (identity, purposes, lawful bases, recipients, transfers, retention, rights, ICO complaint, automated decisions, source of data)? Are the stated bases right: contract steps/legitimate interests for enquiries; consent for marketing emails; consent for analytics? | A |
| 3.2 | **Nigeria Data Protection Act 2023** (NDPA) and any NDPC regulations/directives (**verify** current instruments): same completeness test; controller registration thresholds; cross-border transfer rules; data protection officer; compliance audit filings; whether the site "targets" Nigerian residents so the NDPA applies in addition to UK law | A |
| 3.3 | Is a Nigeria-specific section/notice needed, or one combined notice? | A |
| 3.4 | Named processors: Vercel (hosting), the lead destination (webhook receiver/CRM), Resend, analytics provider, email platform. Needs data processing agreements and a transfer mechanism (UK IDTA/addendum, Nigerian equivalent). Which are controller-to-processor vs controller-to-controller? | A |
| 3.5 | Retention: proposed 24 months after last contact for enquiries; list until unsubscribe; consent records while contact held. Appropriate? | A |
| 3.6 | Contact addresses for data-subject requests (`privacy@`); response processes and deadlines; who handles them | A |
| 3.7 | "This site is not aimed at children under 16" (UK digital age of consent is 13: **verify**; Nigeria **verify**). Is "16" a sensible position? Do the free exercise and email forms need age gating? | B |
| 3.8 | The free exercise stores entries only in the visitor's browser. Is any disclosure beyond what is on the page needed? Visitors paste content into third-party AI tools: what warnings, if any, should the site give? | A |
| 3.9 | Attribution storage (`fw-attribution` in sessionStorage; sent on submit) and consent/ePrivacy treatment: is it "strictly necessary" or does it need consent? | A |
| 3.10 | Does the lead-record design (consent timestamp, notice version, wording kept elsewhere) amount to adequate evidence of consent? | A |
| 3.11 | Records of processing, DPIA triggers (e.g. the future onboarding platform and assistant) | B/C |
| 3.12 | Breach notification process and thresholds (UK: ICO within 72 hours **verify**; Nigeria **verify**) | B |
| 3.13 | Using personal data from forms to send marketing, and for the CRM: lawful basis per field | A |
| 3.14 | AI-specific: if Fieldwork later runs an assistant over customer content, controller/processor roles and transparency duties | C |

## 4. Registrations

| # | Question | Prio |
|---|---|---|
| 4.1 | **ICO (UK)**: is registration and payment of the data protection fee required for this entity and its activities (**verify** exemptions and fee tiers)? When? | A |
| 4.2 | **Nigeria (NDPC)**: registration as a data controller/processor of major importance, annual compliance filings, fees and deadlines (**verify**) | A/B |
| 4.3 | VAT registration thresholds and voluntary registration (UK); Nigerian VAT/other taxes on digital services (**verify**) | B |
| 4.4 | Any education/training regulation (UK: not applying for accreditation; Nigeria: any requirement to register as a training provider?) | B |

## 5. Terms of use and commercial terms

Drafted at `src/app/terms/page.tsx` (information only; no paid products).

| # | Question | Prio |
|---|---|---|
| 5.1 | Review the draft terms; add governing law, jurisdiction, limitation of liability (consumer vs business), operator identity | A |
| 5.2 | "Information, not advice" disclaimer: adequate? Specific for real estate content that mentions regulation, data protection, misleading descriptions? | A |
| 5.3 | Ownership of user-created workflow cards; licence to our guides; acceptable use | B |
| 5.4 | Terms for paid guided projects and membership when they exist: contract formation, delivery of digital content, refunds | B |
| 5.5 | Business engagement terms: standard terms, pilot proposal and statement-of-work templates in `docs/sales/` (confirm they are suitable; they are templates and unreviewed) | B |
| 5.6 | Business terms: confidentiality, data handling during training (staff must not paste client data), liability caps, IP in tailored material, subcontractors | B |

## 6. Consumer rights (before selling anything)

| # | Question | Prio |
|---|---|---|
| 6.1 | **UK**: Consumer Rights Act 2015 and Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 **verify** for digital content: pre-contract information, 14-day cancellation and the waiver when delivery starts immediately, refund policy wording | B |
| 6.2 | Subscriptions (membership): renewal reminders, easy cancellation, any current UK subscription-contract rules (**verify** status and dates of reforms) | B |
| 6.3 | **Nigeria**: consumer protection law (FCCPA 2018 **verify**) applicability to online digital content; pricing and refund obligations | B |
| 6.4 | Price display: VAT-inclusive for consumers; naira pricing and currency statements | B |
| 6.5 | Test prices on `/pricing` are labelled "Planned test price. Not on sale." Is that sufficiently clear and safe from "advertising" or "invitation to treat" problems? | A |

## 7. Marketing, claims and advertising

| # | Question | Prio |
|---|---|---|
| 7.1 | **PECR (UK)** (**verify**): email marketing rules for individuals vs corporate subscribers; soft opt-in; unsubscribe; sender identification. Applicability of Nigerian rules for unsolicited marketing messages (**verify**) | A |
| 7.2 | Wording of the signup checkbox ("Email me new exercises and Field Notes. I can unsubscribe at any time.") and optional "occasional practical updates" box: adequate consent? Double opt-in recommended? | A |
| 7.3 | ASA/CAP Code (UK) and Nigeria's advertising regulator (ARCON **verify**) rules for claims about learning outcomes, speed, "free", testimonials, influencer disclosure | B |
| 7.4 | Claims on the site that need substantiation: "about 15 minutes", "five-minute assessment", "mostly self-serve", "Works with free AI tools", "No account needed" | A |
| 7.5 | No testimonials/case studies exist; rules and consent when they do. Use of client names, results | B |
| 7.6 | Social posts and video scripts in `docs/marketing/` : disclaimers, AI-generated content disclosure, music/image rights | B |
| 7.7 | Comparison content ("choosing a tool") and independence statement ("No tool vendor writes our advice"): risk if affiliate or referral arrangements are added | B |
| 7.8 | Business outreach (cold emails/LinkedIn messages to agencies): legality under PECR, GDPR legitimate interest, and Nigerian equivalents | B |

## 8. Cookies and similar technologies (UK/Nigeria)

| # | Question | Prio |
|---|---|---|
| 8.1 | The site states it sets no cookies of its own and uses local/session storage. Confirm characterisation and notice duties under PECR (**verify**) | A |
| 8.2 | Analytics (Plausible-style, consent-gated): is consent actually required for the chosen configuration? Does the banner wording and equal prominence of "Allow analytics" / "No thanks" suffice? | A |
| 8.3 | Cookies page content vs the provider's real behaviour once chosen | A |
| 8.4 | Embedded third-party content (none today; videos/social embeds later) | C |

## 9. Accessibility

| # | Question | Prio |
|---|---|---|
| 9.1 | Is an accessibility statement legally required for this organisation (UK Equality Act 2010 duties; public-sector regulations do not apply: **verify**)? Is the wording ("We aim to meet WCAG 2.2 level AA", "not independently audited") appropriate? | B |
| 9.2 | The statement says "The full results are in the project's QA report". No QA report file exists in `qa/` (only JSON results and screenshots). Fix the sentence or publish the report | A |
| 9.3 | Commission an independent audit and user testing with disabled users before making stronger claims | B/C |

## 10. Images, content and third-party rights

| # | Question | Prio |
|---|---|---|
| 10.1 | Stock photographs: Unsplash Licence reliance; photographer names unrecorded (`docs/website/IMAGE-CREDITS.md`); identifiable people without model releases; restrictions on implying endorsement; use in ads and on merchandise | A |
| 10.2 | Fonts: licences of Cormorant Garamond, Hanken Grotesk, Geist Mono, Schibsted Grotesk (all via `@fontsource`; SIL OFL assumed: **verify** each) | B |
| 10.3 | Generated artwork and logo: ownership (created with tooling), any third-party inspiration; reference sites captured for research in `deliverables/` contain third-party screenshots that should not be published or redistributed | A |
| 10.4 | Trade mark of any AI tool logos if shown | A |
| 10.5 | Field Notes: no copied text; statement of how each note was produced (`basis` field) is truthful | A |
| 10.6 | Real-estate content mentions regulation generally; confirm no misleading or regulatory-sensitive statements (e.g. about property descriptions, fair housing/discrimination, anti-money-laundering) | A |

## 11. Business services (real estate training)

| # | Question | Prio |
|---|---|---|
| 11.1 | Is any statement in business pages regulated advice? ("AI drafts. People decide." intends not to give legal advice) | A |
| 11.2 | Handling client data in training sessions and pilots: DPA with the agency, no real client data in sessions | B |
| 11.3 | Pilot proposal terms: fees, success criteria, termination, liability | B |
| 11.4 | Nigeria: anything specific to real estate professional bodies or regulation we should avoid contradicting | B |

## 12. Tax and accounting (accountant)

| # | Question | Prio |
|---|---|---|
| 12.1 | UK corporation tax / self-assessment set-up; accounting software; bookkeeping | B |
| 12.2 | VAT on digital services to UK and to Nigerian customers; place of supply; thresholds (**verify**) | B |
| 12.3 | Currency handling (GBP and NGN), payment-provider fees, FX, reconciliation | B |
| 12.4 | Nigerian tax presence if selling to Nigerian customers; withholding tax on cross-border payments (**verify**) | B |
| 12.5 | Invoicing details required (UK; Nigeria) | B |
| 12.6 | Pricing assumptions in `docs/marketing/CONSUMER-PRICING-ASSUMPTIONS.md` and `docs/sales/SALES-PRICING-ASSUMPTIONS.md` as hypotheses only | C |

## 13. Future onboarding platform (before any build with real data)

See `docs/product/PRD-ONBOARDING-PLATFORM.md` section 9: processor/controller roles, DPA, security standards, AI provider terms (no training on customer data), staff-monitoring transparency for agencies, data residency in Nigeria **verify**.

## 14. What the site currently says that a reviewer should check

- Footer and privacy page: "operated by [entity]" only if the env var is set; otherwise "not confirmed yet".
- `LegalReviewBox` on legal pages: "Draft: not yet legally reviewed".
- Privacy page "Lawful bases need confirming by a qualified adviser for each country where we operate."
- Terms: "Limitation wording, governing law and jurisdiction need to be added after legal review..."
- `NEXT_PUBLIC_LEGAL_LAST_REVIEWED` must be set only after a real review; setting it to flag the pages as reviewed would be misleading otherwise.
