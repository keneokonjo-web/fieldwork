import Link from 'next/link';
import { DEVELOPMENTS } from '@/demo/data';
import { DemoPhoto } from '@/demo/photo';

export const metadata = { title: 'New homes' };

export default function NewHomesPage() {
  return (
    <>
      <div className="d-pagehead"><div className="d-wrap"><span className="d-eyebrow">New homes</span><h1>New developments.</h1><p className="d-lede">Every home in a development, with its availability, price and plan in one place.</p></div></div>
      <section className="d-wrap" style={{ paddingBottom: '5rem' }}>
        <div className="d-grid">
          {DEVELOPMENTS.map((d) => (
            <Link key={d.slug} href={`/demo/new-homes/${d.slug}`} className="d-card">
              <DemoPhoto src={d.image} ratio="4 / 3" alt={d.name} />
              <p className="d-card__price">{d.name}</p><p className="d-card__title">{d.area}</p><p className="d-card__addr">{d.summary}</p><p className="d-card__facts">{d.completion}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
