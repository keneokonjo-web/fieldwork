export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'note'; title: string; text: string };

export interface Note {
  slug: string;
  title: string;
  description: string;
  category: 'Company' | 'Process' | 'Ownership' | 'Regions';
  published: string;
  readingMinutes: number;
  /** Honest statement of what this note is based on */
  basis: string;
  related?: string[];
  blocks: Block[];
}

const BASIS = 'Written by the Fieldwork team. It describes how we work and contains no client results, because we have none to report yet.';

export const notes: Note[] = [
  {
    slug: 'why-fieldwork',
    title: 'Why Fieldwork exists',
    description: 'Property businesses run on three things: a website, enquiries and viewings. We build those, and we hand them over.',
    category: 'Company',
    published: '2026-10-23',
    readingMinutes: 2,
    basis: BASIS,
    related: ['how-a-project-works', 'what-you-own'],
    blocks: [
      { t: 'p', text: 'Fieldwork builds practical technology for estate agencies, brokerages and property developers. Our first products are a website with a listing system your team manages itself, and two automations for enquiries and viewings. An AI Workshop for teams follows.' },
      { t: 'h2', text: 'Where we are' },
      { t: 'p', text: 'Fieldwork is new. There is no client list, case study or testimonial to show, and we will not make any up. What we can show is the product itself, which is why the demonstration is open for anyone to use.' },
      { t: 'h2', text: 'What we believe' },
      { t: 'ul', items: ['A property business should own its website, its listings and its customer data.', 'The simplest tool that does the job is usually the right one.', 'A fixed price and a written scope are kinder than an open-ended retainer.', 'A message to a buyer or tenant should never claim more than has been checked.'] },
      { t: 'note', title: 'In short', text: 'We build it, hand it over and step back, so your team runs it.' },
    ],
  },
  {
    slug: 'how-a-project-works',
    title: 'How a project works, from demo to handover',
    description: 'Five steps, in writing, with a fixed price for an agreed scope.',
    category: 'Process',
    published: '2026-10-23',
    readingMinutes: 3,
    basis: BASIS,
    related: ['what-you-own', 'why-fieldwork'],
    blocks: [
      { t: 'ol', items: ['View the demo and decide what you want.', 'Agree the scope and the price in writing. The price is fixed for that scope.', 'We build on accounts you own, with your brand, wording and content.', 'We test with sample enquiries and sample listings before anything goes live.', 'Handover: logins, written instructions and a list of every service involved.'] },
      { t: 'h2', text: 'After handover' },
      { t: 'p', text: 'We provide defined support for faults and handover questions, as set out in your agreement. Ordinary day-to-day work, such as adding a listing or changing a page, is done by your team without us.' },
      { t: 'h2', text: 'Anything extra' },
      { t: 'p', text: 'Work outside the agreed scope is quoted separately before it starts. That includes more complex CRM connections, extra lead sources, advanced search, portal feeds and live calendar sync.' },
    ],
  },
  {
    slug: 'what-you-own',
    title: 'What you own at the end',
    description: 'Access, accounts, documents and costs after handover.',
    category: 'Ownership',
    published: '2026-10-23',
    readingMinutes: 2,
    basis: BASIS,
    related: ['how-a-project-works', 'working-across-regions'],
    blocks: [
      { t: 'ul', items: ['Administrator access for your team.', 'Your domain and hosting accounts, in your name.', 'Source-code access and ownership terms, as set out in your contract.', 'Written instructions for adding, editing and removing listings, and for managing the automations.', 'A record of every third-party service involved and what it costs.'] },
      { t: 'h2', text: 'Costs after handover' },
      { t: 'p', text: 'You pay your own hosting, messaging and software subscriptions directly to those providers. Ongoing maintenance is not assumed to be included. If you want it, we can agree it separately.' },
      { t: 'note', title: 'Access', text: 'After handover we do not keep access to your accounts unless you ask us to.' },
    ],
  },
  {
    slug: 'working-across-regions',
    title: 'Working across the UK, Nigeria and the United States',
    description: 'Prices, messaging and data protection differ by country. This is how we handle that.',
    category: 'Regions',
    published: '2026-10-23',
    readingMinutes: 3,
    basis: BASIS,
    related: ['what-you-own', 'why-fieldwork'],
    blocks: [
      { t: 'p', text: 'Each region has its own prices, shown in its own currency. When you choose a region on this site, every price and example follows it.' },
      { t: 'h2', text: 'Messaging' },
      { t: 'ul', items: ['Email is the standard channel everywhere.', 'SMS goes through your own account with a messaging provider. Some countries require a registered sender name, and we check this for your provider.', 'WhatsApp goes through an approved integration, once your account, access and message templates are confirmed.'] },
      { t: 'h2', text: 'Data protection' },
      { t: 'p', text: 'The rules on collecting and using personal data differ between the United Kingdom, Nigeria and the United States, and between US states. We collect only what a form needs, include consent wording, and give people a way to opt out. Where a design might not fit a country’s rules, we say so before building it.' },
      { t: 'note', title: 'Not legal advice', text: 'This note describes how we build. For your own compliance obligations, take advice from a qualified adviser in your country.' },
    ],
  },
].sort((a, b) => b.published.localeCompare(a.published)) as Note[];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);
