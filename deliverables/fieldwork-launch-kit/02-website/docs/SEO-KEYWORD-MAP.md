# SEO keyword map

Version 0.1, 14 October 2026.

> **No keyword in this document has been measured.** Search volume, difficulty, seasonality and SERP composition are all **not measured, verify with a tool** (e.g. Google Search Console after launch, Google Keyword Planner, or a paid SEO tool). The keywords below are hypotheses derived from the page content and the audiences; they exist to guide wording, not to forecast traffic. Titles and descriptions below are the strings currently in `src/` (read from the source and cross-checked against the existing `.next` build output on 14 October 2026).

## 1. Position and constraints

- The site is `noindex` and `Disallow: /` in robots until `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ALLOW_INDEXING=true` are set. No page can rank today.
- "Fieldwork" is a common English word and an established UK market-research term ("fieldwork agencies"; see `docs/brand/BRAND-STRATEGY.md` section 12). Branded queries will compete with unrelated businesses. Expect to disambiguate: "Fieldwork AI training", "Fieldwork practise AI on real work". Whether any such competition affects ranking is **not measured**.
- Two markets, one site, one language (British English, `lang="en-GB"`, `locale: 'en_GB'`). No hreflang is needed unless separate UK and Nigeria URLs are created; if so, `en-GB` and `en-NG` need care (**verify** current Google guidance).
- Content principle: helpful and honest first. No thin pages, no AI-generated bulk articles, no claims that cannot be checked (see the Field Notes `basis` field).

## 2. Page map

Intent key: I = informational, C = commercial investigation, T = transactional/lead, N = navigational. "Market" notes where phrasing differs; Nigeria-targeted phrasing is a hypothesis, to test with local users and Search Console.

| Page | Primary query themes (hypotheses) | Intent | Market notes | Volume / difficulty |
|---|---|---|---|---|
| `/` | practise AI on real work; learn AI by doing; practical AI training; Fieldwork AI | I/C/N | UK and Nigeria | not measured, verify with a tool |
| `/individuals` | learn AI through real tasks; AI skills for work; AI for beginners practical; how to use ChatGPT at work (tool names in queries are common; do not make claims about tools you have not tested) | I/C | UK: "AI course for professionals"; Nigeria: "learn AI online Nigeria", "AI skills for students Nigeria" (**verify** phrasing) | not measured |
| `/learn` | AI exercise free; free AI practice | I | both | not measured |
| `/learn/first-workflow` | free AI exercise; AI prompt template for work; how to write a good AI prompt; five-part prompt; reusable AI workflow | I/T (signup) | both | not measured |
| `/business` | AI training for employees; AI training for teams; practical AI training for staff | C/T | UK: "AI training for staff UK"; Nigeria: "AI training for companies Nigeria" (**verify**) | not measured |
| `/business` | AI training for estate agents; AI for letting agents; AI for property listings; AI for real estate teams | C/T | UK: estate agents, letting agents, lettings; Nigeria: real estate firms, property agents (terms differ; **verify**) | not measured |
| `/business/assessment` | AI readiness assessment real estate; AI workflow assessment for agencies | C/T | both | not measured |
| `/pricing` | (mostly navigational, low SEO value; keep honest) | N | both | not measured |
| `/field-notes` | practical AI guides; AI tips for work | I | both | not measured |
| `/field-notes/five-part-brief` | how to write a good prompt; prompt structure; how to brief an AI tool | I | both | not measured |
| `/field-notes/check-ai-answers` | how to check AI answers; fact-check ChatGPT; AI hallucination check; verify AI output | I | both | not measured |
| `/field-notes/property-ai-tasks` | AI for estate agents; AI tasks for letting agents; AI in property | I/C | UK and Nigeria | not measured |
| `/field-notes/what-not-to-paste` | what not to put in ChatGPT at work; AI data protection at work; AI policy for staff | I | both; UK GDPR / NDPA mentions | not measured |
| `/about`, `/contact`, legal, `/accessibility` | branded / navigational only | N | both | not measured |

