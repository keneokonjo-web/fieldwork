import { BusinessDashboard } from '@/components/dashboard/BusinessDashboard';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({ title: 'Business dashboard', description: 'Your team’s learning library, exercise studio and workflow library.', path: '/business/dashboard', noindex: true });
export default function Page() { return <BusinessDashboard />; }
