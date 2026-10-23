import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { NoteBody } from '@/components/ui/NoteBody';
import { DEMO_PATH } from '@/config/site';
import { getNote, notes } from '@/content/about/notes';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return notes.map((n) => ({ slug: n.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) return {};
  return pageMetadata({ title: n.title, description: n.description, path: `/about/${n.slug}`, type: 'article' });
}

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) notFound();
  const related = (n.related ?? []).map((s) => getNote(s)).filter(Boolean);
  return (
    <article>
      <header className="article-head">
        <div className="container container--narrow">
          <p className="eyebrow"><Link href="/about" style={{ textDecoration: 'none' }}>About</Link> / {n.category}</p>
          <h1 style={{ fontSize: 'var(--step-4)' }}>{n.title}</h1>
          <p className="lede">{n.description}</p>
          <div className="article-meta"><span>Published {fmt(n.published)}</span><span>{n.readingMinutes} minute read</span></div>
          <aside className="callout"><p><strong>About this note.</strong> {n.basis}</p></aside>
        </div>
      </header>
      <div className="container container--narrow" style={{ paddingBottom: 'var(--s-8)' }}>
        <NoteBody blocks={n.blocks} />
        <div className="card" style={{ marginTop: 'var(--s-8)' }}>
          <h2 style={{ fontSize: 'var(--step-2)' }}>See it working</h2>
          <p>Open the demonstration and use it the way your team would.</p>
          <div className="btn-row"><ButtonLink href={DEMO_PATH} track="demo_request_clicked" trackLabel="about-note">View demo</ButtonLink></div>
        </div>
        {related.length > 0 && (
          <nav aria-label="Related notes" style={{ marginTop: 'var(--s-7)' }}>
            <h2 style={{ fontSize: 'var(--step-1)' }}>Related notes</h2>
            <ul className="ticks">{related.map((r) => r && <li key={r.slug}><Link href={`/about/${r.slug}`}>{r.title}</Link></li>)}</ul>
          </nav>
        )}
      </div>
    </article>
  );
}
