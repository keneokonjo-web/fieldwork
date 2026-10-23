'use client';
import { PropertyCard } from '@/components/demo/PropertyCard';
import { useProperties } from '@/demo/store';

/** A live list of published properties, read from the same store the listing system writes to. */
export function PropertyList({ mode, limit, empty = 'No properties to show yet.' }: { mode: 'featured' | 'latest'; limit?: number; empty?: string }) {
  const { published } = useProperties();
  const list = (mode === 'featured' ? published.filter((p) => p.featured && p.status === 'available') : [...published].sort((a, b) => b.added.localeCompare(a.added))).slice(0, limit);
  if (!list.length) return <p className="d-empty">{empty}</p>;
  return <div className="d-grid">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>;
}
