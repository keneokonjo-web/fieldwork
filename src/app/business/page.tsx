import Image from 'next/image';
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { PromptBlock } from '@/components/ui/PromptBlock';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { TimedPopup } from '@/components/ui/TimedPopup';
import { NOT_FOR_AI, WORKFLOWS } from '@/content/corporate/workflows';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'AI training for real estate teams: listings, enquiries, procedures',
  description: 'Practical, task-based AI training for estate and letting agencies in the UK, Nigeria and the USA. Practise listings, enquiries, reports and procedures, with people always deciding.',
  path: '/business',
});

const scenarioBrief = `Task: Draft a property listing description from these verified facts.
Who it is for: People searching online for a two-bedroom flat to buy.
Tone: Clear, factual and welcoming. No hype. British English.

Rules:
- Use only the facts provided. Do not invent anything.
- Mention tenure and service charge.
- Avoid "stunning", "perfect" and "must see".
- Say nothing about the neighbourhood or neighbours.

Facts (fictional example):
2-bed, 1-bath, first-floor flat in a 1930s purpose-built block. 61 sq m.
Kitchen fitted 2023. Double glazing. Eight minutes' walk to the station.
Leasehold, 112 years remaining. Service charge £1,850 a year. No parking. EPC C.`;

export default function BusinessPage() {
  return (
    <>
      <section className="page-hero page-hero--wide corners">
        <Corners n="04" letters={['R', 'E', 'A']} />
        <Image className="page-hero__dots" src="/art/terrain-12-circle-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">Business · Real estate</p>
            <h1>Better listings. Faster replies. People in charge.</h1>
            <p className="lede">AI training for estate and letting teams in the UK, Nigeria and the USA, on the work they already do.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href="/contact?topic=business" track="business_cta_clicked" trackLabel="re-hero-demo">Request a demonstration</ButtonLink>
              <ButtonLink href="/business/assessment" variant="secondary" track="business_cta_clicked" trackLabel="re-hero-assessment">Free assessment</ButtonLink>
            </div>
            <p className="hero__note">Fieldwork is new, with no agency case studies yet. We would rather show a worked scenario than invent a testimonial.</p>
          </div>
          <Plate photo="prop-exterior-day" ratio="4 / 5" priority position="center 40%" sizes="(min-width: 62rem) 36vw, 100vw" label={<><b>(01)</b>Stock photograph. Not a Fieldwork client.</>} />
        </div>
      </section>
      <section className="section" aria-labelledby="wf-title">
        <div className="container">
          <p className="eyebrow">Seven workflows</p>
          <h2 id="wf-title" className="visually-hidden">Seven workflows your team can practise</h2>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {WORKFLOWS.map((w, i) => (
              <li key={w.id} className="reveal">
                <span className="bn" style={{ fontSize: '1.9rem' }}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{w.title}</h3>
                <div><p>{w.summary}</p><p className="small" style={{ marginTop: 'var(--s-2)', color: 'var(--ink)' }}><strong>People keep:</strong> {w.peopleKeep}</p></div>
                <span />
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section" aria-labelledby="scenario-title">
        <div className="container split">
          <div>
            <Chip tone="neutral">Fictional demonstration</Chip>
            <h2 id="scenario-title" style={{ marginTop: 'var(--s-4)' }}>A listing from verified facts.</h2>
            <ol className="steps" style={{ marginTop: 'var(--s-5)' }}>
              <li><h3>Brief</h3><p>Write it together, including what the tool must not do.</p></li>
              <li><h3>Run</h3><p>Each person runs it on the same fact sheet.</p></li>
              <li><h3>Check</h3><p>Compare every claim with the fact sheet. The kind of thing this catches: a “south-facing” aspect or a “quiet street” that is not in the facts.</p></li>
              <li><h3>Keep</h3><p>One house brief and one checklist, saved as a workflow card.</p></li>
            </ol>
          </div>
          <div>
            <PromptBlock title="Example brief (fictional property)" text={scenarioBrief} context="real-estate" />
            <p className="small muted">The brief says not to invent. The check is where a person confirms it did not.</p>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="pilot-title">
        <div className="container">
          <p className="eyebrow">Example pilot</p>
          <h2 id="pilot-title" style={{ maxWidth: '16ch' }}>Small, measured, easy to stop.</h2>
          <div className="flow">
            <div className="flow__item"><p className="index">Week 0</p><h3>Conversation</h3><p>Agree workflows, people and measures.</p></div>
            <div className="flow__item"><p className="index">Week 1</p><h3>Rules and briefs</h3><p>Write the AI-use rule and house briefs.</p></div>
            <div className="flow__item"><p className="index">Weeks 2 to 3</p><h3>Practice</h3><p>Anonymised real examples. A person checks each output.</p></div>
            <div className="flow__item"><p className="index">Week 4</p><h3>Review</h3><p>Compare against your baseline. Decide what to keep.</p></div>
          </div>
          <p className="hero__note">An illustrative outline we adapt. Not a record of work done.</p>
          <div className="cells cells--3" style={{ marginTop: 'var(--s-6)' }}>
            <div><Plate photo="city-london-bridge" ratio="16 / 9" sizes="(min-width: 48rem) 40vw, 100vw" /><h3 style={{ marginTop: 'var(--s-4)' }}>UK agencies</h3><p>UK GDPR and the Data Protection Act 2018 apply. Staff practise with placeholders and anonymised examples.</p></div>
            <div><Plate photo="city-lagos-aerial" ratio="16 / 9" sizes="(min-width: 48rem) 40vw, 100vw" /><h3 style={{ marginTop: 'var(--s-4)' }}>Nigerian agencies</h3><p>The Nigeria Data Protection Act 2023 applies. Practice is designed for free tiers and mobile connections.</p></div>
            <div><Plate photo="city-new-york" ratio="16 / 9" sizes="(min-width: 48rem) 30vw, 100vw" /><h3 style={{ marginTop: 'var(--s-4)' }}>US agencies</h3><p>Listing language must respect the Fair Housing Act and state rules, and client data falls under state privacy laws. Practice uses anonymised examples. Not legal advice; verify with counsel.</p></div>
          </div>
        </div>
      </section>
      <section className="section section--ink" aria-labelledby="people-title">
        <div className="container split">
          <div>
            <p className="eyebrow">What stays with people</p>
            <h2 id="people-title">AI drafts. <em style={{ color: 'var(--cobalt-light)' }}>People decide.</em></h2>
            <p className="lede">We never suggest AI should do these:</p>
            <ul className="crosses">{NOT_FOR_AI.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
          <div className="safety">
            <h3>Rules and regulation</h3>
            <p>Property description, consumer and data protection rules differ between the UK and Nigeria and change. Training helps your team follow your own rules. It is not legal advice; take advice from your professional body or a solicitor.</p>
          </div>
        </div>
      </section>
      <section className="section" aria-label="Property types">
        <div className="container">
          <div className="photo-band">
            <Plate photo="prop-villa-pool" ratio="4 / 3" label={<><b>(02)</b>Sales</>} />
            <Plate photo="home-living-gallery" ratio="4 / 3" label={<><b>(03)</b>Viewings</>} />
            <Plate photo="prop-block" ratio="4 / 3" label={<><b>(04)</b>Lettings</>} sizes="(min-width: 48rem) 33vw, 50vw" />
          </div>
        </div>
      </section>
      <section className="section section--cobalt cta-band" aria-labelledby="re-cta">
        <div className="container split">
          <div><p className="eyebrow">Next step</p><h2 id="re-cta">Discuss a pilot.</h2><p className="lede"><TextLink href="/business/course">See the course and pricing</TextLink></p></div>
          <div className="btn-row">
            <ButtonLink href="/contact?topic=business" variant="light" track="business_cta_clicked" trackLabel="re-cta-demo">Request a demonstration</ButtonLink>
            <ButtonLink href="/business/assessment" variant="outline-light" track="business_cta_clicked" trackLabel="re-cta-assessment">Take the assessment</ButtonLink>
          </div>
        </div>
      </section>
      <TimedPopup delay={10000} storageKey="fw-popup-business" eyebrow="See the course" title="See what the course looks like." body="How the real estate training works, week by week, and what it costs." ctaLabel="See the course" href="/business/course" event="popup_cta_clicked" />
    </>
  );
}
