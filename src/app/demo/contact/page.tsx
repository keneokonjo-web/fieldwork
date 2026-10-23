import { Suspense } from 'react';
import { ContactPanel } from '@/components/demo/ContactPanel';

export const metadata = { title: 'Contact' };
export default function ContactPage() { return <Suspense fallback={null}><ContactPanel /></Suspense>; }
