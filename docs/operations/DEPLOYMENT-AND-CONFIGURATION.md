# Deployment and configuration

Version 0.1, 14 October 2026. Written from `package.json`, `next.config.mjs`, `src/config/site.ts`, `src/lib/leads.ts`, `src/app/api/lead/route.ts`, `src/app/robots.ts`. **Nothing has been deployed.** No Vercel project, domain, environment variable, email account or analytics account exists as far as this repository or the build environment shows. Vercel's dashboard wording changes: **verify each step against current Vercel documentation**.

Repository remote (read from git config): `https://github.com/keneokonjo-web/fieldwork`. Working branch when this was written: `claude/exciting-maxwell-l5r45m` (not merged anywhere as far as checked). Default branch not verified.

Source files refer to `docs/operations/CONFIGURATION.md`; that file does not exist. This document replaces it; update the comments in `site.ts`, `leads.ts`, `rate-limit.ts` when convenient.

## 1. Environment variables

There is **no `.env.example` in the repository** (`.gitignore` expects one). Create it from the table below. Variables prefixed `NEXT_PUBLIC_` are baked into the client bundle at **build** time: change requires a new deployment. Server variables are read at runtime.

| Variable | Kind | Purpose | Default if unset | Required to launch? |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public, build | Production origin, no trailing slash, e.g. `https://example.com`. Used for `metadataBase`, canonical URLs, sitemap, robots, OG URLs | Empty; `absoluteUrl()` falls back to `http://localhost:3000`; no canonical emitted | Yes (to index) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | public, build | Must be exactly `true` AND site URL set to allow indexing | Off: `noindex, nofollow` and `Disallow: /` | Yes, set last (see section 5) |
| `NEXT_PUBLIC_CONTACT_EMAIL_GENERAL` | public, build | Shown on contact/accessibility pages; fallback mailto on forms; privacy fallback | None; pages show no address | Yes |
| `NEXT_PUBLIC_CONTACT_EMAIL_BUSINESS` | public, build | Business address on the contact page | None | Recommended |
| `NEXT_PUBLIC_CONTACT_EMAIL_PRIVACY` | public, build | Privacy requests on the privacy page; falls back to general | General address | Recommended (a monitored privacy contact matters for UK/Nigeria data rights) |
| `NEXT_PUBLIC_LEGAL_ENTITY_NAME` | public, build | Legal operator name in footer, privacy notice, review box | None; pages say the entity is not confirmed | Yes, once a company exists |
| `NEXT_PUBLIC_LEGAL_ADDRESS` | public, build | Registered address. Read into config but **not displayed by any page yet** | None | Once real |
| `NEXT_PUBLIC_COMPANY_NUMBER` | public, build | Company registration number. Read into config but **not displayed by any page yet** | None | Once real |
| `NEXT_PUBLIC_LEGAL_LAST_REVIEWED` | public, build | Date legal pages were reviewed; shown in the draft box | None: "It has not been reviewed" | Only set after a real review |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | public, build | Enables analytics code path + consent banner; value is the site's domain as registered with the analytics provider | Empty: no banner, no script | No |
| `NEXT_PUBLIC_PLAUSIBLE_SRC` | public, build | Analytics script URL | `https://plausible.io/js/script.js` | No (set for self-hosted/proxy) |
| `NEXT_PUBLIC_SOCIAL_TIKTOK`, `_LINKEDIN`, `_INSTAGRAM`, `_YOUTUBE` | public, build | Full profile URLs shown in the footer when set | Hidden | No; set only when accounts are real |
| `LEAD_WEBHOOK_URL` | server | POST JSON lead record to this URL (Zapier, Make, n8n, Apps Script, CRM) | Adapter off | One adapter required |
| `LEAD_WEBHOOK_SECRET` | server | Sent as header `x-fieldwork-secret` on webhook requests | No header | Recommended with webhook; receiver must check it |
| `RESEND_API_KEY` | server | Resend API key (email notification adapter) | Adapter off | Optional alternative |
| `LEAD_NOTIFY_EMAIL` | server | Recipient of lead notification emails | Adapter off | With Resend |
| `LEAD_FROM_EMAIL` | server | Sender address (needs a domain verified in Resend) | Adapter off | With Resend |
| `LEAD_DEV_FILE` | server | `true` appends to `.data/leads.jsonl`; ignored when `NODE_ENV=production` | Off | No. **Do not use in production** (also ineffective on serverless filesystems) |

