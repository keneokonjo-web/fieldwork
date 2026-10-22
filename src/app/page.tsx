import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { DEMO_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Fieldwork: websites and workflows for property businesses',
  description: 'Websites with self-managed listings, enquiry and viewing automation, and AI training for estate agencies and property developers in the UK and Nigeria.',
  path: '/',
});

const products = [
  { n: '01', href: '/websites', name: 'Websites & Listings', line: 'A professional property website with a listing system you run yourself. Add, edit and publish properties without calling us.', photo: 'uk-newbuild', status: 'Fixed price' },
  { n: '02', href: '/automations', name: 'Automations', line: 'Enquiries acknowledged, viewings confirmed and reminded, feedback collected. Fixed-price workflows that sit next to your CRM.', photo: 'uk-agent-sign', status: 'Fixed price' },
  { n: '03', href: '/ai-workshop', name: 'AI Workshop', line: 'Self-paced AI training for your team, with a manager view of progress. In development.', photo: 'work-team-table', status: 'Planned' },
];

const flow = [
  ['Enquiry in', 'From your website form, or typed in by your team.'],
  ['Confirmed', 'The person gets an approved acknowledgement.'],
  ['Routed', 'The right agent is told, with the details.'],
  ['Reminded', 'Viewing reminders and follow-ups go out on time.'],
  ['Feedback', 'A short form after the viewing, back to your agent.'],
];

export default function HomePage() {
  return (
    <>
      <section className="hero hero--page corners" aria-labelledby="hero-title">
        <Corners n="01" />
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">Real estate · UK and Nigeria</p>
            <h1 id="hero-title">Websites and workflows for property businesses.</h1>
            <p className="lede">A website you manage yourself, enquiry and viewing automation, and AI training for your team. Built for estate agencies and property developers.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href={DEMO_PATH} variant="cobalt" track="demo_request_clicked" trackLabel="home-hero">Request a demo</ButtonLink>
              <ButtonLink href="#products" variant="secondary">See what we build</ButtonLink>
            </div>
          </div>
          <div className="hero__duo">
            <Plate photo="ng-lagos-skyline" ratio="4 / 5" priority sizes="(min-width: 62rem) 22vw, 50vw" />
            <Plate photo="uk-georgian" ratio="4 / 5" priority sizes="(min-width: 62rem) 22vw, 50vw" />
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero__big" src="/brand/logo/fieldwork-wordmark-light.svg" alt="" width={607} height={138} aria-hidden="true" />
      </section>

      <section className="section" id="products" aria-labelledby="products-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What we build</p>
            <h2 id="products-title">Three products. Buy one or all.</h2>
            <p>Each is a defined product with a defined scope. You receive it, you own it, and your team runs it.</p>
          </div>
          <div className="prod">
            {products.map((p) => (
              <Reveal key={p.href} className="prod__card">
                <Link href={p.href} className="prod__link" data-track="demo_request_clicked" data-track-label={`home-product-${p.n}`}>
                  <Plate photo={p.photo} ratio="4 / 3" framed={false} />
                  <span className="index">({p.n}) <Chip tone={p.status === 'Planned' ? 'planned' : 'neutral'}>{p.status}</Chip></span>
                  <h3>{p.name}</h3>
                  <p>{p.line}</p>
                  <span className="link-arrow">Read more</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="margin-note">Optional add-on with the website: Brand and Social Starter Pack</p>
        </div>
      </section>

      <section className="section section--wash" aria-labelledby="who-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Who it is for</p>
            <h2 id="who-title">Developers and estate agencies.</h2>
            <p>One reusable foundation, set up for how each of you sells.</p>
          </div>
          <div className="who">
            <Reveal className="who__col">
              <Plate photo="ng-lekki" ratio="3 / 2" />
              <h3>Property developers</h3>
              <ul className="ticks">
                <li>A landing page for each development.</li>
                <li>Homes or units listed inside it, with available, reserved and sold.</li>
                <li>Enquiry forms linked to the right development.</li>
              </ul>
            </Reveal>
            <Reveal className="who__col" delay={90}>
              <Plate photo="uk-terrace" ratio="3 / 2" />
              <h3>Estate agencies and brokerages</h3>
              <ul className="ticks">
                <li>Properties for sale or to let, each with a clear status.</li>
                <li>Search and filters by area, type and price.</li>
                <li>Your own brand, domain and listings, edited by your team.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="crm-title">
        <div className="container">
          <p className="eyebrow">Beside your CRM</p>
          <h2 id="crm-title" style={{ maxWidth: '16ch' }}>Improve one part of the process. Keep the rest.</h2>
          <p className="lede" style={{ marginTop: 'var(--s-4)' }}>You do not have to replace your CRM or change how you list on the portals. The automations work next to what you already use, from a simple form your team fills in, or from your website.</p>
          <ol className="steps">
            {flow.map(([t, d], i) => (
              <li key={t}><span className="bn">0{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <ButtonLink href="/automations" variant="light">See the automations</ButtonLink>
            <ButtonLink href={DEMO_PATH} variant="outline-light" track="demo_request_clicked" trackLabel="home-crm">Request a demo</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="own-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Handover</p>
            <h2 id="own-title">You own what we build.</h2>
            <p className="lede">We build it, hand it over and step back. We are not an agency that you pay every month to keep things running.</p>
            <ul className="ticks ticks--large" style={{ marginTop: 'var(--s-5)' }}>
              <li>Administrator access for your team.</li>
              <li>Your domain and hosting accounts, in your name.</li>
              <li>Written instructions for everyday jobs.</li>
              <li>A list of every third-party service involved.</li>
              <li>Defined support for faults and handover questions.</li>
            </ul>
            <p className="small muted" style={{ marginTop: 'var(--s-4)' }}>You pay your own hosting, messaging and software subscriptions directly to those providers.</p>
          </div>
          <Reveal><Plate photo="home-living-premium" ratio="4 / 5" /></Reveal>
        </div>
      </section>

      <section className="section section--wash" aria-labelledby="markets-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Two markets</p>
            <h2 id="markets-title">Priced for the UK and for Nigeria.</h2>
            <p>Each market is priced separately, in its own currency. Prices are on each product page.</p>
          </div>
          <div className="band">
            <Plate photo="ng-abuja" ratio="3 / 2" />
            <Plate photo="uk-flats" ratio="3 / 2" />
            <Plate photo="ng-estate" ratio="3 / 2" />
            <Plate photo="uk-suburb" ratio="3 / 2" />
            <Plate photo="ng-ikoyi" ratio="3 / 2" />
            <Plate photo="uk-terrace" ratio="3 / 2" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="workshop-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Planned</p>
            <h2 id="workshop-title">AI Workshop for your team.</h2>
            <p className="lede">Self-paced lessons and exercises on real property tasks, with a manager view of who has finished what. It is in development and not yet on sale.</p>
            <div style={{ marginTop: 'var(--s-5)' }}><TextLink href="/ai-workshop">About the AI Workshop</TextLink></div>
          </div>
          <Image className="home__art" src="/art/terrain-21-fade-right-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        </div>
      </section>

      <section className="section section--ink cta-band" aria-labelledby="cta-title">
        <div className="container cta-split">
          <div>
            <h2 id="cta-title">See it before you decide.</h2>
            <p className="lede">Fieldwork is new, and we have no client results to show yet. What we can show is what each product does. Product demonstrations are being built.</p>
          </div>
          <div className="btn-row">
            <ButtonLink href={DEMO_PATH} variant="light" track="demo_request_clicked" trackLabel="home-cta">Request a demo</ButtonLink>
            <ButtonLink href="/about" variant="outline-light">About Fieldwork</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
