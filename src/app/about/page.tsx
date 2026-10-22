import { ButtonLink } from '@/components/ui/ButtonLink';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { DEMO_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About',
  description: 'Fieldwork is a new real-estate technology company. What we sell, how we work, and what is and is not available yet.',
  path: '/about',
});

const principles = [
  ['Products, not retainers.', 'You buy a defined product, receive it and run it. We do not manage your daily work or your content.'],
  ['Honest about status.', 'We say what exists, what is being built and what is planned. We do not invent clients, results or testimonials.'],
  ['One foundation, many clients.', 'Every client has their own brand, data, domain and logins, kept strictly apart.'],
  ['Simple first.', 'We use the simplest reliable tool for the job, and add integrations when real customers need them.'],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero corners">
        <Corners n="05" letters={['A', 'B', 'T']} />
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">About</p>
            <h1>Practical technology for property businesses.</h1>
            <p className="lede">Fieldwork builds websites, workflows and training for estate agencies and property developers in the UK and Nigeria.</p>
          </div>
          <Plate photo="uk-flats" ratio="4 / 3" priority sizes="(min-width: 62rem) 40vw, 100vw" />
        </div>
      </section>

      <section className="section" aria-labelledby="where-title">
        <div className="container">
          <div className="ppr">
            <div className="r"><h2 id="where-title" className="k" style={{ fontSize: '0.75rem' }}>(01) Where we are</h2><p>Fieldwork is new. There is no client list, case study or testimonial to show, and we will not make any up. We are building product demonstrations so you can see exactly what each product does.</p></div>
            <div className="r"><h2 className="k" style={{ fontSize: '0.75rem' }}>(02) What we sell</h2><p>A website with a listing system you manage yourself. Two fixed-price automations. An optional brand and social pack. An AI Workshop for teams, which is planned.</p></div>
            <div className="r"><h2 className="k" style={{ fontSize: '0.75rem' }}>(03) What we are not</h2><p className="res-line">Not an agency you keep on retainer, and not a consultancy that runs your operations.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--wash" aria-labelledby="principles-title">
        <div className="container">
          <p className="eyebrow">How we work</p>
          <h2 id="principles-title" className="visually-hidden">Four working principles</h2>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {principles.map(([t, d], i) => <li key={t}><span className="bn" style={{ fontSize: '1.9rem' }}>0{i + 1}</span><h3>{t}</h3><p>{d}</p><span /></li>)}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="markets-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Where we work</p>
            <h2 id="markets-title">The UK and Nigeria first.</h2>
            <p>Each market is priced separately. The products are designed so they can be offered in other markets, such as the United States, later.</p>
          </div>
          <div className="band">
            <Reveal><Plate photo="ng-vi-aerial" ratio="3 / 2" /></Reveal>
            <Reveal delay={80}><Plate photo="uk-london" ratio="3 / 2" /></Reveal>
            <Reveal delay={160}><Plate photo="ng-lekki-street" ratio="3 / 2" /></Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container split">
          <div><p className="eyebrow">Next step</p><h2>Ask to see it working.</h2></div>
          <div className="btn-row"><ButtonLink href={DEMO_PATH} variant="light" track="demo_request_clicked" trackLabel="about">Request a demo</ButtonLink><ButtonLink href="/websites" variant="outline-light">Websites &amp; Listings</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
