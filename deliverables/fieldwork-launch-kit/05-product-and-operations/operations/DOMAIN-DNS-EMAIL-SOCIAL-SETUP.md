# Domain, DNS, email and social setup

Version 0.1, 14 October 2026. Nothing in this document has been done: no domain bought, no DNS record created, no mailbox or social account made. This is a plan and a checklist. Not legal advice; the trademark section is a caution, not a clearance.

## 1. Domain availability findings

**Source and method.** Two bulk availability calls to the Vercel domains tool (`get_bulk_availability`) run earlier in this project on 14 October 2026 (recorded in the session transcript). The tool returned `available: true/false` per domain. No price lookup was made, so **no domain prices are known**. "Not available" means the tool reported it cannot be registered at that moment (registered, reserved or premium); it does not say who owns it or whether the owner is a trademark conflict. Availability changes by the minute; **re-check immediately before buying**.

**Reported available (14 Oct 2026):**

| Domain | Note |
|---|---|
| fieldworklearn.com | Brand + purpose, .com |
| fieldworkhq.co.uk | UK-focused |
| fieldwork.study | Exact name, descriptive new TLD |
| fieldwork.training | Exact name, descriptive new TLD |
| fieldwork.courses | Exact name, descriptive new TLD |
| fieldwork.school | Exact name, descriptive new TLD |
| fieldwork.education | Exact name, long TLD |
| fieldwork.run | Exact name, informal TLD |
| fieldworkhq.ai | AI TLD, "hq" suffix |
| fieldworkhq.org | .org suffix |
| fieldworkpractice.org | .org, matches "practise" theme |

**Reported not available** (all of these returned `available: false`): fieldwork.com, fieldwork.co.uk, fieldwork.ai, fieldwork.io, fieldwork.co, fieldwork.app, fieldwork.org.uk, fieldwork.london, fieldwork.academy, fieldwork.guide, fieldwork.page, fieldwork.institute, fieldwork.systems, fieldwork.team, fieldwork.pro, fieldwork.online, fieldwork.world, fieldwork.dev, fieldwork.tech, fieldwork.site, fieldwork.club, fieldwork.zone, fieldwork.company, fieldwork.digital, fieldwork.agency, fieldwork.studio, fieldwork.tools, fieldwork.work, fieldwork.lol, fieldworkhq.com, fieldworkhq.co, fieldworkhq.io, tryfieldwork.com, getfieldwork.com, usefieldwork.com, joinfieldwork.com, fieldworkai.com, fieldworklearning.com, fieldworklabs.com, fieldworkpractice.com, fieldworkpractice.co.uk, fieldworkstudio.com, fieldworkstudio.co.uk.

