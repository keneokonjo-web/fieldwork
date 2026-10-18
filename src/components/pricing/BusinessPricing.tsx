'use client';
import { useEffect } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { useStoredState } from '@/lib/storage';
import { track } from '@/lib/analytics';
import { BIZ_MARKET_LABEL, BIZ_MARKET_SHORT, BIZ_MID_RANGE_NOTE, businessAddOns, businessPilot, businessPlans, type BizMarket } from '@/content/pricing';

const MARKETS: BizMarket[] = ['uk', 'ng', 'us'];

export function BusinessPricing({ id = 'business-pricing' }: { id?: string }) {
  const [market, setMarket] = useStoredState<BizMarket>('fw-biz-market', 'uk', (p) => (p === 'ng' || p === 'us' ? p : 'uk'));
  useEffect(() => { track('pricing_viewed', { audience: 'business' }); }, []);
  return (
    <div id={id}>
      <div className="stack">
        <div role="group" aria-label="Choose your market" className="market-toggle">
          {MARKETS.map((m) => <button key={m} type="button" aria-pressed={market === m} onClick={() => setMarket(m)}>{BIZ_MARKET_SHORT[m]}</button>)}
        </div>
        <p className="small muted" aria-live="polite">Showing prices for: <strong>{BIZ_MARKET_LABEL[market]}</strong>. Markets are priced separately and are not converted from each other.</p>
      </div>

      <div className="plans" style={{ marginTop: 'var(--s-6)' }}>
        {businessPlans.map((p) => (
          <div key={p.id} className={`plan${p.quoted ? ' plan--quoted' : ''}`}>
            <p className="index">{p.range}</p>
            <h3>{p.name}</h3>
            {p.quoted || !p.price ? (
              <p className="price">Quoted</p>
            ) : (
              <p className="price">{p.price[market]} <small>{p.unit}</small></p>
            )}
            {p.minSpend && <p className="small"><strong>Minimum spend:</strong> {p.minSpend[market]}</p>}
            {!p.minSpend && !p.quoted && <p className="small"><strong>No minimum spend.</strong></p>}
            <ul className="ticks">{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
            {p.quotedOn && <p className="small muted">Priced on: {p.quotedOn.join(', ').toLowerCase()}.</p>}
            <div className="plan__foot">
              <ButtonLink href={p.quoted ? '/contact?topic=business' : '/contact?topic=business'} variant={p.quoted ? 'primary' : 'secondary'} small track="business_cta_clicked" trackLabel={`plan-${p.id}`}>{p.quoted ? 'Get a quote' : 'Ask about this plan'}</ButtonLink>
            </div>
          </div>
        ))}
      </div>
      <p className="hero__note">{BIZ_MID_RANGE_NOTE} Anything above a set range is quoted.</p>

      <div className="cells cells--2" style={{ marginTop: 'var(--s-7)' }}>
        <div>
          <p className="index">{businessPilot.range}</p>
          <h3>{businessPilot.name}</h3>
          <p className="price">{businessPilot.price[market]}</p>
          <ul className="ticks">{businessPilot.includes.map((i) => <li key={i}>{i}</li>)}</ul>
          <p className="small muted">{businessPilot.note}</p>
        </div>
        <div>
          <p className="index">Optional premium add-ons</p>
          <h3>Add-ons</h3>
          <div className="kv-list">
            {businessAddOns.map((a) => <div key={a.name}><span>{a.name}</span><b>{a.price[market]}</b></div>)}
          </div>
        </div>
      </div>
      <div className="callout" style={{ marginTop: 'var(--s-6)' }}>
        <p><strong>Payments and billing are not open yet.</strong> Prices are the plan we intend to offer; nothing is on sale until a payment provider and terms are in place. Business plans are agreed with you first.</p>
      </div>
    </div>
  );
}
