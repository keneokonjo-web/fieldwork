import { Workspace } from '@/components/dashboard/Workspace';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({ title: 'Your workspace', description: 'Your project workspace: checklist, documents and assistant.', path: '/individuals/dashboard', noindex: true });
export default function Page() { return <Workspace />; }
