# PRD: Business onboarding and knowledge platform

> **STATUS: NOT BUILT.** Nothing in this document exists in the repository. The website says so in three places: `/business` ("Training is the service today. The onboarding platform is a plan."), `/pricing` (waitlist form with `interest="onboarding-platform-waitlist"`) and the assessment report (`onboardingNote` in `src/lib/assessment.ts`). Working name "Fieldwork Onboard" is internal only (`docs/brand/BRAND-STRATEGY.md` section 11) and must not appear publicly.
>
> Version 0.1, 14 October 2026. Every number, market claim and regulation reference marked **verify** is unverified and must be checked before use. Nothing here is legal advice; items touching data protection need solicitor review.

## 1. Summary

A web platform in which a business (real estate first) turns its own procedures into role-based learning paths and checklists for new starters, and gives staff an assistant that answers only from content the business has approved. It is the long-term extension of what Fieldwork teaches today: practise on real work, check the result, keep the workflow.

The platform is **a hypothesis**. The only evidence in the repo is the founder's assumption and the self-reported assessment (`onboarding` question: fast / medium / slow / unsure). No customer has been interviewed. Section 13 lists what must be validated before any build.

## 2. Problem (hypothesised)

| Hypothesis | How it would show up | Evidence today |
|---|---|---|
| New starters in agencies take too long to work independently because knowledge lives in people's heads | Months to full productivity; senior staff interrupted | None. Assessment question exists; no responses collected (lead path not connected) |
| Procedures exist (documents, PDFs, chat threads) but are out of date, scattered and unread | Starters ask the same questions repeatedly | None |
| Staff already use AI tools informally without rules | Inconsistent output, data risk | Self-reported via assessment only; no data |
| Owners will not trust an assistant that invents answers | Adoption stalls | Design assumption (see section 8) |

## 3. Users and roles

| Role | Description | Primary goal |
|---|---|---|
| Account owner | Agency director or owner | Faster onboarding, safe AI use, no extra admin |
| Content owner / editor | Operations manager or team lead | Keep procedures current, approve what the assistant may use |
| Manager | Head of lettings/sales | See whether new starters are progressing |
| Learner (new starter) | Negotiator, lettings or admin staff | Know what to do this week, ask questions safely |
| Learner (existing staff) | Experienced staff | Find the current procedure quickly |
| Fieldwork admin | Fieldwork staff | Support, content import help (access to customer data must be tightly controlled; see section 9) |

## 4. Jobs to be done

1. When someone new joins, I want a clear sequence of what to learn and do in their first weeks, so they become independent sooner and I interrupt fewer people.
2. When a procedure changes, I want one place to update it and know who has seen the change.
3. When a starter is unsure what the procedure is, I want them to get an answer from our approved material, with the source shown, not a guess.
4. When I take on a new role or process, I want a checklist I can tick through and a person who can see I did.
5. When I run the business, I want to see which roles and steps are slowing starters down, without spying on individuals.

## 5. Scope

Phases are cumulative. Dates are deliberately absent: phases open only when the gates in section 14 pass.

### MVP (smallest thing worth testing with 1 to 3 pilot agencies)
- Organisation account, invite by email, three roles: owner, editor, learner.
- Content pages written in a simple editor, or imported from pasted text/Markdown (file upload deferred).
- Content status: draft, approved, archived. Only approved content is visible to learners.
- Learning path = ordered list of content pages and checklists, assigned to a role.
- Checklists with per-person completion and timestamps.
- Search over approved content (plain keyword search first).
- Basic progress view for owner/manager.
- No assistant in MVP unless discovery shows it is the main reason to buy (see build order, section 12).

### V1
- Assistant answering only from approved content, with citations to the source page and a clear "I cannot find this in your approved material" fallback.
- Review reminders (each page has an owner and a review-by date).
- Acknowledgement ("I have read this") for policies.
- Templates: starter paths for lettings and sales agencies (authored by Fieldwork, labelled as templates to adapt, not as legal or regulatory advice).
- Audit log of content changes and assistant questions (content visible to owners; see privacy).
- Manager dashboards: completion by role, time to complete, unanswered assistant questions (a prompt to write missing content).

