import { WORKFLOWS, type Workflow } from '@/content/corporate/workflows';

export interface Option { value: string; label: string; score?: number }
export interface Question { id: string; text: string; type: 'single' | 'multi'; hint?: string; options: Option[] }

export const QUESTIONS: Question[] = [
  { id: 'usage', text: 'Are your staff already using AI tools for work?', type: 'single', options: [
    { value: 'none', label: 'Not that we know of', score: 0 },
    { value: 'informal', label: 'Some people use free tools on their own', score: 1 },
    { value: 'mostly', label: 'Most staff use them, but with no shared approach', score: 2 },
    { value: 'approved', label: 'We have approved tools and shared practice', score: 3 },
  ] },
  { id: 'rules', text: 'Do you have written rules on what staff may and may not put into AI tools?', type: 'single', options: [
    { value: 'none', label: 'No rules', score: 0 },
    { value: 'verbal', label: 'Verbal guidance only', score: 1 },
    { value: 'written', label: 'A written policy', score: 2 },
    { value: 'trained', label: 'A written policy and staff have been trained on it', score: 3 },
  ] },
  { id: 'workflows', text: 'Which tasks take your team the most repeated writing or admin time?', type: 'multi', hint: 'Choose all that apply.', options: WORKFLOWS.map((w) => ({ value: w.id, label: w.title })) },
  { id: 'constraints', text: 'What holds you back most?', type: 'multi', hint: 'Choose all that apply.', options: [
    { value: 'data', label: 'Worry about client data and confidentiality' },
    { value: 'accuracy', label: 'Worry about errors or invented facts' },
    { value: 'confidence', label: 'Staff are unsure how to use the tools well' },
    { value: 'time', label: 'No time to learn or set anything up' },
    { value: 'standards', label: 'Everyone works differently, so quality is inconsistent' },
    { value: 'access', label: 'Cost of paid tools, or difficulty paying for them' },
    { value: 'connectivity', label: 'Slow or unreliable internet' },
  ] },
  { id: 'onboarding', text: 'How long does a new starter take to work independently?', type: 'single', options: [
    { value: 'fast', label: 'Under a month' },
    { value: 'medium', label: 'One to three months' },
    { value: 'slow', label: 'More than three months' },
    { value: 'unsure', label: 'Not sure' },
  ] },
  { id: 'size', text: 'How many people would take part?', type: 'single', options: [
    { value: '1-5', label: '1 to 5' }, { value: '6-15', label: '6 to 15' }, { value: '16-50', label: '16 to 50' }, { value: '50+', label: 'More than 50' },
  ] },
  { id: 'market', text: 'Where is the business based?', type: 'single', options: [
    { value: 'uk', label: 'United Kingdom' }, { value: 'nigeria', label: 'Nigeria' }, { value: 'other', label: 'Somewhere else' },
  ] },
  { id: 'owner', text: 'Who would own AI practice inside the business?', type: 'single', options: [
    { value: 'director', label: 'An owner or director' }, { value: 'ops', label: 'An operations manager' }, { value: 'marketing', label: 'Someone in marketing' }, { value: 'nobody', label: 'Nobody yet' },
  ] },
];

export type Answers = Record<string, string | string[] | undefined>;
export type Level = 'foundation' | 'emerging' | 'ready';

export interface Report {
  level: Level;
  levelLabel: string;
  levelText: string;
  workflows: { workflow: Workflow; reason: string }[];
  constraintActions: string[];
  onboardingNote: string;
  format: string;
  ownerNote: string;
  summary: string;
  complete: boolean;
}

const PRIORITY = ['listings', 'comms', 'reports', 'procedures', 'feedback', 'research', 'marketing'];
const CONSTRAINT_ACTIONS: Record<string, string> = {
  data: 'Agree what may never be pasted into a tool (client personal data, identity documents, financial details) and practise using placeholders. Seek legal advice on your data protection duties. This assessment is not legal advice.',
  accuracy: 'Make “check against the source” a visible step in every workflow. Start with tasks where each claim can be checked quickly.',
  confidence: 'Practise on three real tasks with a shared brief structure, rather than a general tool demonstration.',
  time: 'Start with one workflow and one small pilot group. A short, repeated practice session beats a long one-off day.',
  standards: 'Agree a house brief and a house checklist for one workflow so output is comparable across the team.',
  access: 'Design practice around free tool tiers so nobody needs a paid account to take part. Decide separately which paid tools, if any, are worth buying.',
  connectivity: 'Use light, text-first material that works on a mobile connection, and avoid tasks that depend on large uploads.',
};

