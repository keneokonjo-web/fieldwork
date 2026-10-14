import Link from 'next/link';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { articles } from '@/content/field-notes';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Field Notes: practical AI guides',
  description: 'Short, practical guides to using AI on real work: briefing, checking, safety and real estate workflows. Each note says how it was made.',
  path: '/field-notes',
});

const noteImage: Record<string, string> = {
  'five-part-brief': 'work-whiteboard', 'check-ai-answers': 'work-pair-laptop',
  'property-ai-tasks': 'home-keys-model', 'what-not-to-paste': 'work-desk-pair',
};

export default function FieldNotesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Field Notes</p>
          <h1>Short, practical <em>guides.</em></h1>
          <p className="lede">Each note has a clear reader, a practical result and a statement of how it was made. We do not publish a note for the sake of publishing.</p>
        </div>
      </section>
      <section className="section section--stone">
        <div className="container">
          <div className="grid grid--2">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 2) * 70}>
                <Link href={`/field-notes/${a.slug}`} className="card card--link note-card">
                  {noteImage[a.slug] && <Plate photo={noteImage[a.slug]} ratio="16 / 9" framed={false} sizes="(min-width: 48rem) 40vw, 100vw" />}
                  <p className="index">{a.category} · {a.readingMinutes} min read</p>
                  <h2 style={{ fontSize: 'var(--step-2)' }}>{a.title}</h2>
                  <p className="muted">{a.description}</p>
                  <p className="small"><strong>For:</strong> {a.audience}</p>
                  <span className="card__foot link-arrow">Read the note</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 'var(--s-7)' }}>
            <p><strong>How Field Notes are made.</strong> Notes explain methods. Where we compare tools or report results, we will say exactly what was tested, when and by whom. If a note is an explanation rather than a test, it says so at the top.</p>
          </div>
        </div>
      </section>
    </>
  );
}
