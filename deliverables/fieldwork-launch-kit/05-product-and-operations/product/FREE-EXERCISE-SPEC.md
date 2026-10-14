# Free exercise specification: "First workflow"

Route: `/learn/first-workflow` (constant `FREE_EXPERIENCE_PATH` in `src/config/site.ts`). Component: `src/components/learn/FirstWorkflow.tsx`. Content: `src/content/learn/first-workflow.ts`. Pure helpers: `src/lib/prompt.ts` (`buildPrompt`, `wordCount`), `src/lib/workflow-card.ts` (`buildWorkflowCard`). Persistence: `src/lib/storage.ts`.

Status: **Completed and Tested** (browser test "free exercise runs start to finish, copies prompt, downloads card, stores locally" and "exercise state survives reload" pass in `qa/browser-results.json`; prompt and card builders have unit tests in `tests/validation.test.ts`). Written 14 October 2026 from the code.

The page's claimed duration ("about 15 minutes", "about 10 minutes" per task) is the author's estimate and has **not** been timed with real users. Verify before using it in advertising.

## 1. Purpose

Give anyone a complete, useful experience with no account and no cost: take one real task, write a five-part brief, run it in the visitor's own AI tool, check the result against six checks, and keep a reusable workflow card. The page itself never calls an AI model.

## 2. Steps

Constant `STEPS = ['Welcome', 'Choose a task', 'Write the brief', 'Run it', 'Check it', 'Keep it']` (index 0 to 5).

| # | Step | What the user does | Gate to continue |
|---|---|---|---|
| 0 | Welcome | Reads what they will do/need; privacy callout ("stays on your device"). Button "Start the exercise" fires `free_experience_started` then moves on | none |
| 1 | Choose a task | Picks one of five starter tasks; sees the starting problem | a task selected |
| 2 | Write the brief | Edits five fields (task, audience, tone, format, rules) and the material; prompt preview updates live; copy button | `task` and `format` each longer than 3 characters (`briefReady`) |
| 3 | Run it | Four instructions; copies the prompt; optionally pastes the AI answer into a textarea | none |
| 4 | Check it | Ticks six checks; unticked checks show a ready-made follow-up prompt; "See a finished example" disclosure | none (can proceed with unticked checks) |
| 5 | Keep it | Names the workflow, says when to use it, notes what was fixed; previews card; downloads `.md`; prints; "I have finished the exercise" -> completion panel with next links and optional email form | none |

Navigation: left nav (top on mobile) lists steps; a step button is disabled if `i > reached && i > step`, so users can go back freely and forward only to reached steps. Focus moves to the step heading on each step change (not on first render). Progress bar `role="progressbar"` with computed percent.

## 3. Starter tasks (`STARTER_TASKS`)

| id | Title | Context |
|---|---|---|
| `weekly-update` | Weekly update from scattered notes | Everyday work |
| `customer-reply` | Reply to a customer whose order is late | Independent work and small business |
| `study-notes` | Turn a reading into study notes | Study |
| `listing-draft` | Draft a property listing from verified facts | A taste of the real estate workflow |
| `own-task` | Use my own task | Your own work; brief empty except tone ("Clear and plain. British English."); card name left blank |

Each has `problem`, `materialLabel`, a prefilled `Brief` using fictional material, and optional `fictionalNote`. Only fictional data may be added.

## 4. Content model

```ts
StarterTask { id, title, blurb, context, problem, materialLabel, brief: Brief, fictionalNote? }
Brief       { task, audience, tone, format, rules, material }      // src/lib/prompt.ts
BRIEF_FIELDS[ {key, label, hint, multiline} ]                       // task, audience, tone, format, rules
Check       { id, label, how, fixPrompt }
CHECKS      ids: facts, invented, missing, voice, format, safe       // six checks
WORKED_EXAMPLE { intro, firstDraft, improved, found[{check,finding}], followUp, lesson }
```

`buildPrompt(brief)` outputs: intro line; Task / Who it is for / Tone / Output format (with placeholders if empty); "Rules:" list that always begins with two built-in rules (use only the material given; write `[needs checking]` rather than guess) followed by the user's rules; an instruction to end with an "Assumptions" list; then the material between `---` rules, or `[PASTE YOUR MATERIAL HERE]` if empty.

`buildWorkflowCard` outputs Markdown: title, when to use, four steps, the prompt (material removed), the checklist with `[x]` for ticked checks, and "What I changed after checking".

## 5. State model

Stored under localStorage key `fw-learn-v1` via `useStoredState` (in-memory fallback when storage is blocked; renders `initial` on server and during hydration to avoid mismatch).

