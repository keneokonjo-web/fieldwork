# CRM field definitions

Version 0.1, 14 October 2026. Derived from `src/lib/validation.ts` (input), `src/lib/leads.ts` (`LeadRecord`, `toRecord`) and `src/components/forms/LeadForm.tsx` (what each form actually sends). Source files refer to `docs/marketing/CRM-FIELDS.md`; this document is the current definition. No CRM exists yet; this is the schema a CRM, spreadsheet or automation should accept.

Related: the sales-side pipeline stages and CRM fields for business deals are in `docs/sales/CRM-FIELDS-AND-PIPELINE.md` and `docs/sales/CRM-TEMPLATE.csv`; keep the two aligned (this file defines what the website sends; that file defines what the sales process adds).

## 1. What is delivered

For every accepted submission the server builds one `LeadRecord` and sends it, as JSON, to each configured adapter:
- **Webhook**: `POST` with `content-type: application/json`; body is the `LeadRecord` (properties with undefined values are omitted by `JSON.stringify`); header `x-fieldwork-secret` if `LEAD_WEBHOOK_SECRET` is set.
- **Resend email**: a human-readable table with a subset of fields (type, email, name, company, role, market, teamSize, interest, message, context, utm source/medium/campaign, source page). It omits consent details, `utm_content`, `utm_term`, `referrer`, `landing_path` and `id`.
- **Dev file** (local only): one JSON line per lead.

Fieldwork stores nothing itself. If no adapter is configured the request is refused (503) and nothing is saved.

## 2. Record schema

| Field | Type | Always present? | Source / rule | Notes |
|---|---|---|---|---|
| `id` | string | yes | `base36(timestamp)-` + 6 random base36 characters | Not guaranteed unique forever; use as a reference, not a database key across systems |
| `receivedAt` | ISO 8601 string (UTC) | yes | Server clock | |
| `type` | enum | yes | `newsletter`, `business_enquiry`, `demo_request`, `assessment_report`, `contact` | Currently submitted types: `newsletter`, `demo_request`, `contact`. `business_enquiry` and `assessment_report` are defined but no form sends them |
| `email` | string | yes | Lowercased, trimmed, max 254, regex `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$` | Weak check (no MX/deliverability check) |
| `name` | string | no | Max 120. Required for `business_enquiry`, `demo_request`, `contact` | Not collected by the email-only form |
| `company` | string | no | Max 160. Required for business types | Collected only in the business variant |
| `role` | string | no | Max 120 | Business variant only; optional |
| `market` | `uk` / `nigeria` / `other` | no | Required for business types | Business variant only. The general contact form does not collect it. **Assessment answers' own market is inside `context`**, not here |
| `teamSize` | string | no | Max 40. Form values `1-5`, `6-15`, `16-50`, `50+` or empty ("Not sure yet") | Business variant only |
| `message` | string | no | Max 4000. Required (10+ characters) for business types and `contact` | Free text; may contain personal data |
| `interest` | string | no | Max 80. Set by the page: `home-footer`, `early-access-individuals`, `onboarding-platform-waitlist`, `free-exercise-complete`, `demo`, `question`, `assessment` | Use this to segment the list |
| `context` | string | no | Max 6000. For assessment follow-ups, the on-screen summary: level, market, team size, priority workflows, constraints, onboarding, owner | Self-reported, not verified |
| `consent.privacyNoticeVersion` | string | yes | `PRIVACY_NOTICE_VERSION` = `draft-0.1` | Bump with every privacy notice change |
| `consent.privacyAcknowledged` | `true` | yes | Required checkbox. For `newsletter` and `assessment_report` the checkbox text is "Email me new exercises and Field Notes. I can unsubscribe at any time." (so it doubles as the email consent); for others "I have read the privacy notice and agree to you using my details to reply..." | |
| `consent.marketingOptIn` | boolean | yes | `true` if the optional "occasional practical updates" box was ticked, **or** type is `newsletter` | Optional box is shown only on the business demo form on `/contact` (`offerMarketingOptIn`) |
| `consent.at` | ISO 8601 | yes | Server time | |
| `attribution.*` | object | yes (may be empty `{}`) | See `ATTRIBUTION-GUIDE.md` | Each value max 300 characters on the server |
| `crm.lifecycleStage` | `subscriber` / `lead` | yes | `subscriber` if `newsletter`, else `lead` | Suggested value |
| `crm.leadSource` | string | yes | `utm_source` if present, else `referral` if a referrer exists, else `direct` | Coarse; see attribution guide |
| `crm.audience` | `individual` / `business` | yes | `business` for `business_enquiry`, `demo_request`, `assessment_report`; else `individual` | A `contact` message from a business is labelled `individual`: review manually |