Adapter rule: all configured adapters run. Zero configured -> HTTP 503 `not_configured` and the form shows "Not connected yet". At least one succeeded -> success.

Data in the webhook/email: the full `LeadRecord` (see `CRM-FIELD-DEFINITIONS.md`), which includes personal data. Choose destinations accordingly and list them in the privacy notice.

## 2. Local run

```bash
cd /home/user/fieldwork
npm ci            # or npm install
npm run dev       # http://localhost:3000
npm run check     # typecheck + lint + unit tests
npm run build && npm run start
```
Node 20.9+ is required (Node 22 was used). To test lead delivery locally: set `LEAD_DEV_FILE=true` in `.env.local` and submit a form; check `.data/leads.jsonl` (git-ignored).

## 3. Vercel deployment steps (not yet performed)

1. Create or choose a Vercel account/team. Decide on ownership (company account, not a personal one, once the company exists).
2. Import the GitHub repository (`keneokonjo-web/fieldwork`) as a new project. Framework preset should auto-detect Next.js; build command `next build`, output default. Node version: set to 20.x or 22.x in project settings.
3. Set environment variables **per environment**:
   - **Preview**: leave `NEXT_PUBLIC_ALLOW_INDEXING` unset (so previews are noindex); optionally set `LEAD_WEBHOOK_URL` to a **test** destination; never point previews at the live CRM.
   - **Production**: all values for launch (section 1), except `NEXT_PUBLIC_ALLOW_INDEXING` at first.
4. Deploy. Visit the `*.vercel.app` URL. Confirm: pages load, `view-source` shows `noindex`, `/robots.txt` disallows all, forms return "Not connected yet" if no adapter.
5. Add the custom domain (after purchase; see `DOMAIN-DNS-EMAIL-SOCIAL-SETUP.md`). Choose primary (apex or `www`) and redirect the other. Wait for TLS.
6. Set `NEXT_PUBLIC_SITE_URL` to the primary origin in Production and redeploy (it is build-time).
7. Run the pre-indexing checks (section 5), then set `NEXT_PUBLIC_ALLOW_INDEXING=true` and redeploy.
8. Submit the sitemap to Search Console.

Build settings to check: no `vercel.json` exists; defaults are assumed. Function region for `/api/lead` (Node runtime) defaults to the project's setting: for UK and Nigerian visitors choose a region close to London (e.g. `lhr1`) (**verify** current region names and plan limits).

## 4. Preview vs production

| Aspect | Preview | Production |
|---|---|---|
| Indexing | Off (do not set `ALLOW_INDEXING`) | Off until section 5 passes, then on |
| Lead destination | Test webhook or none | Real, tested destination |
| Analytics | Off or a separate test site/domain in the provider | Real domain |
| Legal pages | Draft | Reviewed or visibly draft |
| Access | Consider Vercel deployment protection for previews (**verify** plan) | Public |

A preview that sets `NEXT_PUBLIC_SITE_URL` to production while public would emit canonicals to production for duplicate content; avoid.

## 5. Enabling indexing safely (do these in order)

1. Domain and TLS working; primary host chosen; other host redirects.
2. Legal pages reviewed (or at least visibly marked) and entity details set; "(draft)" removed from titles when reviewed.
3. A real lead destination connected and a **live end-to-end test** passed: submit each form type once (newsletter, contact, demo request, assessment follow-up) and see it arrive with attribution and consent fields.
4. Contact mailboxes exist and are monitored (general, business, privacy).
5. OG image path defect fixed (`metadata.ts`) and link preview tested.
6. Analytics decision made (on with consent, or off) and privacy/cookie pages match reality.
7. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in Production only; redeploy.
8. Verify: `view-source:` shows `index, follow` and a canonical; `/robots.txt` shows `Allow: /` and a Sitemap line; `/sitemap.xml` lists 19 URLs on the real domain.
9. Search Console + Bing: verify and submit.

