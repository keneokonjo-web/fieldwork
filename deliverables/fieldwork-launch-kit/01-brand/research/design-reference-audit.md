# Design reference audit

Inspected on 14 October 2026 using a real Chromium browser (Playwright) at 1440×900 desktop and 390×844 mobile. For each site I captured viewport and full-page screenshots, scroll-through frames (one per 90% of a viewport, so scroll-triggered reveals are seen as a visitor sees them), and extracted computed typography, colours and navigation from the live DOM. Everything below comes from those captures. Where a capture was incomplete, that is stated.

Evidence lives in `screenshots/` (per-site viewport, full-page, `*-facts.json` with computed styles) and `screenshots/scroll/` (scroll frames). `screenshots/overview/` has one contact sheet per site. Capture scripts: `scripts/qa/capture-reference.mjs`, `capture-scroll.mjs`, `contact-sheet.mjs`.

## What I could and could not inspect

| Site | Result |
|---|---|
| `anwulika.com/fieldnotes` (Anwulika Okonjo, Field Notes) | **Inspected fully.** Home, guides, a note, dilemma lab. Desktop and mobile. Note: the URL you gave, `anwulika.com/field-notes`, returns 404. The site's own links use `/fieldnotes` (no hyphen). That is the page I studied. Her older Substack (`anwulikasnotes.substack.com`) and a beehiiv home (`anwulika.beehiiv.com`) also respond; I captured them. Substack images were blocked by its CDN in this environment. |
| `anveril.com` | **Inspected fully**, desktop scroll (20 frames) and mobile. |
| `awwwards.com` | **Could not be opened.** The proxy tunnel is closed by the host after the handshake (`ws_closed_mid_exchange`), on every attempt including specific Awwwards pages. I therefore **found Awwwards-listed sites through search and opened each site directly.** Search results are the only Awwwards evidence, and I say so for each site. |
| `compoundafrica.com` | **Inspected fully.** Desktop and mobile, scroll frames. |
| Floema (`floema.com`, Awwwards SOTM May 2026 per search) | Could not be opened (connection fails). Not used. |
| Mouthful of Dust (SLV, Awwwards SOTD per search) | Only its land-acknowledgement gate loads for a headless browser. No layout evidence. Not used as a visual reference. |
| `obys.agency` (agency with many Awwwards awards per search) | Only its numeric preloader captured. Not used as a visual reference. |
| Vide Infra (`videinfra.com`) | Captured, but the DRM video background does not play in headless Chromium, so the dark panels show a playback error. Wordmark and layout observations only. |

## Reference A: Anwulika Okonjo, Field Notes (primary)

URL inspected: `https://anwulika.com/fieldnotes` (also `/guides`, `/fieldnotes/make-your-work-mean-something`, `/fieldnotes/dilemma-lab`).

**Overall impression.** A warm, confident publication that treats writing as an archive. Strong colour, strong type, real artwork. It does not look like a Substack theme or a coaching site template.

**Structure and language.** It names its objects like a filing system: "Latest field note · No. 06", a small table headed **Filed** and **Reading** (date and minutes), "The Index → Recently filed", cards numbered **No. 05** and **G-01** (guide), "Notes from the field" set vertically along a rail. Navigation is five tracked-caps links plus a bordered Subscribe button. The language is the design.

**Typography (computed).** Display: **Instrument Serif** at 57.6px (H1) and 58px (section titles), 32px for card titles, line height about 1.04, narrow and high-contrast, with one *italic* accent phrase in gold ("Make your work *mean something*"). Sans: **Figtree** for body and UI. Labels: small caps with wide tracking. A handwritten script appears only in the logotype ("Flourishing"). The substack version uses Instrument Serif headings with Spectral body at about 18px in a 728px column.

**Colour (computed from the live page).** Cream `#FAF6F0`, near-black `#141413`, plum `#59333B`, gold `#E9C46A`, rust `#8A4533` / terracotta blocks, sand, and a pale mint `#BCE8E1` band. Each section is a full-width flat colour block with one job: plum hero, cream index, mint call-out ("Dilemma Lab"), gold subscribe, black footer.

