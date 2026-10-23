import Link from 'next/link';
import { DemoReveal } from '@/components/demo/DemoReveal';
import { PropertyList } from '@/components/demo/PropertyList';
import { AREAS, DEVELOPMENTS, POSTS } from '@/demo/data';
import { DemoPhoto } from '@/demo/photo';

export const metadata = { title: 'Homes across London and beyond' };

const services = [
  ['01', 'Residential sales', 'Honest pricing, careful photography and one agent who stays with you from valuation to completion.'],
  ['02', 'Lettings and management', 'Find the right tenant, or the right home to rent, with clear communication throughout.'],
  ['03', 'New homes', 'Developments presented properly: every home, its status and its price in one place.'],
  ['04', 'Valuations', 'A free, no-obligation valuation from someone who knows your street.'],
];

const promise = [['Local knowledge', 'We live and work in the areas we sell.'], ['Honest pricing', 'We tell you what we would do in your position.'], ['One point of contact', 'The same person from first call to keys.'], ['Clear communication', 'You always know what happens next.']];

export default function DemoHome() {
  const wharf = DEVELOPMENTS[0];
  return (
    <>
      <section className="d-hero" aria-labelledby="d-hero-title">
        <div className="d-hero__img"><DemoPhoto src="prop-villa-pool" ratio="auto" priority sizes="100vw" alt="A contemporary house with a pool at dusk" className="" /></div>
        <div className="d-wrap">
          <h1 id="d-hero-title">Homes with a sense of place.</h1>
          <p className="d-hero__sub">Estate agents and lettings across London and beyond.</p>
          <form className="d-search" action="/demo/properties" method="get" role="search" aria-label="Search properties">
            <div className="d-search__tabs" role="group" aria-label="Buy or rent">
              <label><input type="radio" name="listing" value="sale" defaultChecked /><span>Buy</span></label>
              <label><input type="radio" name="listing" value="rent" /><span>Rent</span></label>
            </div>
            <div className="d-search__fields">
              <div className="d-field"><label htmlFor="hs-q">Area, street or postcode</label><input className="d-input" id="hs-q" name="q" placeholder="Notting Hill, W8, Richmond…" /></div>
              <div className="d-field"><label htmlFor="hs-type">Property type</label><select className="d-select" id="hs-type" name="type" defaultValue=""><option value="">Any</option><option>House</option><option>Flat</option><option>Townhouse</option><option>Villa</option></select></div>
              <div className="d-field"><label htmlFor="hs-beds">Bedrooms</label><select className="d-select" id="hs-beds" name="beds" defaultValue=""><option value="">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option><option value="5">5+</option></select></div>
              <div className="d-field"><label htmlFor="hs-max">Max price</label><select className="d-select" id="hs-max" name="max" defaultValue=""><option value="">No max</option><option value="1000000">£1m</option><option value="2000000">£2m</option><option value="3000000">£3m</option><option value="5000000">£5m</option></select></div>
              <button type="submit" className="d-btn d-search__go">Search</button>
            </div>
          </form>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-split">
          <DemoReveal>
            <span className="d-eyebrow">Larkfield &amp; Pryce</span>
            <h2>Find the home.<br />Keep the life.</h2>
          </DemoReveal>
          <DemoReveal delay={120}>
            <p className="d-lede">We are a small, independent agency. We sell and let homes in the places we know best, and we take the time to understand what makes each one right for the person who will live there.</p>
            <Link href="/demo/about" className="d-link">About us</Link>
          </DemoReveal>
        </div>
      </section>

      <section className="d-section d-section--tint" aria-labelledby="featured-title">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">Featured</span><h2 id="featured-title">Homes we are proud to show.</h2></div><Link href="/demo/properties?listing=sale" className="d-link">View all properties</Link></div>
          <PropertyList mode="featured" limit={6} empty="Featured properties appear here when they are marked as featured in the listing system." />
        </div>
      </section>

      <section className="d-section" aria-labelledby="services-title">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">What we do</span><h2 id="services-title">Everything under one roof.</h2></div></div>
          <ul className="d-services">
            {services.map(([n, t, d]) => <li key={n}><span>{n}</span><b>{t}</b><p>{d}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="d-section d-section--dark" aria-labelledby="promise-title">
        <div className="d-wrap">
          <span className="d-eyebrow">Our approach</span>
          <h2 id="promise-title" style={{ maxWidth: '16ch', marginBottom: '2.5rem' }}>Quiet confidence. Clear advice.</h2>
          <div className="d-stats">{promise.map(([t, d]) => <div key={t}><b style={{ fontSize: '1.7rem' }}>{t}</b><span>{d}</span></div>)}</div>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-split">
          <DemoReveal><DemoPhoto src={wharf.image} ratio="4 / 3" alt="The Wharf, a new apartment development" /></DemoReveal>
          <DemoReveal delay={120}>
            <span className="d-eyebrow">New homes · {wharf.area}</span>
            <h2>{wharf.name}.</h2>
            <p className="d-lede">{wharf.summary} {wharf.completion}.</p>
            <Link href={`/demo/new-homes/${wharf.slug}`} className="d-btn">View the development</Link>
          </DemoReveal>
        </div>
      </section>

      <section className="d-section d-section--tint" aria-labelledby="areas-title">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">Areas we cover</span><h2 id="areas-title">Across London, and a little beyond.</h2></div></div>
          <div className="d-areas">{AREAS.map((a) => <Link key={a} href={`/demo/properties?q=${encodeURIComponent(a)}`}>{a}</Link>)}</div>
        </div>
      </section>

      <section className="d-section" aria-labelledby="journal-title">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">Journal</span><h2 id="journal-title">Notes from the office.</h2></div><Link href="/demo/journal" className="d-link">All articles</Link></div>
          <div className="d-posts">
            {POSTS.slice(0, 3).map((p, i) => (
              <DemoReveal key={p.slug} delay={i * 90}>
                <Link href={`/demo/journal/${p.slug}`} className="d-post">
                  <DemoPhoto src={p.image} ratio="3 / 2" alt="" />
                  <small>{p.category}</small><h3>{p.title}</h3><p>{p.excerpt}</p>
                </Link>
              </DemoReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section d-section--dark d-cta">
        <div className="d-wrap">
          <h2>Thinking of selling or letting?</h2>
          <p className="d-lede" style={{ margin: '0 auto 2rem' }}>A conversation costs nothing. We will tell you what we would do in your position.</p>
          <Link href="/demo/contact?topic=valuation" className="d-btn d-btn--light">Book a free valuation</Link>
        </div>
      </section>
    </>
  );
}
