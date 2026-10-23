# The Concept Playbook: how four luxury website concepts were made from reference sites

This is a reusable method. It records exactly how the four "Halden" concepts (Frame, Heritage, Atelier, Rail) were designed and built, so the same approach can be used for any future website, in any chat, with any client. Paste this document into a new conversation and say "use the Concept Playbook for [business]".

The concepts live in `public/concepts/` (`storey.html`, `heritage.html`, `atelier.html`, `rail.html`, with `data.js`, `common.js`, `common.css`, `img/`, `fonts/`). Open `public/concepts/index.html` to compare them.

---

## 1. The principle: borrow ingredients, never copy a site

None of the concepts is a copy of any reference. Each one is a new recipe made from ingredients taken from several references, then unified by one brand, one type pairing and one colour logic.

What counts as an ingredient (fair to learn from):

- A layout idea (a fixed side rail, a sticky scroll scene, an index list instead of a card grid).
- A motion idea (text rising out of a mask, a frame that expands as you scroll, an image that follows the cursor).
- A type idea (a huge grotesque headline mixed with an italic serif word).
- A structural idea (the order of sections, how a footer is built).
- A mood (dark and cinematic, warm and editorial, quiet and modern).

What we never take:

- Their text, their photographs, their logo, their name, their exact colours plus layout combination, or their code.
- A page that someone who knows the reference would call "that site with a different name".

The test we used on every concept: cover the logo. Could you name which reference it is? If yes, change more. If you can only say "it feels related to a few of them", it is right.

---

## 2. The process (in order)

1. **Pick the brief.** Business type, markets, tone, the one job the site must do. Here: a fictional international real-estate agency, British listings, presented for UK, Nigerian and US buyers, luxury but functional (a real search and real listings).
2. **Name and logo first.** The name must be neutral and international ("Halden", not "Larkfield & Pryce"). Make a simple logo that works as a text mark and as a tiny icon (see section 5).
3. **Collect references and screenshot them.** A headless browser (Playwright + Chromium) took full-page and viewport screenshots of each reference at desktop width. Looking at real renders matters more than reading about them.
4. **Write an "ingredient list" per reference.** For each site, note 3 to 6 specific things worth learning from, in five categories: structure, type, graphics, motion, UI details. (Tables in section 3.)
5. **Assign ingredients to concepts.** Each concept takes its main mood from one or two references and 2 to 3 supporting ideas from others. No two concepts share the same type pairing, colour logic or navigation pattern.
6. **Build a shared content layer.** One `data.js` (listings, areas, journal posts, services) and one `common.js`/`common.css` so all four concepts show the same real content. This makes them directly comparable and keeps the work honest: only the design changes.
7. **Build each concept as standalone HTML.** One file each, self-hosted fonts, compressed images, no framework, no build step. Easy to open, share and judge.
8. **Verify.** Screenshot every concept, check the browser console for errors, check 390px width for horizontal overflow, check keyboard focus and reduced-motion behaviour.
9. **Choose, then rebuild in the real stack.** The chosen concept becomes the real site (here: Rail became the demo website inside the Next.js project).

---

## 3. What was taken from each reference

| Reference | What we learned from it | Used in |
|---|---|---|
| **Storey Architecture** (storeyarchitecture.co.uk) | Full-bleed image slideshow hero with segmented progress bars; a dark, confident palette; a very large cropped wordmark in the footer; restrained mono-style metadata labels. | Frame |
| **Waykon Group** (waykongroup.com) | Strong sectioning, bold statements over imagery, generous negative space, big numerals. | Frame, Atelier |
| **Fume Studio** | Editorial grids, tight uppercase labels, confident black-and-white contrast. | Frame |
| **Fine & Country** (fineandcountry.ng) | The classic luxury estate-agent vocabulary: a prominent search with Buy/Rent, featured-property presentation, an emblem-style logo, a serif display face. | Heritage |
| **John Taylor** (john-taylor.ae) | The "Art of Exceptional Service" section where an image frame grows from small to full-width as you scroll with smaller tiles around it; a refined full-screen menu; an organised, multi-column footer; stats band. | Heritage, Rail (menu and footer) |
| **Mejuma Tuscany** (mejuma-tuscany.com) | Warm, editorial pacing; arched image masks; italic serif accents; generous, slow reveals. | Atelier |
| **Compound Africa** (compoundafrica.com) | Earthy, human tone; large image-led storytelling; a calm capsule navigation. | Atelier |
| **American Housing** (americanhousing.com) | Plain, scannable property information that still feels premium; clear price/beds/area hierarchy. | Rail (index of homes) |
| **Bakstad Construction** (bakstadconstruction.com) | Quiet modern confidence: very large light-weight type, few colours, one accent. | Rail |
| **Loam House** (residences.loamhouse.com.au) | The user's favourite: restraint, a fixed side rail, big typographic hero over a photograph, and an "ask" search pill instead of a heavy form. | Rail |

