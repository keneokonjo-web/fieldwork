import Link from 'next/link';
import { DemoPhoto } from '@/demo/photo';
import { formatPrice, statusLabel } from '@/demo/format';
import type { Property } from '@/demo/data';

export function PropertyCard({ p, draft, sizes }: { p: Property; draft?: boolean; sizes?: string }) {
  const closed = p.status === 'sold' || p.status === 'let';
  const badge = draft ? 'Draft' : p.status !== 'available' ? statusLabel(p.listing, p.status) : null;
  return (
    <Link href={`/demo/properties/${p.id}`} className={`d-card${closed ? ' d-card--dim' : ''}`}>
      {badge && <span className={`d-badge${closed ? ' d-badge--sold' : p.status === 'reserved' ? ' d-badge--reserved' : ''}${draft ? ' d-badge--draft' : ''}`}>{badge}</span>}
      <DemoPhoto src={p.images[0] ?? 'prop-exterior-white'} ratio="4 / 3" sizes={sizes} alt={`${p.title}, ${p.area}`} />
      <p className="d-card__price">{formatPrice(p)}</p>
      <p className="d-card__title">{p.title}</p>
      <p className="d-card__addr">{p.address}, {p.area} {p.postcode}</p>
      <p className="d-card__facts"><span><b>{p.beds}</b> bed</span><span><b>{p.baths}</b> bath</span><span><b>{p.sqft.toLocaleString('en-GB')}</b> sq ft</span><span>{p.propertyType}</span></p>
    </Link>
  );
}
