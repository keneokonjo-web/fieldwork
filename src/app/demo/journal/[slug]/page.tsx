import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS } from '@/demo/data';
import { DemoPhoto } from '@/demo/photo';

export function generateStaticParams() { return POSTS.map((p) => ({ slug: p.slug })); }
export const dynamicParams = false;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <article>
      <div className="d-pagehead"><div className="d-wrap d-article"><span className="d-eyebrow"><Link href="/demo/journal">Journal</Link> / {p.category}</span><h1 style={{ fontSize: 'clamp(2rem, 1.3rem + 3vw, 3.8rem)' }}>{p.title}</h1><p className="d-note">{new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div></div>
      <div className="d-wrap" style={{ maxWidth: '56rem' }}><DemoPhoto src={p.image} ratio="16 / 9" priority alt="" /></div>
      <div className="d-wrap d-article" style={{ padding: '3rem 0 5rem' }}>
        {p.body.map((t, i) => <p key={i}>{t}</p>)}
        <p style={{ marginTop: '3rem' }}><Link href="/demo/journal" className="d-link">← All articles</Link></p>
      </div>
    </article>
  );
}