export function scoreReadiness(a: Answers) {
  const opt = (qid: string) => QUESTIONS.find((q) => q.id === qid)!.options.find((o) => o.value === a[qid]);
  return (opt('usage')?.score ?? 0) + (opt('rules')?.score ?? 0);
}

export function isComplete(a: Answers) {
  return QUESTIONS.every((q) => (q.type === 'single' ? typeof a[q.id] === 'string' && a[q.id] : true)) && Array.isArray(a.workflows) && a.workflows.length > 0;
}

export function computeReport(a: Answers): Report {
  const score = scoreReadiness(a);
  const level: Level = score <= 2 ? 'foundation' : score <= 4 ? 'emerging' : 'ready';
  const levelMap = {
    foundation: { label: 'Start with ground rules and one workflow', text: 'There is little shared practice yet. The most useful first step is to agree simple rules, then practise one workflow together so everyone starts from the same method.' },
    emerging: { label: 'Start with one shared workflow', text: 'People are already using tools. The opportunity is to move from individual habits to one agreed way of working on one task, with checks.' },
    ready: { label: 'Ready to pilot', text: 'You have rules and practice to build on. A focused pilot on one or two workflows, with measurement, is a reasonable next step.' },
  } as const;

  const selected = (Array.isArray(a.workflows) ? a.workflows : []).filter(Boolean);
  const ordered = [...selected].sort((x, y) => PRIORITY.indexOf(x) - PRIORITY.indexOf(y)).slice(0, 3);
  const workflows = ordered.map((id) => {
    const workflow = WORKFLOWS.find((w) => w.id === id)!;
    return { workflow, reason: `You said this takes repeated time. ${workflow.summary}` };
  });

  const constraints = (Array.isArray(a.constraints) ? a.constraints : []).filter((c) => CONSTRAINT_ACTIONS[c]);
  const constraintActions = constraints.map((c) => CONSTRAINT_ACTIONS[c]);

  const onboardingNote =
    a.onboarding === 'slow'
      ? 'New starters take a long time to become independent. Written procedures turned into checklists and short guides (reviewed by their owners) are a strong candidate for early practice. A dedicated onboarding platform is a planned Fieldwork product and is not yet available.'
      : a.onboarding === 'medium'
        ? 'Onboarding takes one to three months. Turning your most-used procedures into checklists and quick guides could shorten it. Test that on one role before widening.'
        : a.onboarding === 'fast'
          ? 'Onboarding is already quick. Focus on consistency of output rather than on onboarding material.'
          : 'You are not sure how long onboarding takes. Measuring it for the next new starter would show whether it is worth targeting.';

  const size = a.size as string;
  const format =
    size === '1-5' ? 'A small group can start with one guided session and shared workflow cards, then practise on live work for a few weeks.'
    : size === '6-15' ? 'A tailored package fits: a short kick-off, practice on two workflows using your own examples, and a review after a few weeks.'
    : 'Start with a pilot group of six to ten people on one workflow, measure what happens, then widen. A single large session rarely changes habits.';

  const ownerNote =
    a.owner === 'nobody' ? 'Nobody owns this yet. Name one person to own the rules, the workflow cards and the checks, even if it is a small part of their role.'
    : 'Someone owns it, which helps. Give them time and the authority to set the rules and approve workflow cards.';

  const levelInfo = levelMap[level];
  const summary = [
    `Fieldwork workflow assessment (self-reported)`,
    `Level: ${levelInfo.label}`,
    `Market: ${a.market ?? 'not stated'}; team size: ${a.size ?? 'not stated'}`,
    `Priority workflows: ${workflows.map((w) => w.workflow.title).join('; ') || 'none selected'}`,
    `Constraints: ${constraints.join(', ') || 'none selected'}`,
    `Onboarding: ${a.onboarding ?? 'not stated'}; owner: ${a.owner ?? 'not stated'}`,
  ].join('\n');

  return { level, levelLabel: levelInfo.label, levelText: levelInfo.text, workflows, constraintActions, onboardingNote, format, ownerNote, summary, complete: isComplete(a) };
}
