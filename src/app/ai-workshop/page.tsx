import { ButtonLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { LeadForm } from '@/components/forms/LeadForm';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'AI Workshop',
  description: 'Self-paced AI training for real-estate teams, with a manager view of progress. In development.',
  path: '/ai-workshop',
});

const modules = [
  ['AI fundamentals for real estate', 'What AI can and cannot do, effective instructions, and checking outputs.'],
  ['Property listing preparation', 'Turn verified fact sheets into listing drafts, and flag what is missing or contradictory.'],
  ['Listing editing and brand consistency', 'Apply your house style and check copy against verified facts.'],
  ['Property marketing content', 'Descriptions, brochures, announcements, email copy and open-house materials.'],
  ['Lead qualification', 'Organise enquiries with transparent criteria, without assumptions about people.'],
  ['Lead follow-up', 'Personalised messages, reusable templates and reminders.'],
  ['Property enquiry responses', 'Draft answers from approved information and know when to escalate.'],
  ['Viewing and open-house workflows', 'Confirmations, checklists, follow-ups and feedback forms.'],
  ['Property research', 'Organise public information, compare listings and keep facts apart from estimates.'],
  ['Internal documents and knowledge', 'Summaries, key points, FAQs and standard procedures.'],
  ['Everyday administration', 'Meeting summaries, action items, email drafts and checklists.'],
  ['Social media and content planning', 'Ideas, captions, property spotlights and content calendars.'],
  ['Property images and visual content', 'Graphics and layouts, and the risk of misleading imagery.'],
  ['Role-specific workflows', 'Agents, lettings teams, administrators, marketers and development sales.'],
  ['Workflow automation fundamentals', 'Forms, triggers, notifications and basic no-code principles.'],
  ['Data protection and responsible AI', 'Confidentiality, accuracy, fairness and human approval of consequential decisions.'],
];

export default function AiWorkshopPage() {
  return (
    <>
      <section className="hero hero--page corners" aria-labelledby="hero-title">
        <Corners n="04" letters={['A', 'I', 'W']} />
        <div className="container hero__grid">
          <div>
            <div className="badge-line"><p className="eyebrow" style={{ margin: 0 }}>AI Workshop</p><Chip tone="planned">Planned, not yet available</Chip></div>
            <h1 id="hero-title">AI training your team can do at its own pace.</h1>
            <p className="lede">Short lessons and exercises on real property tasks, with a manager view of who has finished what. No live sessions are needed.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href="#interest" variant="cobalt">Register interest</ButtonLink>
              <ButtonLink href="#curriculum" variant="secondary">See the curriculum</ButtonLink>
            </div>
          </div>
          <Plate photo="work-team-table" ratio="4 / 3" priority sizes="(min-width: 62rem) 40vw, 100vw" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero__big" src="/brand/logo/fieldwork-wordmark-light.svg" alt="" width={607} height={138} aria-hidden="true" />
      </section>

      <section className="section" aria-labelledby="what-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What it will be</p>
            <h2 id="what-title">Learning for staff, progress for managers.</h2>
            <p>The Workshop is being built after the website and automation products. Everything on this page describes what is planned. None of it is on sale.</p>
          </div>
          <div className="split">
            <Reveal>
              <h3>For each employee</h3>
              <ul className="ticks">
                <li>A personal sign-in and assigned learning pathway.</li>
                <li>Short lessons with screen demonstrations.</li>
                <li>Practical exercises based on realistic property work.</li>
                <li>AI-assisted practice and feedback.</li>
                <li>Knowledge checks and completion status.</li>
                <li>Downloadable templates and a prompt library.</li>
              </ul>
            </Reveal>
            <Reveal delay={90}>
              <h3>For managers</h3>
              <ul className="ticks">
                <li>Invite or remove employees, and assign courses.</li>
                <li>See enrolment, completion and assessment results.</li>
                <li>Team progress summaries, and who has not finished.</li>
                <li>Exportable progress reports.</li>
              </ul>
              <p className="callout" style={{ marginTop: 'var(--s-4)' }}>Managers see learning progress. They do not automatically see employees’ private AI conversations.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--wash" id="curriculum" aria-labelledby="curriculum-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Curriculum</p>
            <h2 id="curriculum-title">Sixteen modules, built around property work.</h2>
            <p>Each module will have a short lesson, an example, an exercise, a knowledge check, feedback and a reusable template. The first release will be one complete pathway, not many unfinished ones.</p>
          </div>
          <ol className="index-list index-list--two" style={{ listStyle: 'none', padding: 0 }}>
            {modules.map(([t, d], i) => (
              <li key={t}><span className="bn" style={{ fontSize: '1.3rem' }}>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="not-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Not covered</p>
            <h2 id="not-title">What it will not teach or do.</h2>
            <ul className="ticks">
              <li>Company finances or commission calculations.</li>
              <li>Property valuations as professional advice.</li>
              <li>Legal or tax advice, or investment recommendations.</li>
              <li>Automated decisions about buyers or tenants.</li>
            </ul>
            <p className="small muted" style={{ marginTop: 'var(--s-4)' }}>AI can support administrative work. Professional decisions stay with qualified people.</p>
          </div>
          <Reveal><Plate photo="work-hands-laptop" ratio="3 / 2" /></Reveal>
        </div>
      </section>

      <section className="section section--ink" id="interest" aria-labelledby="interest-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Price: to be announced</p>
            <h2 id="interest-title">Tell us you are interested.</h2>
            <p className="lede">Pricing has not been decided and we will not invent it. Register your interest and we will email you when the Workshop is ready, and ask what your team needs.</p>
          </div>
          <div className="form-card form-card--paper">
            <LeadForm type="workshop_interest" variant="business" submitLabel="Register interest" location="ai-workshop" interest="AI Workshop"
              messageLabel="Anything you would like it to cover? (optional)" messageHint="Please do not include personal details of clients."
              successTitle="Thank you, you are on the list" successBody="We will email you when there is something real to show." fallbackEmail={siteConfig.email.business} />
          </div>
        </div>
      </section>
    </>
  );
}