---

## 4. The four concepts as recipes

### Concept 1: Frame (dark, architectural, cinematic)
- **Type:** Geist (display and body) + Geist Mono for small labels.
- **Colour:** near-black background, off-white text, one warm highlight.
- **Logo:** a rotating ring of small squares + wordmark.
- **Signature moves:** intro overlay; header that turns solid after the hero; slideshow hero with segmented progress (6s per slide); a 300vh sticky "scene" where property tiles skew and drift as you scroll; a marquee of areas; a giant cropped "Halden" in the footer.
- **Mixed from:** Storey (slideshow, progress, footer wordmark) + Waykon (sectioning, numerals) + Fume (labels).

### Concept 2: Heritage (classic luxury)
- **Type:** Bodoni Moda (display, with italic) + DM Sans.
- **Colour:** ivory, black, a muted gold used sparingly.
- **Logo:** circle-and-arch emblem above a spaced serif "HALDEN".
- **Signature moves:** transparent header that becomes solid; a hero with a typewriter placeholder in the search pill and a filters panel; rotating featured-listing split; black stats band; the scroll-expanding "Art of exceptional service" frame (320vh sticky with side tiles); a services band.
- **Mixed from:** Fine & Country (search + emblem + serif) + John Taylor (expanding frame, menu, footer).

