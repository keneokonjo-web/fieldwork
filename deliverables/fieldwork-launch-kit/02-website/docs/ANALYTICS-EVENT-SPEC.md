# Analytics event specification

Version 0.1, 14 October 2026. Source of truth: `src/lib/analytics.ts` (`EVENTS`, `SAFE_KEYS`, `track`), `src/components/ui/Analytics.tsx`, `src/components/forms/LeadForm.tsx`, plus the `track=` props on `ButtonLink`. If code and this document disagree, the code wins; fix this document.

Status: instrumentation **Completed and Tested** for the "nothing loads without config and consent" property. **Prepared but unconnected**: no analytics account, no `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, no data has ever been collected. Funnels, goals and dashboards are not configured anywhere.

## 1. How it works

1. If `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is empty, `Analytics` renders nothing: no banner, no script.
2. If set, a consent banner appears until the visitor chooses. Choice is stored in `localStorage['fw-consent']` (`granted` or `denied`); the change event `fw-consent-change` updates the page.
3. Only when consent is `granted` is the script loaded (`siteConfig.analytics.plausibleSrc`, default `https://plausible.io/js/script.js`, with `data-domain`). Plausible Cloud and self-hosted both fit; the provider is **not chosen**. If self-hosting or using another provider, set `NEXT_PUBLIC_PLAUSIBLE_SRC`.
4. `track(event, props)` does nothing unless `window.plausible` exists **and** consent is `granted`. Properties are filtered to `SAFE_KEYS` and string values truncated to 60 characters.
5. Elements with `data-track="<event>"` (set by `ButtonLink` via `track`/`trackLabel`, and by header links) fire that event on click if the name is in the allow-list; `label` is `data-track-label`.
6. Page views are counted by the provider's script itself once loaded (not by `track`). Whether the provider sets cookies or uses storage must be confirmed in its current documentation (**verify**); the site's privacy copy assumes "privacy-focused analytics, no advertising, no personal data in events".

Rule: never pass personal data, free text, emails, names, task content or IP addresses in event properties.

## 2. Allow-listed properties (`SAFE_KEYS`)

`location`, `label`, `step`, `task`, `market`, `audience`, `level`, `tool`. Any other key is dropped silently. (`market` and `tool` are allowed but not used by any current call.)

## 3. Events

All 14 names in `EVENTS`, with real triggers found in the source.

| Event | Fires when | Properties | Where in code | Used today? |
|---|---|---|---|---|
| `consumer_cta_clicked` | Click on a CTA for the individual path | `label` | `ButtonLink track=...` and header links | Yes. Labels: `header`, `mobile-menu`, `hero-primary`, `preview-start`, `final-cta`, `individuals-hero`, `individuals-how`, `learn-hub`, `pricing-free`, `route-individuals`, `about`, `article` |
| `business_cta_clicked` | Click on a CTA for the business path | `label` | `ButtonLink` | Yes. Labels: `hero-business`, `business-hero`, `business-cta`, `business-assessment`, `business-real-estate`, `home-band-real-estate`, `home-band-assessment`, `route-real-estate`, `final-business`, `pricing-business`, `pricing-assessment`, `re-hero-demo`, `re-hero-assessment`, `re-cta-demo`, `re-cta-assessment` |
| `free_experience_started` | "Start the exercise" clicked | none | `FirstWorkflow.tsx` | Yes |
| `free_experience_step_completed` | Any "next" in the exercise | `step` (label of the step being left) | `FirstWorkflow.tsx` `next()` | Yes |
| `free_experience_completed` | "I have finished the exercise" (first time per stored state) | `task` (task id) | `FirstWorkflow.tsx` `finish()` | Yes |
| `prompt_copied` | Copy button on a prompt block | `location` (`brief`, `run`, `fix`, `example`, `card`, `article`, `assessment`, `real-estate`) | `CopyButton.tsx` | Yes |
| `email_signup_submitted` | Newsletter form accepted by `/api/lead` (HTTP ok) | `location`, `audience` | `LeadForm.tsx` `EVENT_FOR` | Yes, but a form only reaches success when a lead adapter is configured |
| `business_enquiry_submitted` | `business_enquiry` lead accepted | `location`, `audience` | `EVENT_FOR` | No form submits this type |
| `demo_request_submitted` | `demo_request` accepted | `location`, `audience` | `EVENT_FOR` | Yes (contact business form, assessment results form) |
| `contact_submitted` | `contact` accepted | `location`, `audience` | `EVENT_FOR` | Yes |
| `assessment_started` | First interaction in the assessment | none | `Assessment.tsx` `touch()` | Yes |
| `assessment_completed` | Report generated | `level` (`foundation`, `emerging`, `ready`) | `Assessment.tsx` | Yes |
| `pricing_viewed` | Pricing component mounts | none | `ConsumerPricing.tsx` | Yes |
| `purchase_completed` | Reserved for future payments | n/a | n/a | **No** (nothing is sold) |

