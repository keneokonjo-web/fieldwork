# Funnel and metrics

Version 0.1, 14 October 2026. Everything numeric below is a **hypothesis or placeholder**. There is no baseline data yet. Replace ranges with real figures after the first 30 days.

## 1. What the code can measure today

From `src/lib/analytics.ts`, the real event allow-list is:

`consumer_cta_clicked`, `business_cta_clicked`, `free_experience_started`, `free_experience_step_completed`, `free_experience_completed`, `prompt_copied`, `email_signup_submitted`, `business_enquiry_submitted`, `demo_request_submitted`, `contact_submitted`, `assessment_started`, `assessment_completed`, `pricing_viewed`, `purchase_completed`.

Rules in the code that shape measurement:

- Events are sent only if (a) a Plausible domain is configured and (b) the visitor has granted consent (`fw-consent`). Visitors who decline or never answer are invisible to events. Expect under-counting; do not treat counts as complete.
- Only these property keys are sent: `location`, `label`, `step`, `task`, `market`, `audience`, `level`, `tool`, each truncated to 60 characters. No emails, names or free text.
- `purchase_completed` exists in the allow-list but payments are not connected. It must stay at zero and must not be reported as revenue.
- `email_signup_submitted` fires for both `newsletter` and `assessment_report` lead types (see `EVENT_FOR` in `LeadForm.tsx`) with `audience` set to `business` or `individual`. For consumer metrics, filter to `audience=individual` and interpret `location` (for example `individuals`, `pricing`). Business assessment reports will also appear under this event: check the `audience` property before counting.
- `market` is an allowed property but check the forms: `market` is required only on business enquiries. Do not rely on it for consumer segmentation yet (verify in code before use). To compare UK and Nigeria, use UTM campaign naming (below) and any optional market answer collected later.
- Pageviews are by Plausible; whether Plausible records UTM values for pageviews depends on its script and plan (verify before use). The website attribution in `src/lib/attribution.ts` is separate and is used only when a form is submitted.

## 2. Attribution as implemented

`src/lib/attribution.ts` reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (each truncated to 120 characters), plus `referrer` hostname, `landing_path` and `source_page`.

Behaviour you must design around:

- **First touch only, per browser tab session.** Stored in `sessionStorage`, cleared when the tab closes. If someone clicks a TikTok link, closes the tab, and comes back later via Google, the second visit is a new first touch.
- **Only sent on form submission** (for example early access, contact). Passive visitors are not attributed in your lead database.
- If the first landing had no UTM and the visitor later arrives with UTMs in the same session and `utm_source` is still empty, the fresh UTMs are merged in. If `utm_source` already exists it is not overwritten.
- Referrer is stored as a hostname only.
- `utm_term` is accepted but not needed for organic social; leave it blank.

So: every link you post must carry UTMs on the first URL, and the link must land on a page where the user can act (exercise, a Field Note, or early access). Do not rely on in-app browsers (TikTok, Instagram, LinkedIn) passing UTMs or cookies correctly; test each (verify before use).

## 3. UTM naming convention

Lowercase only, hyphens not spaces, no personal data. Fixed vocabularies:

| Parameter | Rule | Allowed values (extend deliberately) |
|---|---|---|
| `utm_source` | Platform where the link is placed | `tiktok`, `instagram`, `youtube`, `linkedin`, `whatsapp`, `email`, `fieldnotes`, `direct-share` |
| `utm_medium` | Type of placement | `organic-video`, `organic-social`, `community`, `email`, `referral`, `bio-link` |
| `utm_campaign` | Initiative + period | `launch-d30` (first 30 days), `launch-d60`, `launch-d90`, `welcome-seq`, `postex-seq`, `earlyaccess-seq`, `reengage-seq`, `digest-YYYYMM` |
| `utm_content` | The exact item id | Item slug from the tracker, for example `d03-v2-five-part-brief` |
| `utm_term` | Not used for organic | blank |

Optional market tag for market tests: append to campaign, for example `launch-d30-uk` or `launch-d30-ng`. Keep to one convention across sources.

Example link (replace host with the live domain when confirmed):
`https://YOUR-DOMAIN/learn/first-workflow?utm_source=tiktok&utm_medium=organic-video&utm_campaign=launch-d30&utm_content=d03-v2-five-part-brief`

Keep a one-row-per-link register in `CONTENT-TRACKER.csv` (columns `utm_*`). Test every link once before publishing.

## 4. Funnel stages

| # | Stage | Definition | Measure | Source |
|---|---|---|---|---|
| 1 | Reach | Someone sees a post | Views/impressions | Platform analytics |
| 2 | Attention | Watches or reads the substance | Completion/read rate, avg watch time | Platform analytics |
| 3 | Visit | Arrives on the site | Visitors, landing page, source | Plausible (consent permitting) |
| 4 | Start | Clicks into the free exercise | `consumer_cta_clicked` (by `label`), `free_experience_started` | Plausible events |
| 5 | Progress | Moves through the steps | `free_experience_step_completed` (by `step`), `prompt_copied` | Plausible events |
| 6 | Complete | Finishes brief, run, check, keep | `free_experience_completed` (by `task`) | Plausible events |
| 7 | Subscribe | Joins early access or newsletter | `email_signup_submitted` (`audience=individual`) | Plausible + lead store |
| 8 | Interest in paid | Views planned pricing | `pricing_viewed` | Plausible |
| 9 | Conversation | Takes part in an interview | Interviews held | Manual log |
| 10 | Paid (future) | Buys | `purchase_completed` | Not live. Must remain zero |

