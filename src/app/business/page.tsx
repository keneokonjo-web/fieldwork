import Image from 'next/image';
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Fieldwork for Business: practical AI training for your team',
  description: 'Task-based AI training for employees, starting with real estate. Reusable material, optional live sessions, and clear rules on what people keep. Request a demonstration.',
  path: '/business',
});

const problems = [
  ['Staff use AI, with no shared rules', 'People paste client details into free tools. Each works differently.'],
  ['Output quality varies', 'Nobody has agreed what “checked” means.'],
  ['Training does not stick', 'One talk changes little. People need to practise on their own work.'],
  ['New starters take too long', 'Knowledge sits in heads. Procedures go unread.'],
];
const receive = ['A practice plan on your own workflows', 'Reusable briefs and checklists (workflow cards)', 'Written rules on what may be pasted', 'Guided practice with checks against source', 'Optional live or remote sessions', 'A short review of what changed'];

export default function BusinessPage() {
  return (
    <>
      <section className="page-hero page-hero--wide corners">
        <Corners n="03" letters={['B', 'U', 'S']} />
        <Image className="page-hero__dots" src="/art/terrain-9-fade-down-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">For business</p>
            <h1>Your team, practising on your own work.</h1>
            <p className="lede">Practical AI training, starting with real estate. Tools draft. People decide.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href="/contact?topic=business" track="business_cta_clicked" trackLabel="business-hero">Request a demonstration</ButtonLink>
              <ButtonLink href="/business/real-estate" variant="secondary" track="business_cta_clicked" trackLabel="business-real-estate">Real estate teams</ButtonLink>
            </div>
          </div>
          <Plate photo="work-team-table" ratio="4 / 3" priority label={<><b>(01)</b>Stock photograph, illustrative</>} />
        </div>
      </section>

      <section className="section" aria-labelledby="prob-title">
        <div className="container">
          <p className="eyebrow">What we are asked to fix</p>
          <h2 id="prob-title" className="visually-hidden">The problems</h2>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {problems.map(([t, d], i) => <li key={t} className="reveal"><span className="bn" style={{ fontSize: '1.9rem' }}>0{i + 1}</span><h3>{t}</h3><p>{d}</p><span /></li>)}
          </ol>
          <p className="hero__note">Hypotheses to check with you, not assumptions.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="approach-title">
        <div className="container">
          <p className="eyebrow">The approach</p>
          <h2 id="approach-title" style={{ maxWidth: '16ch' }}>Brief, run, check, keep.</h2>
          <div className="flow">
            <div className="flow__item"><p className="index">01</p><h3>Discover</h3><p>A short conversation about your workflows.</p></div>
            <div className="flow__item"><p className="index">02</p><h3>Set up</h3><p>One or two workflows. Rules, briefs, checks.</p></div>
            <div className="flow__item"><p className="index">03</p><h3>Practise</h3><p>Your own examples, with a person checking.</p></div>
            <div className="flow__item"><p className="index">04</p><h3>Review</h3><p>What changed. Keep or drop.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="get-title">
        <div className="container split">
          <div>
            <p className="eyebrow">What you receive</p>
            <h2 id="get-title">Material your team keeps using.</h2>
            <ul className="ticks">{receive.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div className="safety">
            <h3>What we will not claim</h3>
            <p>No guarantees of productivity, compliance or savings. We never suggest AI should value a property, give legal advice or approve a transaction.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Practice in context">
        <div className="container">
          <div className="photo-band">
            <Plate photo="work-whiteboard" ratio="4 / 3" label={<><b>(02)</b>Pick the workflow</>} />
            <Plate photo="work-meeting-room" ratio="4 / 3" label={<><b>(03)</b>Agree the rules</>} />
            <Plate photo="work-desk-pair" ratio="4 / 3" label={<><b>(04)</b>Practise on real examples</>} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="formats-title">
        <div className="container">
          <p className="eyebrow">Three sizes</p>
          <h2 id="formats-title" className="visually-hidden">Three sizes of engagement</h2>
          <div className="cells cells--3">
            <div><Chip tone="neutral">Start here</Chip><h3 style={{ marginTop: 'var(--s-3)' }}>Practice session</h3><p>One workflow, a small team, workflow cards.</p></div>
            <div><Chip tone="neutral">Most tailored</Chip><h3 style={{ marginTop: 'var(--s-3)' }}>Tailored enablement</h3><p>A few weeks on two or three of your workflows.</p></div>
            <div><Chip tone="neutral">Wider rollout</Chip><h3 style={{ marginTop: 'var(--s-3)' }}>Implementation support</h3><p>Several teams. Written rules, owners, simple measures.</p></div>
          </div>
          <p className="hero__note">Scoped and priced after a conversation. <TextLink href="/pricing">Pricing and availability</TextLink></p>
        </div>
      </section>

      <section className="section" aria-labelledby="platform-title">
        <div className="container split">
          <div><p className="eyebrow">Training now, platform later</p><h2 id="platform-title">The platform is a plan.</h2></div>
          <div>
            <p className="lede">Training is the service today. An onboarding and knowledge platform is planned: <strong>not built, not for sale.</strong></p>
            <TextLink href="/pricing">Leave your email on the pricing page</TextLink>
          </div>
        </div>
      </section>

      <section className="section section--cobalt cta-band" aria-labelledby="cta-title">
        <div className="container split">
          <div><p className="eyebrow">Next step</p><h2 id="cta-title">See it on your own workflows.</h2></div>
          <div className="btn-row">
            <ButtonLink href="/contact?topic=business" variant="light" track="business_cta_clicked" trackLabel="business-cta">Request a demonstration</ButtonLink>
            <ButtonLink href="/business/assessment" variant="outline-light" track="business_cta_clicked" trackLabel="business-assessment">Take the assessment</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
