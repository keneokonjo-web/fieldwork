import { LeadForm } from '@/components/forms/LeadForm';
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { FREE_EXPERIENCE_PATH, siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Fieldwork for Individuals: learn AI through real tasks',
  description: 'Practise AI on your own work or study. Start with a free guided exercise, check results properly and keep workflows you can reuse. For students, professionals and independent workers in the UK and Nigeria.',
  path: '/individuals',
});

const outcomes = [
  ['Get everyday work done', 'Updates, replies, summaries and notes: from rough material to something you can send.'],
  ['Learn tools by using them', 'See what a tool is good for on a task you care about, not in a feature tour.'],
  ['Check what you get', 'Learn the checks that catch invented facts and wrong numbers before they cost you.'],
  ['Build a habit that lasts', 'Keep the briefs and checks that work, so the next task takes minutes.'],
];

const tasks = [
  { t: 'Summarise a week of notes into an update for your manager', s: 'available' as const },
  { t: 'Reply to an upset customer without sounding defensive', s: 'available' as const },
  { t: 'Turn a dense reading into notes you can revise from', s: 'available' as const },
  { t: 'Draft a listing description from verified property facts', s: 'available' as const },
  { t: 'Shape a rough business idea into a one-page plan to test', s: 'planned' as const },
  { t: 'Turn an outline into a clean document or short presentation', s: 'planned' as const },
  { t: 'Build a simple one-page website from a brief', s: 'planned' as const },
];

export default function IndividualsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
          <p className="eyebrow">Fieldwork for Individuals</p>
          <h1>Bring one task. Leave with a <em>workflow.</em></h1>
          <p className="lede">For students, early-career professionals, independent workers, founders and creators who want to use AI well and do not think of themselves as technical.</p>
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="individuals-hero">Try the free exercise</ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">See what is planned</ButtonLink>
          </div>
          <p className="hero__note">Free. About 15 minutes. No account. Works with the free versions of common AI tools.</p>
          </div>
          <Plate photo="work-hands-writing" ratio="4 / 3" priority label={<><b>Plate 01. One task</b>Stock photograph, illustrative.</>} />
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="outcomes-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">What it is for</p><h2 id="outcomes-title">Four practical outcomes.</h2></div>
          <div className="grid grid--4">
            {outcomes.map(([t, d], i) => <Reveal key={t} className="card" delay={i * 60}><p className="index">0{i + 1}</p><h3>{t}</h3><p>{d}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="diff-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">The difference</p><h2 id="diff-title">Passive lessons explain. Guided practice makes you do it.</h2></div>
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Comparison table, scrolls sideways on small screens">
            <table className="table">
              <caption className="visually-hidden">Passive lessons compared with guided practice</caption>
              <thead><tr><th scope="col"></th><th scope="col">Passive lessons</th><th scope="col">Fieldwork guided practice</th></tr></thead>
              <tbody>
                <tr><th scope="row">Starts with</th><td>A tool and its features</td><td>A task you actually have</td></tr>
                <tr><th scope="row">You spend your time</th><td>Watching or reading</td><td>Writing a brief, running it, checking it</td></tr>
                <tr><th scope="row">Ends with</th><td>A certificate or a feeling of progress</td><td>A finished result and a reusable workflow</td></tr>
                <tr><th scope="row">Treats errors as</th><td>Rare</td><td>Normal, and something to check for</td></tr>
                <tr><th scope="row">Needs</th><td>Often a paid tool</td><td>Any tool, including free ones</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="tasks-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Tasks you can practise</p>
            <h2 id="tasks-title">Real jobs, honestly labelled.</h2>
            <p className="lede">Four starter tasks are in the free exercise today. The rest are planned guided projects and are not yet available.</p>
          </div>
          <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tasks.map((t) => (
              <li key={t.t} className="card card--flat" style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 'var(--s-4)', alignItems: 'center', margin: 0 }}>
                <span>{t.t}</span><Chip tone={t.s}>{t.s === 'available' ? 'Available' : 'Planned'}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">How an exercise works</p><h2 id="how-title">Brief, run, check, keep.</h2></div>
          <ol className="steps" style={{ maxWidth: '44rem' }}>
            <li><h3>Brief</h3><p>Describe the task, who it is for, the tone, the shape of the answer and the rules, using a five-part structure. The page builds the prompt as you type.</p></li>
            <li><h3>Run</h3><p>Paste it into whichever AI tool you already use. Fieldwork does not run an AI model for you, and does not pretend to.</p></li>
            <li><h3>Check</h3><p>Work through six checks against your own material. If something fails, copy a ready-made follow-up prompt.</p></li>
            <li><h3>Keep</h3><p>Save a workflow card with your brief and checks. Download it, print it, reuse it.</p></li>
          </ol>
          <p><TextLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="individuals-how">Start with the first one</TextLink></p>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="paid-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">After the free exercise</p><h2 id="paid-title">What is planned.</h2>
            <p>Guided projects (one-off) and possibly a membership. Neither is on sale yet. UK prices will be in pounds and Nigerian prices in naira, set separately.</p></div>
          <div className="btn-row"><ButtonLink href="/pricing" variant="secondary">Status and test prices</ButtonLink></div>
        </div>
      </section>

      <section className="section section--indigo" aria-labelledby="join-title">
        <div className="container split">
          <div><p className="eyebrow">Early access</p><h2 id="join-title">Hear when guided projects are ready.</h2><p className="lede">One email when something real is available. No countdowns, no pressure.</p></div>
          <div className="form-card">
            <LeadForm type="newsletter" variant="email" submitLabel="Join early access" interest="early-access-individuals" location="individuals"
              successTitle="You are on the list" successBody="Thank you. We will email you when guided projects are ready." fallbackEmail={siteConfig.email.general} />
          </div>
        </div>
      </section>
    </>
  );
}
