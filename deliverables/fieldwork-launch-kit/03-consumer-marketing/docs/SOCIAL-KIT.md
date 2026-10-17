# Social kit

Version 0.1, 14 October 2026. Profiles, templates, replies and rules for the consumer channels. Character limits and features change: every limit below is marked *verify before use*. Counts are of the draft text, computed at writing time.

**Status rules for all profiles:** only say what is live (one free guided exercise; four Field Notes). Say "planned, not on sale" for anything else. No follower counts, no "trusted by", no "as seen in".

## 1. Handle strategy

**Placeholders only. Do not claim any handle is secured.** Handles are not registered by this document.

| Step | Action |
|---|---|
| 1 | Decide the preferred handle: `@[HANDLE]` (placeholder). Check availability on each platform manually; availability is not confirmed |
| 2 | Pick the same handle on all platforms if possible; if not, use a consistent pattern: `[HANDLE]`, `[HANDLE]hq`, `[HANDLE]ai` (placeholders) |
| 3 | Keep a register: platform, handle, date claimed, email used, 2FA on, owner. Store in a password manager, not in this repo |
| 4 | Use one shared sign-up email (a role address, not a personal one) once the domain and email are confirmed |
| 5 | Name risk: "Fieldwork" is a common term, including in UK market research. Expect the exact name to be taken on some platforms. Add a descriptor in the display name, for example "Fieldwork · Practise AI on real work". See `docs/brand/BRAND-STRATEGY.md` section 12 |
| 6 | Add the URLs to the environment variables read by `src/config/site.ts` (`NEXT_PUBLIC_SOCIAL_TIKTOK`, `_LINKEDIN`, `_INSTAGRAM`, `_YOUTUBE`) only after the accounts exist |
| 7 | Do not buy handles, follower packages or engagement |

## 2. Profile bios (draft)

| Platform | Bio draft | Chars | Limit (verify before use) |
|---|---|---|---|
| TikTok | Practise AI on real work. Free 15-minute exercise. No account. | 62 | about 80 |
| Instagram | Practise AI on real work.<br>Free guided exercise: about 15 minutes, no account.<br>Guided projects are planned, not on sale. | 119 | about 150 |
| LinkedIn headline (company tagline or personal headline) | Fieldwork: practise AI on real work. Free guided exercise for individuals in the UK and Nigeria. | 96 | about 120 for company taglines; personal headline limit is higher (verify) |
| YouTube channel description (first line) | Short, captioned lessons on using AI for real tasks, and checking the result. Free exercise on the site. Guided projects are planned, not on sale. | 146 | up to about 1,000 for the full description (verify) |
| WhatsApp Business profile (if used) | Practise AI on real work. Free exercise, no account. Planned products are not on sale. | 86 | about 139 (verify) |

**Display name:** Fieldwork (add descriptor if needed). **Profile picture:** the target icon in paper on cobalt (#2340FF) (`public/brand/social/fieldwork-avatar-1024.png`), no photograph. **Link:** exercise URL with `utm_medium=bio-link` and the platform as source.

**Longer LinkedIn "About" (company page, optional)**

> Fieldwork teaches practical AI through real tasks. You pick a task you already have, write a brief, run it in the AI tool you already use, check the result and keep a workflow you can reuse.
>
> Live today: one free guided exercise (about 15 minutes, no account) and four short articles called Field Notes.
> Planned, not on sale: guided projects and a membership.
>
> We write in British English and say plainly what has and has not been tested.

## 3. Pinned posts and highlights

| Platform | Pin / highlight | Contents |
|---|---|---|
| TikTok | Pin 1: V1 "What Fieldwork is" | Honest status, free exercise |
| TikTok | Pin 2: V2 five-part brief | Evergreen method |
| TikTok | Pin 3: V3 or V7 | Checking |
| Instagram highlights | "Start here" | Free exercise steps, status |
| | "Briefs" | Starter brief cards |
| | "Checks" | Six checks |
| | "Safe use" | Traffic-light guide |
| | "Status" | What is live and planned |
| LinkedIn featured | Free exercise link, "Check AI answers" Field Note, "What not to paste" Field Note | |
| YouTube | Playlist "Brief it", "Check it", "Stay safe" | |
| WhatsApp | Status updates with short clips; Channel (if used; verify) for weekly Field Note | |

## 4. Eight post templates

Replace brackets. Use the fictional examples from the exercise.

### T1. Task demo (video or carousel)
> **Hook:** [Task] in [seconds]. Here is the brief.
> **Body:** Task / Audience / Tone / Shape / Rules.
> **Check:** one thing to verify against your source.
> **CTA:** Free exercise, about 15 minutes, no account: [link]

### T2. Mistake and check
> [Mistake] sounds exactly as sure as the right answer. Here is how I caught it.
> 1. The claim. 2. The source. 3. The fix prompt.
> [Illustrative example, written for practice.] Field Note: [link]

### T3. Brief card (image)
> A single card with five labelled lines. Caption: "Copy it, change the facts, and try it. Free. No account."

### T4. Field Note share
> New / helpful: [title].
> Three takeaways: [1] [2] [3].
> [Read the article]. Based on [basis line from the article, for example "an explanation of a method, no tool was tested"].

### T5. Myth versus fact
> Myth: [claim]. Fact: [plain statement, with limits]. What to do: [action]. [link]

### T6. Honest status
> Today: [live items]. Planned, not on sale: [items]. What we are testing next: [test]. Tell us what you want first.

### T7. Poll or question
> Which would you want guided help with first? A) [ ] B) [ ] C) [ ] D) none. We use this to decide what to build. Not a promise of dates.

