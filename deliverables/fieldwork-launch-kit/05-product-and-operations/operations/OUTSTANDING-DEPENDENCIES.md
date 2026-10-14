# Outstanding dependencies

Version 0.1, 14 October 2026. What the founder must provide or decide before Fieldwork can go live, grouped. "By when" is relative to the launch plan; absolute dates depend on the founder's launch date, which is not set. Items marked **blocking** stop public launch.

## 1. Decisions

| # | Decision | Why it matters | By when | Blocking? |
|---|---|---|---|---|
| D1 | Proceed with the name "Fieldwork" now, or get trademark advice first | The word is common and used in UK market research; domain, social and brand investment depend on it (`DOMAIN-DNS-EMAIL-SOCIAL-SETUP.md`) | Before buying a domain / paying for anything brand-related | Yes |
| D2 | Primary domain (recommendation: fieldworklearn.com, availability re-check needed) | Everything downstream: email, DNS, canonical URLs, social bios | Before deployment on a custom domain | Yes |
| D3 | Legal structure and who owns accounts and IP | Banking, contracts, legal pages, data protection responsibilities | Before collecting real personal data at scale | Yes |
| D4 | First market emphasis: UK, Nigeria, or both | Content, payment, legal and pricing effort | Before launch comms | No, but shapes plan |
| D5 | Lead destination and who handles leads | The forms return "not connected" without one | Before launch | Yes |
| D6 | Email platform and policy on marketing emails | The site promises "unsubscribe at any time"; nothing sends or unsubscribes yet | Before sending the first email | Yes for any emailing |
| D7 | Analytics: on (with consent) or off at launch; which provider | Privacy copy and cookie page must match | Before launch | No |
| D8 | Whether business outreach starts at launch | Needs sales material review, business terms, lead handling | Before outreach | No |
| D9 | Whether to build the onboarding platform at all, and the order (training first) | Cost and focus (`PRD-ONBOARDING-PLATFORM.md`) | After discovery | No |
| D10 | Pricing stance: keep test prices visible or hide until validated | Pricing page shows hypothetical prices labelled "Not on sale" | Before launch | No |
| D11 | Response-time commitment for enquiries | Operational promise | Before launch | No |
| D12 | Who is "the author" of Field Notes (named person or company) | Schema, trust, accountability | Before indexing | No |

## 2. Things only the founder can provide

| # | Item | Used for | By when | Blocking? |
|---|---|---|---|---|
| P1 | Legal entity name, registered address, company number | Env vars, footer, privacy notice, terms, invoices | Before launch | Yes (entity name at least, or accept "not confirmed" wording) |
| P2 | Real contact email addresses (general, business, privacy) | Env vars, privacy rights contact, form fallback | Before launch | Yes |
| P3 | Payment method and identity documents for registrar/Vercel/bank | Buying and account set-up | Before domain purchase | Yes |
| P4 | A real person's name/bio if the site will name the founder | About page currently names nobody | Optional | No |
| P5 | Social account ownership and handles | Footer links, bios | Before first posts | No |
| P6 | Photographer credits (look up each Unsplash id) | `docs/website/IMAGE-CREDITS.md` | Before launch | No (recommended) |
| P7 | Permission and proof for any future testimonial or case study | Credibility | When earned | No |
| P8 | Time estimates for the free exercise from real users | Accuracy of "15 minutes" claim | Before advertising | No |

## 3. Accounts to create (see `DOMAIN-DNS-EMAIL-SOCIAL-SETUP.md`)

Password manager; domain registrar / DNS; Vercel; email provider; Resend (optional); webhook/automation platform; CRM or spreadsheet; email marketing platform; analytics provider; Search Console and Bing Webmaster Tools; LinkedIn page; TikTok; Instagram; YouTube. None exists. Payment provider: later (not needed until a paid product).

## 4. Professional help to arrange (see `LEGAL-REVIEW-LIST.md`)

Solicitor (privacy notice, terms, cookies, marketing consent, consumer rights, business terms); IP solicitor/trade mark attorney (clearance); accountant (company, VAT, tax, currency); optionally an accessibility auditor. UK and Nigeria coverage both needed if both markets are served. Cost: not estimated here.

## 5. Technical work that does not need the founder but needs doing

Create `.env.example`; fix the OG image path; correct broken npm script paths; update manifest colours; shorten long titles; add JSON-LD when details exist; consider CSP; set up monitoring; build a webhook receiver (or choose a no-code one). See `KNOWN-LIMITATIONS-AND-FUTURE-WORK.md`.

## 6. Research the founder should commission or do

| # | Research | Why | By when |
|---|---|---|---|
| R1 | 10+ structured interviews with agency owners/ops managers (UK, Nigeria) | Validate the onboarding platform problem | Before any platform build |
| R2 | Conversations with 10 people who completed the free exercise | Validate consumer value and willingness to pay | Phase 1 of `CONSUMER-ROADMAP.md` |
| R3 | Competitor review for Nigeria and UK (AI training offers, prices) | Pricing and positioning; none verified here | Before fixing prices |
| R4 | Payment options and fees for Nigerian customers | Pricing in NGN | Before any paid test |
| R5 | Keyword measurement with a real tool | All volume figures are unmeasured | Before content investment |
| R6 | Real-device testing in Nigeria (data costs, devices) | The brand promise is "works on modest means" | Before launch comms |

## 7. Things that will go stale

- Domain availability (re-check at purchase).
- Test prices on `/pricing`.
- Privacy notice version (`draft-0.1`).
- Image licence terms and photographer credits.
- Vercel, Resend, analytics and DNS instructions (all marked verify).
- Statutory references in legal documents.
