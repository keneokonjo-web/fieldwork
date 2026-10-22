'use client';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';
import { ACTIVE_MARKETS, MARKET_NAME, PRICE_NOTE, products, type Market, type Product } from '@/content/pricing';
import { useStoredState } from '@/lib/storage';

const KEY = 'fw-market';

/** Market toggle shared by every price block on the site (stored on this device only). */
export function useMarket() {
  return useStoredState<Market>(KEY, 'uk', (p) => (p === 'ng' ? 'ng' : 'uk'));
}

export function MarketToggle() {
  const [market, setMarket] = useMarket();
  return (
    <div>
      <div role="group" aria-label="Choose your market" className="market-toggle">
        {ACTIVE_MARKETS.map((m) => (
          <button key={m} type="button" aria-pressed={market === m} onClick={() => { setMarket(m); track('market_switched', { market: m }); }}>{MARKET_NAME[m]}</button>
        ))}
      </div>
    </div>
  );
}

interface Props {
  ids: Product['id'][];
  /** Short line shown under each price, by product id */
  lines?: Partial<Record<Product['id'], string>>;
  /** Hide the shared toggle when another toggle on the same page already controls the market */
  noToggle?: boolean;
  tone?: 'paper' | 'ink';
  note?: boolean;
}

/** Prices for the chosen products in the visitor's market. */
export function PriceTable({ ids, lines = {}, noToggle, tone = 'paper', note = true }: Props) {
  const [market] = useMarket();
  useEffect(() => { track('pricing_viewed'); }, []);
  return (
    <div className={`prices prices--${tone}`}>
      {!noToggle && <MarketToggle />}
      <div className="prices__grid">
        {ids.map((id) => (
          <div key={id} className="prices__item" data-product={id}>
            <p className="index">{products[id].name}</p>
            <p className="price" aria-live="polite">{products[id].price[market]}</p>
            {lines[id] && <p className="small">{lines[id]}</p>}
          </div>
        ))}
      </div>
      {note && <p className="small prices__note">{PRICE_NOTE} Prices shown for: <strong>{MARKET_NAME[market]}</strong>.</p>}
    </div>
  );
}

/** One price in the visitor's market, for use inside a sentence or hero. */
export function PriceInline({ id }: { id: Product['id'] }) {
  const [market] = useMarket();
  return <span className="price-inline">{products[id].price[market]}</span>;
}