### T8. Tool honesty
> We [did / did not] test [tool] for this. What we actually did: [facts]. The free version [does X] as of [date]; limits change, so check yours.

## 5. Caption and alt-text rules

- Sentence case. British spellings. No emoji in brand-critical statements; at most one emoji in captions if it adds meaning (optional).
- Write alt text for every image: describe the content plainly, for example "Card with five lines: Task, Audience, Tone, Shape, Rules, each with a short example."
- Put the link where the platform allows (bio, pinned comment); write "link in bio" only if it is true on that platform (verify before use).

## 6. Comment and DM reply templates

**Rule:** reply within 24 hours on weekdays where you can (ASSUMPTION). Be brief, kind, accurate. Never invent answers about tools or policies.

| Situation | Reply |
|---|---|
| Thanks | Thank you. If you try it, tell me which task you used. |
| "Is it free?" | The guided exercise is free. About 15 minutes, no account. Guided projects and membership are planned and not on sale. |
| "Where do I start?" | Here: [link]. Pick one starter task, or use your own. |
| "Which AI tool?" | Any tool you already use, including free versions. The exercise doesn't run an AI for you. Limits on free versions change, so check yours. |
| "Does it work in Nigeria?" | Yes, it is a web page and works with free tools. Prices for planned products would be in naira and set separately. Not on sale yet. |
| "How much will it cost?" | Not on sale. We are testing prices in pounds and naira. Planned test prices are on the pricing page. They may change. |
| "Can I get a certificate?" | No, not today. |
| "Is this safe for my work data?" | General guidance: keep passwords, bank details and ID out. Replace names with placeholders. Read your employer's rules and the tool's settings. This is not legal advice. |
| "AI got it wrong" | Good catch. That's the reason for the check step. Which detail was wrong? |
| "Can you review my text?" | I can't take private documents here. Try the exercise on a fictional version. |
| "Sounds like a scam" | Fair question. Nothing is for sale and we haven't asked for payment. There is no account. Here is what exists: [link]. |
| "Hype/claim: will it make me money?" | No promise. It is practice at using AI on tasks and checking the result. |
| Negative/critical | Thank you for saying. What would have made it useful? (Do not argue. Log in tracker.) |
| Spam/abuse | Delete and block; do not engage. |
| DM with business interest | Thanks. For teams, the business page has a short assessment and contact form: [link]. |
| DM asking for early access | Add your email on the early-access form: [link]. One email when something real is ready. |
| Interview invite | I'm talking to people about what they'd want guided help with. Would you spare 15 minutes? No selling. You can say no. |

## 7. Community guidelines (for any comment section, group or channel you run)

1. Be kind and specific. No harassment, hate or discrimination.
2. No private or sensitive data. Do not post passwords, bank or card details, IDs, or other people's information.
3. No promotion of cheating in assessments; follow your institution's rules.
4. No spam, referral links or unsolicited promotion.
5. No advice presented as professional legal, financial, medical or valuation advice.
6. Disagreement is welcome; personal attacks are not.
7. Moderators may remove content and members who break these rules. Reports go to [contact email placeholder].
8. By participating you agree that posts may be moderated. We don't share your content without permission.

Moderation: one owner, a written log of removals, and an apology and correction if we remove something in error. Do not create a group until you can moderate it.

## 8. Hashtag approach (verify before use)

- Use 3 to 5 per post; hashtag usefulness and platform rules change.
- Mix: one broad (for example #AI), one task (for example #StudyTips or #SmallBusinessUK), one format (#HowTo), one brand (#PractiseAI; check what it means before using it).
- UK: add place-based terms where relevant. Nigeria: add relevant local tags only after confirming meaning and usage (verify before use).
- Avoid banned, spammy or misleading tags; avoid tags like #Hack that imply tricks.
- Track which tags you use in the tracker notes. Evaluate after 30 days. If no measurable benefit, drop them.

## 9. Posting hygiene

- Upload natively. No third-party watermarks.
- Check link, UTM, caption and alt text before posting.
- Schedule only with tools you have verified (native schedulers where available; verify before use).
- Two-factor authentication on all accounts. Never share passwords in chat or email.
- Respond to corrections quickly: if a post contained a wrong claim, edit, add a visible correction and record in the weekly review.
