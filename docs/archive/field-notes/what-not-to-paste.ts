import type { Article } from './types';

export const whatNotToPaste: Article = {
  slug: 'what-not-to-paste',
  title: 'What not to paste into an AI tool at work',
  description: 'A plain traffic-light guide to what is safe, what needs care, and what should stay out of AI tools, plus a way to use placeholders.',
  audience: 'Employees, team leaders and small business owners who use AI chat tools for work.',
  category: 'Safety',
  published: '2026-10-14',
  readingMinutes: 5,
  basis: 'General practical guidance, not legal advice. Tools, plans and terms differ and change. Read the terms and settings for the specific tool and plan you use.',
  related: ['check-ai-answers', 'property-ai-tasks'],
  blocks: [
    { t: 'p', text: 'When you paste text into an AI tool, you send it to another organisation’s systems. What happens next depends on the tool, the plan you are on and your settings. Many people never check, which is how confidential information ends up where it should not.' },
    { t: 'p', text: 'Here is a simple way to decide what to paste.' },
    { t: 'table', caption: 'A traffic-light guide', head: ['Level', 'Examples', 'What to do'], rows: [
      ['Green: usually fine', 'Your own drafts, public information, generic questions, text with all names and details removed', 'Go ahead, then check the answer.'],
      ['Amber: take care', 'Internal procedures, anonymised customer messages, draft contracts with names removed, business figures that are not sensitive', 'Replace names and identifiers with placeholders. Check your company’s rules and the tool’s data settings first.'],
      ['Red: keep out', 'Passwords and access codes, bank or card details, identity documents, health information, other people’s contact details, anything under a confidentiality agreement', 'Do not paste it, even if the tool says it is private.'],
    ] },
    { t: 'h2', text: 'Use placeholders' },
    { t: 'p', text: 'Most tasks work just as well with names and details removed. Replace them with labels, then put the real details back yourself afterwards.' },
    { t: 'prompt', title: 'Before and after', text: 'Before: Reply to Mrs Adeyemi at 14 Rowan Close about her deposit of £1,200.\n\nAfter: Reply to [TENANT] at [ADDRESS] about her deposit of [AMOUNT].' },
    { t: 'h2', text: 'Check three things about any tool' },
    { t: 'ol', items: [
      'Does the tool use what you type to improve its models? Many consumer plans may, unless you switch it off. Business plans often differ.',
      'Can you delete your conversations and how long are they kept?',
      'Does your employer allow this tool for this kind of work?',
    ] },
    { t: 'note', title: 'Data protection', text: 'In the UK, the UK GDPR and Data Protection Act 2018 apply to personal data. In Nigeria, the Nigeria Data Protection Act 2023 applies. Both give people rights over their data and put duties on organisations. This note is not legal advice. If your business handles client data, take advice and write a short AI-use rule.' },
    { t: 'h2', text: 'A rule of thumb' },
    { t: 'p', text: 'If you would not put it on a postcard, do not paste it into an AI tool without approval. If you would be comfortable with it appearing in front of the person it is about, it is probably fine once names are removed.' },
  ],
};
