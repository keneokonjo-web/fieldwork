'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { PropertyCard } from '@/components/demo/PropertyCard';
import { useProperties } from '@/demo/store';
import { PROPERTY_TYPES } from '@/demo/data';

const SALE_MAX = [500000, 750000, 1000000, 1500000, 2000000, 3000000, 5000000];
const RENT_MAX = [2000, 2500, 3000, 4000, 5000];
const money = (n: number) => `£${n.toLocaleString('en-GB')}`;

/** Search and filter. The address bar holds the filters, so a search can be shared or bookmarked. */
export function PropertyBrowser() {
  const router = useRouter(); const sp = useSearchParams();
  const { published } = useProperties();
  const listing = sp.get('listing') === 'rent' ? 'rent' : 'sale';
  const q = sp.get('q') ?? ''; const type = sp.get('type') ?? ''; const beds = Number(sp.get('beds') ?? 0); const max = Number(sp.get('max') ?? 0);
  const sort = sp.get('sort') ?? 'newest'; const closed = sp.get('closed') === '1';

  const set = (k: string, v: string) => { const n = new URLSearchParams(sp.toString()); if (v) n.set(k, v); else n.delete(k); if (k === 'listing') n.delete('max'); router.replace(`/demo/properties?${n.toString()}`, { scroll: false }); };

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    let out = published.filter((p) => p.listing === listing);
    if (!closed) out = out.filter((p) => p.status === 'available' || p.status === 'reserved');
    if (t) out = out.filter((p) => [p.title, p.address, p.area, p.postcode, p.propertyType, p.headline].join(' ').toLowerCase().includes(t));
    if (type) out = out.filter((p) => p.propertyType === type || (type === 'Flat' && (p.propertyType === 'Penthouse' || p.propertyType === 'Maisonette')) || (type === 'House' && (p.propertyType === 'Mews house' || p.propertyType === 'Cottage')));
    if (beds) out = out.filter((p) => p.beds >= beds);
    if (max) out = out.filter((p) => p.price <= max);
    const s = [...out];
    if (sort === 'low') s.sort((a, b) => a.price - b.price); else if (sort === 'high') s.sort((a, b) => b.price - a.price); else s.sort((a, b) => b.added.localeCompare(a.added));
    return s;
  }, [published, listing, q, type, beds, max, sort, closed]);

  const maxOptions = listing === 'rent' ? RENT_MAX : SALE_MAX;
  return (
    <>
      <div className="d-pagehead">
        <span className="d-eyebrow">{listing === 'rent' ? 'To let' : 'For sale'}</span>
        <h1>{listing === 'rent' ? <>Homes <em>to let.</em></> : <>Homes <em>for sale.</em></>}</h1>
      </div>
      <section className="d-pad" style={{ paddingBottom: '5rem' }} aria-label="Search results">
        <div className="d-search">
          <div className="d-search__tabs" role="tablist" aria-label="Buy or rent">
            <button role="tab" type="button" aria-selected={listing === 'sale'} onClick={() => set('listing', 'sale')}>Buy</button>
            <button role="tab" type="button" aria-selected={listing === 'rent'} onClick={() => set('listing', 'rent')}>Rent</button>
          </div>
          <form className="d-filters" role="search" onSubmit={(e) => e.preventDefault()} aria-label="Filter properties">
            <div className="d-field"><label htmlFor="f-q">Area, street or postcode</label><input className="d-input" id="f-q" value={q} onChange={(e) => set('q', e.target.value)} placeholder="e.g. Richmond, Seldon Road, SW4" /></div>
            <div className="d-field"><label htmlFor="f-type">Property type</label><select className="d-select" id="f-type" value={type} onChange={(e) => set('type', e.target.value)}><option value="">Any</option>{['House', 'Flat', 'Townhouse', 'Villa', 'Penthouse'].filter((t) => (PROPERTY_TYPES as readonly string[]).includes(t)).map((t) => <option key={t}>{t}</option>)}</select></div>
            <div className="d-field"><label htmlFor="f-beds">Bedrooms</label><select className="d-select" id="f-beds" value={beds || ''} onChange={(e) => set('beds', e.target.value)}><option value="">Any</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}</select></div>
            <div className="d-field"><label htmlFor="f-max">Max price{listing === 'rent' ? ' (pcm)' : ''}</label><select className="d-select" id="f-max" value={max || ''} onChange={(e) => set('max', e.target.value)}><option value="">No max</option>{maxOptions.map((n) => <option key={n} value={n}>{money(n)}</option>)}</select></div>
            <div className="d-field"><label htmlFor="f-sort">Sort by</label><select className="d-select" id="f-sort" value={sort} onChange={(e) => set('sort', e.target.value)}><option value="newest">Newest</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></div>
          </form>
          <div className="d-search__row2">
            <label className="d-check"><input type="checkbox" checked={closed} onChange={(e) => set('closed', e.target.checked ? '1' : '')} />Include {listing === 'rent' ? 'let agreed' : 'sold'} homes</label>
            {(q || type || beds || max) ? <button type="button" className="d-btn d-btn--ghost d-btn--small" onClick={() => router.replace(`/demo/properties?listing=${listing}`, { scroll: false })}>Clear filters</button> : null}
          </div>
        </div>
        <div className="d-results" aria-live="polite"><span>{list.length} {list.length === 1 ? 'property' : 'properties'}</span></div>
        {list.length ? <div className="d-grid">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div> : <p className="d-empty">No properties match those filters. Try widening the search.</p>}
      </section>
    </>
  );
}
