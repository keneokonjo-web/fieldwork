# CRM fields and pipeline

Version 0.1, 14 October 2026. Start with the CSV files (`CRM-TEMPLATE.csv`, `PIPELINE-TRACKER.csv`) in a spreadsheet. Move to a CRM only when the spreadsheet hurts. All values and thresholds below are assumptions to adjust after 30 days. The example rows in the CSVs are **FICTIONAL**. Do not store sensitive personal data. Keep to name, role, company, business contact details, source and notes.

## 1. Pipeline stages

| # | Stage | Definition (entry criteria) | Exit | Typical SLA |
|---|---|---|---|---|
| 0 | **Target** | Account fits ICP on public signals; not yet contacted | First touch sent | Contact within 10 working days of being tier A |
| 1 | **Contacted** | At least one outreach sent | Reply received, or cadence ends | Follow-ups per OUTREACH-KIT.md; breakup on day 16 |
| 2 | **Engaged** | Prospect replied, took the assessment, or accepted a call | Discovery call booked | Reply within 1 working day |
| 3 | **Discovery booked** | Date and time agreed | Call held | Reminder 24h before |
| 4 | **Qualified** | Discovery held; scorecard 14+ | Demo held or proposal sent | Follow-up within 24 hours |
| 5 | **Demo held** | Demonstration given | Proposal sent | Follow-up within 24 hours |
| 6 | **Proposal sent** | Written proposal delivered | Decision | Chase at 3 and 7 working days |
| 7 | **Negotiation / SoW** | Terms being agreed; SoW with prospect or their adviser | Signed or lost | Respond within 1 working day |
| 8 | **Won / Pilot scheduled** | SoW signed, first invoice issued | Kick-off held | Kick-off within 14 days |
| 9 | **Pilot live** | Week 0 to 4 under way | Review held | Weekly check-in |
| 10 | **Review done** | Review note delivered | Decision: extend, stop, refer | Review within 5 working days of Week 4 |
| 11 | **Extended** | Further work agreed | n/a | |
| X | **Lost** | Explicit no, or no response after full cadence plus proposal chase | Reason recorded | |
| N | **Nurture** | Not now; revisit date set | Date reached | Check 90 days |
| D | **Disqualified** | Out of scope (e.g. wants AI to value or approve; wants guarantees) | Reason recorded | |

Rules: a deal sits in exactly one stage; stage changes only on a fact (not a hope); a deal with no next action and date is a bug.

## 2. Fields

### 2.1 Accounts
| Field | Definition | Values / format |
|---|---|---|
| account_id | Unique ID | A-0001 |
| account_name | Trading name | text |
| legal_name | Registered name, if known | text |
| country | Market | UK / Nigeria / Other |
| city_region | | text |
| type | Business type | Estate agency / Lettings agency / Mixed / Property management / Developer / Other |
| staff_count_band | Self-reported or from public data | 1-5 / 6-15 / 16-50 / 50+ (matches assessment) |
| branches | Number | integer |
| website | | url |
| source | Where we found them | Outreach / Referral / Partner / Event / Assessment / Inbound / Other |
| icp_tier | A, B or C | A/B/C |
| assessment_level | If taken | foundation / emerging / ready / none |
| ai_use_status | From discovery | none / informal / mostly / approved |
| written_rule | | yes / verbal / no |
| tech_stack_notes | CRM, portals, tools | text |
| owner | Our owner | text |
| notes | Free text | text |
| fictional_flag | For example rows | FICTIONAL / blank |

### 2.2 Contacts
| Field | Definition |
|---|---|
| contact_id | C-0001 |
| account_id | link |
| full_name | |
| role | Owner-director / Operations / Marketing-Sales / Other |
| persona | Owner-director / Operations manager / Head of marketing or sales |
| work_email | business email only |
| phone_whatsapp | business number only |
| linkedin_url | |
| lawful_basis_note | e.g. "legitimate interests, corporate subscriber, balancing note done" [verify] |
| marketing_status | active / opted out / do not contact |
| opt_out_date | |
| last_contacted | date |
| next_action / next_action_date | |

### 2.3 Deals
| Field | Definition |
|---|---|
| deal_id | D-0001 |
| account_id / primary_contact_id | links |
| offer | Practice session / Tailored enablement / Implementation support |
| stage | from section 1 |
| stage_entered_date | date |
| currency | GBP / NGN |
| amount_quoted | fixed fee |
| discount_pct / discount_reason | per policy |
| expected_close_date | date |
| probability_pct | by stage (see 3) |
| scorecard_total | 0 to 20 |
| workflows | list |
| participants | number |
| sponsor / pilot_owner | names |
| loss_reason | Price / Timing / Trust (no case studies) / Scope / Competitor / No decision / Data concern / Other |
| objections_raised | verbatim |
| permission_publicity | none / anonymous / named-with-approval |
| hours_delivery_actual / hours_sales_actual | for margin |
| next_action / next_action_date | |

## 3. Probability by stage (hypothesis; replace with actuals after 20 deals)
Contacted 2%, Engaged 10%, Discovery booked 15%, Qualified 25%, Demo held 35%, Proposal sent 45%, Negotiation 65%, Won 100%.

## 4. Lead scoring (0 to 100; hypothesis)

Score for prioritising outreach and follow-up, before the discovery scorecard exists.

| Signal | Points |
|---|---|
| Type fits ICP | 15 |
| Size 8 to 60 staff | 15 |
| Decision-maker identified | 10 |
| Took the assessment | 15 |
| Assessment level emerging or ready | 5 |
| Named a workflow pain | 10 |
| Responded to outreach | 10 |
| Trigger event present (hiring, new branch, listing error) | 10 |
| Referral or partner introduction | 10 |
| Negative: asks AI to value or approve | -30 |
| Negative: wants guarantees | -15 |
| Negative: opted out | disqualify |

Tier: A 60+, B 35 to 59, C under 35. Review scoring after 20 conversations: which signals really predicted a call or proposal?

## 5. SLAs (internal, for a solo founder)
- Inbound enquiry: first reply within 1 working day.
- Assessment summary received: reply within 1 working day.
- After call or demo: follow-up within 24 hours.
- Proposal: within 2 working days of qualified call.
- Contract questions: reply within 1 working day.
- No deal sits more than 14 days without a next action.

## 6. Hygiene
- Update the tracker after every touch (daily, 10 minutes).
- Weekly sweep: any deal with no next action, or stage older than the SLA.
- Delete or anonymise contacts on request; honour opt-outs immediately.
- Record a loss reason and the prospect's words every time.

## 7. Reports to run weekly
Pipeline by stage and value (quoted, not forecast); new accounts contacted; conversion by stage; objections by frequency; source quality; delivery hours vs plan; days in stage.

## 8. Moving to a real CRM
Create three objects (Accounts, Contacts, Deals) with the fields above. The CSV is denormalised (one row per deal with account and contact fields) for easy start; split on import. Check the CRM's data-hosting location and terms against your privacy notice [verify].
