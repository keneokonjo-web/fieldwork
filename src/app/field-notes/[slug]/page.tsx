import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/ui/ArticleBody';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { FREE_EXPERIENCE_PATH } from '@/config/site';
import { articles, getArticle } from '@/content/field-notes';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.description, path: `/field-notes/${a.slug}`, type: 'article' });
}

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const related = (a.related ?? []).map((s) => getArticle(s)).filter(Boolean);
  return (
    <article>
      <header className="article-head">
        <div className="container container--narrow">
          <p className="eyebrow"><Link href="/field-notes" style={{ textDecoration: 'none' }}>Field Notes</Link> / {a.category}</p>
          <h1 style={{ fontSize: 'var(--step-4)' }}>{a.title}</h1>
          <p className="lede">{a.description}</p>
          <div className="article-meta">
            <span>Published {fmt(a.published)}</span>
            <span>{a.readingMinutes} minute read</span>
            <span>For: {a.audience}</span>
          </div>
          <aside className="callout"><p><strong>How this note was made.</strong> {a.basis}</p></aside>
        </div>
      </header>
      <div className="container container--narrow" style={{ paddingBottom: 'var(--s-8)' }}>
        <ArticleBody blocks={a.blocks} />
        <div className="card" style={{ marginTop: 'var(--s-8)' }}>
          <h2 style={{ fontSize: 'var(--step-2)' }}>Practise it</h2>
          <p>The free exercise takes this method and applies it to a task of your choice. About 15 minutes, no account.</p>
          <div className="btn-row"><ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="article">Try the free exercise</ButtonLink></div>
        </div>
        {related.length > 0 && (
          <nav aria-label="Related notes" style={{ marginTop: 'var(--s-7)' }}>
            <h2 style={{ fontSize: 'var(--step-1)' }}>Related notes</h2>
            <ul className="ticks">{related.map((r) => r && <li key={r.slug}><Link href={`/field-notes/${r.slug}`}>{r.title}</Link></li>)}</ul>
          </nav>
        )}
      </div>
    </article>
  );
}