### Concept 3: Atelier (warm, editorial)
- **Type:** Instrument Serif + DM Sans.
- **Colour:** cream, black, saffron yellow (#ffc94d), terracotta.
- **Logo:** lowercase "halden" with a filled dot.
- **Signature moves:** announcement strip; capsule nav that slides up as you scroll; a full-screen menu overlay; giant wordmark hero; a floating search card; arch-shaped images; a drag/scroll-snap carousel with a progress bar; a "How it works" strip; footer with a giant wordmark.
- **Mixed from:** Mejuma (arches, warmth) + Compound (capsule nav, storytelling) + Waykon (bold statements).

### Concept 4: Rail (quiet, modern) — the one chosen for the Fieldwork demo
- **Type:** Instrument Sans (tight tracking, heavy negative letter-spacing) + Cormorant Garamond italic for single emphasised words.
- **Colour:** paper (#f3f2ee), ink (#1b1c19), stone (#e4e2da), one vermilion accent (#e4482b).
- **Logo:** a large serif "h" with a vermilion full stop, "halden."
- **Signature moves:** an 88px fixed left rail (mark, vertical label, Menu) that becomes a top bar on mobile; a drawer menu that slides over; a hero photograph with slow zoom and parallax, a huge two-line tagline rising out of a mask, and an "Ask Halden" typewriter search pill with a Filters panel; an *index of homes* (big type rows, hover image preview that follows the cursor, filter chips); sticky stacking "how we work" cards; a parallax full-bleed quote; areas list; journal; footer with a giant cropped wordmark.
- **Mixed from:** Loam House (rail, ask pill, restraint) + John Taylor (menu, footer structure) + American Housing (clear property data) + Bakstad (quiet scale).

---

## 5. Component and technique recipes

All of these are plain HTML, CSS and a few lines of JavaScript. Reuse them anywhere.

### 5.1 Fonts (fast and safe)
Self-host WOFF2 files and load with `font-display: swap`. Keep to two families per concept (one sans, one serif or mono). Use CSS `clamp()` for every large size so type scales smoothly: `font-size: clamp(2.8rem, 1rem + 5.4vw, 7.4rem)`.

### 5.2 Luxury type
- Big headings: weight 500, `line-height: .92` to `1`, **negative letter-spacing** (`-0.04em` to `-0.06em`).
- One italic serif word inside a sans headline (`<em>`), same size, different family. This single trick does most of the "expensive" feel.
- Small labels: uppercase, `letter-spacing: .1em` to `.22em`, 0.64 to 0.78rem.

### 5.3 Text rising from a mask (hero headline, intro wordmark)
```css
.h1 { overflow: hidden; }
.h1 span { display: block; transform: translateY(105%); animation: rise 1.1s cubic-bezier(.22,1,.36,1) forwards; }
@keyframes rise { to { transform: none; } }
```
Stagger lines with `animation-delay`. The easing `cubic-bezier(.22,1,.36,1)` is the "refined" curve used everywhere.

### 5.4 Intro overlay that plays once per session
Full-screen ink panel with the wordmark rising, then the panel slides up (`translateY(-100%)`). A tiny script adds a class to `<html>` if `sessionStorage` says it has played, and CSS hides it (and shortens the hero delays).

### 5.5 Scroll-reveal
Elements get `data-reveal`; an `IntersectionObserver` adds `.in` which fades and lifts them (`opacity 0 → 1`, `translateY(18px) → 0`, 0.9s). Stagger with a `--d` delay variable. Respect `prefers-reduced-motion`.

### 5.6 Parallax
On `scroll` (passive), set `transform: translateY(scrollY * .18)` on the hero image wrapper (which is oversized: `inset: -6% 0`) so no edges show. Use ratios around 0.12 to 0.2. Only compute while the section is in view.

### 5.7 Typewriter search placeholder
A recursive `setTimeout` types a sentence into the input's `placeholder` one character at a time, pauses, deletes quickly, moves to the next sentence. It stops on focus so it never fights the user. This makes the search feel conversational ("Ask Halden: a family house near a park, up to £3m") without needing AI.

### 5.8 Glass pill search with a filter panel
A rounded form with `backdrop-filter: blur(16px)` over a translucent dark fill; a round accent submit button; a "Filters" chip that toggles a panel of selects (Buy/Rent, Area, Bedrooms, Max price).

### 5.9 Fixed side rail + drawer (Rail)
`aside.rail` is `position: fixed; left: 0; width: var(--rail)`; `main` has `margin-left: var(--rail)`. On mobile set `--rail: 0px` and turn the rail into a top bar. The drawer is a full-height panel with `transform: translateX(-102%)` that animates to `0` with `cubic-bezier(.76,0,.24,1)`, plus a scrim.

### 5.10 Index of homes with cursor-following preview
Rows instead of cards: number, huge title, area line, price at right. A single `.peek` element is `position: fixed`, `pointer-events: none`, moved to `clientX/clientY` on `mousemove` and its `<img>` swapped to the hovered row's photo. Hidden on touch (`@media (hover: none)`).

### 5.11 Sticky stacking cards
Each card: `position: sticky; top: calc(1.2rem + var(--i) * 1.1rem)`, large radius, different background. As you scroll, later cards stack on top of earlier ones.

### 5.12 Scroll-expanding image frame (John Taylor idea)
A tall section (`height: 320vh`) containing a `position: sticky; top: 0; height: 100vh` stage. JavaScript sets a custom property `--p` (0 to 1) from scroll progress. The frame's `width`, `height` and `border-radius` interpolate from small to full-bleed using `calc()` with `--p`; side tiles fade out as `--p` grows.

### 5.13 Sticky scene with skewed tiles (Storey idea)
Same sticky-stage pattern, but each tile's `transform` uses `--p` to `translate` and `skewY()` so the tiles drift past in perspective.

### 5.14 Segmented slideshow hero
N slides stacked; N thin bars along the bottom; the active bar fills with a CSS animation lasting the slide duration; the `animationend` event advances the slide. Fade (opacity) and slow scale for the image.

### 5.15 Scroll-snap carousel with progress
`display: flex; overflow-x: auto; scroll-snap-type: x mandatory`. A progress bar's width is set from `scrollLeft / (scrollWidth - clientWidth)`. Pointer-drag support by tracking `pointerdown/move`.

### 5.16 Giant cropped wordmark footer
`font-size: 25vw; line-height: .78; white-space: nowrap; margin-bottom: -3.4vw;` inside a footer with `overflow: hidden`, so the bottom of the letters is cut off. Instantly premium.

### 5.17 Logo construction
- Rail: one serif letter + a coloured full stop. Works as a favicon, a rail mark and an intro animation.
- Heritage: a circle with an arch inside (SVG, stroke only) + spaced serif capitals.
- Frame: a ring of squares rotating slowly.
- Always make it from text and simple SVG so it is crisp and tiny.

### 5.18 Colour logic
One neutral paper, one ink, one tint for panels, **one** accent used for hover, status and one big button. Never a second accent. Dark sections use ink as the background, not pure black.

### 5.19 Photography rules
- Same aspect ratios per context (hero full-bleed, cards 4:3, journal 4:3, quote full-bleed with `brightness(.55)`).
- Compress to about 1800px wide JPEG. Lazy-load everything below the fold.
- Always label placeholder photographs as illustrative. Never claim a photograph is of a real property or client.

### 5.20 Functional luxury (what keeps it usable)
- The search is real: Buy/Rent, area/street/postcode, type, bedrooms, max price.
- Filters are links and form fields, not decoration. Keyboard focus is visible. Reduced motion turns animations off.
- Colour contrast checked with an automated tool (axe).
- Mobile: no horizontal scroll at 390px, rail becomes a top bar, hover-only effects have a touch fallback.

---

## 6. Shared content layer (why the concepts could be compared fairly)

`data.js` exports one object (`window.HALDEN`) containing listings (title, area, type, price, beds, baths, size, photo key, one-line description), areas, journal posts and services. `common.js` provides helpers (`revealAll`, `imgUrl`) and the delayed pop-up. Every concept renders the same data, so the choice is purely about design.

---

## 7. Honesty rules for demo and concept sites

- Fictional brand, people, addresses and prices are stated as fictional in the footer and in a slim banner.
- Photographs are illustrative stock and are credited on an image-credits page.
- No invented clients, testimonials or numbers presented as real.
- A short disclaimer sits in the footer and is visible without scrolling in the top banner.

---

## 8. QA checklist (run before showing anyone)

1. Open each page in Chromium via Playwright; fail on any console error or failed request.
2. Screenshot at 1440px and 390px; look at them yourself.
3. Check `document.documentElement.scrollWidth <= innerWidth` at 390px.
4. Tab through the page: every control reachable, focus visible.
5. Turn on reduced motion: nothing essential is hidden or stuck.
6. Run axe for contrast and labels.
7. Make sure the intro and pop-ups can be dismissed and do not block.

---

## 9. A prompt you can reuse in a new chat

> Use the Concept Playbook. Business: [what it sells, to whom, where]. Brand name: [neutral name]. Tone: [luxury / editorial / modern]. References: [3 to 6 URLs]. First screenshot the references with Playwright and write an ingredient list per reference (structure, type, graphics, motion, UI). Then build four standalone HTML concepts sharing one data.js, each mixing ingredients from at least two references, each with its own type pairing, one-accent colour system, logo, intro, menu and footer. Do not copy any reference's text, images or exact layout. Keep the primary function working (for real estate: a real search). Then give me an index page to compare them and wait for my choice.

---

## 10. Files to reuse

- `public/concepts/rail.html`: full single-file template of the chosen concept.
- `public/concepts/common.css`, `common.js`, `data.js`: shared layer.
- `scripts/brand/build-concept-images.mjs`: resizes chosen photographs to web size.
- `scripts/qa/_ref.mjs`, `_c.mjs` (local only): reference and concept screenshot helpers.
