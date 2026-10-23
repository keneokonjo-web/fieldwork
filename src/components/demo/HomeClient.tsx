'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DemoPhoto, photoSrc } from '@/demo/photo';
import { useProperties } from '@/demo/store';
import { BRAND } from '@/demo/data';

const PROMPTS = ['A family house near a park, up to £3m', 'A two-bedroom flat to rent, close to the canal', 'Somewhere quiet with a garden and a good school nearby', 'A new apartment with a terrace, ready to move into'];

/** The hero: parallax photograph, headline, and the "Ask" search pill with a typewriter prompt and a filters panel. */
export function HomeHero() {
  const bg = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [opts, setOpts] = useState(false);
  useEffect(() => {
    const el = bg.current; if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onScroll = () => { if (!reduce && scrollY < innerHeight) el.style.transform = `translateY(${scrollY * 0.18}px)`; };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const inp = input.current; if (!inp) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { inp.placeholder = `Ask ${BRAND.name}: ${PROMPTS[0]}`; return; }
    let pi = 0, ci = 0, del = false, live = true, timer: ReturnType<typeof setTimeout>;
    const onFocus = () => { live = false; inp.placeholder = 'Area, street, postcode or a few words'; };
    const onBlur = () => { if (!inp.value) live = true; };
    inp.addEventListener('focus', onFocus); inp.addEventListener('blur', onBlur);
    const tick = () => {
      if (!live) { timer = setTimeout(tick, 800); return; }
      const s = PROMPTS[pi];
      inp.placeholder = `Ask ${BRAND.name}: ${s.slice(0, ci)}${ci % 2 ? '' : '|'}`;
      if (!del && ci < s.length) { ci++; timer = setTimeout(tick, 36); }
      else if (!del) { del = true; timer = setTimeout(tick, 1900); }
      else if (ci > 0) { ci = Math.max(0, ci - 2); timer = setTimeout(tick, 15); }
      else { del = false; pi = (pi + 1) % PROMPTS.length; timer = setTimeout(tick, 400); }
    };
    tick();
    return () => { clearTimeout(timer); inp.removeEventListener('focus', onFocus); inp.removeEventListener('blur', onBlur); };
  }, []);
  return (
    <section className="d-hero" aria-label="Introduction">
      <div className="d-hero__img" ref={bg}><DemoPhoto src="prop-modernist" ratio="auto" priority sizes="100vw" alt="A contemporary house with a timber and black facade" /></div>
      <div className="d-hero__top"><Link className="d-glass" href="/demo/properties?listing=sale">Properties</Link><Link className="d-glass" href="/demo/contact">Contact →</Link></div>
      <h1 id="d-hero-title"><span>Homes worth</span><span>coming <em>home</em> to.</span></h1>
      <div className="d-ask">
        <form action="/demo/properties" method="get" role="search" aria-label="Search properties">
          <input ref={input} type="text" name="q" aria-label="Area, street, postcode or a few words" autoComplete="off" />
          <button type="button" className="chip" aria-expanded={opts} aria-controls="d-opts" onClick={() => setOpts((o) => !o)}>Filters</button>
          <button type="submit" className="go" aria-label="Search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
        </form>
        <div className={`opts${opts ? ' is-open' : ''}`} id="d-opts">
          <div><label htmlFor="o-listing">Buy or rent</label><select id="o-listing" defaultValue="sale" onChange={(e) => setHidden(input.current?.form, 'listing', e.target.value)}><option value="sale">Buy</option><option value="rent">Rent</option></select></div>
          <div><label htmlFor="o-type">Property type</label><select id="o-type" defaultValue="" onChange={(e) => setHidden(input.current?.form, 'type', e.target.value)}><option value="">Any</option><option>House</option><option>Flat</option><option>Townhouse</option><option>Villa</option></select></div>
          <div><label htmlFor="o-beds">Bedrooms</label><select id="o-beds" defaultValue="" onChange={(e) => setHidden(input.current?.form, 'beds', e.target.value)}><option value="">Any</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option><option value="5">5+</option></select></div>
          <div><label htmlFor="o-max">Max price</label><select id="o-max" defaultValue="" onChange={(e) => setHidden(input.current?.form, 'max', e.target.value)}><option value="">No max</option><option value="1000000">£1m</option><option value="3000000">£3m</option><option value="5000000">£5m</option></select></div>
        </div>
      </div>
    </section>
  );
}

