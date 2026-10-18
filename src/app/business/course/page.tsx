import Image from 'next/image';
import { BusinessPricing } from '@/components/pricing/BusinessPricing';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { WORKFLOWS } from '@/content/corporate/workflows';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'The real estate course: how it works and what it costs',
  description: 'How Fieldwork trains real estate teams to use AI on their own work: modules, weekly rhythm, what you receive, and pricing for the UK, Nigeria and the USA.',
  path: '/business/course',
});

const rhythm = [
  ['Week 1', 'Rules and basics', 'The AI-use rule, what may be pasted, the five-part brief. First workflow card.'],
  ['Weeks 2 to 3', 'Core workflows', 'Listings, enquiries and viewing feedback, on anonymised examples with a person checking.'],
  ['Weeks 4 to 5', 'Everyday admin', 'Research, internal documents and reports, procedures and new-starter guides.'],
  ['Week 6', 'Marketing and review', 'Marketing content, then a review of what changed and what to keep.'],
];

export default function CoursePage() {
  return (
    <>
      <section className="page-hero page-hero--wide corners">
        <Corners n="04" letters={['C', 'R', 'S']} />
        <Image className="page-hero__dots" src="/art/terrain-9-fade-down-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">Business · Real estate course</p>
            <h1>What the course looks like.</h1>
            <p className="lede">Practice on the work your team already does. Short modules, real examples, a person always checking.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href="#business-pricing" track="business_cta_clicked" trackLabel="course-pricing">See pricing</ButtonLink>
              <ButtonLink href="/contact?topic=business" variant="secondary" track="business_cta_clicked" trackLabel="course-demo">Request a demonstration</ButtonLink>
            </div>
          </div>
          <Plate photo="work-library-team" ratio="4 / 3" priority label={<><b>(01)</b>Stock photograph, illustrative</>} />
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <p className="eyebrow">How a module works</p>
          <h2 id="how-title" style={{ maxWidth: '16ch' }}>Brief, run, check, keep.</h2>
          <div className="flow">
            <div className="flow__item"><p className="index">01</p><h3>Brief</h3><p>A short lesson, then write the brief, including what the tool must not do.</p></div>
            <div className="flow__item"><p className="index">02</p><h3>Run</h3><p>Use your approved AI tool on an anonymised example.</p></div>
            <div className="flow__item"><p className="index">03</p><h3>Check</h3><p>Compare every claim with the source. A person decides.</p></div>
            <div className="flow__item"><p className="index">04</p><h3>Keep</h3><p>Save the brief and checks as a workflow card in your library.</p></div>
          </div>
          <p className="hero__note">About 45 minutes a module, self-paced. Live or remote sessions are optional.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="modules-title">
        <div className="container">
          <p className="eyebrow">The modules</p>
          <h2 id="modules-title" className="visually-hidden">Course modules</h2>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            <li><span className="bn" style={{ fontSize: '1.9rem' }}>00</span><h3>Rules and safe handling</h3><p>Write your AI-use rule: what may be pasted, what never is, who checks what.</p><span /></li>
            {WORKFLOWS.map((w, i) => (
              <li key={w.id}><span className="bn" style={{ fontSize: '1.9rem' }}>{String(i + 1).padStart(2, '0')}</span><h3>{w.title}</h3><div><p>{w.summary}</p><p className="small" style={{ marginTop: 'var(--s-2)', color: 'var(--ink)' }}><strong>People keep:</strong> {w.peopleKeep}</p></div><span /></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="week-title">
        <div className="container">
          <p className="eyebrow">A typical six weeks</p>
          <h2 id="week-title" className="visually-hidden">A typical six weeks</h2>
          <div className="ppr">
            {rhythm.map(([k, t, d]) => <div className="r" key={k}><h3 className="k">{k}</h3><p><strong>{t}.</strong> {d}</p></div>)}
          </div>
          <p className="hero__note" style={{ color: 'color-mix(in srgb, var(--paper) 72%, transparent)' }}>An outline we adapt to your team. Not a record of work done.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="get-title">
        <div className="container split">
          <div><p className="eyebrow">What you receive</p><h2 id="get-title">Material your team keeps using.</h2></div>
          <ul className="ticks">
            <li>The relevant industry course, with guided exercises and assessments</li>
            <li>A personal workflow library for each person</li>
            <li>Completion tracking; manager dashboard and team reports on larger plans</li>
            <li>A written AI-use rule and house briefs you own</li>
            <li>Optional live or remote sessions and workshops</li>
            <li>For the UK, Nigeria and the USA, with market-specific data and fair-housing notes</li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="price-title">
        <div className="container">
          <p className="eyebrow">Pricing</p>
          <h2 id="price-title" style={{ maxWidth: '18ch' }}>Smaller teams pay less per head. Larger ones are quoted.</h2>
          <BusinessPricing />
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <ButtonLink href="/contact?topic=business" track="business_cta_clicked" trackLabel="course-quote">Request a demonstration or quote</ButtonLink>
            <ButtonLink href="/business/assessment" variant="secondary" track="business_cta_clicked" trackLabel="course-assessment">Take the free assessment</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