```ts
State {
  step: number;          // current step index
  reached: number;       // furthest step reached
  taskId: string|null;
  brief: Brief;          // editable copy, seeded from the chosen task
  answer: string;        // optional pasted AI answer
  checks: Record<string, boolean>;
  cardName: string; when: string; reflection: string;
  completed: boolean;
}
```
- `revive()` merges stored data over `initial`, so adding new fields later is backward compatible; removing or renaming fields is not. A breaking change should bump the key (`fw-learn-v2`).
- `pick(id)` replaces `brief`, `cardName`, resets `checks` and `answer` (switching tasks discards the previous answer and ticks).
- "Clear my entries and start again" calls `clear` (removes the key).
- Nothing is sent to the server. The email form at the end is a separate `LeadForm` (type `newsletter`, interest `free-exercise-complete`).

## 6. Accessibility

Implemented: single `h2` per step with `tabIndex={-1}` and focus on change; labelled inputs with `aria-describedby` hints; `fieldset`/visually-hidden `legend` for checks; `aria-live="polite"` regions for task problem and check results; `aria-pressed` on choice buttons; `aria-current="step"` on nav; `progressbar` role; native `details`/`summary` for disclosures; buttons are real `<button>`s. Axe: no violations on this route at 390 and 1440 (initial state only; later steps with revealed content are exercised by the browser test but not by axe).

Known gaps: not tested with a screen reader by a person; the disabled "Choose a task to continue" button also carries `aria-disabled`; the completed check icon uses a "✓" with `aria-label`; no skip within long steps; printing the card uses the browser print dialog (the whole page prints with `.no-print` chrome hidden, not only the card).

## 7. Analytics events (consent-gated; see ANALYTICS-EVENT-SPEC.md)

| Event | When | Properties |
|---|---|---|
| `free_experience_started` | Click "Start the exercise" | none |
| `free_experience_step_completed` | Each `next()` | `step` = label of the step just left (e.g. "Write the brief") |
| `free_experience_completed` | "I have finished the exercise", first time only | `task` = task id |
| `prompt_copied` | Any copy button | `location` = `brief`, `run`, `fix`, `example` or `card` |
| `email_signup_submitted` | End-of-exercise email form success | `location` = `free-exercise-complete`, `audience` = `individual` |

No exercise text (task, brief, answer, reflection) ever enters an event; only the allow-listed keys can.

## 8. Privacy

- Typed content stays in the browser. The page tells users so (welcome step and footer note).
- The page warns before the "Run it" step not to paste passwords, bank/medical details or other people's private data.
- Users take their prompt to a third-party AI tool; that tool's terms and privacy apply, not Fieldwork's. The exercise says it does not endorse a tool.
- If the site owner enables analytics, only event names and the safe properties above are sent, and only after consent.

## 9. What is not in V1

No accounts, no saved cloud progress, no multiple exercises, no feedback on the user's answer (the page cannot see or grade it), no certificates, no video, no localisation beyond British English (Nigerian English note appears as a hint in the Tone field), no analytics funnel until configured.

## 10. What changes for V2 (proposal; nothing built)

| Change | Reason | Needs |
|---|---|---|
| Second and third exercises (e.g. "Check a claim", "Summarise a long document") sharing the same step component | Retention beyond one session | Content schema generalised: `Exercise { id, steps[], tasks[], checks[] }`; routes `/learn/<slug>`; per-exercise storage key |
| Optional account to sync progress and keep a library of workflow cards | Reuse across devices | Auth, database, privacy notice and DPA updates, lawful-basis review (solicitor) |
| Guided projects (paid) | Revenue test | Payment provider, terms for digital content/withdrawal rights (solicitor), delivery mechanism |
| Light feedback by a person or model on pasted answers | Quality | Costs, safety, data processing agreement; opt-in only |
| Business version with company-specific tasks | Links to `docs/product/PRD-ONBOARDING-PLATFORM.md` | Multi-tenant content store |
| Evidence of learning (before/after checks) | Prove value | Study design; consent |
| Nigeria-adapted tasks (local examples, naira, WhatsApp-style messages) | Market fit | Research with Nigerian users |

Before any V2 build, check the evidence gates in `CONSUMER-ROADMAP.md`.

## 11. Test checklist for changes

1. `npm run check`.
2. Build and start; run `node scripts/qa/browser-tests.mjs`.
3. Walk all five tasks, including `own-task` with empty fields (the "Run it" button must stay disabled until task and format are filled).
4. Reload mid-exercise: state returns. Clear storage: returns to Welcome.
5. Block storage (private window): works in memory for the session.
6. Keyboard only through all six steps; check focus lands on each heading.
7. Download the card and read it.
