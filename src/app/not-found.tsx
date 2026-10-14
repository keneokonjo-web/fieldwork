import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { FREE_EXPERIENCE_PATH } from '@/config/site';

export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <p className="notfound__code" aria-hidden="true">4<span className="tile tile--circle bg-terracotta" />4</p>
        <h1 style={{ fontSize: 'var(--step-4)', marginTop: 'var(--s-5)' }}>We could not find that page.</h1>
        <p className="lede">The link may be old or mistyped. These routes will get you back to something useful.</p>
        <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href={FREE_EXPERIENCE_PATH} variant="secondary">Try the free exercise</ButtonLink>
        </div>
        <ul className="ticks" style={{ marginTop: 'var(--s-6)' }}>
          <li><Link href="/individuals">Fieldwork for Individuals</Link></li>
          <li><Link href="/business">Fieldwork for Business</Link></li>
          <li><Link href="/field-notes">Field Notes</Link></li>
          <li><Link href="/contact">Contact us</Link></li>
        </ul>
      </div>
    </section>
  );
}
