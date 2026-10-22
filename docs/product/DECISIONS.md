# Product and website decisions (Round 7)

Source of truth for the business model is the founder's master brief (real-estate technology and AI enablement for estate agencies, brokerages and developers; UK and Nigeria first, US later). This file records decisions made while building the marketing site.

## Pricing (intended selling prices, set by the founder, not verified market averages)
| Product | UK | US (held back) | Nigeria |
|---|---:|---:|---:|
| Digital Presence Package (website + self-managed listings) | £1,500 | $2,000 | **₦2,500,000** (was ₦2,000,000) |
| Lead capture and follow-up | £400 | $600 | ₦799,000 |
| Viewing and feedback | £400 | $600 | ₦799,000 |
| Both automations | £699 | $1,000 | ₦1,200,000 |
| Brand and Social Starter Pack (add-on) | £500 | $600 | ₦600,000 |
| AI Workshop | to be announced | | |

Observation, no change made: the ₦ prices imply different exchange rates (about ₦1,667, ₦2,000, ₦1,717 and ₦1,200 to the pound). The Starter Pack is the outlier.
Prices live in `src/content/pricing.ts`. Only the UK and Nigeria are shown on the site. There is no separate pricing page: each price sits on its product page.

## Site structure
Home · Websites & Listings · Automations · AI Workshop · About · Request a demo, plus Privacy, Terms, Cookies, Accessibility and Image credits.
Retired: the individual/business chooser, Individuals, For Business, course, builder, dashboards, log in, Field Notes (content archived in `docs/archive/field-notes`), pricing page. Old addresses redirect (see `next.config.mjs`).
AI Workshop (formerly "AI Learning"): a page only. Nothing behind it is built. It is labelled planned and says price is to be announced.

## Automations: standalone, beside the CRM
The two automations must work with or without the Fieldwork website and must not replace a CRM. Three ways in: a simple one-screen entry form for staff, a website form, or (quoted) a CRM or spreadsheet. A small log of what was sent is kept so reminders can fire. It is not a CRM and can be exported. Email is standard. SMS goes through the client's own provider account. WhatsApp is planned and not promised until verified. Scope change from the brief: the simple entry form is standard, at the same price.

## Technical direction (to build next)
One template codebase, one deployment per client (own database, hosting and domain). Next.js plus Supabase (login, database, image storage), with a storage layer so development needs no account. Developer and agency are two configurations of the same system. Automations run inside the same system on the database, email sending and scheduled jobs.

## Compliance
Messages only to people who gave their details for that purpose, with an opt-out. Flag anything that may not comply with UK GDPR/PECR or the Nigeria Data Protection Act to the founder.

## Imagery
Photographs of Nigeria and the UK from Wikimedia Commons (CC BY, CC BY-SA, CC0) plus Unsplash stock. Credits are in each caption where practical and on `/image-credits`. Register: `src/content/images.json`. Scripts: `scripts/brand/fetch-commons.mjs`, `curate-commons.mjs`.