**Composition.** Hero is split: a large plum panel (headline, metadata table, a **taped photograph of an artwork, slightly rotated, with a drop shadow**) beside a vertical stack of three coloured note cards. The index is a grid of **cards that are tilted by a degree or two, in different card colours, each with an artwork thumbnail, a "FIELD NOTE / No. 04" header, a serif title, a rule, and date and read time.** The author portrait is also taped and has a credit line ("photographed by…"). Spacing is generous, and the colour blocks carry the rhythm.

**Section pages (Guides, Dilemma Lab).** Each section opens with a sand or mint band, a large serif title with one italic accent in rust ("Field *Guides*"), a one-line explainer, and a **tilted white "In this section" card taped at the top with a three-row metadata table (Holds / Use it for / Entries)**. The band ends in a **torn-paper edge** rather than a straight line. A guide is a single coloured note card ("GUIDE · G-01 · 15 pages"), so even resources are artefacts.

**Imagery.** Curated figurative paintings and archival photographs, always credited. No stock photography, no AI imagery. The images carry the cultural voice.

**Motion / interaction.** Restrained. Hover and focus states are standard. Reading pages add a small left-hand table-of-contents tick rail.

**Credibility.** Specific named series, dated notes, byline, photographer credit, "Over 1,000 subscribers" on the Substack. Writes plainly ("You do not need more hacks").

**Calls to action.** Bordered or ink buttons, tracked caps, one per band. Email capture appears twice, in a gold band and in the footer.

**Footer.** Black. Wordmark, one paragraph, subscribe field, four links, tracked-caps utility row with external links marked ↗.

**Mobile.** Colour blocks stack, the three-card stack becomes a single column with the rail turned into a vertical label, index cards go single column. **One defect:** the utility row in the footer overflows on a 390px viewport (page width 824px), so "For AI agents" is cut off. Fieldwork must not repeat this.

**Accessibility/performance notes.** Strong contrast on cream. Heavy use of colour blocks means colour is never the only signal. Page weight is modest because imagery is a few images.

**Translate to Fieldwork.**
- A **named artefact system** as the interface: exercises and notes are numbered, filed, dated, with a read time.
- **Colour-blocked sections**, one job each.
- **Cards as objects** with small rotation and a physical fastening, not rounded SaaS tiles.
- **Instrument-style narrow serif display with a single accent phrase.** I will use a different display face so we do not look derivative.
- Credited, curated imagery with a real point of view.
- "Filed / Reading" metadata table.
- Plain, confident editorial voice.

**Do not copy.** Its plum/gold/mint palette combination, its logo, its exact hero, its artwork, its italic gold accent applied identically, its Substack footer.

## Reference B: Anveril

URL inspected: `https://anveril.com/`.

**Overall impression.** Restrained, spacious enterprise brand. Almost all type, hairlines and photography, on a warm off-white. Nothing looks like a SaaS template.

**Header/navigation.** Logo (an angular mark with a light wordmark) left, "Menu" with a **dot-matrix circle icon** right, a dark pill "Get Started". The hero is divided by a hairline vertical rule. Small single letters sit in the **four corners of every viewport** and change as you scroll (an acronym spelled around the frame).

**Typography (computed).** A single grotesque (**Saans**, a commercial face, in trial) in Regular and Medium. H1 and H2 about 60px at weight 500, tracking -1.2 to -2.4px. Body is small (about 14 to 16px), often justified. Labels are tiny sentence-case words ("The Frontiers", "From Vision", "To Systems"). Scroll-driven text turns from pale grey to near-black **word by word**.

**Colour (computed).** Off-white `#F7F7F4`, ink `#26251D`, hairlines at 12% ink, a grey-green `#BDBFB0` banner, a pale grey ring graphic, and a dark `#26251D` footer. Colour is almost absent. The imagery supplies the colour.

**Hero/section structure.** Hero: headline left, short paragraph with a left rule right, huge empty space. Then: a statement line, a **dot-halftone semicircle** graphic, a selector list (Healthcare, Insurance, Defence, Energy, Civil) beside a tall portrait photograph that **dissolves between images through a pixel-mosaic transition**, a vertical list of capabilities with the active item in black and the rest faded, then long alternating blocks with a full-height photograph on one side and **"Bottleneck / System"** paired paragraphs on the other. Ends with a statement, two buttons, a dark footer with a **giant cropped logo filling the width**.

**Pacing.** One idea per viewport. Very long page (15,662px). Large empty areas are intentional pauses.

