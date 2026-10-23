import Link from 'next/link';
import { AREAS, BRAND } from '@/demo/data';

export function DemoFooter() {
  return (
    <footer className="d-foot">
      <div className="d-foot__cta">
        <p>Let us find the <em>one.</em></p>
        <div><Link className="d-rbtn" href="/demo/contact">Speak to an advisor <i aria-hidden="true">→</i></Link></div>
      </div>
      <div className="d-foot__grid">
        <div>
          <h2>Explore</h2>
          <ul>
            <li><Link href="/demo/properties?listing=sale">Buy</Link></li>
            <li><Link href="/demo/properties?listing=rent">Rent</Link></li>
            <li><Link href="/demo/new-homes">New homes</Link></li>
            <li><Link href="/demo/journal">Journal</Link></li>
          </ul>
        </div>
        <div>
          <h2>Areas</h2>
          <ul>{AREAS.slice(0, 5).map((a) => <li key={a}><Link href={`/demo/properties?q=${encodeURIComponent(a)}`}>{a}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Offices</h2>
          <ul><li>London</li><li>New York</li><li>Lagos</li><li>{BRAND.address}</li></ul>
        </div>
        <div>
          <h2>Talk to us</h2>
          <ul>
            <li><a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a></li>
            <li><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
            <li><Link href="/demo/contact?topic=valuation">Book a valuation</Link></li>
            <li><Link href="/demo/admin">Staff area (listing system)</Link></li>
          </ul>
        </div>
      </div>
      <div className="d-foot__small">
        <span>{BRAND.name} is a fictional company created by Fieldwork to demonstrate a property website with a self-managed listing system. The properties, prices, addresses and people shown are not real, and nothing on this site is for sale or to let.</span>
        <span>Photographs are illustrative: Unsplash and Wikimedia Commons contributors. <Link href="/image-credits">Image credits</Link></span>
      </div>
      <div className="d-giant" aria-hidden="true">halden.</div>
    </footer>
  );
}
