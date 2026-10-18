import { LeadForm } from '@/components/forms/LeadForm';
import { ConsumerPricing } from '@/components/pricing/ConsumerPricing';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { TimedPopup } from '@/components/ui/TimedPopup';
import { FREE_EXPERIENCE_PATH, siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Fieldwork for Individuals: learn AI, or build a business with it',
  description: 'Get everyday work done with AI, or build a business with it step by step. Free to start. For students, professionals and independent workers in the UK, Nigeria and the USA.',
  path: '/individuals',
});

const whatWeDo = [
  ['Teach', 'AI through real tasks you already have.'],
  ['Practise', 'Guided exercises, with checks, on your own work.'],
  ['Build', 'Take a business idea from first thought to launch.'],
  ['Keep', 'Save workflows and reuse them next time.'],
];
const buildSteps = ['Find an idea', 'Create the design', 'Build the product', 'Create the website', 'Set up sales and operations', 'Launch and improve'];
const uses = [
  { t: 'Weekly update from scattered notes', s: 'available' as const },
  { t: 'Reply to an upset customer', s: 'available' as const },
  { t: 'Turn a reading into study notes', s: 'available' as const },
  { t: 'Draft a listing from verified facts', s: 'available' as const },
  { t: 'CV and cover letter for a job', s: 'planned' as const },
  { t: 'Prepare for an interview', s: 'planned' as const },
  { t: 'Summarise a long document', s: 'planned' as const },
  { t: 'Plan a trip, event or budget', s: 'planned' as const },
  { t: 'Draft a polite complaint or request', s: 'planned' as const },
  { t: 'Product descriptions for a small shop', s: 'planned' as const },
  { t: 'A week of social posts', s: 'planned' as const },
  { t: 'Study timetable and revision plan', s: 'planned' as const },
  { t: 'Outline to document or short deck', s: 'planned' as const },
  { t: 'Compare two options before deciding', s: 'planned' as const },
];

export default function IndividualsPage() {
  return (
    <>
      <section className="page-hero corners">
        <Corners n="02" letters={['I', 'N', 'D']} />
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">Individuals</p>
            <h1>Put AI to work for you.</h1>
            <p className="lede">Get everyday work done faster, or build a business with it from scratch.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href="/build" variant="cobalt" track="consumer_cta_clicked" trackLabel="individuals-build">Build a business</ButtonLink>
              <ButtonLink href={FREE_EXPERIENCE_PATH} variant="secondary" track="consumer_cta_clicked" trackLabel="individuals-hero">Try the free exercise</ButtonLink>
            </div>
            <p className="hero__note">Free to start · no account to try · works with free AI tools</p>
          </div>
          <Plate photo="work-hands-laptop" ratio="4 / 3" priority label={<><b>(01)</b>Stock photograph, illustrative</>} />
        </div>
      </section>

      <section className="section" aria-labelledby="do-title">
        <div className="container">
          <p className="eyebrow">What we do</p>
          <h2 id="do-title" className="visually-hidden">What we do</h2>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {whatWeDo.map(([t, d], i) => (
              <li key={t} className="reveal"><span className="bn" style={{ fontSize: '1.9rem' }}>0{i + 1}</span><h3>{t}</h3><p>{d}</p><span /></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="build-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Build a business</p>
            <h2 id="build-title">From idea to launch, step by step.</h2>
            <p className="lede">Choose a type of business, or let us suggest an idea. Free to start.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href="/build" variant="light" track="consumer_cta_clicked" trackLabel="individuals-build-band">Start building</ButtonLink>
              <ButtonLink href="/pricing#tier-builder" variant="outline-light">What is free and what is paid</ButtonLink>
            </div>
          </div>
          <ol className="steps" style={{ listStyle: 'none', padding: 0 }}>
            {buildSteps.map((s) => <li key={s}><h3>{s}</h3></li>)}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="uses-title">
        <div className="container">
          <p className="eyebrow">Everyday uses</p>
          <h2 id="uses-title" className="visually-hidden">Everyday uses</h2>
          <div className="uses">
            <Plate photo="work-hands-writing" ratio="3 / 4" label={<><b>(02)</b>Stock photograph, illustrative</>} sizes="(min-width: 62rem) 36vw, 100vw" />
            <ul className="uses__list">
              {uses.map((t) => (
                <li key={t.t}><span>{t.t}</span><Chip tone={t.s}>{t.s === 'available' ? 'Available' : 'Planned'}</Chip></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="pricing" aria-labelledby="price-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">Pricing</p><h2 id="price-title">Free first. Paid later.</h2></div>
          <ConsumerPricing />
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="join-title">
        <div className="container split">
          <div><p className="eyebrow">Early access</p><h2 id="join-title">Hear when guided projects are ready.</h2><p className="lede">One email when something real exists.</p></div>
          <div className="form-card">
            <LeadForm type="newsletter" variant="email" submitLabel="Join early access" interest="early-access-individuals" location="individuals"
              successTitle="You are on the list" successBody="Thank you. We will email you when guided projects are ready." fallbackEmail={siteConfig.email.general} />
          </div>
        </div>
      </section>

      <TimedPopup delay={15000} storageKey="fw-popup-individuals" eyebrow="Free exercise" title="Try our exercise." body="Fifteen minutes. Any AI tool. No account. You finish with a workflow you can reuse." ctaLabel="Try the exercise" href={FREE_EXPERIENCE_PATH} event="popup_cta_clicked" />
    </>
  );
}
