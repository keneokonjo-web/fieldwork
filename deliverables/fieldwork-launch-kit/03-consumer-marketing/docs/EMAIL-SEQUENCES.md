# Email sequences

Version 0.1, 14 October 2026. Five sequences for Fieldwork for Individuals. All copy is draft, plain-text friendly and British English.

## 0. Read before sending anything

1. **No email tool is connected yet.** Nothing here can be sent until a tool is configured and tested. Options to evaluate (verify free tiers, sending limits, pricing, GDPR/NDPR tooling and data location before choosing): **Buttondown**, **beehiiv**, **Brevo**, **MailerLite**. Choose on: free subscriber limit, double opt-in, unsubscribe handling, UK/Nigeria deliverability, export of your data, automation (sequences) availability on the free plan, and whether the company is acceptable to your privacy notice. Do not assume any free tier includes automation; some do not.
2. **Consent first.** Send only to people who have given a clear opt-in for the kind of email they get. The current early-access forms on the site say: *"One email when something real is available. No countdowns, no pressure"* and *"We will email you when guided projects are ready."* That promise covers **sequence C (early access) only, and only a single email when something real is ready**. Sequences A, B, D and E require a separate, clear opt-in ("Send me the Fieldwork emails: short practical notes about using AI, roughly [weekly/fortnightly]"). Before using them, change the form copy and the privacy notice, store the consent text and date, and use `marketingOptIn` correctly (it is a field in `src/lib/validation.ts`; confirm how the lead store records it). Until then, treat A, B, D, E as drafts.
3. **Sequence B needs an opt-in step after the exercise.** The exercise has no account and keeps entries on the device, so nobody is emailed after finishing unless you add a clearly optional email prompt at the end. That prompt does not exist yet.
4. **UK and Nigeria data protection:** UK (UK GDPR and PECR) and Nigeria (NDPA 2023) rules apply to the people you email. Get professional advice for your set-up (verify before use). Include a working unsubscribe link in every email, and honour it promptly. Add your sender identity and a postal address or contact route as required (company details are placeholders in `src/config/site.ts`; fill them first).
5. **Never put in email:** invented numbers, testimonials, urgency, claims that paid items are available, personal data from analytics.
6. **Plain-text first.** Write so the email reads fine without styling. If HTML is used: ink text on paper, a system font stack (Schibsted Grotesk is not safe in email), no image-only emails (low data readers).
7. **Links** use UTMs: `utm_source=email&utm_medium=email&utm_campaign=<sequence>&utm_content=<email-id>` (see `FUNNEL-AND-METRICS.md`).
8. **Standard footer for every email** (replace placeholders):

> You are receiving this because you signed up at [site] on [date]. [Unsubscribe link]
> Fieldwork, [company name and contact address placeholder]. Privacy: [link to privacy notice].
> Reply to this email if you'd like us to delete your details.

Timing assumes the recipient's local time (ASSUMPTION: UK and Nigeria are close in time; GMT/BST vs WAT differs by 0 to 1 hour). Open and click rates are unreliable because of mail privacy features (verify); judge by clicks and replies.

---

## A. Welcome sequence (4 emails)

**Requires a newsletter opt-in** (see section 0, point 2). **Goal:** get them to finish the free exercise, then understand status.
**Sender:** [Founder first name] at Fieldwork (placeholder; do not invent a team). **From:** [sender address placeholder].

### A1. Send immediately

- **Subject:** Your first Fieldwork task (about 15 minutes)
- **Preview:** One real task, a method, and a way to check the result.
- **Body:**

> Hello [first name or "there"],
>
> Thanks for joining. Fieldwork is a place to practise AI on real work.
>
> The best thing you can do now is the free exercise. It is about 15 minutes, needs no account, and works with the free version of whichever AI tool you already use. You pick a starter task (a weekly update, a late-order reply, study notes, a property listing) or use your own, write a brief, run it, check the result, and keep a workflow card.
>
> Your entries stay on your device. We do not run an AI for you, and we do not see what you type.
>
> Start here: [exercise link]
>
> I'd like to hear how it goes. Reply with one thing that was clear and one that wasn't.
>
> [Name]
> Fieldwork
>
> [standard footer]

- **CTA:** Start the free exercise.

### A2. Send day 3

- **Subject:** The five-part brief, on one page
- **Preview:** Task, audience, tone, shape, rules.
- **Body:**

