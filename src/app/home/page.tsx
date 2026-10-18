import Image from 'next/image';
import Link from 'next/link';
import { LeadForm } from '@/components/forms/LeadForm';
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { FREE_EXPERIENCE_PATH, siteConfig } from '@/config/site';
import { articles } from '@/content/field-notes';
import { STARTER_TASKS } from '@/content/learn/first-workflow';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Fieldwork: practise AI on real work',
  description: 'Learn AI by doing the work you already have. A free guided exercise, then practical AI training for real estate teams.',
  path: '/home',
});

const mins = ['15 min', '10 min', '10 min'];

export default function HomePage() {
  const tasks = STARTER_TASKS.slice(0, 3);
  return (
    <>
      <section className="hero corners" aria-labelledby="hero-title">
        <Corners n="01" />
        <Image className="hero__dots" src="/art/terrain-6-circle-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" priority />
        <div className="container">
          <div className="hero__mid">
            <h1 id="hero-title">Learn AI by doing the work you already have.</h1>
            <div className="hero__side">
              <p>A real task, a method, and a way to check the result. Free. No account.</p>
              <TextLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="hero-primary">Start exercise (01)</TextLink>
            </div>
          </div>
          <div className="hero__index">
            <div className="idx">
              {tasks.map((t, i) => (
                <Link key={t.id} href={FREE_EXPERIENCE_PATH} data-track="consumer_cta_clicked" data-track-label={`hero-task-${i + 1}`}>
                  <span>(0{i + 1})</span><b>{t.title}</b><span>{mins[i]}</span><span className="visually-hidden-sm">Any AI tool</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero__big" src="/brand/logo/fieldwork-wordmark-light.svg" alt="" width={607} height={138} aria-hidden="true" />
      </section>

      <section className="section" aria-labelledby="what-title">
        <div className="container">
          <h2 id="what-title" className="visually-hidden">What Fieldwork does</h2>
          <div className="ppr">
            <div className="r reveal"><h3 className="k">(01) Problem</h3><p>Most AI advice starts with the tool.</p></div>
            <div className="r reveal"><h3 className="k">(02) Practice</h3><p>We start with a task you have. Brief, run, check, keep.</p></div>
            <div className="r reveal"><h3 className="k">(03) Result</h3><p className="res-line">A workflow you keep, and a result you checked.</p></div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ways-title">
        <div className="container">
          <p className="eyebrow">Two ways in</p>
          <h2 id="ways-title" className="visually-hidden">Two ways in</h2>
          <div className="ways">
            <Link href="/individuals" data-track="consumer_cta_clicked" data-track-label="route-individuals">
              <Plate photo="work-hands-writing" ratio="3 / 2" framed={false} />
              <span className="index">Individuals</span>
              <h3>Bring one task. Leave with a workflow.</h3>
              <p>Free exercise now. Guided projects planned.</p>
            </Link>
            <Link href="/business" data-track="business_cta_clicked" data-track-label="route-business">
              <Plate photo="prop-exterior-timber-dusk" ratio="3 / 2" framed={false} />
              <span className="index">Business · real estate first</span>
              <h3>Your team, practising on your own work.</h3>
              <p>Listings, enquiries, reports, procedures.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="preview-title">
        <div className="container split">
          <div className="reveal">
            <p className="eyebrow">Free exercise</p>
            <h2 id="preview-title">Brief the tool like a new colleague.</h2>
            <p className="lede">Fifteen minutes. Any AI tool. Ends with a workflow card.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="preview-start">Start the exercise</ButtonLink>
              <TextLink href="/learn">What else is planned</TextLink>
            </div>
          </div>
          <Reveal>
            <div className="sheet" role="img" aria-label="A preview of the exercise: task, shape of the answer, rules and a checked result.">
              <div className="hd"><span>Exercise (01) · Step 3 of 6</span><span>15 min</span></div>
              <div className="bd" aria-hidden="true">
                <div className="kv"><b>Task</b><span>Write a short weekly update for my manager.</span></div>
                <div className="kv"><b>Shape</b><span>Done / In progress / Needs a decision. Under 150 words.</span></div>
                <div className="kv"><b>Rules</b><span>Keep dates exactly as written. Do not add filler.</span></div>
                <div className="kv res"><b>Checked</b><span>Credit note still to be issued. Supplier slipped from the 14th to the 21st.</span></div>
                <div style={{ marginTop: 'var(--s-4)' }}><div className="pbar"><i className="f" /><i className="f" /><i className="f" /><i /><i /><i /></div></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="biz-title">
        <div className="container">
          <p className="eyebrow">For real estate teams</p>
          <h2 id="biz-title" style={{ maxWidth: '14ch' }}>AI drafts. <em style={{ color: 'var(--cobalt-light)' }}>People decide.</em></h2>
          <div className="three reveal" style={{ marginTop: 'var(--s-6)' }}>
            <div><b>(01) Problem</b>Listings differ across the office. Client details leak into free tools.</div>
            <div><b>(02) Practice</b>Brief from verified facts. Run. Check every claim against the sheet.</div>
            <div><b>(03) Result</b>One house brief and one checklist, kept as a workflow card.</div>
          </div>
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <ButtonLink href="/business" variant="light" track="business_cta_clicked" trackLabel="home-band-real-estate">Real estate teams</ButtonLink>
            <ButtonLink href="/business/assessment" variant="outline-light" track="business_cta_clicked" trackLabel="home-band-assessment">Free workflow assessment</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="notes-title">
        <div className="container">
          <p className="eyebrow">Field Notes</p>
          <h2 id="notes-title" className="visually-hidden">Field Notes</h2>
          <div className="lookback">
            {articles.slice(0, 4).map((a, i) => (
              <Link key={a.slug} href={`/field-notes/${a.slug}`}>
                <span>{a.category}</span><b>{a.title}</b><span>{a.readingMinutes} min</span><span>No. 0{i + 1}</span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 'var(--s-5)' }}><TextLink href="/field-notes">All Field Notes</TextLink></p>
        </div>
      </section>

      <section className="section section--cobalt cta-band" aria-labelledby="final-title">
        <div className="container cta-split">
          <div className="reveal">
            <p className="eyebrow">Start</p>
            <h2 id="final-title">Bring one task.</h2>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href={FREE_EXPERIENCE_PATH} variant="light" track="consumer_cta_clicked" trackLabel="final-cta">Try the free exercise</ButtonLink>
              <ButtonLink href="/contact?topic=business" variant="outline-light" track="business_cta_clicked" trackLabel="final-business">Talk to us about your team</ButtonLink>
            </div>
          </div>
          <Reveal className="form-card">
            <h3>New exercises, by email</h3>
            <p className="muted">Optional. Only when something new is ready.</p>
            <LeadForm type="newsletter" variant="email" submitLabel="Join the list" interest="home-footer" location="home-final"
              successTitle="You are on the list" successBody="Thank you. We will email you when the next exercise is ready. You can unsubscribe at any time." fallbackEmail={siteConfig.email.general} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