function setHidden(form: HTMLFormElement | null | undefined, name: string, value: string) {
  if (!form) return;
  let h = form.querySelector<HTMLInputElement>(`input[type=hidden][name=${name}]`);
  if (!h) { h = document.createElement('input'); h.type = 'hidden'; h.name = name; form.appendChild(h); }
  h.value = value; h.disabled = !value;
}

const money = (n: number, rent: boolean) => `£${n.toLocaleString('en-GB')}${rent ? ' pcm' : ''}`;

/** The index of homes: live from the listing system, with type chips and a cursor-following photograph. */
export function HomeIndex() {
  const { published } = useProperties();
  const [f, setF] = useState('all');
  const [peek, setPeek] = useState<{ x: number; y: number; src: string } | null>(null);
  const list = useMemo(() => [...published].filter((p) => p.status === 'available' || p.status === 'reserved').sort((a, b) => Number(b.featured) - Number(a.featured) || b.added.localeCompare(a.added)).filter((p) => f === 'all' || (f === 'House' ? ['House', 'Townhouse', 'Cottage', 'Mews house'].includes(p.propertyType) : f === 'Flat' ? ['Flat', 'Penthouse', 'Maisonette'].includes(p.propertyType) : p.propertyType === f)).slice(0, 8), [published, f]);
  return (
    <section className="d-idx" id="homes" aria-labelledby="d-idx-t">
      <div className="d-idx__hd">
        <h2 id="d-idx-t">The <em>homes.</em></h2>
        <div className="d-chips" role="group" aria-label="Filter homes">
          {[['all', 'All'], ['House', 'Houses'], ['Flat', 'Flats'], ['Villa', 'Villas']].map(([k, l]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>)}
        </div>
      </div>
      <div className="d-rows" onMouseMove={(e) => { const r = (e.target as HTMLElement).closest<HTMLElement>('[data-src]'); if (!r) return setPeek(null); setPeek({ x: e.clientX, y: e.clientY, src: r.dataset.src ?? '' }); }} onMouseLeave={() => setPeek(null)}>
        {list.map((p, i) => (
          <Link key={p.id} href={`/demo/properties/${p.id}`} className="d-row" data-src={photoSrc(p.images[0] ?? 'prop-exterior-white')}>
            <span className="d-row__n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{p.title}{p.status === 'reserved' && <span className="d-row__st">Reserved</span>}<span className="d-row__a">{p.area} · {p.propertyType} · {p.beds} bed · {p.listing === 'rent' ? 'To let' : 'For sale'}</span></h3>
            <span className="d-row__p">{money(p.price, p.listing === 'rent')}<small>{p.sqft.toLocaleString('en-GB')} sq ft</small></span>
          </Link>
        ))}
        {!list.length && <p className="d-empty" style={{ marginTop: '1.5rem' }}>No homes match that filter yet.</p>}
      </div>
      <div className={`d-peek${peek ? ' is-on' : ''}`} aria-hidden="true" style={peek ? { left: peek.x, top: peek.y } : undefined}>{peek?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={peek.src} alt="" />
        ) : null}</div>
      <div className="d-more"><span className="d-small" style={{ color: 'var(--d-muted)' }}>Hover a row to preview. Click to open.</span><Link className="d-u" href="/demo/properties?listing=sale">All properties →</Link></div>
    </section>
  );
}

/** Parallax wrapper for the full-bleed quote photograph. */
export function QuoteImage({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => { const r = el.parentElement!.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) el.style.transform = `translateY(${(r.top - innerHeight / 2) * -0.12}px)`; };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return <div className="d-quote__img" ref={ref}><DemoPhoto src={src} ratio="auto" sizes="100vw" alt="" /></div>;
}
