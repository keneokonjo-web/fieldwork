import { ButtonLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { FREE_EXPERIENCE_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Learn: the free exercise and what is planned',
  description: 'Start with the free first-workflow exercise. See how Fieldwork learning is structured and which parts are planned but not yet available.',
  path: '/learn',
});

const format = [
  { n: '01', t: 'Exercise', d: 'One task, about 15 minutes. The unit you can do today.' },
  { n: '02', t: 'Guided project', d: 'A real output from brief to finished, with checks. Planned.' },
  { n: '03', t: 'Workflow library', d: 'Reusable workflow cards, tested and dated. Planned.' },
  { n: '04', t: 'Membership', d: 'Everything above, kept up to date. Under consideration.' },
];

export default function LearnPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Learn</p>
          <h1>Start with one exercise.</h1>
          <p className="lede">Fieldwork learning is built from small, finished pieces of real work. One is ready now. The rest are planned, and labelled that way.</p>
        </div>
      </section>
      <section className="section section--deep">
        <div className="container">
          <div className="grid grid--2">
            <div className="card" style={{ boxShadow: '6px 6px 0 var(--moss)' }}>
              <Chip tone="available">Available now</Chip>
              <h2 style={{ fontSize: 'var(--step-3)' }}>First workflow</h2>
              <p>Turn a messy task into a workflow you can reuse. Write a five-part brief, run it in your own AI tool, check the result and keep a workflow card.</p>
              <ul className="ticks"><li>About 15 minutes</li><li>No account. Entries stay on your device.</li><li>Works with free AI tools</li></ul>
              <div className="card__foot"><ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="learn-hub">Start the exercise</ButtonLink></div>
            </div>
            <div className="card card--flat">
              <Chip tone="planned">Planned, not yet available</Chip>
              <h2 style={{ fontSize: 'var(--step-3)' }}>Guided projects</h2>
              <p>Longer pieces of practice that end with something finished, for example a business plan one-pager, a document pack or a simple website. We will publish each one only when it is complete and checked.</p>
              <div className="card__foot"><ButtonLink href="/pricing" variant="secondary">See status and test prices</ButtonLink></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section__head"><p className="eyebrow">How learning is structured</p><h2>Four layers, built in order.</h2><p>We are establishing the format and the quality standard first, then adding to it only when there is evidence people want more.</p></div>
          <div className="flow">
            {format.map((f) => <div className="flow__item" key={f.n}><p className="index">{f.n}</p><h3>{f.t}</h3><p>{f.d}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
