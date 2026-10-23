import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { DEMO_PATH } from '@/config/site';

export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <p className="notfound__code" aria-hidden="true">4<Image src="/brand/logo/fieldwork-target-light.svg" alt="" width={100} height={100} unoptimized />4</p>
        <h1 style={{ fontSize: 'var(--step-4)', marginTop: 'var(--s-5)' }}>We could not find that page.</h1>
        <p className="lede">The link may be old or mistyped. These routes will get you back to something useful.</p>
        <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href={DEMO_PATH} variant="secondary">View demo</ButtonLink>
        </div>
        <ul className="ticks" style={{ marginTop: 'var(--s-6)' }}>
          <li><Link href="/websites">Websites &amp; Listings</Link></li>
          <li><Link href="/automations">Automations</Link></li>
          <li><Link href="/ai-workshop">AI Workshop</Link></li>
          <li><Link href="/demo">View demo</Link></li>
        </ul>
      </div>
    </section>
  );
}
