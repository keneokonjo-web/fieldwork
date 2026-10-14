import Link from 'next/link';
import { LeadForm } from '@/components/forms/LeadForm';
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { FREE_EXPERIENCE_PATH, siteConfig } from '@/config/site';
import { articles } from '@/content/field-notes';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Fieldwork: practise AI on real work',
  description: 'Learn AI by doing the work you already have. Try a free guided exercise, then keep a workflow you can reuse. Practical AI training for real estate teams.',
  path: '/',
});

const useCases = [
  { n: '01', title: 'Get everyday work done faster', text: 'Updates, replies, summaries and notes, from rough material to something you can send.', status: 'available' as const, link: 'In the free exercise' },
  { n: '02', title: 'Learn a tool by using it', text: 'A task, a method and a check, instead of a tour of features.', status: 'available' as const, link: 'In the free exercise' },
  { n: '03', title: 'Research and shape a business idea', text: 'Structure what you know, find gaps, draft a one-page plan you can test.', status: 'planned' as const, link: 'Planned guided project' },
  { n: '04', title: 'Make documents and presentations', text: 'Turn an outline into a clean document or deck, then edit it properly.', status: 'planned' as const, link: 'Planned guided project' },
  { n: '05', title: 'Build a simple website or asset', text: 'From brief to first version, with the checks that stop it embarrassing you.', status: 'planned' as const, link: 'Planned guided project' },
  { n: '06', title: 'Choose the right tool for the job', text: 'Compare tools on one specific task, with clear notes on what was really tested.', status: 'planned' as const, link: 'Planned Field Notes series' },
];

