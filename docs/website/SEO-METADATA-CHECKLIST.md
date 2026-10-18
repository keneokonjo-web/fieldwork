# SEO and metadata checklist

Version 0.1, 14 October 2026. Status values: Done (in code and visible in the existing build), Open, Blocked (needs a decision/domain). Evidence references the source, not a live site: nothing is deployed.

## A. Indexing controls

| # | Check | Status | Evidence / action |
|---|---|---|---|
| A1 | Site is `noindex, nofollow` and robots disallows all by default | Done, tested | `<meta name="robots" content="noindex, nofollow"/>` in build output; browser test "site is noindex and robots disallows by default" passes |
| A2 | Indexing needs both `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ALLOW_INDEXING=true` | Done | `src/config/site.ts` (`allowIndexing`) |
| A3 | Env values set in **production only**, not Preview | Open | Vercel env scoping; see DEPLOYMENT doc |
| A4 | After enabling: view source on `/` shows `index, follow`, canonical present | Open | Re-check on the deployed URL |
| A5 | `robots.txt` after enabling: `Allow: /`, `Disallow: /api/`, `Sitemap:` line | Done in code | `src/app/robots.ts` |
| A6 | `/api/lead` returns 405 for GET; not in sitemap | Done | `route.ts` |
| A7 | Legal pages "(draft)" in titles removed after legal review | Blocked | `privacy`, `terms` metadata |
| A8 | Unused host aliases (`*.vercel.app`) do not leak into the index | Open | After custom domain: set primary domain, redirect or `noindex` the vercel.app URL (**verify** Vercel behaviour) |

## B. Titles and descriptions

| # | Check | Status | Action |
|---|---|---|---|
| B1 | One unique title and description per page | Done | `pageMetadata()` on every page; see SEO-KEYWORD-MAP section 3 |
| B2 | Titles at or under about 60 chars | Open | Over: `/individuals` 66, `/learn/first-workflow` 72, `/business` 71, `/business` 78, `five-part-brief` 75, `property-ai-tasks` 85 |
| B3 | Descriptions at or under about 160 chars | Open | Over: `/individuals` 205, `/business` 179, `/business/assessment` 179, `/business` 188 |
| B4 | No duplicated brand in title | Open | `/about` and `/contact` render "About Fieldwork \| Fieldwork" and "Contact Fieldwork \| Fieldwork"; also `Fieldwork for Individuals ... \| Fieldwork` |
| B5 | Home title has no suffix (intentional) | Done | Build output |
| B6 | Description matches page promise; no unverifiable claims | Done (reviewed by reading) | Re-check on any copy change. "Free 15-minute" duration is an estimate |
| B7 | Candidate rewrites (proposals, not applied) | Open | See below |

Candidate shortened titles (suffix ` | Fieldwork` is added by the template; keep the stem at or under about 45 characters):
- `/individuals`: "Learn AI through real tasks" 
- `/learn/first-workflow`: "Free AI exercise: build a reusable workflow"
- `/business`: "Practical AI training for your team"
- `/business`: "AI training for real estate teams"
- `/about`: "About us" (renders "About us | Fieldwork")
- `/contact`: "Contact"
- `five-part-brief`: "The five-part brief for AI tools"
- `property-ai-tasks`: "Five property tasks to practise with AI"
Choose after keyword testing; avoid changing live titles often.

## C. Canonical, sitemap, structure

| # | Check | Status | Evidence / action |
|---|---|---|---|
| C1 | Canonical emitted only when a URL is configured | Done | `alternates: siteConfig.url ? { canonical: path } : undefined` |
| C2 | Canonical absolute URL resolves via `metadataBase` | Open | Verify on deployed site (`metadataBase` uses `siteConfig.url`) |
| C3 | One host: choose apex or `www`, redirect the other with 301/308 | Blocked | Domain decision |
| C4 | `sitemap.xml` lists all 15 fixed pages and 4 articles | Done | `src/app/sitemap.ts`; `lastModified` for fixed pages is the **build time** (`new Date()`), which signals change on every deploy; consider real dates |
| C5 | Sitemap submitted to Search Console and Bing | Blocked | After domain and verification |
| C6 | One `<h1>` per page | Done, tested | Browser test "every route returns 200 with one h1, a title..." |
| C7 | Heading order sensible | Done (reviewed by axe, no violations) | axe heading rules |
| C8 | `trailingSlash: false` consistent | Done | `next.config.mjs` |
| C9 | Custom 404 returns status 404 | Done, tested | Browser test |
| C10 | No broken internal links or anchors | Done, tested | `qa/link-results.json`: 19 pages, no problems |

## D. Social and icons

| # | Check | Status | Action |
|---|---|---|---|
| D1 | OG image file reachable | **Open: defect** | `metadata.ts` references `/brand/og/og-default.png`; file is `public/brand/social/og-default.png`. Fix path or move file, then test with a link preview |
| D2 | OG image 1200x630 | Open | Verify dimensions of `og-default.png` (not checked) |
| D3 | `twitter:card` summary_large_image | Done | `metadata.ts` |
| D4 | Favicons (svg, 32, ico, apple-touch, 192, 512) | Done | `public/brand/favicon/*`, referenced in `layout.tsx` and `manifest.ts` |
| D5 | `theme-color` | Done | `layout.tsx` viewport `#121212` (the ink top bar); manifest `theme_color` `#2340FF` and `background_color` `#F3F2ED`, matching the current palette |
| D6 | Per-article OG images | Deferred | Single default image |

## E. Structured data

| # | Check | Status |
|---|---|---|
| E1 | Organization + WebSite JSON-LD | Open (none emitted); needs real details |
| E2 | Article JSON-LD on notes | Open; needs real author/publisher |
| E3 | Validate in Google Rich Results Test / Schema validator | Blocked until E1/E2 and a live URL |

## F. Content and technical quality

| # | Check | Status | Notes |
|---|---|---|---|
| F1 | `lang="en-GB"` | Done | `layout.tsx` |
| F2 | Images have meaningful alt; decorative art is `alt=""` | Done | `images.json`, `Plate.tsx` |
| F3 | Image sizes explicit | Done | width/height from register |
| F4 | Core Web Vitals measured | Open | No Lighthouse/CrUX data recorded; run PageSpeed Insights after deploy |
| F5 | Mobile usability | Done (tested at 390 px) | overflow check; no real-device test recorded |
| F6 | Page weight check, font loading | Open | Four font families loaded globally |
| F7 | Accessibility (affects quality signals) | Done (automated) | `qa/axe-results.json` zero violations |
| F8 | HTTPS and HSTS | Blocked | Check headers on deployment |
| F9 | Redirect map for any renamed route | n/a now | Add to `next.config.mjs` `redirects()` if routes change |
| F10 | Hreflang | n/a now | Single en-GB site |

## G. Off-site and launch

| # | Check | Status |
|---|---|---|
| G1 | Google Search Console domain property verified (DNS TXT) | Blocked |
| G2 | Bing Webmaster Tools | Blocked |
| G3 | Google Business Profile | Not applicable until a real service location/entity (decision) |
| G4 | Consistent name/handles across social profiles | Blocked (accounts not created) |
| G5 | Brand-term check: search "Fieldwork AI training" and note competitors | Open (do after launch; not measured) |

## H. Ongoing

Monthly: indexed pages vs sitemap; queries; pages with impressions but low clicks (rewrite titles); crawl errors; broken links (`node scripts/qa/links.mjs` against production base URL after editing the script's `base`). Quarterly: content review dates on notes (`updated` field feeds sitemap `lastModified`).
