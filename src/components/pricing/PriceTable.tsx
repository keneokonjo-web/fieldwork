'use client';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';
import { PRICE_NOTE, products, type Product } from '@/content/pricing';
import { CURRENCY_NAME, useRegion } from '@/lib/region';

interface Props {
  ids: Product['id'][];
  /** Short line shown under each price, by product id */
  lines?: Partial<Record<Product['id'], string>>;
  tone?: 'paper' | 'ink';
  note?: boolean;
}

/** Prices for the chosen products, in the currency of the visitor's region. */
export function PriceTable({ ids, lines = {}, tone = 'paper', note = true }: Props) {
  const { region } = useRegion();
  useEffect(() => { track('pricing_viewed'); }, []);
  return (
    <div className={`prices prices--${tone}`}>
      <div className="prices__grid">
        {ids.map((id) => (
          <div key={id} className="prices__item" data-product={id}>
            <p className="index">{products[id].name}</p>
            <p className="price" aria-live="polite">{products[id].price[region]}</p>
            {lines[id] && <p className="small">{lines[id]}</p>}
          </div>
        ))}
      </div>
      {note && <p className="small prices__note">{PRICE_NOTE} Shown in {CURRENCY_NAME[region]}.</p>}
    </div>
  );
}

/** One price in the visitor's region, for use inside a sentence or hero. */
export function PriceInline({ id }: { id: Product['id'] }) {
  const { region } = useRegion();
  return <span className="price-inline">{products[id].price[region]}</span>;
}