The funnel from 4 to 8 is real now. Stages 9 and 10 are research and future.

## 5. Metric definitions

Define once and keep constant so weeks are comparable.

| Metric | Formula | Notes |
|---|---|---|
| Completion rate (video) | Viewers who watched to the end / views | From platform analytics; definitions differ by platform (verify before use) |
| Read rate (text/carousel) | Platform-provided engagement / impressions, or saves + shares per 1,000 views | Choose one and stick to it |
| Link click-through | Link clicks / views | From link analytics; self-reported |
| Visit-to-start | `free_experience_started` / visitors from social | Under-counted because of consent |
| Start-to-complete | `free_experience_completed` / `free_experience_started` | Key product metric |
| Step drop-off | Count at each `step` value; compare adjacent steps | Steps are the labels the exercise sends; check `FirstWorkflow.tsx` |
| Prompt-copy rate | `prompt_copied` / `free_experience_started` | Indicator they are using the AI tool |
| Signup rate | `email_signup_submitted` (individual) / visitors | Placeholder range 1% to 3% |
| Signup-to-engaged | Subscribers who click any email link in 14 days / subscribers | Needs email tool |
| Early-access click-through (fake door) | Clicks on planned-project page CTA / recipients | See pricing doc |
| Interview conversion | Interviews held / invitations sent | Manual |
| Content velocity | Posts published / posts planned | Discipline measure |

## 6. Targets as hypotheses (ranges, to be replaced by data)

These ranges are guesses for planning only. They are **not** industry benchmarks and nobody should quote them externally.

| Metric | Days 1 to 30 | Days 31 to 60 | Days 61 to 90 |
|---|---|---|---|
| Posts published | 20 to 26 of 26 planned | 24 to 30 | 24 to 30 |
| Video completion rate (median) | 25% to 45% | 30% to 50% | 30% to 50% |
| Visit-to-start | 5% to 15% | 8% to 20% | 8% to 20% |
| Start-to-complete | 20% to 40% | 25% to 45% | 30% to 50% |
| Signup rate (visitors) | 0.5% to 2% | 1% to 3% | 1% to 3% |
| Email subscribers (absolute) | 10 to 100 | 50 to 300 | 100 to 600 |
| Interviews held | 3 to 6 | 8 to 12 | 15 to 20 (cumulative) |
| Fake-door CTA click-through | n/a | n/a | 3% to 10% of recipients |
| Purchases | 0 (not on sale) | 0 | 0 |

Absolute counts depend on reach you do not yet have. If you reach under a few hundred visitors a month, percentages will be noisy: report the denominator every time, and do not read a conclusion from fewer than about 30 events (rule of thumb, not statistical advice).

## 7. Decision rules (hypotheses)

- If start-to-complete is under 20% after 100 starts: investigate exercise length and mobile flow before making more content.
- If a format beats another by a clear margin across at least 6 posts each: do more of it. If not, do not conclude.
- If signup rate is under 0.5% after 300 visitors: change the early-access promise or placement, not the volume of posts.
- If interviews show no common task: do not build a guided project yet.
- Never choose a final price on survey intent alone; use at least two methods (see pricing doc).

## 8. Weekly review template

Use `WEEKLY-REVIEW-TEMPLATE.csv` for numbers and the notes below for decisions. 30 minutes, same time each week.

1. **Shipped:** posts published vs planned; reasons for misses.
2. **Numbers:** fill CSV. Report denominators.
3. **Top and bottom post:** id, hook, format, completion rate, link clicks. One sentence on why you think so (a guess, labelled).
4. **Funnel check:** where is the biggest drop between stages 4 to 8?
5. **Qualitative:** copy three real comments/questions (with permission to quote); what task did they ask for?
6. **Assumptions changed:** list any ASSUMPTION marker you can now confirm or reject.
7. **Safety check:** any claim posted that was not true? Correct publicly if so.
8. **One change next week.** Only one, so you can see its effect.

## 9. Data protection and privacy

- Do not copy comments with names into reports without permission.
- No personal data in analytics properties (the code strips unknown keys).
- Keep subscriber data in the email tool and lead store only; do not paste into AI tools (see Field Note "What not to paste").
- The privacy page and cookie consent must match what you actually measure.

## 10. Setup checklist

- [ ] Plausible domain configured via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; consent banner works.
- [ ] UTM links tested from each platform's in-app browser.
- [ ] Goals/events created in Plausible for the events in section 1 (verify steps in Plausible docs).
- [ ] Tracker CSV imported into a spreadsheet; weekly template copied.
- [ ] A named person owns the review.