> Hello [name],
>
> Most disappointing AI answers come from thin requests. "Write an email about the delay" leaves the tool to guess everything.
>
> A brief has five parts:
> 1. Task. One sentence starting with a verb.
> 2. Audience. Who will read it, and what they need.
> 3. Tone. How it should sound.
> 4. Shape. Length, headings, order.
> 5. Rules. What to keep exactly, and what not to invent.
>
> The short article is here: [Field Note link]. If you haven't done the exercise yet, it builds the brief for you as you type: [exercise link].
>
> [Name]
>
> [standard footer]

- **CTA:** Read the Field Note (or do the exercise).

### A3. Send day 7

- **Subject:** The step most people skip
- **Preview:** AI sounds right whether or not it is right.
- **Body:**

> Hello [name],
>
> AI tools write fluently whether or not the content is right. A confident paragraph with one wrong figure reads exactly like one with none.
>
> Here are three quick checks:
> - Pick three details (a date, a name, an amount) and find each in your own material.
> - Read every sentence and ask where it came from.
> - Read it aloud. If you would not say it, change it.
>
> The full list of six checks, with the follow-up prompts, is here: [Field Note link].
>
> [Name]
>
> [standard footer]

- **CTA:** Read the checks.

### A4. Send day 12

- **Subject:** What is live, and what is not
- **Preview:** Plain status, no pressure.
- **Body:**

> Hello [name],
>
> A quick, honest status.
>
> Live today: one free guided exercise and four short articles.
> Planned, not on sale: guided projects and a membership.
>
> We're testing prices in pounds and naira, set separately, and talking to people about which tasks they'd want guided help with first. If you'd like to take part in a 15-minute chat (no selling), reply "yes". If you'd rather just hear when something is ready, join the early-access list: [link].
>
> You can unsubscribe at any time and nothing changes.
>
> [Name]
>
> [standard footer]

- **CTA:** Reply yes, or join the early-access list.

---

## B. Post-exercise follow-up (3 emails)

**Requires** an optional email prompt shown after the exercise (not built yet) with its own consent text. **Goal:** deepen the habit and gather feedback. Do not assume the person finished unless the prompt says so; refer to "your first task" without pretending to know details.

### B1. Send 1 hour after opt-in

- **Subject:** Keep the workflow card
- **Preview:** Reuse beats starting again.
- **Body:**

> Hello [name],
>
> If you've finished the exercise, you have a workflow card: your brief and your checks. Keep it. Next time you have a similar task, change the facts, paste it into your tool, and run the checks.
>
> The reason this works is that the check is a habit, not a talent. Next time, try it with a task that really matters to you this week.
>
> Your card stays on your device. If you lose it, the exercise takes about 15 minutes to repeat: [exercise link].
>
> [Name]
>
> [standard footer]

### B2. Send day 3

- **Subject:** One question about your first task
- **Preview:** Your answer shapes what we build.
- **Body:**

> Hello [name],
>
> One question: what task did you try, and what was the hardest part? Just reply in a sentence or two. I read every reply.
>
> If you have 15 minutes for a chat, say so. No selling. I am trying to learn which tasks to build guided projects for, and I'd rather ask than guess.
>
> [Name]
>
> [standard footer]

- **CTA:** Reply.

### B3. Send day 10

- **Subject:** Try the same method on a second task
- **Preview:** Three ideas.
- **Body:**

> Hello [name],
>
> Three tasks that fit the method:
> 1. A message you've been avoiding replying to.
> 2. A page of notes you need to turn into a summary.
> 3. A repetitive piece of writing you do every week.
>
> Write the brief, run it, check it, keep the card. If anything fails the checks, the fix prompts are in the exercise: [link].
>
> What do you want a guided project on? Tell me, and I'll note it.
>
> [Name]
>
> [standard footer]

---

## C. Early-access / waitlist for guided projects (3 emails)

**Consent basis:** the existing early-access form (one email when something real is available). **Important:** do not send C1 and C2 as marketing unless the subscriber agreed to more than one email. Treat C1 as a "what we're doing" email only if consent covers it; otherwise skip to C3 when there is something real. Never describe a project as available or purchasable until payments are connected and a product exists.

### C1. Confirmation of what they signed up for (send immediately, if confirmation is appropriate)

- **Subject:** You're on the Fieldwork early-access list
- **Preview:** What we'll email you about, and what we won't.
- **Body:**

> Hello [name],
>
> You're on the early-access list for Fieldwork guided projects.
>
> What that means: we'll send one email when something real is ready. Guided projects are planned and not on sale. We don't have a date.
>
> What it does not mean: no payment is taken, nothing is reserved, and there is no countdown. You can unsubscribe at any time.
>
> If you'd like to try the free exercise while you wait: [link].
>
> [Name]
>
> [standard footer]