To switch indexing off again: remove the variable (or set anything other than `true`), redeploy; also request removal in Search Console if needed.

## 6. Lead adapters

**Webhook (recommended first).** Create a receiver (Zapier "Catch Hook", Make, n8n, Apps Script, or a CRM endpoint) -> set `LEAD_WEBHOOK_URL` and a long random `LEAD_WEBHOOK_SECRET` -> receiver must verify the `x-fieldwork-secret` header. The request is `POST application/json` with an 8-second timeout; non-2xx counts as failure. There is no retry; consider the receiver's own reliability. Verified by browser test with a mock webhook (secret and attribution present).

**Resend.** Create an account, verify a sending domain (SPF/DKIM via DNS), create an API key with sending scope only, set `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL` (founder inbox), `LEAD_FROM_EMAIL` (address on the verified domain). Email subject: `Fieldwork: <type> from <name or email>`. Not tested against the live Resend API. Resend sends a notification only; it does **not** store leads or add subscribers.

**Both** can run together (belt and braces). **Neither is a mailing-list platform**: nobody is subscribed to any list and no confirmation or welcome email is sent. The form promises "unsubscribe at any time"; that requires an email platform with unsubscribe handling before any marketing email is sent. See OUTSTANDING-DEPENDENCIES.

## 7. Rate limiting and abuse

Built-in: in-memory limiter 8 per 10 minutes per IP (weak on serverless), honeypot, minimum 1.2 s fill time, 30,000-byte body limit, same-origin check. Recommended at launch: Vercel Firewall rule rate-limiting `POST /api/lead` and, if abuse appears, bot protection (**verify** plan features). Monitor the destination for spam. Consider CAPTCHA only if abuse is observed (adds accessibility and privacy cost).

## 8. Monitoring

Not set up: uptime monitor, error tracking, log drain, alerts on lead failure. Minimum: Vercel runtime logs (look for `[lead] delivery adapter failed`), an uptime check on `/`, and a weekly test lead. The site writes no personal data to logs by design (error message only).

## 9. Rollback

1. In Vercel, promote a previous successful deployment to production (instant rollback) (**verify** UI), or `git revert` and push.
2. Environment variable mistakes: `NEXT_PUBLIC_*` changes need a redeploy to take effect or to be undone.
3. If indexing was enabled by mistake: unset `NEXT_PUBLIC_ALLOW_INDEXING`, redeploy, use Search Console removals if pages were crawled.
4. If a lead adapter misbehaves: remove its variable and redeploy. The form will show an honest error instead of silently losing data.
5. Keep the last known-good deployment URL in `LAUNCH-CHECKLIST.md`.

## 10. Security and secrets handling

- Server secrets only in Vercel environment settings (mark sensitive), never in git, never in `NEXT_PUBLIC_*`.
- Rotate `LEAD_WEBHOOK_SECRET` and `RESEND_API_KEY` if exposed.
- Restrict who can edit Vercel project settings; enable 2FA (see DOMAIN doc section on account security).
- Security headers are set in `next.config.mjs`; add CSP and verify HSTS after deploy (TECHNICAL-ARCHITECTURE.md section 7).

## 11. Post-deploy smoke tests

Run `scripts/qa/*` against production only after editing the hardcoded `http://localhost:3100` bases (they do not take a base URL except `screenshots.mjs` via `BASE_URL`). See `QA-HOW-TO-RERUN.md`. Manual: each page loads; mobile menu; exercise completes; pricing toggle; each form; 404 page; headers (`curl -I`).

## 12. Known gaps before deployment

Missing `.env.example`; OG image path defect; `docs:pdf`, `kit:build`, `qa:links` npm scripts point at missing files; no CSP; no monitoring; manifest colours out of date; no real domain/legal entity/mailboxes. See `KNOWN-LIMITATIONS-AND-FUTURE-WORK.md`.
