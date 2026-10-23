import Link from 'next/link';
import { POSTS } from '@/demo/data';
import { DemoPhoto } from '@/demo/photo';

export const metadata = { title: 'Journal' };

export default function JournalPage() {
  return (
    <>
      <div className="d-pagehead"><div className="d-wrap"><span className="d-eyebrow">Journal</span><h1>News and notes.</h1><p className="d-lede">Short articles on buying, selling and renting. Written and published by the team in the news page of the website.</p></div></div>
      <section className="d-wrap" style={{ paddingBottom: '5rem' }}>
        <div className="d-posts">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/demo/journal/${p.slug}`} className="d-post">
              <DemoPhoto src={p.image} ratio="3 / 2" alt="" />
              <small>{p.category} · {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</small><h3>{p.title}</h3><p>{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