Notes
- `assessment_report` lead type maps to `email_signup_submitted` but is not submitted by any form.
- `LeadForm` fires the submit events only on a successful server response. A 503 `not_configured` fires nothing.
- Honeypot/too-fast submissions return `{ok:true}` from the server, so the client **will** fire the submit event for a bot that passes through the real form; bot traffic using the form could inflate counts (rare; bots usually do not run consent-gated scripts, but note it).
- Exercise step names for `step`: Welcome, Choose a task, Write the brief, Run it, Check it, Keep it. The last step ("Keep it") never fires `step_completed`; completion is `free_experience_completed`.

## 4. Suggested goals and funnels (to configure in the provider; not done)

| Funnel | Steps (events) |
|---|---|
| Free exercise | page view `/learn/first-workflow` -> `free_experience_started` -> `step_completed` (step = "Write the brief") -> `step_completed` (step = "Check it") -> `free_experience_completed` -> `email_signup_submitted` (location `free-exercise-complete`) |
| Business | page view `/business` or `/business/real-estate` -> `business_cta_clicked` -> page view `/contact` or `/business/assessment` -> `assessment_started` -> `assessment_completed` -> `demo_request_submitted` |
| Email list | `email_signup_submitted` by `location`: `home-final`, `individuals`, `pricing`, `pricing-platform`, `free-exercise-complete` |

Provider-specific custom properties usually need registering in the provider's settings (**verify** for the chosen provider).

## 5. Consent behaviour and its effect on data

- Anyone who ignores the banner or declines is not measured. Opt-in rates will vary; **expect undercounting** and do not treat counts as totals.
- Counts of leads in the CRM (not consent-gated) are the reliable conversion numbers; compare against analytics to estimate coverage.
- The consent banner appears on every page until a choice is made. Choice can be changed on `/cookies` via `ConsentSettings`.

## 6. Privacy and legal questions (for a solicitor/adviser)

1. Is consent-gating required for the chosen provider's configuration in the UK (PECR) and Nigeria? Some privacy-focused tools claim exemption; the site chose the cautious route. Confirm and keep privacy and cookies pages in step with the real provider.
2. Does the provider process personal data (IP, user agent)? International transfers?
3. Name the provider in the privacy notice once chosen (the notice currently says providers "will be named" before launch).
4. Retention period settings in the provider.

## 7. Adding or changing events

1. Append the name to `EVENTS` (closed allow-list).
2. Fire via `track()` or `data-track` on a link/button.
3. Use only `SAFE_KEYS`; add a key only after a privacy review.
4. Update this document and the privacy notice if what is measured changes.
5. Add a browser test if the event is critical.

## 8. QA

Tested: no analytics script requests without configuration or consent (browser test). Not tested: events arriving at a real provider; banner behaviour with analytics configured (needs `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set at build time; the QA scripts do not set it). Test plan: set the variable on a preview, grant consent, trigger each event, confirm in the provider's live view, then decline and confirm nothing is sent.