**Imagery.** Cinematic, desaturated photography (surgeon, fighter pilot, wind turbine, motorway, building atrium). Large scale, strictly one per section.

**Credibility.** Industry names, specific named systems, precise phrasing. It reads as expensive and composed. It has no customer logos in the portions captured.

**Calls to action.** "Get Started" pill in header and at the end. Quiet.

**Footer.** Dark, four columns (newsletter, company, links, navigation), addresses (Rome, London), and a monumental logo.

**Mobile.** Captured; layout collapses to a single column with the same hierarchy.

**Accessibility/performance.** Very low contrast on revealed-but-not-yet-active text by design (pale grey). Fine for a showcase, but Fieldwork's learning text must not do this. Heavy scroll-driven JS and large media; not suited to low-bandwidth users.

**Translate to Fieldwork.**
- Negative space and **one idea per viewport** on the business pages.
- **Section labels and corner micro-labels** as a navigation motif.
- The **"Bottleneck / System"** structure is excellent for real estate: *Problem → what we practise → what people keep.*
- A **giant cropped wordmark footer.**
- **Dot-matrix graphics** as a quiet motif (ours must mean something).
- A selector list beside a changing image/artefact.

**Do not copy.** The logo, the pixel-mosaic transition as-is, the fighter-jet/enterprise imagery, the "Intelligence Without Limits" copy, pale-grey-to-black word reveal on learning text, near-zero colour.

## Reference C: Awwwards-listed sites (opened directly)

Awwwards itself was unavailable. These were identified through search results that listed them as Awwwards winners or nominees, then opened directly.

### C1. AI in Design Report 2026 (`stateofaidesign.com`), Awwwards SOTD per search
- **Impression.** A research report that feels like a designed publication. Bold colour chapters.
- **Type (computed).** **Beausite Classic** (commercial) at **120px**, tracking -7.2px for the title; chapter numerals 80px; **Geist Mono** for small labels ("In this chapter, we'll cover:").
- **Colour (computed).** White and black, orange `#FE7141`, lilac `#CDABFE`, sage `#D1DDD3`.
- **Structure.** Each chapter is a **full-bleed colour block** with a huge numeral ("01 Tools"), a short title, a paragraph, and a contents list with hairlines and a black "Read the … Chapter" button. Statistics ("705+ designers surveyed") in large numerals on colour. A pull quote with portrait on sage.
- **Imagery.** **One signature treatment**: solarised/duotone macro flowers in orange, lilac and grey. A single image language makes the whole thing feel owned.
- **Translate.** Numbered chapters; colour as chapter identity; mono labels; big stat numbers; a *single* image treatment applied to everything. **Do not copy** the flower imagery, the palette.

### C2. DES, Design Education Series by Obys (`des.obys.agency`), SOTD per search
- **Impression.** Education as a series. A gigantic bold grotesque "DES" cropped at the left edge, a tiny header, almost nothing else.
- **Structure.** Header: Practice / Seasons / About / Log in. Seasons are numbered 01 to 03 (Typography Principles, Colors Combinations, Grids). Tiny body copy in two columns.
- **Translate.** **Education structured as numbered seasons**, giant cropped title as identity, extreme restraint. **Do not copy** the logo glyph or WebGL effects.

### C3. The Lookback (`tlb.betteroff.studio`), Awwwards SOTD per search
- **Impression.** An archive treated as a timeline. Monumental Helvetica-like type, "Enter with sound" gate.
- **Structure.** A month-by-month **index** listing counts (Articles 3, Podcast episodes 2, Inspiration 4…) in monospace, and views named **Timeline / Surf / Index / About**.
- **Translate.** A **list index with counts** as navigation for Field Notes and exercises. Multiple views of the same content. **Do not copy** the gated entry, sound.

### C4. Vide Infra (`videinfra.com`), listed by Awwwards among top agencies per search
- **Type (computed).** **Graphik** at 28px headlines, -1.4px tracking; category headings "Real Estate / Corporate / Startups" at 38px.
- **Structure.** A **monumental "Vide Infra" wordmark sized to the viewport width** over a sticky layer. Real estate is one of its three named sectors, so it is a neighbour of our business offer.
- **Translate.** A wordmark so large it *is* the hero, used once. **Do not copy** the wordmark treatment or video.

### C5. Anveril itself is listed as an Awwwards nominee (per search); see Reference B.

