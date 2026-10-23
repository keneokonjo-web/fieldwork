import { notFound } from 'next/navigation';
import { DevelopmentUnits } from '@/components/demo/DevelopmentUnits';
import { DEVELOPMENTS } from '@/demo/data';
import { DemoPhoto } from '@/demo/photo';

export function generateStaticParams() { return DEVELOPMENTS.map((d) => ({ slug: d.slug })); }
export const dynamicParams = false;

export default async function DevelopmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DEVELOPMENTS.find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <>
      <section className="d-hero d-hero--dev" aria-labelledby="dev-title">
        <div className="d-hero__img"><DemoPhoto src={d.image} ratio="auto" priority sizes="100vw" alt={d.name} /></div>
        <div className="d-wrap"><span className="d-eyebrow" style={{ color: '#ffd0c4' }}>New homes · {d.area}</span><h1 id="dev-title">{d.name}</h1><p className="d-hero__sub">{d.summary}</p></div>
      </section>
      <section className="d-section">
        <div className="d-wrap d-split">
          <div><span className="d-eyebrow">The development</span><h2>{d.completion}.</h2></div>
          <p className="d-lede">{d.description}</p>
        </div>
      </section>
      <section className="d-section d-section--tint" aria-labelledby="units-title">
        <div className="d-wrap">
          <div className="d-sechead"><div><span className="d-eyebrow">Availability</span><h2 id="units-title">Homes at {d.name}.</h2></div></div>
          <DevelopmentUnits slug={d.slug} />
        </div>
      </section>
    </>
  );
}
