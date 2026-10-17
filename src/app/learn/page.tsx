import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { FREE_EXPERIENCE_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Learn: the free exercise and what is planned',
  description: 'Start with the free first-workflow exercise. See what is planned and what is not yet available.',
  path: '/learn',
});

const format = [
  { n: '01', t: 'Exercise', d: 'One task, about 15 minutes. Available.' },
  { n: '02', t: 'Guided project', d: 'A real output, brief to finished. Planned.' },
  { n: '03', t: 'Workflow library', d: 'Tested, dated workflow cards. Planned.' },
  { n: '04', t: 'Membership', d: 'Everything, kept current. Under consideration.' },
];

export default function LearnPage() {
  return (
    <>
      <section className="page-hero corners">
        <Corners n="06" letters={['L', 'E', 'A']} />
        <Image className="page-hero__dots" src="/art/terrain-6-circle-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">Learn</p>
          <h1>Start with one exercise.</h1>
          <p className="lede">One is ready. The rest are planned, and labelled that way.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cells cells--2">
            <div>
              <Chip tone="available">Available now</Chip>
              <h2 style={{ fontSize: 'var(--step-3)', marginTop: 'var(--s-3)' }}>First workflow</h2>
              <p>Turn a messy task into a workflow you can reuse.</p>
              <ul className="ticks"><li>About 15 minutes</li><li>No account. Entries stay on your device.</li><li>Works with free AI tools</li></ul>
              <ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="learn-hub">Start the exercise</ButtonLink>
            </div>
            <div>
              <Chip tone="planned">Planned, not yet available</Chip>
              <h2 style={{ fontSize: 'var(--step-3)', marginTop: 'var(--s-3)' }}>Guided projects</h2>
              <p>Longer practice that ends with something finished. Published only when complete and checked.</p>
              <ButtonLink href="/pricing" variant="secondary">Status and test prices</ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Four layers, built in order</p>
          <div className="flow">
            {format.map((f) => <div className="flow__item" key={f.n}><p className="index">{f.n}</p><h3>{f.t}</h3><p>{f.d}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