## 3. Titles and descriptions (as in source)

The root layout template is `'%s | Fieldwork'`; the home page title renders without the suffix in the build output. Character counts below are for the final rendered `<title>` and the meta description.

| Path | Title (rendered) | Chars | Description chars | Notes |
|---|---|---|---|---|
| `/` | Fieldwork: practise AI on real work | 35 | 153 | ok |
| `/individuals` | Fieldwork for Individuals: learn AI through real tasks \| Fieldwork | 66 | 205 | title long; description too long for typical snippets; brand repeated |
| `/learn` | Learn: the free exercise and what is planned \| Fieldwork | 56 | 136 | ok |
| `/learn/first-workflow` | Free exercise: turn a messy task into a reusable AI workflow \| Fieldwork | 72 | 157 | long |
| `/business` | Fieldwork for Business: practical AI training for your team \| Fieldwork | 71 | 179 | long; brand repeated |
| `/business` | AI training for real estate teams: listings, enquiries, procedures \| Fieldwork | 78 | 188 | long |
| `/business/assessment` | Real estate AI workflow assessment \| Fieldwork | 46 | 179 | ok |
| `/pricing` | Pricing and availability \| Fieldwork | 36 | 134 | ok |
| `/field-notes` | Field Notes: practical AI guides \| Fieldwork | 44 | 135 | ok |
| `/field-notes/five-part-brief` | The five-part brief: how to ask an AI tool for something useful \| Fieldwork | 75 | 110 | long |
| `/field-notes/check-ai-answers` | How to check an AI answer before you use it \| Fieldwork | 55 | 94 | ok; description short |
| `/field-notes/property-ai-tasks` | Five property tasks worth practising with AI, and four to leave to people \| Fieldwork | 85 | 130 | long |
| `/field-notes/what-not-to-paste` | What not to paste into an AI tool at work \| Fieldwork | 53 | 131 | ok |
| `/about` | About Fieldwork \| Fieldwork | 27 | 155 | redundant brand repetition |
| `/contact` | Contact Fieldwork \| Fieldwork | 29 | 111 | redundant brand repetition |
| `/privacy` | Privacy notice (draft) \| Fieldwork | 34 | 154 | "(draft)" is visible in the SERP; remove after legal review |
| `/terms` | Terms of use (draft) \| Fieldwork | 32 | 115 | same |
| `/cookies` | Cookies and browser storage \| Fieldwork | 39 | 99 | ok |
| `/accessibility` | Accessibility statement \| Fieldwork | 35 | 107 | ok |

Guideline lengths (about 50 to 60 characters for titles, about 120 to 160 for descriptions) are rules of thumb, not guarantees; search engines rewrite snippets. Candidate edits are listed in `SEO-METADATA-CHECKLIST.md`; none has been applied.

## 4. Field Notes cluster plan

Today: 4 notes, all published 2026-10-14. A cluster plan, ordered by usefulness to the core audiences. Each note must be genuinely useful, tested on real tasks where it makes claims, and carry an honest `basis`.

**Pillar A: Briefing and workflow method (consumers)**
- Existing: `five-part-brief`. Planned: "A reusable workflow card: what to keep"; "Rewrite a rough draft without losing your voice"; "Summarise a long document without losing the detail"; "Turn meeting notes into actions".
- Internal links: each links to `/learn/first-workflow` and to `check-ai-answers`.

**Pillar B: Checking and safety (both audiences; strongest differentiator)**
- Existing: `check-ai-answers`, `what-not-to-paste`. Planned: "Spot an invented reference or statistic"; "Writing a one-page AI-use rule for your team"; "Using AI with student work: what to disclose".

