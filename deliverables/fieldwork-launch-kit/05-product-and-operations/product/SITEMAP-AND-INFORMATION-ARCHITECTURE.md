# Sitemap and information architecture

Derived from `src/app/**`, `src/config/site.ts` (navigation), `src/app/sitemap.ts` and `src/content/field-notes/index.ts`, read 14 October 2026. If a route is added, update this file, `src/app/sitemap.ts` and the route lists in `scripts/qa/{axe,overflow}.mjs`.

## 1. Route inventory

| Route | Source | Rendering | Purpose | Primary CTA | In `sitemap.ts` |
|---|---|---|---|---|---|
| `/` | `src/app/page.tsx` | static | Positioning; routes to individuals and business; free exercise preview; email capture | Try the free exercise | yes (priority 1) |
| `/individuals` | `individuals/page.tsx` | static | Offer for individual learners (UK, Nigeria) | Free exercise; early-access email form | yes |
| `/learn` | `learn/page.tsx` | static | Hub: free exercise now, planned guided projects | Start first workflow | yes |
| `/learn/first-workflow` | `learn/first-workflow/page.tsx` | static shell + client component | The free interactive exercise | Complete exercise; email form at end | yes |
| `/business` | `business/page.tsx` | static | Business offer, three engagement sizes, platform "is a plan" | Request demonstration (`/contact?topic=business`); assessment | yes |
| `/business/real-estate` | `business/real-estate/page.tsx` | static | Real estate vertical: seven workflows, pilot outline | Demo; assessment | yes |
| `/business/assessment` | `business/assessment/page.tsx` | static shell + client component | Five-minute self-assessment, on-screen report, optional demo request | Complete assessment | yes |
| `/pricing` | `pricing/page.tsx` | static + client toggle | Honest availability, UK GBP / Nigeria NGN test prices, business scoping, platform waitlist | Free exercise; early access; business contact | yes |
| `/field-notes` | `field-notes/page.tsx` | static | Article index | Read an article | yes |
| `/field-notes/[slug]` | `field-notes/[slug]/page.tsx` | static (`generateStaticParams`) | Articles: `five-part-brief`, `check-ai-answers`, `property-ai-tasks`, `what-not-to-paste` | Free exercise | yes (per article, `lastModified` from `updated` or `published`) |
| `/about` | `about/page.tsx` | static | Who, method, principles, current status | Free exercise | yes |
| `/contact` | `contact/page.tsx` | static + forms | Business demo request (`#business`, `demo_request`) and general message (`contact`) | Submit | yes |
| `/privacy` | `privacy/page.tsx` | static | Draft privacy notice (version `draft-0.1`) | n/a | yes |
| `/terms` | `terms/page.tsx` | static | Draft terms | n/a | yes |
| `/cookies` | `cookies/page.tsx` | static + client | Storage list and analytics choice | n/a | yes |
| `/accessibility` | `accessibility/page.tsx` | static | Accessibility statement | n/a | yes |
| `/api/lead` | `api/lead/route.ts` | dynamic, Node runtime | Form submissions (POST only; GET returns 405) | n/a | no; disallowed in robots when indexing is on |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | `sitemap.ts`, `robots.ts`, `manifest.ts` | generated | SEO and PWA metadata | n/a | n/a |
| any other path | `not-found.tsx` | static 404 | Custom 404 | Back to home / links | no |

Total public pages: 15 fixed + 4 articles = 19, plus the 404 (matches `qa/link-results.json`: 19 pages crawled; `qa/axe-results.json`: 20 routes: the 19 pages plus `/not-a-page`, the 404).

## 2. Navigation model

**Header** (`mainNav`): Individuals, For Business, Field Notes, Pricing, About; persistent button "Try the free exercise" (`/learn/first-workflow`, tracked as `consumer_cta_clicked` / label `header`; `mobile-menu` in the mobile panel). Logo returns home.

**Footer** (`footerNav`):
- Learn: Free exercise, For individuals, Field Notes, Pricing
- Business: For Business, Real estate, Workflow assessment, Request a demonstration
- Company: About, Contact, Accessibility
- Legal: Privacy notice, Terms of use, Cookies

`/learn` (hub) is not in the header or footer; it is reached from page CTAs only. Decide whether that is intended (open question 1).

## 3. Hierarchy

```
/
├─ /individuals
│   └─ /learn (hub)
│       └─ /learn/first-workflow   [free exercise]
├─ /business
│   ├─ /business/real-estate
│   └─ /business/assessment
├─ /pricing
├─ /field-notes
│   ├─ /field-notes/five-part-brief
│   ├─ /field-notes/check-ai-answers
│   ├─ /field-notes/property-ai-tasks
│   └─ /field-notes/what-not-to-paste
├─ /about
├─ /contact
└─ legal: /privacy  /terms  /cookies  /accessibility
```

## 4. Audience routes

| Audience | Entry points | Path to conversion |
|---|---|---|
| Individual (UK / Nigeria) | `/`, `/individuals`, Field Notes (search/social) | free exercise -> email form -> (future) paid project |
| Business (real estate) | `/business`, `/business/real-estate`, `property-ai-tasks` note | assessment -> demo request, or contact -> demo request |
| Both/curious | `/about`, `/pricing` | free exercise or business contact |

## 5. Conversion points and where they live

| Form | Page / location label | Lead `type` | `interest` |
|---|---|---|---|
| Newsletter, home | `/` (`home-final`) | `newsletter` | `home-footer` |
| Newsletter, individuals | `/individuals` | `newsletter` | `early-access-individuals` |
| Newsletter, pricing | `/pricing` | `newsletter` | `early-access-individuals` |
| Waitlist, pricing | `/pricing` (`pricing-platform`) | `newsletter` | `onboarding-platform-waitlist` |
| Newsletter, exercise end | `/learn/first-workflow` (`free-exercise-complete`) | `newsletter` | `free-exercise-complete` |
| Demo request, contact | `/contact#business` (`contact-business`) | `demo_request` | `demo` |
| General message | `/contact` (`contact-general`) | `contact` | `question` |
| Demo request after assessment | `/business/assessment` (`assessment-results`) | `demo_request` | `assessment` |

Lead type `business_enquiry` and `assessment_report` are defined in `src/lib/validation.ts` but no form currently submits them (verified by search). They are reserved.

## 6. URL and content conventions

- `trailingSlash: false`. Lowercase, hyphenated slugs. Articles live under `/field-notes/<slug>`; slug is the `slug` field in `src/content/field-notes/<file>.ts` and must be added to `articles` in `index.ts`.
- Canonical URLs are emitted only when `NEXT_PUBLIC_SITE_URL` is set.
- The `?topic=business` query on contact links is currently not read by `contact/page.tsx` (no `topic` or `searchParams` handling found); it is harmless but gives no behaviour. The business form is reachable at `/contact#business`.

## 7. Open IA questions

1. Add `/learn` to header or footer, or keep as a CTA-only hub?
2. A dedicated `/business/onboarding` page is deliberately absent; the platform is not built. Keep the explanation inside `/business` and `/pricing`.
3. Future pages not yet built: Nigeria-specific landing page(s), guided project pages, a public changelog, press/brand page, thank-you pages for conversion tracking. Not in scope until needed.
4. Real estate is the only vertical page. Recruitment and others are noted as later in the brand strategy and are not on the site.
