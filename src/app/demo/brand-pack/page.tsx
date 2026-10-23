import Link from 'next/link';
import { DemoMark } from '@/components/demo/Logo';
import { BRAND, SEED_PROPERTIES } from '@/demo/data';
import { DemoPhoto } from '@/demo/photo';
import { formatPrice } from '@/demo/format';

export const metadata = { title: 'Brand and Social Starter Pack: example' };

const swatches = [['Deep green', '#1B2B25'], ['Warm stone', '#F5F2EC'], ['Brass', '#9B7B4D'], ['Clay', '#E2DCCF']];
const prompts = [
  ['Property spotlight', 'Write a short Instagram caption for [address]. Use only these verified facts: [paste facts]. Warm, plain, no exclamation marks, under 60 words. End with “Book a viewing: link in bio”.'],
  ['New listing announcement', 'Draft a LinkedIn post announcing [property] now on the market. Mention the area, the price and two features from the fact sheet only. Do not invent details. Add a one-line call to action.'],
  ['Market note', 'Turn these three bullet points into a 120-word market note for our journal, in our house voice: calm, honest, specific. Do not state figures that I have not supplied.'],
];

export default function BrandPackPage() {
  const [a, b] = [SEED_PROPERTIES[0], SEED_PROPERTIES[4]];
  return (
    <>
      <div className="d-pagehead"><div className="d-wrap"><span className="d-eyebrow">Brand and Social Starter Pack · example</span><h1>The pack, for {BRAND.name}.</h1><p className="d-lede">A one-off set of brand guidelines, editable social templates and reusable prompts. This page shows the kind of pack a client receives. The real pack is delivered as editable files with instructions.</p></div></div>

      <section className="d-section d-section--tint" aria-labelledby="bp-brand">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">1 · Brand guidelines</span><h2 id="bp-brand">Colour, type and logo.</h2></div></div>
          <div className="d-split" style={{ alignItems: 'start' }}>
            <div>
              <div className="d-stats" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {swatches.map(([n, c]) => <div key={n}><div style={{ background: c, height: '5rem', border: '1px solid var(--d-line)', marginBottom: '0.6rem' }} /><b style={{ fontFamily: 'var(--d-sans)', fontSize: '1rem', color: 'var(--d-ink)' }}>{n}</b><span style={{ color: 'var(--d-muted)' }}>{c}</span></div>)}
              </div>
            </div>
            <div>
              <p style={{ font: '400 2.6rem var(--d-serif)', lineHeight: 1, margin: 0 }}>Aa — Fraunces</p>
              <p className="d-note">Headlines and prices</p>
              <p style={{ fontSize: '1.4rem', margin: '1rem 0 0' }}>Aa — Instrument Sans</p>
              <p className="d-note">Body text and labels</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', marginTop: '1.5rem' }}>
                <span className="d-logo"><DemoMark />{BRAND.name}</span>
                <span className="d-logo" style={{ background: 'var(--d-dark)', color: '#f5f2ec', padding: '0.8rem 1.1rem' }}><DemoMark />{BRAND.name}</span>
              </div>
              <p className="d-note" style={{ marginTop: '0.6rem' }}>Logo on light and on dark, with clear space equal to the height of the mark.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="d-section" aria-labelledby="bp-social">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">2 · Social templates</span><h2 id="bp-social">Ready to edit.</h2></div></div>
          <div className="d-grid">
            <figure style={{ margin: 0 }}><div className="d-photo" style={{ aspectRatio: '1 / 1' }}><DemoPhoto src={a.images[0]} ratio="1 / 1" alt="" /><div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '1.2rem', background: '#14201b', color: '#fff' }}><small style={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}>Just listed</small><div style={{ font: '400 1.6rem var(--d-serif)' }}>{formatPrice(a)}</div><div>{a.area} · {a.beds} bed</div></div></div><figcaption className="d-note">Property spotlight</figcaption></figure>
            <figure style={{ margin: 0 }}><div className="d-photo" style={{ aspectRatio: '1 / 1', background: 'var(--d-dark)', color: '#f5f2ec', display: 'grid', placeContent: 'center', textAlign: 'center', padding: '2rem' }}><DemoMark /><div style={{ font: '400 2rem var(--d-serif)', marginTop: '1rem' }}>New on the market</div><div style={{ color: '#c9c4b8' }}>{b.title}, {b.area}</div></div><figcaption className="d-note">New-listing announcement</figcaption></figure>
            <figure style={{ margin: 0 }}><div className="d-photo" style={{ aspectRatio: '1 / 1', background: '#e2dccf', display: 'grid', alignContent: 'space-between', padding: '1.6rem' }}><small style={{ letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--d-accent)' }}>Market note</small><div style={{ font: '400 1.8rem var(--d-serif)', lineHeight: 1.1 }}>Homes with good light and honest pricing are moving first.</div><span className="d-logo" style={{ fontSize: '0.95rem' }}><DemoMark />{BRAND.name}</span></div><figcaption className="d-note">Market insight</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="d-section d-section--tint" aria-labelledby="bp-prompts">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">3 · Reusable prompts</span><h2 id="bp-prompts">So your team can keep going.</h2></div></div>
          <ul className="d-services">{prompts.map(([t, d], i) => <li key={t}><span>0{i + 1}</span><b>{t}</b><p>{d}</p></li>)}</ul>
          <p style={{ marginTop: '2.5rem' }}><Link href="/websites#price" className="d-link">Back to Fieldwork: the pack and its price</Link></p>
        </div>
      </section>
    </>
  );
}
