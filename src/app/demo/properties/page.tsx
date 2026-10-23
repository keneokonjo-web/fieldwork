import { Suspense } from 'react';
import { PropertyBrowser } from '@/components/demo/PropertyBrowser';

export const metadata = { title: 'Properties' };

export default function PropertiesPage() {
  return <Suspense fallback={<div className="d-wrap" style={{ padding: '6rem 0' }}>Loading properties…</div>}><PropertyBrowser /></Suspense>;
}
