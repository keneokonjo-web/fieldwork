import Link from 'next/link';
import { DemoReveal } from '@/components/demo/DemoReveal';
import { HomeHero, HomeIndex, QuoteImage } from '@/components/demo/HomeClient';
import { AREAS, POSTS, SEED_PROPERTIES } from '@/demo/data';
import { DemoPhoto } from '@/demo/photo';

export const metadata = { title: 'Homes worth coming home to' };

const steps = [
  ['01', 'We listen first.', 'A conversation about how you live, not a list of rooms. We write it down and hold ourselves to it.', 'home-living-gallery'],
  ['02', 'We show fewer, better homes.', 'A short list, honestly described, with full photographs and plans before you travel.', 'home-kitchen-white'],
  ['03', 'We negotiate calmly.', 'One advisor, no pressure, and clear advice on price at every step.', 'home-plants-living'],
  ['04', 'We stay until the keys.', 'Surveys, legal steps and moving day, handled with the same attention as the viewing.', 'home-keys-model'],
] as const;

export default function DemoHome() {
  const counts = AREAS.map((a) => [a, SEED_PROPERTIES.filter((p) => p.area === a && p.published).length] as const).filter(([, n]) => n > 0);
  return (
    <>
      <HomeHero />
      <HomeIndex />

      <section className="d-stack" id="how" aria-labelledby="d-how-t">
        <h2 id="d-how-t">How we <em>work.</em></h2>
        {steps.map(([n, t, d, img], i) => (
          <div key={n} className={`d-sc c${i + 1}`} style={{ ['--i' as string]: i }}>
            <div><div className="d-sc__num">{n}</div><h3>{t}</h3><p>{d}</p></div>
            <div className="d-sc__im"><DemoPhoto src={img} ratio="auto" sizes="(min-width: 62rem) 40vw, 90vw" alt="" /></div>
          </div>
        ))}
      </section>

      <section className="d-quote" aria-label="Statement">
        <QuoteImage src="prop-villa-pool" />
        <p>A home is where the <em>evenings</em> are.</p>
        <small className="d-small">Halden · Residential real estate</small>
      </section>

      <section className="d-areaspane" id="areas" aria-labelledby="d-areas-t">
        <h2 id="d-areas-t">Where we <em>work.</em></h2>
        <div className="d-alist">{counts.map(([a, n]) => <Link key={a} href={`/demo/properties?q=${encodeURIComponent(a)}`}>{a}<span>{n} {n === 1 ? 'home' : 'homes'}</span></Link>)}</div>
      </section>

      <section className="d-jr" id="journal" aria-labelledby="d-jr-t">
        <h2 id="d-jr-t">Journal</h2>
        <div className="d-posts">
          {POSTS.slice(0, 3).map((p, i) => (
            <DemoReveal key={p.slug} delay={i * 90}>
              <Link href={`/demo/journal/${p.slug}`} className="d-post">
                <DemoPhoto src={p.image} ratio="4 / 3" alt="" />
                <small>{p.category}</small><h3>{p.title}</h3>
              </Link>
            </DemoReveal>
          ))}
        </div>
      </section>
    </>
  );
}
