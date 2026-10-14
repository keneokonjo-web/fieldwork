# Attribution guide

Version 0.1, 14 October 2026. Derived from `src/lib/attribution.ts`, `src/lib/validation.ts` (`Attribution`), `src/lib/leads.ts` (`crm.leadSource`) and `LeadForm.tsx`. Source files refer to `docs/marketing/ATTRIBUTION.md`; this document replaces that reference.

## 1. What the code does

On a form submit, `LeadForm` calls `readAttribution()` and sends the result in the payload as `attribution`.

`readAttribution()`:
1. Reads `sessionStorage['fw-attribution']` (JSON). If unavailable, behaves as empty.
2. Reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from the current URL (each cut to 120 characters).
3. **First touch**: if nothing stored yet (`landing_path` missing), stores `{ the UTMs found on this URL, referrer, landing_path }`. `referrer` is the **hostname only** of `document.referrer`; `landing_path` is `window.location.pathname` (no query string).
4. If something is stored but has no `utm_source` and the current URL has UTMs, it merges those UTMs into the stored record (so a later tagged visit in the same tab can add tags, but cannot overwrite an existing `utm_source`).
5. Returns the stored record plus `source_page` = the current path (where the form is).

The server keeps only those eight keys, each trimmed and cut to 300 characters.

| Key | Meaning | Example |
|---|---|---|
| `utm_source` | Where the visit came from | `linkedin` |
| `utm_medium` | Channel type | `social` |
| `utm_campaign` | Named effort | `launch-2026-11` |
| `utm_content` | Which asset/variant | `video-03` |
| `utm_term` | Paid keyword (if used) | n/a |
| `referrer` | Hostname that sent the visitor, only on first page load of the tab | `www.google.com` |
| `landing_path` | First page in this tab session | `/field-notes/five-part-brief` |
| `source_page` | Page where the form was submitted | `/contact` |

## 2. Properties and limits

- **Session scope**: `sessionStorage` is per tab and cleared when the tab closes. A visitor who comes back tomorrow, opens a new tab, or moves between devices starts fresh. Attribution is therefore "this visit", not "customer journey".
- **First touch within a tab**: the first page of the tab wins. Navigating through internal pages does not change it.
- **Sent only on submit**: nothing is transmitted until a form is submitted. It is stored locally earlier (first-party). The privacy notice lists `fw-attribution` as a storage item. Whether storing it needs prior consent in the UK/Nigeria is a **question for a solicitor** (it is not consent-gated like analytics).
- **No cross-site tracking, no ad IDs, no cookies**. Paid-ad click IDs (e.g. `gclid`, `fbclid`) are not captured.
- **Referrer is coarse**: Many apps (TikTok, Instagram, WhatsApp in-app browsers) strip or hide the referrer; the visit then appears `direct`. UTMs are the reliable method. Some browsers trim referrers.
- **`crm.leadSource`** is computed as: `utm_source` if present, otherwise `referral` if there is a referrer, otherwise `direct`. Organic search appears as `referral` with `referrer = www.google.com`; derive a better channel in the CRM from `referrer`/`utm_medium` (e.g. google/bing/duckduckgo hostnames -> `organic-search`).
- If a visitor arrives from a tagged link, then reloads without tags in the same tab, tags persist (stored).
- A tagged URL opened first with a direct visit already stored (no UTMs) in the same tab: UTMs merge (rule 4).

## 3. UTM naming convention (use for every link you publish)

**Alignment with the marketing tracker.** `docs/marketing/CONTENT-TRACKER.csv` (written separately) already uses `utm_source` in {tiktok, instagram, linkedin, whatsapp, email}, `utm_medium` in {organic-video, organic-social, community, email}, `utm_campaign` = `launch-d30` and `utm_content` ids like `d01-v1-what-is-fieldwork`. Treat the tracker as authoritative for the 30-day launch; use the starter list below for anything outside it, and keep `utm_medium` vocabulary consistent (the starter list's `social` should read `organic-social` to match).

Rules: lowercase; hyphens not spaces; no personal data; no campaign names that reveal anything private; keep a register (spreadsheet) of every tagged link. One `utm_source` value per platform, always the same.

| Parameter | Allowed values (starter list) |
|---|---|
| `utm_source` | `tiktok`, `instagram`, `linkedin`, `youtube`, `whatsapp`, `email` (own newsletter), `partner-<name>`, `qr-<place>`, `google` (for paid), `bio` is a placement, not a source |
| `utm_medium` | `organic-social`, `organic-video`, `community`, `paid-social`, `email`, `referral`, `qr`, `partner`, `cpc`, `profile-link` |
| `utm_campaign` | `<yyyy-mm>-<theme>`, e.g. `2026-11-first-workflow`, `2026-11-re-assessment` |
| `utm_content` | asset id from the content tracker (e.g. `d02-li-credit-note`), or `cta-a`/`cta-b` |
| `utm_term` | only for paid keyword ads |

Examples (replace the domain):
- TikTok bio link: `https://<domain>/learn/first-workflow?utm_source=tiktok&utm_medium=profile-link&utm_campaign=evergreen`
- LinkedIn post to business page: `https://<domain>/business/real-estate?utm_source=linkedin&utm_medium=organic-social&utm_campaign=2026-11-re-assessment&utm_content=post-02`
- Email: `https://<domain>/field-notes/check-ai-answers?utm_source=email&utm_medium=email&utm_campaign=2026-11-welcome&utm_content=email-3`
- QR on printed material: `https://<domain>/business?utm_source=qr-leaflet&utm_medium=qr&utm_campaign=2026-11-agency-visit`

Do not tag **internal links** on the site (it would overwrite nothing but pollute analytics, and when analytics is on, the provider reads UTMs from the landing URL).

## 4. Reading results

1. CRM: group leads by `utm_source`, `utm_campaign`, `landing_path`. This is the dependable conversion count (not consent-gated).
2. Analytics (if enabled and consented): sources and campaigns for visits; compare with lead counts to estimate the consent gap.
3. Search Console: organic query/page data (independent of cookie consent).
4. Qualitative: add "How did you hear about us?" in the first reply for business leads; the web form does not ask.

## 5. Known gaps and ideas

| Gap | Impact | Possible fix |
|---|---|---|
| No `gclid`/`fbclid`/`ttclid` capture | Paid ads cannot be matched | Add keys to `Attribution` and the allow-list when paid ads start (privacy review first) |
| Session-only | Return visits lose attribution | Consent-gated first-party cookie or store attribution server-side after consent |
| `referral` conflates organic search and other referrals | Poor channel report | Derive in CRM, or classify in `toRecord()` |
| `landing_path` omits query string | Cannot see which article query | Not needed with UTMs |
| Attribution is not attached to analytics events | Cannot tie events to leads (intentional for privacy) | Keep it that way unless a legal basis is set |
| Internal tab behaviour | Opening a link in a new tab loses attribution | Accept or use localStorage with consent |
| Referrer parsing (`new URL(document.referrer)`) has no try/catch | A malformed referrer would throw | Low risk; `document.referrer` is normally empty or a valid URL; wrap if desired |
