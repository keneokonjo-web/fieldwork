import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { PromptBlock } from '@/components/ui/PromptBlock';
import { Reveal } from '@/components/ui/Reveal';
import { NOT_FOR_AI, WORKFLOWS } from '@/content/corporate/workflows';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'AI training for real estate teams: listings, enquiries, procedures',
  description: 'Practical, task-based AI training for estate and letting agencies in the UK and Nigeria. Practise listing preparation, enquiry replies, reports and procedures, with people always deciding.',
  path: '/business/real-estate',
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

export default function RealEstatePage() {
  return (
    <>
      <section className="page-hero page-hero--wide">
        <div className="container">
          <p className="eyebrow">Fieldwork for Business · Real estate</p>
          <h1>Better listings, faster replies, clearer procedures. With people still in charge.</h1>
          <p className="lede">Practical AI training for estate agencies, letting agencies and property companies in the UK and Nigeria. Your staff practise on the work they already do, and learn what to hand to a tool and what to keep.</p>
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <ButtonLink href="/contact?topic=business" track="business_cta_clicked" trackLabel="re-hero-demo">Request a demonstration</ButtonLink>
            <ButtonLink href="/business/assessment" variant="secondary" track="business_cta_clicked" trackLabel="re-hero-assessment">Take the free assessment</ButtonLink>
          </div>
          <p className="hero__note">Fieldwork is new and has no agency case studies yet. We would rather show you a worked scenario than invent a testimonial.</p>
        </div>
      </section>

      <section className="section section--deep" aria-labelledby="wf-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">Workflows your team can practise</p><h2 id="wf-title">Seven everyday tasks, each with a clear line between tool and person.</h2></div>
          <div className="grid grid--2">
            {WORKFLOWS.map((w, i) => (
              <Reveal key={w.id} className="card" delay={(i % 2) * 60}>
                <p className="index">{String(i + 1).padStart(2, '0')}</p>
                <h3>{w.title}</h3>
                <p>{w.summary}</p>
                <p className="small"><strong>People keep:</strong> {w.peopleKeep}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="scenario-title">
        <div className="container split">
          <div>
            <Chip tone="neutral">Fictional demonstration</Chip>
            <h2 id="scenario-title" style={{ marginTop: 'var(--s-4)' }}>What practice looks like: a listing from verified facts.</h2>
            <p>This property and these facts are invented for illustration. No client, agency or result is implied.</p>
            <ol className="steps" style={{ marginTop: 'var(--s-5)' }}>
              <li><h3>Brief</h3><p>Staff write the brief together, including what the tool must not do.</p></li>
              <li><h3>Run</h3><p>Each person runs it in the approved tool on the same fact sheet.</p></li>
              <li><h3>Check</h3><p>They compare every claim in the draft with the fact sheet. In practice sessions the typical catch is a pleasant detail that is not in the facts, such as a “south-facing” aspect or a “quiet street”.</p></li>
              <li><h3>Keep</h3><p>The team agrees one house brief and one checklist, and saves them as a workflow card.</p></li>
            </ol>
          </div>
          <div>
            <PromptBlock title="Example brief (fictional property)" text={scenarioBrief} context="real-estate" />
            <p className="small muted">The brief tells the tool not to invent. The check step is where a person confirms it did not.</p>
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="people-title">
        <div className="container split">
          <div>
            <p className="eyebrow">What stays with people</p>
            <h2 id="people-title">AI drafts. People decide.</h2>
            <p className="lede">Training teaches staff where a tool helps and where it must not be used. We never suggest AI should do these:</p>
            <ul className="crosses" style={{ color: 'var(--paper)' }}>{NOT_FOR_AI.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
          <div className="safety">
            <h3>Rules and regulation</h3>
            <p>Property description, consumer protection and data protection rules differ between the UK and Nigeria and change over time. Fieldwork training helps your team follow your own rules. It is not legal advice, and you should take advice from your professional body or a solicitor on what applies to you.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pilot-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">An example pilot outline</p><h2 id="pilot-title">Small, measured and easy to stop.</h2><p>This is an illustrative outline we would adapt to your agency. It is not a record of work done.</p></div>
          <div className="flow">
            <div className="flow__item"><p className="index">Week 0</p><h3>Conversation</h3><p>Agree one or two workflows, who takes part, and what you would measure.</p></div>
            <div className="flow__item"><p className="index">Week 1</p><h3>Rules and briefs</h3><p>Write the AI-use rule and house briefs together.</p></div>
            <div className="flow__item"><p className="index">Weeks 2 to 3</p><h3>Practice</h3><p>Staff practise on real, anonymised examples. A person checks each output.</p></div>
            <div className="flow__item"><p className="index">Week 4</p><h3>Review</h3><p>Compare time and quality against your baseline. Decide what to keep.</p></div>
          </div>
          <div className="grid grid--2" style={{ marginTop: 'var(--s-7)' }}>
            <div className="card"><h3>For UK agencies</h3><p>UK GDPR and the Data Protection Act 2018 apply to client personal data. We help staff practise with placeholders and anonymised examples so personal data stays out of tools that are not approved for it.</p></div>
            <div className="card"><h3>For Nigerian agencies</h3><p>The Nigeria Data Protection Act 2023 applies. We design practice for free tool tiers and mobile connections, so people do not need paid accounts or fast broadband to take part.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--burgundy" aria-labelledby="re-cta">
        <div className="container split">
          <div><p className="eyebrow">Next step</p><h2 id="re-cta">Discuss a pilot, or see a demonstration.</h2><p className="lede">A short conversation is enough to see whether this fits. <TextLink href="/pricing">How pilots are priced</TextLink></p></div>
          <div className="btn-row">
            <ButtonLink href="/contact?topic=business" variant="light" track="business_cta_clicked" trackLabel="re-cta-demo">Request a demonstration</ButtonLink>
            <ButtonLink href="/business/assessment" variant="outline-light" track="business_cta_clicked" trackLabel="re-cta-assessment">Take the assessment</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
