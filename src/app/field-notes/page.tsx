import Link from 'next/link';
import Image from 'next/image';
import { Corners } from '@/components/ui/Corners';
import { articles } from '@/content/field-notes';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Field Notes: practical AI guides',
  description: 'Short, practical guides to using AI on real work: briefing, checking, safety and real estate workflows. Each note says how it was made.',
  path: '/field-notes',
});

export default function FieldNotesPage() {
  return (
    <>
      <section className="page-hero corners">
        <Corners n="07" letters={['N', 'O', 'T']} />
        <Image className="page-hero__dots" src="/art/terrain-21-fade-right-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">Field Notes</p>
          <h1>Short, practical guides.</h1>
          <p className="lede">Each note names its reader and says how it was made.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="lookback">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '1rem', padding: '0.6rem 0', borderBottom: 'var(--rule-soft)' }} className="index"><span>2026 · All notes</span><span>{articles.length} notes · 0 tests · {articles.length} explainers</span></div>
            {articles.map((a, i) => (
              <Link key={a.slug} href={`/field-notes/${a.slug}`}>
                <span>{a.category}</span><b>{a.title}</b><span>{a.readingMinutes} min</span><span>No. 0{i + 1}</span>
              </Link>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 'var(--s-7)' }}>
            <p><strong>How notes are made.</strong> Notes explain methods. Where we compare tools or report results, we say what was tested, when and by whom. Otherwise the note says it is an explanation.</p>
          </div>
        </div>
      </section>
    </>
  );
}
