import { PropertyDetail } from '@/components/demo/PropertyDetail';
import { SEED_PROPERTIES } from '@/demo/data';

export const metadata = { title: 'Property' };
export function generateStaticParams() { return SEED_PROPERTIES.map((p) => ({ id: p.id })); }

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyDetail id={id} />;
}
