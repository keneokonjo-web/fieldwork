import Image from 'next/image';
import Link from 'next/link';
import { Corners } from '@/components/ui/Corners';
import { notes } from '@/content/about/notes';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About',
  description: 'Fieldwork builds websites, workflows and training for property businesses. How we work, what you own, and where we operate.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <section className="page-hero corners">
        <Corners n="05" letters={['A', 'B', 'T']} />
        <Image className="page-hero__dots" src="/art/terrain-21-fade-right-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>About Fieldwork.</h1>
          <p className="lede">Practical technology for property businesses. How we work, what you own, and where we operate.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="lookback">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '1rem', padding: '0.6rem 0', borderBottom: 'var(--rule-soft)' }} className="index"><span>2026 · About Fieldwork</span><span>{notes.length} notes</span></div>
            {notes.map((n, i) => (
              <Link key={n.slug} href={`/about/${n.slug}`}>
                <span>{n.category}</span><b>{n.title}</b><span>{n.readingMinutes} min</span><span>No. 0{i + 1}</span>
              </Link>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 'var(--s-7)' }}>
            <p><strong>Where we are.</strong> Fieldwork is new. There is no client list, case study or testimonial to show, and we will not make any up. Open the demo to see what each product does.</p>
          </div>
        </div>
      </section>
    </>
  );
}
