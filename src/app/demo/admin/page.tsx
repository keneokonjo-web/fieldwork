import { AdminListings } from '@/components/demo/AdminListings';
import { AdminShell } from '@/components/demo/AdminShell';

export const metadata = { title: 'Staff area' };
export default function AdminPage() { return <AdminShell><AdminListings /></AdminShell>; }
