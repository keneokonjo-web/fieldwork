'use client';
import { useEffect } from 'react';
import { useStoredState } from '@/lib/storage';
import { Chip } from '@/components/ui/Chip';
import { track } from '@/lib/analytics';
import { MARKET_LABEL, MARKET_PAY, consumerTiers, type Market } from '@/content/pricing';

const KEY = 'fw-market';

export function ConsumerPricing() {
  const [market, setMarket] = useStoredState<Market>(KEY, 'uk', (p) => (p === 'ng' ? 'ng' : 'uk'));
  useEffect(() => { track('pricing_viewed'); }, []);
  const choose = (m: Market) => setMarket(m);
  return (
    <div>
      <div className="stack">
        <div role="group" aria-label="Choose your market" className="market-toggle">
          {(['uk', 'ng'] as Market[]).map((m) => (
            <button key={m} type="button" aria-pressed={market === m} onClick={() => choose(m)}>{m === 'uk' ? 'United Kingdom' : 'Nigeria'}</button>
          ))}
        </div>
        <p className="small muted" aria-live="polite">Showing prices for: <strong>{MARKET_LABEL[market]}</strong>. UK and Nigerian prices are set separately and are not converted from each other.</p>
      </div>
      <div className="pricing-grid" style={{ marginTop: 'var(--s-6)' }}>
        {consumerTiers.map((t) => (
          <div key={t.id} id={`tier-${t.id}`} className={`card${t.status === 'available' ? ' is-available' : ''}`}>
            <div><Chip tone={t.status}>{t.status === 'available' ? 'Available now' : 'Planned, not on sale'}</Chip></div>
            <h3>{t.name}</h3>
            <div className="price-lines">
              {t.prices.map((pp) => (
                <p className="price-line" key={pp.label + pp.price[market].amount}>
                  {pp.label && <span className="index">{pp.label}</span>}
                  <span className="price">{pp.price[market].amount} {pp.price[market].unit && <small>{pp.price[market].unit}</small>}</span>
                </p>
              ))}
            </div>
            <p className="small muted">{t.priceNote}</p>
            <p>{t.summary}</p>
            <ul className="ticks">{t.includes.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="callout" style={{ marginTop: 'var(--s-6)' }}>
        <p><strong>Payments are not open yet.</strong> {MARKET_PAY[market]} Prices marked as planned are proposed. They may change before anything goes on sale, and nothing here is a discount or a limited offer.</p>
      </div>
    </div>
  );
}
