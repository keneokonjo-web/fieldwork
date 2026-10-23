'use client';
import Link from 'next/link';
import { formatPrice, statusLabel } from '@/demo/format';
import { useProperties } from '@/demo/store';

/** Units in a development with their live status. Changing a status in the listing system changes it here. */
export function DevelopmentUnits({ slug }: { slug: string }) {
  const { published } = useProperties();
  const units = published.filter((p) => p.development === slug).sort((a, b) => a.price - b.price);
  if (!units.length) return <p className="d-empty">No homes are published for this development yet.</p>;
  return (
    <div className="d-tablewrap">
      <table className="d-table">
        <caption className="visually-hidden" style={{ position: 'absolute', left: '-999px' }}>Homes and their availability</caption>
        <thead><tr><th scope="col">Home</th><th scope="col">Beds</th><th scope="col">Baths</th><th scope="col">Size</th><th scope="col">Price</th><th scope="col">Status</th><th scope="col"><span className="visually-hidden" style={{ position: 'absolute', left: '-999px' }}>View</span></th></tr></thead>
        <tbody>
          {units.map((u) => (
            <tr key={u.id}>
              <th scope="row"><span className="d-rowtitle">{u.title.replace('The Wharf, ', '')}</span><span className="d-rowsub">{u.headline}</span></th>
              <td>{u.beds}</td><td>{u.baths}</td><td>{u.sqft} sq ft</td><td>{formatPrice(u)}</td>
              <td><span className={`d-pill ${u.status === 'available' ? 'd-pill--ok' : u.status === 'reserved' ? 'd-pill--warn' : 'd-pill--dark'}`}>{statusLabel(u.listing, u.status)}</span></td>
              <td><Link className="d-link" href={`/demo/properties/${u.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
