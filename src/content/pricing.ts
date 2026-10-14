/** Consumer test prices. These are hypotheses, not on sale. See docs/marketing/CONSUMER-PRICING-ASSUMPTIONS.md.
 *  UK and Nigeria are separate pricing contexts: NGN values are NOT converted from GBP. */
export type Market = 'uk' | 'ng';

export interface Tier {
  id: string;
  name: string;
  status: 'available' | 'planned';
  summary: string;
  includes: string[];
  price: Record<Market, { amount: string; unit?: string }>;
  priceNote: string;
}

export const MARKET_LABEL: Record<Market, string> = { uk: 'United Kingdom (GBP)', ng: 'Nigeria (NGN)' };
export const MARKET_PAY: Record<Market, string> = {
  uk: 'Planned: card payments and common UK wallets, through a payment provider that is still to be set up.',
  ng: 'Planned: Nigerian cards, bank transfer and other local methods, through a payment provider that is still to be set up. Paid in naira.',
};

export const consumerTiers: Tier[] = [
  {
    id: 'free', name: 'Free exercise', status: 'available',
    summary: 'A complete guided exercise. Brief, run, check, keep.',
    includes: ['Starter tasks for work, small business, study and property', 'Copyable prompts and follow-up fixes', 'A finished example', 'A downloadable workflow card'],
    price: { uk: { amount: 'Free' }, ng: { amount: 'Free' } }, priceNote: 'No account needed.',
  },
  {
    id: 'project', name: 'Guided project', status: 'planned',
    summary: 'One real output, start to finish: a document, a plan or a simple site, with the checks that make it usable.',
    includes: ['Step-by-step brief and prompts', 'A checking guide specific to the project', 'Templates you can reuse', 'Works with free AI tools'],
    price: { uk: { amount: '£14', unit: 'one-off' }, ng: { amount: '₦7,500', unit: 'one-off' } }, priceNote: 'Planned test price. Not on sale.',
  },
  {
    id: 'membership', name: 'Membership', status: 'planned',
    summary: 'New guided projects and a growing set of workflows, once there are enough to be worth a subscription.',
    includes: ['Every guided project', 'A library of tested workflow cards', 'Updates as tools change'],
    price: { uk: { amount: '£9', unit: 'a month' }, ng: { amount: '₦4,500', unit: 'a month' } }, priceNote: 'Under consideration. We will only offer it once the cancellation and support process is ready.',
  },
];

export const businessLevels = [
  { name: 'Practice session', status: 'Available to discuss', text: 'A focused guided session for a small team on one workflow, with reusable workflow cards. Live or remote.', fit: 'Teams of up to about 12 who want to start.' },
  { name: 'Tailored enablement', status: 'Available to discuss', text: 'A few weeks of guided practice on two or three of your own workflows, with checks, house briefs and a review.', fit: 'Agencies that want a consistent way of working.' },
  { name: 'Implementation support', status: 'Available to discuss', text: 'Wider adoption across several teams or branches, including written rules, owners and measures.', fit: 'Larger or multi-branch businesses.' },
];