### V2
- File import (PDF, DOCX) with human review before approval.
- Integrations (single sign-on, Slack/Teams, CRM links) if requested by paying customers.
- Multi-branch structure, per-branch content variants.
- Quizzes and practical tasks that reuse the Fieldwork "brief, run, check, keep" method (see `docs/product/FREE-EXERCISE-SPEC.md`).
- Nigeria-specific payments and data residency options (verify requirements).

### Explicitly out of scope until proven necessary
Video hosting, a general-purpose chatbot, automated decisions about staff, performance scoring of individuals, learning management standards (SCORM/xAPI), a public marketplace of content.

## 6. Feature detail

### 6.1 Role-based learning paths
A path belongs to a job role (e.g. "Lettings negotiator, weeks 1 to 4"). Items: content page, checklist, external link, "ask someone" task (assigns a named colleague). Learners see "this week" first. Owners can duplicate a path to a new role.

### 6.2 Checklists
Items with optional due-offset (e.g. day 3), optional evidence note, completion by learner, optional confirmation by manager. Completion data belongs to the organisation.

### 6.3 Assistant grounded in approved company content
Rules (design intent, to be tested):
1. Retrieves only from approved content of the learner's organisation. No cross-tenant retrieval, ever.
2. Every answer shows which pages it used. No sources, no answer.
3. If retrieval finds nothing relevant, it says so and offers to notify the content owner. It does not fall back to general knowledge for company-specific questions.
4. It refuses to give legal, regulatory, valuation or tenancy-deposit advice and points to the content owner or a professional (consistent with the site's safety line: "AI drafts. People decide.").
5. The model provider must not train on customer content. This must be confirmed contractually and in the provider's current terms (**verify**).
6. Questions are logged to the organisation, with the user's name visible to owners only if the organisation's policy says so (decision for section 15).

### 6.4 Authoring and approval
Editors draft; owners approve (or editors, per setting). Approval creates a version. Learners and the assistant see only the latest approved version. Rollback to a prior version.

### 6.5 Dashboards
Completion per path and role; stuck steps; unanswered assistant questions; stale pages. Individual-level data is visible to the learner's manager and owner only. No productivity scoring.

## 7. Permissions

| Capability | Owner | Editor | Manager | Learner | Fieldwork admin |
|---|---|---|---|---|---|
| Invite/remove users | yes | no | no | no | support only, with customer consent |
| Edit draft content | yes | yes | no | no | no |
| Approve content | yes | configurable | no | no | no |
| Assign paths | yes | yes | yes | no | no |
| View all progress | yes | no | own team | own only | aggregate only |
| Ask assistant | yes | yes | yes | yes | no |
| View assistant logs | yes | no | no | own only | no, except documented support access |
| Export/delete org data | yes | no | no | no | executes on owner's request |

## 8. Data model sketch (illustrative, not a schema)

```
Organisation(id, name, country, plan, created_at)
User(id, email, name, status)                 -- identity
Membership(user_id, org_id, role, branch_id)
Branch(id, org_id, name)
JobRole(id, org_id, name)
ContentPage(id, org_id, owner_user_id, review_by)
ContentVersion(id, page_id, body, status[draft|approved|archived], approved_by, approved_at)
Path(id, org_id, job_role_id, name)
PathItem(id, path_id, position, kind[page|checklist|task|link], ref_id, due_offset_days)
Checklist(id, org_id, name) / ChecklistItem(id, checklist_id, text, requires_manager_confirm)
Assignment(id, user_id, path_id, start_date)
Completion(id, user_id, item_id, completed_at, confirmed_by)
Acknowledgement(user_id, content_version_id, at)
AssistantQuery(id, org_id, user_id, question, answer, source_version_ids, outcome[answered|no_source|refused], created_at)
AuditEvent(id, org_id, actor_id, action, target, at)
Consent/Policy(org_id, assistant_log_visibility, retention_days)
```
Isolation rule: every row carries `org_id`; every query is scoped by it; enforced in the data layer and tested (row-level security if a Postgres-style store is chosen).

## 9. Privacy, security and compliance (questions for a solicitor)

Fieldwork would be a processor for customer content and staff accounts; the agency is the controller for its staff and its clients' data. Fieldwork would be a controller for its own account/billing data. These roles need confirming.

- **UK**: UK GDPR and Data Protection Act 2018 (**verify** current text and ICO guidance). Open questions: data processing agreement template; ICO fee/registration; lawful basis for assistant logs; retention; staff-monitoring transparency duties on the agency; international transfer mechanism if the processor or model provider is outside the UK.
- **Nigeria**: Nigeria Data Protection Act 2023 and any NDPC implementation framework or general application and implementation directive (**verify** current status). Open questions: registration as a data controller/processor of major importance (thresholds and fees, **verify**); cross-border transfer conditions; local representation.
- **Do not let customers paste client personal data into content by default.** Authoring UI should warn, mirroring the site's "what not to paste" guidance (`/field-notes/what-not-to-paste`).
- **Security baseline (to design, not claimed)**: encryption in transit and at rest; per-tenant isolation tests; least-privilege admin access with logging; backups and tested restore; dependency scanning; incident process with 72-hour regulator-notification awareness (**verify**); MFA for owners; export and deletion on request.
- **AI-specific**: prompt-injection through uploaded content (a malicious document instructing the assistant); output filtering; model provider data-retention settings; clear user-facing labelling that answers come from company material.
- **Accessibility**: WCAG 2.2 AA target, same as the marketing site.
- No certification (ISO 27001, SOC 2, Cyber Essentials) is held. Do not claim any. Whether to pursue one is a commercial question for later.

## 10. Success metrics (all hypotheses; no baselines exist)

| Metric | Hypothesis to test | How measured | Target |
|---|---|---|---|
| Time to first independent task | Falls after adopting paths | Manager-confirmed checklist item vs start date, vs pilot agency's own prior figure | Set per agency in discovery; no universal target |
| Manager time spent answering repeat questions | Falls | Short before/after survey | Set per agency |
| Assistant answer quality | Answers are correct and sourced | Weekly sample review by content owner; "no source" rate | To be set after first pilot; do not publish accuracy figures without a defined method |
| Content freshness | Pages reviewed on time | % pages past review-by date | Set per agency |
| Weekly active learners / invited | Learners actually use it | Product analytics (consent, privacy-reviewed) | To be set |
| Willingness to pay | Agencies pay for it | Signed pilots, renewals | Set in pricing work |

## 11. Risks

| Risk | Likelihood / impact | Mitigation |
|---|---|---|
| Nobody wants to maintain the content | High / fatal | Start from the agency's existing documents; make editing and review reminders trivial; test in pilot |
| Assistant gives a wrong company answer | Medium / high | Source-only answers, no-source fallback, sample audits, kill switch |
| Data protection non-compliance | Medium / high | Solicitor-reviewed DPA and privacy notice before any real data |
| Tenant data leakage | Low / severe | Isolation by design, tests, third-party review before scale |
| Training business is mistaken for a software company | Medium / medium | Keep promises honest; keep training as a service until platform pilot succeeds |
| Build cost outruns revenue | High / high | Buy/assemble first (section 12), concierge pilot |
| Model-provider cost or terms change | Medium / medium | Provider-agnostic interface; usage caps per org |
| Nigeria connectivity and payment realities | Medium / medium | Light pages, offline-friendly checklists later, local payment provider (**verify**) |

## 12. Build or buy options

| Option | What it is | Pros | Cons |
|---|---|---|---|
| A. Concierge (recommended first) | Run onboarding paths as a documents-plus-checklist service in tools the agency already uses (shared drive, spreadsheet, existing LMS), with Fieldwork writing and training; assistant not offered | Zero build; fastest learning; proves the content-maintenance risk | Not scalable; not a product |
| B. Assemble on existing tools | Notion/Confluence-style wiki or a no-code app + an existing "chat with your docs" product | Days to weeks; real usage data | Weak tenancy story, hard to white-label, third-party data terms, cost per seat |
| C. Build on a managed backend | Next.js app (same stack as the site) + managed Postgres with row-level security + managed auth + vector search + hosted LLM API | Full control of experience and data handling | Largest effort; security and compliance burden falls on Fieldwork |
| D. Partner/white-label | Resell an existing onboarding or LMS product with Fieldwork content | Fast to market | Margin, brand fit, dependency |

Recommendation (to challenge): A, then B for a pilot if A shows demand; decide on C only after at least two paying pilots. Vendor names and prices are deliberately not listed: **verify before use**.

## 13. What must be validated first

1. Ten or more structured interviews with agency owners/operations managers in each of UK and Nigeria (or a justified narrowing to one): how onboarding happens now, how long it takes, what documents exist, who owns them, what they would pay to change it. Record verbatim; do not lead.
2. At least two training pilots delivered (the current service) so Fieldwork has real procedure content and real relationships.
3. Confirm whether the pain is knowledge access, content maintenance, training delivery, or compliance. The platform only fits some of these.
4. A willingness-to-pay test (letter of intent or paid concierge pilot) before writing platform code.
5. Legal groundwork: processor role, DPA, privacy notice for the platform, jurisdiction choices.
6. Data on how much of the pilot content is safe to place in a third-party model context.

## 14. Phased rollout and gates

| Phase | Content | Gate to enter |
|---|---|---|
| 0. Discovery (now) | Interviews, assessment responses, waitlist, training pilots | Lead path connected and site live (see `docs/operations/DEPLOYMENT-AND-CONFIGURATION.md`) |
| 1. Concierge | Paths + checklists delivered with existing tools to 1 to 3 agencies | At least 5 interviews confirm problem; 1 agency agrees to pilot |
| 2. Assembled pilot (option B) | Add searchable approved content; optional assistant on a small corpus | Concierge shows agencies keep content up to date for 6+ weeks (**threshold is a hypothesis**) |
| 3. MVP build (option C) | Section 5 MVP | 2 paying pilots; solicitor-reviewed DPA; security plan reviewed |
| 4. V1 | Assistant, dashboards, templates | Pilot retention, assistant audit results acceptable to pilot owners |
| 5. V2 | Per section 5 | Demand from paying customers |

## 15. Open questions (founder and customers)

1. Is the first market UK, Nigeria, or both? Different procedures, regulators, payment and hosting needs.
2. Is the platform the product, or a retention add-on to training?
3. Who pays: the agency owner per seat, per branch, or flat?
4. Should owners see individual assistant questions? Staff-monitoring and trust implications.
5. How will content be created for agencies with no written procedures? Fieldwork-authored (service) or self-serve?
6. Single model provider or provider-agnostic? Data location needs?
7. Is "Fieldwork Onboard" the name, and is it clear for trademark purposes? (see `docs/operations/DOMAIN-DNS-EMAIL-SOCIAL-SETUP.md` on name risk)
8. Who builds it: founder, contractor, partner? None is arranged.

## 16. Relationship to the current site

- Assessment (`/business/assessment`) already asks about onboarding duration and ownership; those answers would be the first discovery data if the lead path were connected. Today the report is shown on screen and only sent if the visitor submits the demo-request form below it (`context` carries the report summary).
- Waitlist: pricing page form (`interest="onboarding-platform-waitlist"`). Not connected until a lead adapter is configured.
- No code, schema or infrastructure for the platform exists. Do not describe it as a product in marketing.
