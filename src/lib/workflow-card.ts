import { CHECKS } from '@/content/learn/first-workflow';
import { buildPrompt, type Brief } from './prompt';

export interface CardInput { name: string; when: string; brief: Brief; reflection: string; passedChecks: string[] }

/** Markdown for the downloadable "workflow card" at the end of the free exercise. */
export function buildWorkflowCard({ name, when, brief, reflection, passedChecks }: CardInput): string {
  const checks = CHECKS.map((c) => `- [${passedChecks.includes(c.id) ? 'x' : ' '}] ${c.label}`).join('\n');
  return [
    `# Workflow card: ${name.trim() || 'My workflow'}`,
    '',
    '_Made with the Fieldwork free exercise. Keep this and reuse it._',
    '',
    '## When I use it',
    when.trim() || '_Add when you will use this workflow._',
    '',
    '## Steps',
    '1. **Brief.** Fill in the prompt below with fresh material.',
    '2. **Run.** Paste it into your AI tool. Remove private details first.',
    '3. **Check.** Work through the checks below before using the result.',
    '4. **Keep.** Save improvements to this card.',
    '',
    '## My prompt',
    '```',
    buildPrompt({ ...brief, material: '' }),
    '```',
    '',
    '## My checks',
    checks,
    '',
    '## What I changed after checking',
    reflection.trim() || '_Note what you fixed so you can brief better next time._',
    '',
  ].join('\n');
}
