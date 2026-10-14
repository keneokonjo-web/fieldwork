import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Plate } from '@/components/ui/Plate';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Fieldwork for Business: practical AI training for your team',
  description: 'Practical, task-based AI training for employees, starting with real estate. Reusable material, optional live sessions and clear rules on what people keep. Request a demonstration.',
  path: '/business',
});

const problems = [
  ['Staff already use AI, with no shared rules', 'People paste client details into free tools and each person works differently. The owner worries, with reason.'],
  ['Output quality varies', 'One negotiator’s listing reads well and another’s does not. Nobody has agreed what “checked” means.'],
  ['Training that does not stick', 'A one-off talk about AI changes little. People need to practise on their own work.'],
  ['New starters take too long', 'Knowledge sits in people’s heads. Procedures exist but nobody reads them.'],
];

const receive = [
  'A practice plan built around your own workflows',
  'Reusable briefs and checklists (workflow cards) your staff keep',
  'Clear, written rules on what may be pasted and what stays with people',
  'Guided practice on real examples, with checks against source',
  'Optional live or remote sessions',
  'A short review of what changed',
];

export default function BusinessPage() {
  return (
    <>
      <section className="page-hero page-hero--wide reg-brief">
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">Fieldwork for Business</p>
            <h1>Your team, practising on <em>your own work.</em></h1>
            <p className="lede">Practical AI training for employees, built around the tasks they already do. We start with real estate, and keep a clear line between what a tool drafts and what a person decides.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
              <ButtonLink href="/contact?topic=business" track="business_cta_clicked" trackLabel="business-hero">Request a demonstration</ButtonLink>
              <ButtonLink href="/business/real-estate" variant="secondary" track="business_cta_clicked" trackLabel="business-real-estate">Real estate teams</ButtonLink>
            </div>
          </div>
          <Plate photo="work-team-table" ratio="4 / 3" priority label={<><b>Plate 01. Practice session</b>Stock photograph, illustrative.</>} />
        </div>
      </section>

      <section className="section section--stone reg-brief" aria-labelledby="prob-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">The problems</p><h2 id="prob-title">What we are asked to fix.</h2><p>These are the problems we expect to hear from owners and operations managers. We will check them with you in a first conversation, not assume them.</p></div>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {problems.map(([t, d], i) => <li key={t} className="reveal"><span className="bn" style={{ fontSize: '1.9rem' }}>0{i + 1}</span><h3>{t}</h3><p>{d}</p><span /></li>)}
          </ol>
        </div>
      </section>

      <section className="section reg-brief" aria-labelledby="approach-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">The approach</p><h2 id="approach-title">Task-based practice, mostly self-serve.</h2>
            <p>Staff practise the same four moves on their own work: brief, run, check, keep. Most of it is reusable material they can do in short sessions. A live or remote session is optional.</p></div>
          <div className="flow">
            <div className="flow__item"><p className="index">01</p><h3>Discover</h3><p>A short conversation about your workflows, tools and constraints.</p></div>
            <div className="flow__item"><p className="index">02</p><h3>Set up</h3><p>Pick one or two workflows. Agree the rules, the house brief and the checks.</p></div>
            <div className="flow__item"><p className="index">03</p><h3>Practise</h3><p>Staff work through guided tasks using your own examples, with a person checking.</p></div>
            <div className="flow__item"><p className="index">04</p><h3>Review</h3><p>Look at what changed and what to do next. Keep or drop.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--char reg-brief" aria-labelledby="get-title">
        <div className="container split">
          <div>
            <p className="eyebrow">What a business receives</p>
            <h2 id="get-title">Material your team keeps using.</h2>
            <ul className="ticks">{receive.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div className="safety">
            <h3>What we will not claim</h3>
            <p>We do not guarantee productivity gains, compliance outcomes or cost savings. We do not suggest AI should value a property, give legal advice or approve a transaction. Results depend on how a team uses what it learns, and we will help you measure them rather than promise them.</p>
          </div>
        </div>
      </section>

      <section className="section reg-brief" aria-labelledby="formats-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">How it can be delivered</p><h2 id="formats-title">Three sizes of engagement.</h2><p>Each is scoped and priced after a conversation. See <TextLink href="/pricing">pricing and availability</TextLink>.</p></div>
          <div className="ruled-grid ruled-grid--3">
            <div className="card" style={{ border: 0, background: 'transparent' }}><Chip tone="neutral">Start here</Chip><h3>Practice session</h3><p>One workflow, a small team, reusable workflow cards. Live or remote.</p></div>
            <div className="card" style={{ border: 0, background: 'transparent' }}><Chip tone="neutral">Most tailored</Chip><h3>Tailored enablement</h3><p>A few weeks of guided practice on two or three of your own workflows, with a review.</p></div>
            <div className="card" style={{ border: 0, background: 'transparent' }}><Chip tone="neutral">Wider rollout</Chip><h3>Implementation support</h3><p>Several teams or branches, written rules, owners and simple measures.</p></div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Practice in context">
        <div className="container">
          <div className="photo-band">
            <Plate photo="work-whiteboard" ratio="4 / 3" label={<><b>Plate 02. Planning</b>Pick the workflow</>} />
            <Plate photo="work-meeting-room" ratio="4 / 3" label={<><b>Plate 03. Rules</b>Agree what stays with people</>} />
            <Plate photo="work-desk-pair" ratio="4 / 3" label={<><b>Plate 04. Practice</b>On real examples</>} />
          </div>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="platform-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Training now, platform later</p>
            <h2 id="platform-title">Training is the service today. The onboarding platform is a plan.</h2>
          </div>
          <div>
            <p>What exists now is training and practice material, delivered by Fieldwork. We are also planning an onboarding and knowledge platform: checklists, role-based learning paths and an assistant grounded in your own approved information.</p>
            <p><strong>That platform does not exist yet, and it is not for sale.</strong> We are talking to businesses about whether and how it should be built. If that interests you, <TextLink href="/pricing">leave your email on the pricing page</TextLink>.</p>
          </div>
        </div>
      </section>

      <section className="section section--indigo reg-brief" aria-labelledby="cta-title">
        <div className="container split">
          <div><p className="eyebrow">Next step</p><h2 id="cta-title">See it on your own workflows.</h2><p className="lede">Request a short demonstration, or start with the free assessment to see where practice would help most.</p></div>
          <div className="btn-row">
            <ButtonLink href="/contact?topic=business" variant="light" track="business_cta_clicked" trackLabel="business-cta">Request a demonstration</ButtonLink>
            <ButtonLink href="/business/assessment" variant="outline-light" track="business_cta_clicked" trackLabel="business-assessment">Take the assessment</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
