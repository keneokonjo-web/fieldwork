/** Builds the structured prompt used in the free exercise. Pure function so it can be unit tested. */
export interface Brief {
  task: string;       // what you need done
  audience: string;   // who will read or use the result
  tone: string;       // voice and level
  format: string;     // shape of the output
  rules: string;      // limits and things to avoid
  material: string;   // the real input you paste in
}

export const MATERIAL_PLACEHOLDER = '[PASTE YOUR MATERIAL HERE]';

export function buildPrompt(b: Brief): string {
  const line = (label: string, v: string, fallback: string) => `${label}: ${v.trim() || fallback}`;
  const rules = b.rules
    .split('\n')
    .map((r) => r.trim().replace(/^[-*•]\s*/, ''))
    .filter(Boolean);
  const base = [
    'Use only the material I give you. Do not invent facts, names, numbers or dates.',
    'If something I need is missing, write [needs checking] there instead of guessing.',
  ];
  return [
    'I am doing a real piece of work and want your help drafting it.',
    '',
    line('Task', b.task, '[describe the task in one sentence]'),
    line('Who it is for', b.audience, '[who will read or use this]'),
    line('Tone', b.tone, 'clear and plain'),
    line('Output format', b.format, '[the shape you want back]'),
    '',
    'Rules:',
    ...[...base, ...rules].map((r) => `- ${r}`),
    '',
    'When you finish, add a short list headed "Assumptions" showing anything you had to assume.',
    '',
    'Material:',
    '---',
    b.material.trim() || MATERIAL_PLACEHOLDER,
    '---',
  ].join('\n');
}

export function wordCount(s: string) {
  return s.trim() ? s.trim().split(/\s+/).length : 0;
}
