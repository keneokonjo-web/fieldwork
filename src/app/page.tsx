import Image from 'next/image';
import Link from 'next/link';
import { Corners } from '@/components/ui/Corners';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Fieldwork: practise AI on real work',
  description: 'Learn AI by doing the work you already have. Choose individual or business to begin.',
  path: '/',
});

export default function EntryPage() {
  return (
    <section className="entry corners" aria-labelledby="entry-title">
      <Corners n="00" letters={['F', 'I', 'E']} />
      <Image className="entry__dots" src="/art/terrain-6-circle-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" priority />
      <div className="container entry__body">
        <p className="eyebrow">Choose where to start</p>
        <h1 id="entry-title">Who is it for?</h1>
        <div className="entry__choices">
          <Link href="/individuals" className="entry__choice" data-track="consumer_cta_clicked" data-track-label="entry-individual">
            <span className="index">01</span>
            <span className="entry__name">I am an individual</span>
            <span className="entry__line">Learn AI on your own work, or build a business with it.</span>
            <span className="link-arrow">Individuals</span>
          </Link>
          <Link href="/business" className="entry__choice entry__choice--ink" data-track="business_cta_clicked" data-track-label="entry-business">
            <span className="index">02</span>
            <span className="entry__name">I am a business</span>
            <span className="entry__line">Train your team on the work they already do. Real estate first.</span>
            <span className="link-arrow">For business</span>
          </Link>
        </div>
        <p className="hero__note"><Link href="/home" style={{ textDecoration: 'none', borderBottom: '1px solid currentColor' }}>Or see the full home page</Link></p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero__big" src="/brand/logo/fieldwork-wordmark-light.svg" alt="" width={607} height={138} aria-hidden="true" />
    </section>
  );
}
