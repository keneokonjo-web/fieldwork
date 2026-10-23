import { AdminShell } from '@/components/demo/AdminShell';
import { PropertyEditor } from '@/components/demo/PropertyEditor';
import { SEED_PROPERTIES } from '@/demo/data';

export const metadata = { title: 'Edit listing' };
export function generateStaticParams() { return [{ id: 'new' }, ...SEED_PROPERTIES.map((p) => ({ id: p.id }))]; }

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminShell><PropertyEditor id={id} /></AdminShell>;
}
