/** Consumer test prices. These are hypotheses, not on sale. See docs/marketing/CONSUMER-PRICING-ASSUMPTIONS.md.
 *  UK and Nigeria are separate pricing contexts: NGN values are NOT converted from GBP. */
export type Market = 'uk' | 'ng';
export type BizMarket = 'uk' | 'ng' | 'us';

export interface PricePoint { label: string; price: Record<Market, { amount: string; unit?: string }> }
export interface Tier {
  id: string;
  name: string;
  status: 'available' | 'planned';
  summary: string;
  includes: string[];
  prices: PricePoint[];
  priceNote: string;
}

export const MARKET_LABEL: Record<Market, string> = { uk: 'United Kingdom (GBP)', ng: 'Nigeria (NGN)' };
export const MARKET_PAY: Record<Market, string> = {
  uk: 'Planned: card payments and common UK wallets, through a payment provider that is still to be set up.',
  ng: 'Planned: Nigerian cards, bank transfer and other local methods, through a payment provider that is still to be set up. Paid in naira.',
};

/* Individuals. GBP prices for AI learning were set by the founder (19 October 2026). The Business Builder prices (one-off and monthly)
 * and all NGN figures are proposed and need confirmation. Nothing is on sale. */
export const consumerTiers: Tier[] = [
  {
    id: 'free', name: 'Free', status: 'available',
    summary: 'Build your business: the basics.',
    includes: ['Choose a type of business, or get an idea', 'A refined business idea', 'A basic opportunity assessment', 'Logo and colour choices, and a website outline', 'A project workspace with a checklist'],
    prices: [{ label: '', price: { uk: { amount: '£0' }, ng: { amount: '₦0' } } }], priceNote: 'No payment needed.',
  },
  {
    id: 'builder', name: 'Business Builder (full)', status: 'planned',
    summary: 'Take a business from idea to launch with the complete builder.',
    includes: ['Build and develop a complete business', 'More detailed market research and validation tools', 'Full editable business plan and financial model', 'Complete brand and marketing toolkits', 'Website building guidance and expanded generation tools', 'Ongoing access to the business-building assistant'],
    prices: [
      { label: 'One-off, one business', price: { uk: { amount: '£99', unit: 'one-off' }, ng: { amount: '₦49,000', unit: 'one-off' } } },
      { label: 'Monthly', price: { uk: { amount: '£19', unit: 'a month' }, ng: { amount: '₦9,500', unit: 'a month' } } },
    ],
    priceNote: 'Proposed prices, to be confirmed. Not on sale.',
  },
  {
    id: 'learning', name: 'AI learning', status: 'planned',
    summary: 'Workshops and guided AI learning for real work.',
    includes: ['Workshops on using AI for everyday work', 'Guided AI learning paths', 'Saved workflow cards', 'Updates as tools change'],
    prices: [
      { label: 'Per workshop', price: { uk: { amount: '£20', unit: 'a workshop' }, ng: { amount: '₦10,000', unit: 'a workshop' } } },
      { label: 'Monthly', price: { uk: { amount: '£15', unit: 'a month' }, ng: { amount: '₦7,500', unit: 'a month' } } },
      { label: 'Every three months', price: { uk: { amount: '£45', unit: 'every 3 months' }, ng: { amount: '₦22,500', unit: 'every 3 months' } } },
    ],
    priceNote: 'GBP prices set by the founder; NGN prices proposed. Not on sale.',
  },
];

/* ---------- Business pricing ----------
 * GBP and NGN figures for Starter, Team, Business bundle, pilot and add-ons were set by the founder (18 October 2026).
 * Figures marked "proposed" were filled in by us to keep the three markets consistent and need the founder's confirmation:
 * the NGN Team minimum, all NGN figures for the Business bundle, the pilot and add-ons, and every USD figure.
 * Enterprise is quoted. 16 to 50 employees sits between Team and Business and is quoted until decided. */
export const BIZ_MARKET_LABEL: Record<BizMarket, string> = { uk: 'United Kingdom (GBP)', ng: 'Nigeria (NGN)', us: 'United States (USD)' };
export const BIZ_MARKET_SHORT: Record<BizMarket, string> = { uk: 'United Kingdom', ng: 'Nigeria', us: 'USA' };

export interface BizPlan {
  id: string;
  name: string;
  range: string;
  quoted?: boolean;
  price?: Record<BizMarket, string>;
  unit?: string;
  minSpend?: Record<BizMarket, string>;
  includes: string[];
  quotedOn?: string[];
}

export const businessPlans: BizPlan[] = [
  {
    id: 'starter', name: 'Starter pack', range: 'Any team size. No minimum spend.',
    price: { uk: '£25', ng: '₦30,000', us: '$30' }, unit: 'per employee, per month',
    includes: ['Access to the relevant industry course', 'AI guided exercises and assessments', 'Personal workflow library', 'Basic completion tracking'],
  },
  {
    id: 'team', name: 'Team pack', range: '11 to 15 employees',
    price: { uk: '£18', ng: '₦22,000', us: '$22' }, unit: 'per employee, per month',
    minSpend: { uk: '£200 a month', ng: '₦242,000 a month', us: '$250 a month' },
    includes: ['Everything in Starter', 'Manager dashboard and team progress reports', 'Multiple learning paths', 'Quarterly updates'],
  },
  {
    id: 'bundle', name: 'Business bundle', range: '51 to 200 employees',
    price: { uk: '£12', ng: '₦14,500', us: '$15' }, unit: 'per employee, per month',
    minSpend: { uk: '£500 a month', ng: '₦600,000 a month', us: '$650 a month' },
    includes: ['Everything in Team', 'Department-specific learning paths', 'More detailed reporting', 'Priority support', 'Scheduled programme reviews'],
  },
  {
    id: 'enterprise', name: 'Enterprise', range: '200 or more employees', quoted: true,
    includes: ['Pricing based on the factors below', 'Quoted after a conversation'],
    quotedOn: ['Number of employees', 'Security requirements', 'Integrations', 'Reporting', 'Support commitments'],
  },
];

export const BIZ_MID_RANGE_NOTE = 'Between 16 and 50 employees: quoted, priced between Team and Business.';

export const businessPilot = {
  name: 'Low-risk corporate pilot',
  range: '30-day team pilot',
  price: { uk: '£250 to £500', ng: '₦300,000 to ₦600,000', us: '$300 to $650' } as Record<BizMarket, string>,
  includes: ['One team, up to 10 employees', 'One training pathway', 'A closing progress report'],
  note: 'The fee can be credited towards an annual contract if you approve within an agreed period.',
};

export const businessAddOns: { name: string; price: Record<BizMarket, string> }[] = [
  { name: '60-minute group Q&A', price: { uk: '£150', ng: '₦180,000', us: '$190' } },
  { name: '90-minute tailored workshop', price: { uk: '£350 to £600', ng: '₦420,000 to ₦720,000', us: '$450 to $750' } },
  { name: 'Bespoke industry training module', price: { uk: '£500 to £1,500', ng: '₦600,000 to ₦1,800,000', us: '$650 to $1,900' } },
  { name: 'Custom workflow implementation', price: { uk: 'Quoted separately', ng: 'Quoted separately', us: 'Quoted separately' } },
];
