import Link from 'next/link';
import { DemoReveal } from '@/components/demo/DemoReveal';
import { AREAS, TEAM } from '@/demo/data';
import { DemoPhoto } from '@/demo/photo';

export const metadata = { title: 'About' };

const services = [['Residential sales', 'Valuation, photography, marketing, viewings and negotiation.'], ['Lettings and management', 'Tenant find, referencing, tenancy agreements and day-to-day management.'], ['New homes', 'Marketing and sales for developments of every size.'], ['Valuations', 'Free, no-obligation valuations for sales and lettings.']];

export default function AboutPage() {
  return (
    <>
      <div className="d-pagehead"><div className="d-wrap"><span className="d-eyebrow">About us</span><h1>A small agency<br />with a long memory.</h1></div></div>
      <section className="d-wrap d-split" style={{ paddingBottom: '5rem' }}>
        <DemoReveal><DemoPhoto src="uk-london" ratio="4 / 3" alt="A red brick mansion block in London" /></DemoReveal>
        <DemoReveal delay={120}>
          <p className="d-lede">Halden is an independent residential real estate agency with British listings and clients in London, New York and Lagos. We keep our team small so that you always deal with someone who knows your home, your street and your plans.</p>
          <p>We are an invented company, created to show how a property website and a listing system can work together. Everything you see here, from the people to the properties, is made up.</p>
        </DemoReveal>
      </section>

      <section className="d-section d-section--tint" aria-labelledby="services-title">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">Services</span><h2 id="services-title">What we do.</h2></div></div>
          <ul className="d-services">{services.map(([t, d], i) => <li key={t}><span>0{i + 1}</span><b>{t}</b><p>{d}</p></li>)}</ul>
        </div>
      </section>

      <section className="d-section" aria-labelledby="areas-title">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">Areas covered</span><h2 id="areas-title">Where we work.</h2></div></div>
          <div className="d-areas">{AREAS.map((a) => <Link key={a} href={`/demo/properties?q=${encodeURIComponent(a)}`}>{a}</Link>)}</div>
        </div>
      </section>

      <section className="d-section d-section--tint" aria-labelledby="team-title">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">The team</span><h2 id="team-title">The people.</h2></div></div>
          <ul className="d-team">{TEAM.map((t) => <li key={t.name}><div className="d-avatar" aria-hidden="true">{t.name.split(' ').map((w) => w[0]).join('')}</div><b>{t.name}</b><span>{t.role}</span></li>)}</ul>
        </div>
      </section>

      <section className="d-section" aria-labelledby="creds-title">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">Credentials</span><h2 id="creds-title">Trade memberships.</h2></div></div>
          <div className="d-badges"><span>Redress scheme member</span><span>Client money protection</span><span>Data protection registered</span></div>
          <p className="d-note" style={{ marginTop: '1rem' }}>Placeholders for the memberships a real agency would show. This fictional company holds none of them.</p>
        </div>
      </section>
    </>
  );
}