### Not usable
Floema, Mouthful of Dust, Obys agency: see the table above.

## Reference D: Compound (`compoundafrica.com`)

**Overall impression.** Quiet, warm, design-led real estate. Photography does the work. Looks like an architecture and interiors magazine.

**Header.** Small logo (a two-tone square with "COMPOUND"), tracked-caps links (Projects, Editorial, About, FAQ, Contact), WhatsApp contact link right. Sticky, light.

**Typography (computed).** Light serif headings, small sans, tiny tracked caps labels; computed families include `afacad` and `kollektif` (logo). Headings are small and refined (H1 32px in the wordmark-sized hero text "Kota No.1" over the photo).

**Colour (computed).** Cream/warm grey `#EFEFEF` and white, black text, a **muted burgundy** for tiny section labels, a charcoal footer. Almost no colour apart from the photography.

**Structure.** Full-bleed cinematic hero photograph of a real interior with a small headline and an outlined button. Then "This is how we live" (media), a **product-like promotion for a printed catalogue "CRAFT"**, "Watch" video thumbnails (Inside My Compound), an Instagram strip, a three-column "Development / Media / Placemaking" statement, an **FAQ accordion**, a split newsletter section with a portrait photograph, charcoal footer with contact details (email, phone, address) and a "Register your interest" call to action.

**Credibility.** Real address and phone number, named project, real people in photographs, print product, video series.

**Relevance.** It proves that **a Nigerian real estate audience is addressed with an editorial, media-led, photographic brand**, and that real estate and publishing can share one identity. It also shows what Fieldwork lacks: real photography and people.

**Translate.** Tiny tracked labels, restraint, an FAQ for objections, real contact details in the footer, a media section, photography of **real places and working surfaces** once we can commission it. **Do not copy** the photography, copy, or logo.

## Practical-product references

- **Brilliant (`brilliant.org`)**: The hero **is** an interactive artefact (a puzzle you can touch). Pastel panels, a tab switcher (Math / Coding), proof row of three numbers. Translate: *show the product, not a picture of it.* Don't copy: mascot, pastel palette.
- **Are.na (`are.na`)**: A manifesto written in plain text with numbered "The secret" list. Translate: **voice**, numbered principles, no hype. Don't copy: the stark default styling.

## Cross-reference synthesis: the principles that recur

1. **The interface is a named artefact system.** Archive and index cards (Anwulika), report chapters (AI in Design), series and seasons (DES), a timeline index (The Lookback), frontiers and stack (Anveril). The brand feels owned because its parts have names and numbers.
2. **Colour is a chapter, not decoration.** Full-bleed flat colour, one per section, each with a job (Anwulika, AI in Design).
3. **Display type is large, controlled and singular.** A narrow high-contrast serif or a tight grotesque, sized by confidence. One accent phrase. Never every heading.
4. **Micro-typography does the organising.** Tracked caps and mono labels, numbers, metadata tables, corner marks. They make pages feel designed even when quiet.
5. **Cards are objects.** Colour, number, slight rotation, tape. Not white rounded boxes.
6. **One image treatment, applied consistently.** Credited artwork (Anwulika), duotone (AI in Design), warm interiors (Compound), cinematic desaturated (Anveril).
7. **One idea per viewport on business pages**; more density on learning pages.
8. **A monumental wordmark** appears once, as hero or footer (Anveril, DES, Vide Infra).
9. **Problem → system structure** for sales content (Anveril "Bottleneck / System").
10. **Plain, specific voice** (Anwulika, Are.na).

## What this rules out for Fieldwork

- White rounded cards with soft shadows; centred hero plus two pills.
- Pastel gradients, mascots, glowing graphics.
- Page-long colour-free minimalism with no object system.
- Gated or sound-led entry screens, WebGL as a requirement, scroll effects that hide text (low-bandwidth users, accessibility).
- Anything copied: logos, copy, palettes in combination, specific artwork.

## Limitations of this audit

- Awwwards.com itself was not viewed. Its role was discovery, done through search.
- Fonts named as commercial (Saans, Beausite, Graphik, Figtree is open) were identified from computed styles, not licensed or used.
- Colours are from computed styles of the live page and may differ slightly from design specs.
- Screenshots were taken headless, so video, WebGL and DRM content may be missing.