**Not verified** (requested but absent from the returned results, so unsupported by the tool or not answered): fieldwork.ng, fieldwork.com.ng, fieldwork.africa, fieldwork.co.ke, fieldwork.lab, fieldworkhq.ng. Check Nigerian `.ng` / `.com.ng` domains with an accredited registrar (the `.ng` registry's rules, eligibility and pricing: **verify**). Note that the full set of domains checked was only those listed in the two calls.

**Observation.** The exact `fieldwork` name is taken on every mainstream TLD checked (.com, .co.uk, .ai, .io, .co, .app, .org.uk). That is itself a signal about how common the word is.

## 2. Trademark and name caution

`docs/brand/BRAND-STRATEGY.md` section 12 records that a search on 14 October 2026 found several UK businesses using "Fieldwork" or close variants in **market research** ("fieldwork agencies" is an established industry term). The details of that search (names, classes, registrations) are **not preserved in the repository**; treat the finding as a prompt, not as an analysis.

Questions for an IP solicitor / trade mark attorney (before buying merchandise, ads, or heavy brand investment):
1. Search and clearance in the UK (UKIPO) and Nigeria (Trademarks Registry, **verify** authority and process), classes covering education/training (class 41), software (class 9, 42), advertising/business services (35).
2. Is "Fieldwork" distinctive enough for registration, given its ordinary dictionary meaning, or only registrable with a logo or additional element?
3. Risk of confusion with market-research businesses in class 35/41; practical impact on enforcement, domains and social handles.
4. Whether "Fieldwork Onboard" (internal name for the future platform) or "Field Notes" create separate risks.
5. Costs and timing; whether to file before launch.
6. Company-name check at Companies House (UK) and CAC (Nigeria) **verify** is separate from trademark clearance.

Practical hedge: domains and handles are cheap compared with a rebrand. If the founder wants to stay flexible, register one primary domain and one defensive domain, and delay paid promotion until advice is received.

## 3. Recommendation

| Role | Recommendation | Reason |
|---|---|---|
| Primary | **fieldworklearn.com** | Only .com combination reported available; reads as the brand plus what it does; works for both UK and Nigeria; a .com avoids regional trust issues; it also disambiguates from market-research "fieldwork" in search and email |
| Defensive / UK | fieldworkhq.co.uk | Cheap defensive registration if a UK identity is wanted; consider only if budget allows |
| Optional exact-match | fieldwork.study or fieldwork.training | Exact brand on a descriptive TLD; use as redirects or short links; do not use as the primary email domain until deliverability and trust are tested (**verify**) |
| Nigeria | Check fieldwork.ng / fieldwork.com.ng (not verified) | A local domain can help trust; verify eligibility and cost |

Counter-view: shorter, exact-match domains are easier to say; but none of the cleaner ones are available. Decision is the founder's (and may change after trademark advice). If a different name is chosen later, all of this changes.

Do not buy anything until: the founder chooses the account owner (company or personal), has a payment method, and has decided whether to wait for trademark advice.

## 4. Where to register and who owns it

- Register in the **legal entity's** name where possible (the future company), or in the founder's name with a plan to transfer. A domain owned by a freelancer or friend is a common business risk.
- Use a registrar account with 2FA (authenticator app or hardware key, not SMS only), a role mailbox as the contact where allowed, and registrar lock enabled. Enable auto-renew and add a calendar reminder 60 days before expiry.
- WHOIS privacy: enable (default at many registrars; **verify**). Some TLDs (e.g. `.uk`) and the Nigerian registry have their own rules.
- Buying through Vercel is possible (the tool exists) and simplifies DNS, but moving registrar later is possible too. Choose deliberately; **verify** prices and transfer rules at the time.

## 5. DNS records checklist

Assume `example.com` stands for the chosen domain. Where DNS is hosted (registrar, Vercel, Cloudflare) determines where to create the records; if you change nameservers, copy all existing records first.

| # | Record | Host | Value (pattern) | Purpose | Done |
|---|---|---|---|---|---|
| 1 | Apex to Vercel | `@` | `A 76.76.21.21` (Vercel's documented apex IP at time of writing; **verify** in Vercel's domain settings) or ALIAS/ANAME | Site | no |
| 2 | www to Vercel | `www` | `CNAME cname.vercel-dns.com` (**verify** exact target in the Vercel dashboard; it may be project-specific) | Site | no |
| 3 | Redirect rule | in Vercel domain settings | Redirect non-primary host to primary (301/308) | One canonical host | no |
| 4 | MX | `@` | Per mail provider (e.g. Google Workspace, Microsoft 365, Zoho: **verify** values from the provider) | Receive email | no |
| 5 | SPF | `@` TXT | `v=spf1 include:<mail provider> include:<sending service> ~all` | Authorise senders. **Only one SPF record per domain**; merge includes. Start with `~all` then consider `-all` | no |
| 6 | DKIM | provider-specific selector, e.g. `<selector>._domainkey` TXT/CNAME | From mail provider and from Resend (or any sender) | Sign outgoing mail | no |
| 7 | DMARC | `_dmarc` TXT | `v=DMARC1; p=none; rua=mailto:dmarc@example.com; adkim=s; aspf=s` first; move to `quarantine` then `reject` after reviewing reports for a few weeks | Anti-spoofing and reporting | no |
| 8 | Resend domain verification | records shown by Resend (often a subdomain such as `send`) | SPF + DKIM + optional return-path | Lead notification emails via `LEAD_FROM_EMAIL` | no |
| 9 | CAA | `@` | e.g. `0 issue "letsencrypt.org"` and any CA your host uses (**verify** which CAs Vercel and the mail/other hosts use before adding CAA, or issuance can fail) | Limit who can issue certificates | no |
| 10 | Search Console | `@` TXT | `google-site-verification=...` (domain property) | Search ownership | no |
| 11 | Analytics (if provider requires) | per provider | per provider | Site verification | no |
| 12 | MTA-STS / TLS-RPT / BIMI | optional | later | Hardening / brand logo in inbox | deferred |

Checks after creation: use an independent DNS lookup tool; send a test message to a Gmail and a Microsoft account and read the "authentication results" headers (SPF, DKIM, DMARC pass); test the redirect from `http://`, apex and `www`; check certificate; wait for TTL.

Do not use the same domain for lead-notification mail and marketing mail without separating subdomains and reputation (marketing platforms often prefer a subdomain, **verify**).

## 6. Email structure

Role addresses (names the site already expects through `siteConfig.email`): 
- `hello@` -> `NEXT_PUBLIC_CONTACT_EMAIL_GENERAL`
- `business@` -> `NEXT_PUBLIC_CONTACT_EMAIL_BUSINESS`
- `privacy@` -> `NEXT_PUBLIC_CONTACT_EMAIL_PRIVACY` (should be monitored; data-subject requests have statutory deadlines: **verify** UK GDPR and NDPA timelines with a solicitor)
- Add when needed: `accessibility@` (the accessibility page uses the general address today), `security@`, `billing@`/`accounts@`, `dmarc@` (reports).

Forwarding vs mailbox:

| Option | Pros | Cons |
|---|---|---|
| Forward all role addresses to the founder's existing inbox | Free or very cheap; immediate | Replies come from the personal address unless "send as" is configured; weaker deliverability and confusion; personal inbox mixes data-subject requests; not suitable once staff join |
| One paid mailbox (hello@) + aliases for the others | Professional; replies from the right domain; simple | Monthly cost per user (**verify** current prices); single point of ownership |
| Shared mailboxes/groups per role | Scales to a team; audit trail | More setup and cost |

Recommended start: one paid mailbox for the founder plus aliases for `hello@`, `business@`, `privacy@` with "send as" enabled, 2FA on, recovery options on a second secure channel. Document who reads which address and the response target (to be decided).

## 7. Social handle plan

Handle availability has **not been checked** on any platform. Check manually before relying on any name.

| Platform | Why | Handle ideas (in preference order) | Notes |
|---|---|---|---|
| LinkedIn (company page) | Business route, real estate | Fieldwork (full name likely taken: use "Fieldwork Learn" or a descriptor) | Needs a personal profile as admin; use two admins; the company page URL slug is separate from the display name |
| TikTok | Short practical demos (consumer) | fieldworklearn, fieldwork.learn, usefieldwork | Site config supports a TikTok link |
| Instagram | Plate/label visual identity | fieldworklearn, fieldwork.learn | Professional account; link in bio to `/learn/first-workflow` |
| YouTube | Longer how-tos | Fieldwork Learn | Channel handle `@fieldworklearn` pattern |
| X | Optional | none planned | The site config has no X field |
| Email/Google account for sign-ups | Ownership | use a role address (e.g. `social@` alias or the founder mailbox) | See ownership guidance below |

Keep handles identical across platforms where possible. Reserve names even if posting later; empty accounts are fine but do not publish claims.

**Bio placeholders** (adapt per platform length; character limits vary and change: **verify**). They must not claim customers, results, certifications or partnerships.

- Short (about 80 chars): "Practise AI on real work. Free guided exercise. UK and Nigeria."
- Medium: "Fieldwork teaches practical AI through real tasks: write the brief, run it, check the result, keep the workflow. Free exercise, no account. Training for real estate teams."
- Business (LinkedIn about): "Fieldwork helps real estate teams use AI on their own workflows (listings, enquiries, reports, procedures) with clear checks and people always deciding. Currently offering demonstrations and pilot discussions." (Only if that is true on the day.)
- Link: `https://<domain>/learn/first-workflow` with UTM, see `ATTRIBUTION-GUIDE.md`.
- Avatar: `public/brand/social/fieldwork-avatar-1024.png` / `-400.png`; LinkedIn banner template: `brand/templates/linkedin-banner-1584x396.png`.

## 8. Account setup checklist per platform

For each account record: owner, login email, 2FA method, recovery method, date created, admins.

| Platform | Steps | Done |
|---|---|---|
| Registrar / Vercel | Account with company or founder email; 2FA; billing; domain lock; auto-renew; calendar reminder | no |
| DNS host | As above; export zone file after setup | no |
| Mail provider | Domain verification; MX/SPF/DKIM/DMARC; mailbox; aliases; admin 2FA; recovery admin | no |
| Resend (optional) | Domain; API key (sending only); test email; store key in Vercel only | no |
| Webhook platform (Zapier/Make/n8n/Apps Script) | Receiver; secret; destination (CRM or sheet); error alerts | no |
| Analytics provider | Account; add domain; script setting; decide self-hosted vs cloud; retention | no |
| Search Console / Bing | Verify domain; submit sitemap | no |
| LinkedIn | Personal admins; company page; logo; banner; about; website link | no |
| TikTok / Instagram / YouTube | Create with role email; business/creator settings; bio; link; 2FA | no |
| Payment provider | **Not in scope yet** (no paid product) | deferred |
| Password manager | Team vault; shared items for role accounts | no |

## 9. 2FA, passwords and ownership

1. Use a password manager from day one; unique long passwords for every account; never reuse; no credentials in chat, documents or the repository.
2. Prefer authenticator app or passkey/hardware key; avoid SMS as the only factor. Keep recovery codes in the password manager (and a sealed offline copy).
3. Ownership: accounts belong to the business. Register role email addresses as login emails where platforms allow; add a second trusted admin once a collaborator exists. Record "bus factor": who can recover each account if the founder is unavailable.
4. Separate the domain registrar from the email provider account where practical, so one compromise does not take both.
5. Review access quarterly; remove ex-collaborators immediately.
6. Phishing awareness: registrar and platform emails are common phishing targets; navigate to dashboards directly.

## 10. Order of operations

1. **Decide** the name risk path (trademark advice now vs later) and the primary domain. Decide account ownership (company vs founder).
2. **Set up the password manager** and a secure founder email for admin.
3. **Form the company** if going ahead (see `LEGAL-REVIEW-LIST.md`) so accounts can use real details.
4. **Re-check availability**, then **buy** the primary domain (and optional defensive domains). Enable lock, auto-renew, 2FA.
5. **Create the Vercel project** from the repository and deploy to the `*.vercel.app` URL (`DEPLOYMENT-AND-CONFIGURATION.md`).
6. **Add the domain** to Vercel; create apex/www records; set the redirect; confirm TLS.
7. **Set up email**: provider, MX, SPF, DKIM, DMARC (p=none); create mailboxes/aliases; send authentication tests.
8. **Set the contact email env vars** and redeploy.
9. **Connect the lead path**: webhook receiver (and/or Resend with its DNS records). Run a live end-to-end test of every form.
10. **Create Search Console** and verify via DNS TXT.
11. **Create social accounts** with consistent handles; fill bios; add links to the site config env vars.
12. **Decide analytics**; create the account; set the env vars; test consent and events.
13. Complete legal review items; set entity/last-reviewed env vars.
14. **Enable indexing** only after the checklist in `DEPLOYMENT-AND-CONFIGURATION.md` section 5.
15. Move DMARC toward `quarantine`/`reject` after a few weeks of clean reports.

Dependencies that block the chain: company formation and account ownership (3), money (4), a lead destination (9), legal review (13).
