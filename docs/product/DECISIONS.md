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

## Round 9
- **Automations hero:** one-line title ("Lead capture & viewings"), paper background with the cobalt halftone dots, the whole video frame visible on landing. The video plays from `public/media/automation-walkthrough.mp4` (optional poster: `automation-walkthrough-poster.jpg`); until it exists the frame is a placeholder.
- **Contact strip under every price:** Register interest, `fieldwork@waykongroup.com` (everywhere), UK phone +44 7508 533692, Nigerian WhatsApp +234 704 716 7280, United States shows email only. Details live in `src/content/contact.ts`. The email domain was dictated aloud and needs confirming.
- **Demo website at `/demo`:** "Larkfield & Pryce", a fictional London estate agency. Public site (home with opening animation, properties search and filters, property pages with gallery and viewing or enquiry forms, new homes with unit statuses, about, journal, contact, brand pack example) and a staff area at `/demo/admin` (demo sign-in, add and edit listings, photographs from a library or uploaded, drafts, publish and unpublish, featured, sold/let/reserved, delete, enquiries and viewing confirmation). All data is stored in the visitor's own browser; "Reset demo data" restores it. No Nigerian housing photographs are used in the demo.
- Demo code: `src/app/demo`, `src/components/demo`, `src/demo` (data, store, formatting). Styles are scoped under `.demo` in `src/app/demo/demo.css`.

## Rounds 10 and 11
- **Brand renamed** from Larkfield & Pryce to **Halden**, a neutral international name. Listings stay British; the brand is presented for UK, Nigeria and US audiences.
- **Four concepts** (Frame, Heritage, Atelier, Rail) were built as standalone HTML in `public/concepts/` and compared. **Rail** was chosen. The method is written up in `docs/design/CONCEPT_PLAYBOOK.md` for reuse on future sites.
- **The demo at `/demo` is now the Rail design**: fixed side rail and drawer menu, "Ask Halden" search pill, live index of homes with hover preview, stacking cards, quote, areas, journal, giant-wordmark footer. Styles: `src/app/demo/demo.css`. Fonts load from `public/concepts/fonts`.
- **Properties page** has the buy/rent, area/street/postcode, type, bedrooms, max price box at the top, then a simple listing grid.
- **Slim banner** at the top of every demo page: demonstration website, fictional company, Properties, Try the listing system, Back to Fieldwork.
- **Pop-up:** the corner pop-up was removed. A centred dialog now appears once per visit after about 15 seconds (not in the admin area or inside preview frames). The listing system is also reachable from the banner, the menu drawer and the footer.
- **Listing system** is restyled to match, and the Add property form has an **Autofill all details** button that cycles through four sample homes for demonstrations.
- **Websites page preview** is a live, blurred, scaled iframe of `/demo` (embed mode hides the banner, intro and pop-up) with a View demo button. `X-Frame-Options` is now `SAMEORIGIN` so the site can frame itself.
- **Brand and Social Starter Pack "View examples"** opens `public/brand-pack/halden.html`: a concept-style example for Halden with logo, colour, type, a nine-post Instagram grid, story, carousel, cover, static ads, a two-week calendar, captions and prompts. `/demo/brand-pack` redirects there.