Not sent and not stored: honeypot field `website`, `startedAt` (used only for the spam checks). Free text is control-character-stripped.

## 3. Suggested CRM objects and mapping

| CRM field (suggested name) | From |
|---|---|
| Contact: Email | `email` |
| Contact: First/Last name | split `name` manually or in the automation (single field today) |
| Contact: Company | `company` |
| Contact: Job title | `role` |
| Contact: Country/Market | `market` (`nigeria`/`uk`/`other`) |
| Contact: Lifecycle stage | `crm.lifecycleStage` |
| Contact: Lead source | `crm.leadSource` |
| Contact: Source detail (UTM) | `attribution.utm_*` |
| Contact: First landing page | `attribution.landing_path` |
| Contact: Referrer | `attribution.referrer` |
| Contact: Form page | `attribution.source_page` |
| Contact: Segment / interest | `interest` |
| Contact: Marketing consent (boolean) | `consent.marketingOptIn` |
| Contact: Consent timestamp | `consent.at` |
| Contact: Consent notice version | `consent.privacyNoticeVersion` |
| Deal (business leads only) | create from `type = demo_request`; Deal name = `company`; Team size = `teamSize`; Notes = `message` + `context` |
| Note/activity | `message`, `context`, `type`, `receivedAt`, `id` |

## 4. Statuses and process (proposal)

Lead status: New -> Contacted -> Qualified -> Pilot discussion -> Proposal -> Won / Lost / Not now. Subscriber status: Subscribed -> Unsubscribed / Bounced. Define response targets (e.g. business demo requests answered within one working day: a commitment to decide, not a promise to make on the site).

## 5. Consent and data protection requirements for the CRM (questions for adviser)

1. Only send marketing email to records with `consent.marketingOptIn = true`. For `contact` and `demo_request` without opt-in, use the data only to reply to that enquiry. Confirm with a solicitor how PECR (UK) and Nigerian rules apply to B2B vs consumer email and to "soft opt-in".
2. Keep proof of consent (timestamp, notice version, wording). The wording is in the form component, not in the record: archive form wording per notice version.
3. Honour unsubscribe and deletion requests across the CRM, the webhook receiver's logs, Resend, spreadsheets and backups.
4. Record retention period for leads that never respond (decision needed).
5. Choose CRM/automation providers with a data processing agreement; list them in the privacy notice. Check where data is stored (international transfers).
6. Limit access; do not keep leads in personal inboxes or shared spreadsheets long-term.

## 6. Data quality notes

- Duplicate submissions: the same email may submit several forms. Deduplicate by lowercase email; keep each submission as an activity.
- Honeypot-filled and fast submissions are dropped silently on the server (the visitor sees success) and never reach the CRM.
- `market` is missing for most `newsletter` and `contact` records; do not infer from IP (not collected).
- No double opt-in exists. Add a confirmation step in the email platform before bulk mailing, subject to legal advice.
- No validation of company names or work-email domains.

## 7. Receiver contract (what a webhook receiver must do)

1. Verify `x-fieldwork-secret` equals the configured secret; reject otherwise.
2. Return HTTP 2xx within 8 seconds on success; any non-2xx or timeout makes the form show an error (if no other adapter succeeded).
3. Be idempotent on `id` (the same record is not re-sent by Fieldwork today, but receivers may be retried by their platform).
4. Never log full records in public places.
5. Alert the founder on failures.
