import type { Brief } from '@/lib/prompt';

export interface StarterTask {
  id: string;
  title: string;
  blurb: string;
  context: string;
  problem: string;      // the realistic starting problem, plain language
  materialLabel: string;
  brief: Brief;
  fictionalNote?: string;
}

export const STARTER_TASKS: StarterTask[] = [
  {
    id: 'weekly-update',
    title: 'Weekly update from scattered notes',
    blurb: 'Work · about 10 minutes',
    context: 'Everyday work',
    problem:
      'You have a week of half-finished notes and your manager wants a short update. Writing it from scratch takes longer than it should, and you always forget something.',
    materialLabel: 'Your notes',
    brief: {
      task: 'Write a short weekly update for my manager from my notes.',
      audience: 'My manager, who has two minutes to read it.',
      tone: 'Plain, calm and professional. British English.',
      format: 'Three headings: Done, In progress, Needs a decision. Bullet points. Under 150 words.',
      rules: 'Keep dates, names and amounts exactly as written.\nDo not add praise or filler.',
      material:
        'Mon: call with Dan about the supplier delay. New date is the 21st (was the 14th).\nTue: finished draft of onboarding checklist, needs Sam to review.\nWed: Hartley invoice query. They say £480 not £840. I checked, we typed it wrong. Credit note still to be issued.\nThu: team meeting. Agreed to move the Friday check-in to Mondays.\nOpen: website photos still not here, chase Jo.\nFri: half day.',
    },
  },
  {
    id: 'customer-reply',
    title: 'Reply to a customer whose order is late',
    blurb: 'Small business · about 10 minutes',
    context: 'Independent work and small business',
    problem:
      'A customer is upset about a late order. You know the facts, but you are tired and your first draft keeps coming out defensive or too long.',
    materialLabel: 'The customer message and your facts',
    brief: {
      task: 'Write a reply to this customer that explains the delay honestly and offers what I can offer.',
      audience: 'A customer who is worried the order will miss a wedding.',
      tone: 'Warm, direct and respectful. Plain English, no corporate phrases.',
      format: 'A short message I can send on WhatsApp or email. Under 90 words. One clear next step.',
      rules: 'Do not promise anything that is not in my facts.\nDo not blame the courier by name.',
      material:
        'CUSTOMER MESSAGE:\n"Good afternoon, I ordered the Ankara set (order 2041) on 3 Oct and was told 5 days. It is now 12 days. Please tell me what is happening. I need it for a wedding on the 26th."\n\nMY FACTS:\n- The courier held the parcel at the Ibadan hub.\n- New delivery date is 18 Oct.\n- I can refund the ₦3,500 delivery fee.\n- I cannot promise it will arrive earlier than 18 Oct.',
    },
  },
  {
    id: 'study-notes',
    title: 'Turn a reading into study notes',
    blurb: 'Study · about 10 minutes',
    context: 'Study',
    problem:
      'You have a dense page of notes and an exam coming. Re-reading is not working. You want notes you can test yourself with.',
    materialLabel: 'Your reading or notes',
    brief: {
      task: 'Turn my reading into study notes I can revise from.',
      audience: 'Me, a student revising for an introductory economics exam.',
      tone: 'Simple and clear. Explain any technical word in brackets.',
      format: 'Five key points as short bullets, then three questions that test whether I understood.',
      rules: 'Use only my text. If a point is unclear in my text, say so.\nDo not add examples that are not in my text.',
      material:
        'When the price of a good rises, people usually buy less of it. This is the law of demand. When the price rises, sellers are usually willing to supply more, because each unit earns more money. This is the law of supply. The price at which the amount people want to buy equals the amount sellers want to sell is the equilibrium price. If the price is above equilibrium, there is a surplus, so sellers tend to cut prices. If the price is below equilibrium, there is a shortage, so buyers compete and prices tend to rise. Demand can shift when incomes change or tastes change, which moves the equilibrium.',
    },
  },
  {
    id: 'listing-draft',
    title: 'Draft a property listing from verified facts',
    blurb: 'Real estate · about 15 minutes',
    context: 'A taste of the real estate workflow',
    problem:
      'You have a sheet of confirmed facts about a property and need a clear first draft of the listing. The risk is a draft that sounds good but adds things that are not true.',
    materialLabel: 'Verified property facts',
    fictionalNote: 'This is a fictional property written for practice. It is not a real listing.',
    brief: {
      task: 'Draft a property listing description from these verified facts.',
      audience: 'People searching online for a two-bedroom flat to buy.',
      tone: 'Clear, factual and welcoming. No hype. British English.',
      format: 'A headline, a description of about 90 words, then six key-feature bullets.',
      rules: 'Mention tenure and service charge.\nDo not describe anything that is not in the facts.\nAvoid words like "stunning", "perfect" and "must see".\nDo not say anything about the neighbourhood or neighbours.',
      material:
        '2-bed, 1-bath, first-floor flat in a 1930s purpose-built block (fictional example).\n61 sq m.\nKitchen fitted 2023. Double glazing throughout.\nEight minutes on foot to the station (confirmed on a map).\nLeasehold, 112 years remaining. Service charge £1,850 a year.\nNo parking. EPC rating C.',
    },
  },
  {
    id: 'own-task',
    title: 'Use my own task',
    blurb: 'Anything you are working on',
    context: 'Your own work',
    problem: 'You choose the task. Start small: something you could finish in one sitting, where you can tell whether the result is right.',
    materialLabel: 'Your material (remove names and private details first)',
    brief: { task: '', audience: '', tone: 'Clear and plain. British English.', format: '', rules: '', material: '' },
  },
];