### C2. "Which project first?" (only if consent covers it, otherwise ask via the site)

- **Subject:** Which guided project should we build first?
- **Preview:** Three options, one short question.
- **Body:**

> Hello [name],
>
> We're deciding which guided project to build first. The candidates:
> A. Shape a business idea into a one-page plan to test.
> B. Turn an outline into a clean document or short presentation.
> C. Build a simple one-page website from a brief.
>
> Reply with A, B, C, or your own idea. Each guided project, if built, would be a start-to-finish task with a checking guide, working with free AI tools. There's no obligation and nothing to buy.
>
> If you're happy to talk for 15 minutes, say so.
>
> [Name]
>
> [standard footer]

### C3. Something real is ready (send only when true)

- **Subject:** [Project name] is ready to try
- **Preview:** [One line stating exactly what is available and how it is paid for or free.]
- **Body:**

> Hello [name],
>
> As promised, here is the one email. [Project name] is now [available / available for early testers]. Here is what it is: [two sentences with facts]. Here is what is not included: [limits].
>
> Price: [price in GBP or NGN, matching the site's pricing page]. [Refund terms in one sentence]. If you'd rather not, you don't need to do anything.
>
> [Link]
>
> [Name]
>
> [standard footer]

**Do not send C3 until:** payments are connected and tested, refund policy is written, terms and privacy updated, support route in place (see `CONSUMER-PRICING-ASSUMPTIONS.md`).

---

## D. Re-engagement (2 emails)

**Requires** prior consent. Send to subscribers with no click in 60 days (ASSUMPTION; adjust).

### D1. Send at day 0

- **Subject:** Still want these emails?
- **Preview:** No hard feelings either way.
- **Body:**

> Hello [name],
>
> You haven't opened or clicked for a while. That's fine. Before I send more, do you still want them?
>
> If yes, click here: [keep link]. If not, you can unsubscribe below, and I'll stop.
>
> One useful thing in the meantime: the free exercise, about 15 minutes, no account: [link].
>
> [Name]
>
> [standard footer]

### D2. Send day 7 (only to those who did not click D1)

- **Subject:** Last note, then I'll stop
- **Preview:** I'll remove you if I hear nothing.
- **Body:**

> Hello [name],
>
> I'm tidying the list. If you want to stay, click here: [keep link]. If I don't hear from you, I'll remove you in 7 days so I'm not sending you things you don't want.
>
> Thanks for having been here.
>
> [Name]
>
> [standard footer]

Then remove non-responders promptly.

---

## E. Field Notes digest template (fortnightly or monthly, ASSUMPTION)

- **Subject:** `Field Notes: [issue topic in 5 to 8 words]`
- **Preview:** `[One concrete sentence]`
- **Body:**

> Hello [name],
>
> **This issue:** [One-sentence summary of the main idea].
>
> **The note:** [Title]. [Two-sentence summary]. Basis: [paste the article's basis line, for example "an explanation of a method; no tool was tested"]. Read it: [link].
>
> **Try this (10 minutes):** [One small task] with this brief: [short brief]. Check: [one check].
>
> **From the mailbag:** [One question and answer, with permission, anonymised].
>
> **Status:** Live: [list]. Planned, not on sale: [list]. [Anything that changed since last time.]
>
> Reply and tell me what you'd like covered next.
>
> [Name]
>
> [standard footer]

Rules: one main link, one task, no urgency, no unverified statistics. Every claim about a tool has a date and "not tested" if untested.

---

## Sequence summary

| Seq | Emails | Trigger | Consent needed | Tool needed |
|---|---|---|---|---|
| A. Welcome | 4 | Newsletter opt-in | Specific newsletter consent | Automation |
| B. Post-exercise | 3 | Optional email prompt after exercise (to build) | Specific consent | Automation |
| C. Early access | 3 | Early-access form | Covered for single "ready" email only | Manual send ok |
| D. Re-engagement | 2 | 60 days no click | Prior consent | Segmenting |
| E. Digest | repeat | Manual | Newsletter consent | Manual or scheduled |

## Implementation checklist

- [ ] Pick a tool and verify free-tier limits.
- [ ] Fill company/contact placeholders in `.env` (see `src/config/site.ts`).
- [ ] Update the consent copy on forms and the privacy notice.
- [ ] Set up double opt-in if the tool supports it.
- [ ] Test A1 end to end, including unsubscribe.
- [ ] Add UTMs to every link.
- [ ] Add a "tell us what you want" reply route monitored by a person.
