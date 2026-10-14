# Design reference audit

Date: 14 October 2026.

## Status: visual inspection was not possible

**I could not open any of the supplied references in a browser, and I have not captured a single screenshot of them.** The build environment's network policy refuses connections to every general website. I tested each of the following, with both `curl` and the fetch tool, and every attempt failed (`connect_rejected` from the egress proxy, or DNS failure in the fetch tool):

| Reference | URL tested | Result |
|---|---|---|
| Anwulika Okonjo, Field Notes | `https://anwulika.com/field-notes` | Not reachable |
| Same author, alternative destination you suggested | `https://anwulika.beehiiv.com/` | Not reachable |
| Same author, Substack found via search | `https://anwulikasnotes.substack.com/` | Not reachable |
| Anveril | `https://anveril.com/` | Not reachable |
| Awwwards | `https://www.awwwards.com/` and `/sites/anveril` | Not reachable |
| Compound | `https://www.compoundafrica.com/` and `/editorial` | Not reachable |

Web search works, but returns only titles, URLs and short text snippets. **Snippets are not visual inspection.** Everything below is labelled with its source. Nothing here describes colours, type, layout or motion on any reference, because I have not seen them.

No screenshots were generated, mocked or substituted. `screenshots/` contains only a README.

## What search established (text only, not visual)

### A. Anwulika Okonjo, Field Notes
- Search results show **her Field Notes publication is on Substack** (`anwulikasnotes.substack.com`), not beehiiv. The beehiiv address you suggested returned no match in search; the beehiiv results were unrelated authors. `anwulika.com` (listed as "Coach & Learning Architect for Audacious Dreamers") lists the Field Notes series. I could not open any of them, so I cannot confirm which is canonical. **I have not silently substituted anything.**
- Per snippets: numbered essays ("Field Note #1" to "#6", from January 2026), described as "thoughtful essays, practical experiments, and gathering spaces for those who want to approach work and becoming with more wisdom, clarity, agency, and imagination". The masthead reads "Field Notes on Flourishing"; footers on some posts read "Field Notes on Black Flourishing".
- Transferable idea (from structure, not appearance): essays that pair an idea with a practical experiment, numbered as a series. This maps directly onto Fieldwork's exercises and Field Notes.

### B. Anveril
- Per snippets, `anveril.com` describes an enterprise AI firm ("engineers enterprise AI systems and data infrastructure that turn ambitious companies into AI-native organisations"). An "Anveril" entry exists as an Awwwards nominee tagged business, technology, animation, with GSAP and Framer listed. The match between the two is unverified.
- Everything you asked me to study (typography against photography, hero identity, negative space, section rhythm, diagrams, transitions, footer) needs real inspection. **Not done.**

### C. Compound (`compoundafrica.com`), added in your latest message
- Per snippets: a Lagos-based "design-led" real estate development and media brand. First project Kota No.1, a waterfront residence on Orange Island (14 homes). It has an editorial section and a print publication whose first edition, CRAFT, documents Lagos (listed as available October 2026). It has YouTube and TikTok presences.
- Why it matters (reasoning, not observation): it sits at the intersection of **real estate, Nigerian context and editorial publishing**. It is the most relevant proof that a property business can have a strong editorial identity, and it is a direct cultural reference for the real estate side of Fieldwork. I will not claim anything about how it looks.

### D. Awwwards
- Search confirms Awwwards has Sites of the Day listings, typography tag pages (including "Editorial New" as a typeface tag) and a typography category. Listings I could see by title only include "MONOLOG", "sakazuki", "Heron AI", "Nick Ho" and a school site, with no category or visual confirmation.
- **I have not selected six Awwwards sites.** Naming sites I cannot open, from snippet titles, would be exactly the behaviour you told me not to engage in.

## What is needed to complete Stage 2

The fastest unblock is for you to change the cloud environment's network access. Add these hosts under allowed domains (the "Network access" setting on the environment), keeping package managers allowed:

```
anwulika.com   www.anwulika.com   anwulika.beehiiv.com   anwulikasnotes.substack.com
anveril.com    www.anveril.com
www.awwwards.com   awwwards.com
compoundafrica.com   www.compoundafrica.com
```

Awwwards links out to the sites it features, so a full Stage 2 also needs outbound access to those. The simplest option is the broader "Full" (unrestricted) access level for this session, in which case no list is needed. Steps: https://code.claude.com/docs/en/cloud-environments#network-access

Alternative if you cannot change access: capture full-page and mobile screenshots yourself (browser developer tools, "Capture full size screenshot") of the references above plus up to six Awwwards sites you like, and drop them in `deliverables/fieldwork-launch-kit/01-brand/research/screenshots/`. I can analyse images directly from files.

## Implications drawn only from the brief, strategy and your feedback

These are working hypotheses to validate against real captures, not findings:

1. **Reading is the product.** Both the Field Notes and the exercises are read, so typography and measure matter more than ornament.
2. **Numbered, serialised, experimental.** A "series of practical experiments" structure suits Fieldwork's exercises and gives the brand a recognisable rhythm (Field Note #n, Exercise #n).
3. **Real estate wants editorial credibility.** Compound suggests property audiences in Nigeria respond to design-led, editorial presentation. The business pages should look like a considered publication, not enterprise software.
4. **Typography and imagery as a pair.** The brief to study Anveril points to large type against strong imagery. Fieldwork has no photography yet, so original, art-directed graphic artefacts must carry the weight that photography carries there.
5. **Do not copy.** None of these references' logos, copy, graphics or layouts will be reproduced.

## Re-run checklist (once access exists)

For each of the three supplied references plus Compound and at least six Awwwards sites: URL and date; desktop and mobile full-page screenshots; header behaviour; type and hierarchy; palette; grid and spacing; imagery; hero structure; section transitions; motion; credibility signals; calls to action; footer; mobile adaptation; what translates; what must not be copied. Update this file and revisit `recommendation.md`.
