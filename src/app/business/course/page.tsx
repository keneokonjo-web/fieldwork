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

const weeks = [
  { when: 'Week 1', title: 'Rules and basics', what: 'Write your AI-use rule: what may be pasted, what never is, and who checks what. Learn the five-part brief.', modules: 'Module 00 · about 45 minutes', finish: 'A written AI-use rule and a first workflow card.' },
  { when: 'Weeks 2 to 3', title: 'Core workflows', what: 'Listings from verified facts, enquiries and lead follow-up, and viewing feedback, on anonymised examples. A person checks every output.', modules: 'Modules 01 to 03 · about 2 hours a week', finish: 'Three workflow cards: a listing, a reply and a viewing update.' },
  { when: 'Weeks 4 to 5', title: 'Everyday admin', what: 'Research and organising information, internal documents and reports, procedures and new-starter guides.', modules: 'Modules 04 to 06 · about 2 hours a week', finish: 'Three more cards and a house checklist.' },
  { when: 'Week 6', title: 'Marketing and review', what: 'Marketing content and posts, then a review of what changed, what to keep and what to drop.', modules: 'Module 07 · about 1 hour', finish: 'A short review and a plan for what comes next.' },
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

      <section className="section" aria-labelledby="week-title">
        <div className="container">
          <p className="eyebrow">How the course runs</p>
          <h2 id="week-title" style={{ maxWidth: '14ch' }}>A typical six weeks.</h2>
          <p className="lede" style={{ marginBottom: 'var(--s-6)' }}>Self-paced online, about two hours a week for each person. A live or remote session every fortnight is optional.</p>
          <ol className="weeks" style={{ listStyle: 'none', padding: 0 }}>
            {weeks.map((w) => (
              <li key={w.when} className="week reveal">
                <p className="week__when">{w.when}</p>
                <div>
                  <h3>{w.title}</h3>
                  <p className="week__what">{w.what}</p>
                  <p className="week__meta">{w.modules}</p>
                  <p className="week__finish"><span className="index">You finish with</span> {w.finish}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="hero__note">An outline we adapt to your team. Not a record of work done.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="get-title">
        <div className="container split">
          <div><p className="eyebrow">What you receive</p><h2 id="get-title">Material your team keeps using.</h2></div>
          <ul className="ticks ticks--large">
            <li>The relevant industry course, with guided exercises and assessments</li>
            <li>A personal workflow library for each person</li>
            <li>Completion tracking; manager dashboard and team reports on larger plans</li>
            <li>A written AI-use rule and house briefs you own</li>
            <li>Optional live or remote sessions and workshops</li>
            <li>For the UK, Nigeria and the USA, with market-specific data and fair-housing notes</li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="modules-title">
        <div className="container">
          <p className="eyebrow">The modules</p>
          <h2 id="modules-title" style={{ maxWidth: '18ch' }}>Eight modules, each one brief, run, check, keep.</h2>
          <p className="lede" style={{ marginBottom: 'var(--s-5)' }}>About 45 minutes each: a short lesson, a guided exercise on an anonymised example, a check against the source, and a saved workflow card.</p>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            <li><span className="bn" style={{ fontSize: '1.9rem' }}>00</span><h3>Rules and safe handling</h3><p>Write your AI-use rule: what may be pasted, what never is, who checks what.</p><span /></li>
            {WORKFLOWS.map((w, i) => (
              <li key={w.id}><span className="bn" style={{ fontSize: '1.9rem' }}>{String(i + 1).padStart(2, '0')}</span><h3>{w.title}</h3><div><p>{w.summary}</p><p className="small" style={{ marginTop: 'var(--s-2)', color: 'var(--ink)' }}><strong>People keep:</strong> {w.peopleKeep}</p></div><span /></li>
            ))}
          </ol>
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