**Pillar C: Real estate (business)**
- Existing: `property-ai-tasks`. Planned: "Viewing feedback to vendors: a safe workflow"; "Listing copy from verified facts: a checklist"; "What to write in an AI-use policy for an estate agency" (no legal advice; point to a solicitor/professional body); "New-starter checklists from your procedures".
- Internal links: to `/business`, `/business/assessment`.

**Pillar D: Tool choice (planned, only after testing)**
- Planned series "Choosing a tool for one task". Rule: publish only what was actually tested, with date and version; the brand strategy forbids implying untested comparisons.

**Pillar E: Nigeria-specific (hypothesis)**
- Low-data AI practice; using free tiers on a phone; AI for small-business messaging on WhatsApp. Needs local research before writing; **not validated**.

Cadence: set by what the founder can maintain without quality loss. Not measured.

## 5. Internal linking rules

1. Every Field Note links to the free exercise (a `consumer_cta_clicked` label `article` button exists) and to at least one related note (`related` field).
2. Real estate content links to `/business`, then the assessment.
3. `/pricing` links to the exercise, assessment and contact. The platform is mentioned only as "planned".
4. Legal and utility pages stay in the footer, not in the body.
5. Avoid orphaning `/learn`: it is not in the header or footer navigation (see IA doc).
6. Use descriptive anchor text ("check an AI answer"), not "click here".

## 6. Schema (JSON-LD) suggestions

None is emitted today (no `ld+json` in `src`). Suggested, once a domain and legal entity exist:

| Page | Type | Notes |
|---|---|---|
| Site-wide | `Organization` (name, url, logo from `public/brand/...`, sameAs for real social URLs only) and `WebSite` | Do not add `Organization` details (address, contact points) until real and confirmed |
| `/field-notes/[slug]` | `Article` (headline, datePublished, dateModified, author as Organization or named person, image) | Author must be real; do not invent a person |
| `/learn/first-workflow` | `HowTo` is largely deprecated for rich results (**verify**); use `WebPage`/`LearningResource` only if useful | Do not mark up anything not visible on the page |
| `/business`, `/business` | `Service` (areaServed UK, Nigeria) | Only when services are actually offered and legal entity is set; no price |
| Breadcrumbs | `BreadcrumbList` on nested pages | Match visible breadcrumbs if added |
| FAQs | `FAQPage` is limited in visibility today (**verify**); do not add for rich results |
| Never | `Review`/`AggregateRating`, `Product` with price, `Course` with fabricated provider/offers | No reviews or products exist |

## 7. Open Graph and social

`pageMetadata` sets `og:title` to "<title> | Fieldwork", locale `en_GB`, a 1200x630 image reference and `twitter:card=summary_large_image`. **The image path points to `/brand/og/og-default.png`, which does not exist** (file is at `public/brand/social/og-default.png`). Fix before sharing any URL.

## 8. Tracking and measurement

- Google Search Console (domain property) and Bing Webmaster Tools: **not set up**; require the domain and DNS (see `docs/operations/DOMAIN-DNS-EMAIL-SOCIAL-SETUP.md`). Submit `https://<domain>/sitemap.xml`.
- Page-level analytics only with consent (`ANALYTICS-EVENT-SPEC.md`); Search Console is independent of cookie consent and is the main unbiased source for impressions and queries.
- UTM conventions: `docs/operations/ATTRIBUTION-GUIDE.md`.
- Track: impressions/clicks by page and country (UK vs Nigeria), indexed pages, Core Web Vitals (field data needs traffic), branded vs non-branded split, free-exercise starts by landing page.
- Review monthly; change titles only with reasons, one batch at a time.

## 9. Risks

- Brand-term collision (market research "fieldwork").
- Thin or duplicate content; four notes is a very small corpus.
- AI-answer search features may reduce clicks to informational pages (impact **not measured**).
- Nigeria search behaviour and device mix unknown.
- Over-optimising for tool names (ChatGPT etc.) risks unverified claims and trademark use; use descriptive terms and be accurate.
