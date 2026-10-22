/**
 * Product prices. These are intended selling prices set by the founder, not verified market averages.
 * They are fixed initial offers for an agreed scope: extra work is quoted separately.
 * The US prices are set for future expansion and are not shown while the UK and Nigeria are the only active markets.
 */
export type Market = 'uk' | 'ng' | 'us';
export const ACTIVE_MARKETS = ['uk', 'ng'] as const satisfies readonly Market[];
export const MARKET_NAME: Record<Market, string> = { uk: 'United Kingdom', ng: 'Nigeria', us: 'United States' };

export interface Product {
  id: 'website' | 'lead' | 'viewing' | 'both' | 'brand';
  name: string;
  price: Record<Market, string>;
}

export const products: Record<Product['id'], Product> = {
  website: { id: 'website', name: 'Digital Presence Package', price: { uk: '£1,500', us: '$2,000', ng: '₦2,500,000' } },
  lead: { id: 'lead', name: 'Lead capture and follow-up', price: { uk: '£400', us: '$600', ng: '₦799,000' } },
  viewing: { id: 'viewing', name: 'Viewing and feedback', price: { uk: '£400', us: '$600', ng: '₦799,000' } },
  both: { id: 'both', name: 'Both automations', price: { uk: '£699', us: '$1,000', ng: '₦1,200,000' } },
  brand: { id: 'brand', name: 'Brand and Social Starter Pack', price: { uk: '£500', us: '$600', ng: '₦600,000' } },
};

export const PRICE_NOTE =
  'Prices are fixed initial offers for an agreed scope. Anything outside the scope is quoted separately. Hosting, messaging and other third-party subscriptions are paid by you, on your own accounts.';
