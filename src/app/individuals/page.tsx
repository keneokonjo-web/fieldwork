import Image from 'next/image';
import { LeadForm } from '@/components/forms/LeadForm';
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { FREE_EXPERIENCE_PATH, siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Fieldwork for Individuals: learn AI through real tasks',
  description: 'Practise AI on your own work or study. A free guided exercise, then workflows you keep. For students, professionals and independent workers in the UK and Nigeria.',
  path: '/individuals',
});

const outcomes = [
  ['Get everyday work done', 'Updates, replies, summaries and notes, ready to send.'],
  ['Learn tools by using them', 'On a task you care about, not a feature tour.'],
  ['Check what you get', 'Catch invented facts and wrong numbers.'],
  ['Keep what works', 'Reuse the brief and checks next time.'],
];
const tasks = [
  { t: 'Weekly update from scattered notes', s: 'available' as const },
  { t: 'Reply to an upset customer', s: 'available' as const },
  { t: 'Turn a reading into study notes', s: 'available' as const },
  { t: 'Draft a listing from verified facts', s: 'available' as const },
  { t: 'One-page business plan to test', s: 'planned' as const },
  { t: 'Outline to document or short deck', s: 'planned' as const },
  { t: 'Simple one-page website from a brief', s: 'planned' as const },
];

export default function IndividualsPage() {
  return (
    <>
      <section className="page-hero corners">
        <Corners n="02" letters={['I', 'N', 'D']} />
        <Image className="page-hero__dots" src="/art/terrain-4-fade-right-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">Individuals</p>
          <h1>Bring one task. Leave with a workflow.</h1>
          <p className="lede">For students, early-career professionals, independent workers and founders.</p>
          <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
            <ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="individuals-hero">Try the free exercise</ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">See what is planned</ButtonLink>
          </div>
          <p className="hero__note">Free · about 15 minutes · no account · works with free AI tools</p>
        </div>
      </section>

      <section className="section" aria-labelledby="outcomes-title">
        <div className="container">
          <p className="eyebrow">What it is for</p>
          <h2 id="outcomes-title" className="visually-hidden">What it is for</h2>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {outcomes.map(([t, d], i) => (
              <li key={t} className="reveal"><span className="bn" style={{ fontSize: '1.9rem' }}>0{i + 1}</span><h3>{t}</h3><p>{d}</p><span /></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="tasks-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Tasks</p>
            <h2 id="tasks-title">Real jobs, honestly labelled.</h2>
            <Plate photo="work-hands-writing" ratio="4 / 3" label={<><b>(01)</b>Stock photograph, illustrative</>} />
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: 'var(--rule)' }}>
            {tasks.map((t) => (
              <li key={t.t} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--s-4)', alignItems: 'center', padding: 'var(--s-3) 0', borderBottom: 'var(--rule-soft)', margin: 0 }}>
                <span style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>{t.t}</span><Chip tone={t.s}>{t.s === 'available' ? 'Available' : 'Planned'}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <p className="eyebrow">How an exercise works</p>
          <h2 id="how-title" className="visually-hidden">Brief, run, check, keep</h2>
          <ol className="steps" style={{ maxWidth: '40rem' }}>
            <li><h3>Brief</h3><p>Describe the task in five parts. The page builds the prompt as you type.</p></li>
            <li><h3>Run</h3><p>Paste it into the AI tool you already use.</p></li>
            <li><h3>Check</h3><p>Six checks against your own material, and a ready follow-up if one fails.</p></li>
            <li><h3>Keep</h3><p>Save a workflow card. Download it, print it, reuse it.</p></li>
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="diff-title">
        <div className="container">
          <p className="eyebrow">The difference</p>
          <h2 id="diff-title" className="visually-hidden">Passive lessons compared with guided practice</h2>
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Comparison table, scrolls sideways on small screens">
            <table className="table">
              <caption className="visually-hidden">Passive lessons compared with guided practice</caption>
              <thead><tr><th scope="col"></th><th scope="col">Passive lessons</th><th scope="col">Fieldwork</th></tr></thead>
              <tbody>
                <tr><th scope="row">Starts with</th><td>A tool and its features</td><td>A task you actually have</td></tr>
                <tr><th scope="row">You spend time</th><td>Watching or reading</td><td>Briefing, running, checking</td></tr>
                <tr><th scope="row">Ends with</th><td>A certificate</td><td>A result and a reusable workflow</td></tr>
                <tr><th scope="row">Needs</th><td>Often a paid tool</td><td>Any tool, including free ones</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="join-title">
        <div className="container split">
          <div><p className="eyebrow">Early access</p><h2 id="join-title">Hear when guided projects are ready.</h2><p className="lede">One email when something real exists. Guided projects and a membership are planned, not on sale. <TextLink href="/pricing">Status and test prices</TextLink></p></div>
          <div className="form-card">
            <LeadForm type="newsletter" variant="email" submitLabel="Join early access" interest="early-access-individuals" location="individuals"
              successTitle="You are on the list" successBody="Thank you. We will email you when guided projects are ready." fallbackEmail={siteConfig.email.general} />
          </div>
        </div>
      </section>
    </>
  );
}