export default function HomePage() {
  const notes = articles.slice(0, 3);
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">Practical AI learning</p>
            <h1 id="hero-title">Practise AI on <em>real work.</em></h1>
            <p className="lede">Fieldwork gives you a real task, a method, and a way to check the result. Start with a free guided exercise. No account needed.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
              <ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="hero-primary">Try the free exercise</ButtonLink>
              <ButtonLink href="/business" variant="secondary" track="business_cta_clicked" trackLabel="hero-business">Training for businesses</ButtonLink>
            </div>
            <div className="hero-meta">
              <span>About 15 minutes</span>
              <span>Works with free AI tools</span>
              <span>Light on data</span>
            </div>
          </div>
          <div className="hero-art">
            <Plate className="plate--main" photo="work-hands-laptop" ratio="4 / 3" priority sizes="(min-width: 62rem) 46vw, 100vw" labelFloat
              label={<><b>Plate 01. The brief</b>Notes in, draft out. Stock photograph, illustrative.</>} />
            <Plate className="plate--inset" art="contour-8" tone="indigo" ratio="4 / 5" sizes="30vw" framed />
          </div>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="routes-title">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">Two ways in</p>
            <h2 id="routes-title">Learning for yourself, or <em>for your team.</em></h2>
          </div>
          <div className="route-grid">
            <Reveal className="route">
              <Plate photo="work-hands-writing" ratio="4 / 3" label={<><b>Individuals</b>Filed under: practise</>} />
              <p className="index">Fieldwork for Individuals</p>
              <h3>Bring one task. Leave with a workflow.</h3>
              <p>Practise on your own work or study. Start with the free exercise. Guided projects and a membership are planned and clearly marked as such.</p>
              <div className="btn-row">
                <ButtonLink href="/individuals" variant="secondary" small track="consumer_cta_clicked" trackLabel="route-individuals">See how it works</ButtonLink>
              </div>
            </Reveal>
            <Reveal className="route route--biz" delay={80}>
              <Plate photo="prop-exterior-timber-dusk" ratio="4 / 3" label={<><b>Business</b>Filed under: real estate first</>} />
              <p className="index">Fieldwork for Business · real estate first</p>
              <h3>Your team, practising on your own work.</h3>
              <p>Practical AI training for estate and letting agencies: listings, enquiries, reports and procedures. AI drafts. People decide.</p>
              <div className="btn-row">
                <ButtonLink href="/business/real-estate" variant="secondary" small track="business_cta_clicked" trackLabel="route-real-estate">Real estate teams</ButtonLink>
                <TextLink href="/business">How it works</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--indigo reg-brief" aria-labelledby="principle-title">
        <div className="container">
          <h2 id="principle-title" className="statement reveal" style={{ fontFamily: 'var(--font-wordmark)', fontWeight: 700, letterSpacing: '-0.06em', lineHeight: 0.92 }}>Most AI advice stops at what a tool can do. We start with what <em style={{ fontStyle: 'normal' }}>you need done.</em></h2>
          <div className="principles">
            <Reveal className="principle"><span className="bn">01</span><h3>A real task</h3><p>Every exercise begins with a job someone actually has, not a demo.</p></Reveal>
            <Reveal className="principle" delay={80}><span className="bn">02</span><h3>A checked result</h3><p>You learn how to test what comes back, because fluent is not the same as correct.</p></Reveal>
            <Reveal className="principle" delay={160}><span className="bn">03</span><h3>A workflow to keep</h3><p>You finish with a brief and checks you can reuse, which is the part that saves time later.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="preview-title">
        <div className="container split">
          <div className="reveal">
            <p className="eyebrow">The free exercise</p>
            <h2 id="preview-title">Turn a messy task into a workflow you can <em>reuse.</em></h2>
            <p className="lede">Pick a task, write a five-part brief, run it in whichever AI tool you already use, then check the result properly. It ends with a workflow card you can download.</p>
            <ul className="ticks" style={{ marginTop: 'var(--s-5)' }}>
              <li>Starter tasks for work, small business, study and property</li>
              <li>Copyable prompts and follow-up fixes</li>
              <li>A finished example with the mistakes caught</li>
              <li>Your entries stay on your device</li>
            </ul>
            <div className="btn-row"><ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="preview-start">Start the exercise</ButtonLink><TextLink href="/learn">What else is planned</TextLink></div>
          </div>
          <Reveal>
            <div className="mock" role="img" aria-label="A preview of the exercise: a five-part brief on the left, and the prompt it builds.">
              <div className="mock__bar"><i /><i /><i /><b>Step 3 · Write the brief</b></div>
              <div className="mock__body" aria-hidden="true">
                <div className="mock__field"><small>The task</small>Write a short weekly update for my manager.</div>
                <div className="mock__field"><small>Shape of the answer</small>Done, In progress, Needs a decision. Under 150 words.</div>
                <div className="mock__field"><small>Rules</small>Keep dates exactly as written. Do not add filler.</div>
                <pre>{`Task: Write a short weekly update…\nRules:\n- Use only the material I give you.\n- If something is missing, write\n  [needs checking].\n…`}</pre>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="uses-title">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">What you can practise</p>
            <h2 id="uses-title">Recognisable jobs, <em>labelled honestly.</em></h2>
            <p>Fieldwork is new. One exercise is available today. The others are planned and marked as planned.</p>
          </div>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {useCases.map((u) => (
              <li key={u.n} className="reveal">
                <span className="bn" style={{ fontSize: '1.9rem' }}>{u.n}</span>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
                <span><Chip tone={u.status}>{u.status === 'available' ? 'Available now' : 'Planned'}</Chip></span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="example-title">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">What you leave with</p>
            <h2 id="example-title">From scattered notes to something you can <em>send.</em></h2>
            <p>An illustration written by Fieldwork, not a live tool output. The checking step caught two errors before this went to a manager.</p>
          </div>
          <Reveal className="ppr">
            <div><h3>Problem</h3><pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, fontSize: '0.95rem' }}>{`Mon: call with Dan. Supplier delay, new date 21st (was 14th).\nTue: finished draft onboarding checklist, needs Sam to review.\nWed: Hartley invoice. They say £480 not £840. We typed it wrong. Credit note still to be issued.\nOpen: website photos, chase Jo.`}</pre></div>
            <div><h3>Practice</h3><p>A five-part brief. One run in a free AI tool. Then a check against the notes, which caught the swapped invoice figure and a changed delivery date.</p></div>
            <div><h3>Result</h3><pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, fontSize: '0.95rem' }}>{`Done\n- Draft onboarding checklist finished. Needs Sam to review.\n- Hartley invoice error found: £840 typed instead of £480.\n\nIn progress\n- Credit note for Hartley still to be issued.\n- Supplier delivery slipped a week, from the 14th to the 21st.\n- Website photos not arrived. Chasing Jo.`}</pre></div>
          </Reveal>
        </div>
      </section>

      <section className="section section--char reg-brief" aria-labelledby="biz-title">
        <div className="container split">
          <div className="reveal">
            <p className="eyebrow">For real estate teams</p>
            <h2 id="biz-title">Better listings, faster replies, clearer procedures. <em>People still in charge.</em></h2>
            <p className="lede">We teach your staff to use AI on the work they already do, with clear rules about what to hand to a tool and what to leave to people. Delivered mostly as reusable material, with an optional live session.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href="/business/real-estate" variant="light" track="business_cta_clicked" trackLabel="home-band-real-estate">See the real estate approach</ButtonLink>
              <ButtonLink href="/business/assessment" variant="outline-light" track="business_cta_clicked" trackLabel="home-band-assessment">Take the workflow assessment</ButtonLink>
            </div>
          </div>
          <Reveal className="stack">
            <Plate photo="prop-modernist" ratio="3 / 2" label={<><b>Plate 07. Listing copy</b>From verified facts, checked by a person.</>} />
            <div className="safety">
              <h3>AI drafts. People decide.</h3>
              <p>We never suggest AI should value a property, give legal advice or approve a transaction. Practice focuses on drafting, tidying and organising from verified facts, with a human check before anything goes out.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="notes-title">
        <div className="container">
          <div className="section__head reveal">
            <p className="eyebrow">Field Notes</p>
            <h2 id="notes-title">Short, practical <em>guides.</em></h2>
            <p>Each note has a clear reader, a practical result and a statement of how it was made.</p>
          </div>
          <div className="grid grid--3">
            {notes.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <Link href={`/field-notes/${a.slug}`} className="card card--link note-card">
                  <p className="index">{a.category} · {a.readingMinutes} min</p>
                  <h3>{a.title}</h3>
                  <p className="muted">{a.description}</p>
                  <span className="card__foot link-arrow">Read</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 'var(--s-6)' }}><TextLink href="/field-notes">All Field Notes</TextLink></p>
        </div>
      </section>

      <section className="section section--indigo cta-band" aria-labelledby="final-title">
        <div className="container cta-split">
          <div className="reveal">
            <p className="eyebrow">Start with one task</p>
            <h2 id="final-title" style={{ fontFamily: 'var(--font-wordmark)', fontWeight: 700, letterSpacing: '-0.07em' }}>Bring one task.</h2>
            <p className="lede">Fifteen minutes, a tool you already have, and something finished at the end.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href={FREE_EXPERIENCE_PATH} variant="light" track="consumer_cta_clicked" trackLabel="final-cta">Try the free exercise</ButtonLink>
              <ButtonLink href="/contact?topic=business" variant="outline-light" track="business_cta_clicked" trackLabel="final-business">Talk to us about your team</ButtonLink>
            </div>
          </div>
          <Reveal className="form-card">
            <h3>New exercises, by email</h3>
            <p className="muted">Optional. We will tell you when new exercises and guided projects are ready. Nothing else.</p>
            <LeadForm type="newsletter" variant="email" submitLabel="Join the list" interest="home-footer" location="home-final"
              successTitle="You are on the list" successBody="Thank you. We will email you when the next exercise is ready. You can unsubscribe at any time." fallbackEmail={siteConfig.email.general} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