export const BRIEF_FIELDS = [
  { key: 'task', label: 'The task', hint: 'One sentence. Start with a verb: write, summarise, rewrite, list, compare.', multiline: false },
  { key: 'audience', label: 'Who it is for', hint: 'Who will read or use the result, and what they need from it.', multiline: false },
  { key: 'tone', label: 'Tone', hint: 'How it should sound. Mention British or Nigerian English if it matters to you.', multiline: false },
  { key: 'format', label: 'Shape of the answer', hint: 'Headings, bullets, length, order. Be specific.', multiline: true },
  { key: 'rules', label: 'Rules', hint: 'One per line: what to keep exactly, what to avoid, what not to invent.', multiline: true },
] as const;

export interface Check {
  id: string;
  label: string;
  how: string;
  fixPrompt: string;
}

export const CHECKS: Check[] = [
  {
    id: 'facts',
    label: 'Every date, name and amount matches my material.',
    how: 'Pick three specific details in the answer. Find each one in your own material. Do not trust your memory.',
    fixPrompt:
      'Check your answer against my material line by line. For every date, name and amount, quote the part of my material it came from. Correct anything that does not match.',
  },
  {
    id: 'invented',
    label: 'Nothing was added that I did not give it.',
    how: 'Read each sentence and ask: where did this come from? Anything you cannot trace to your material is invented.',
    fixPrompt:
      'List every statement in your answer that is not directly supported by my material. Then rewrite the answer without those statements.',
  },
  {
    id: 'missing',
    label: 'Nothing the reader needs has been left out.',
    how: 'Reread your material with the reader in mind. Is there something important that did not make it in?',
    fixPrompt:
      'Compare your answer with my material. List anything important in my material that your answer left out, then add it in the same format.',
  },
  {
    id: 'voice',
    label: 'It suits the reader and I would be happy to send it.',
    how: 'Read it aloud. If you would not say it, or it sounds like someone else, it needs another pass.',
    fixPrompt:
      'Rewrite this so it sounds like a clear, friendly person wrote it. Shorter sentences. Remove filler and any phrase I would not say out loud. Keep every fact unchanged.',
  },
  {
    id: 'format',
    label: 'The format and length are what I asked for.',
    how: 'Count the headings, bullets and words against your instructions.',
    fixPrompt:
      'Reformat your answer to follow my format and length instructions exactly. Do not change any facts.',
  },
  {
    id: 'safe',
    label: 'It is safe to share: no private or sensitive details that should not be in it.',
    how: 'Look for names, contact details, account numbers or anything confidential, in what you pasted and in what came back.',
    fixPrompt:
      'Remove or replace any personal or confidential details in this text with neutral placeholders like [CLIENT] or [ADDRESS].',
  },
];

export const WORKED_EXAMPLE = {
  intro:
    'This worked example uses the first starter task. The "AI draft" below is an illustration written by Fieldwork to show what checking looks like. It was not generated live by a model, and your result from your own tool will differ.',
  firstDraft: `Weekly update

Done
- Finished the onboarding checklist and sent it to Sam for review.
- Resolved the Hartley invoice query. The correct amount is £480 and the credit note has been issued.
- Moved the Friday check-in to Mondays.

In progress
- Supplier delay: delivery now expected on the 21st.
- Chasing Jo for the website photos.

Needs a decision
- Nothing this week.`,
  found: [
    {
      check: 'Facts match the material',
      finding:
        'The notes say the credit note is "still to be issued". The draft says it "has been issued". A small word, a real mistake: the manager would think it was finished.',
    },
    {
      check: 'Nothing invented',
      finding:
        'The draft says the checklist was "sent to Sam". The notes only say it "needs Sam to review". It may not have been sent yet.',
    },
    {
      check: 'Nothing missing',
      finding: 'The supplier date moved from the 14th to the 21st. The draft does not say it slipped a week, which is the part the manager cares about.',
    },
  ],
  followUp:
    'Check your update against my notes. Fix these three things: the credit note has NOT been issued yet; the checklist needs Sam to review it but I have not said it was sent; say the supplier delivery slipped from the 14th to the 21st. Keep everything else the same.',
  improved: `Weekly update

Done
- Finished the draft onboarding checklist. It needs Sam to review it.
- Found the Hartley invoice error: we typed £840 instead of £480.
- Agreed at Thursday's meeting to move the Friday check-in to Mondays.

In progress
- Credit note for Hartley still to be issued.
- Supplier delivery has slipped a week, from the 14th to the 21st.
- Website photos have not arrived. Chasing Jo.

Needs a decision
- None this week.`,
  lesson:
    'Two follow-up minutes caught three errors that would have gone to a manager. The checking step is where the value is, and it is a skill you can practise.',
};
