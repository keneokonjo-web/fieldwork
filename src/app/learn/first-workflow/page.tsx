import { Corners } from '@/components/ui/Corners';
import Link from 'next/link';
import { FirstWorkflow } from '@/components/learn/FirstWorkflow';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Free exercise: turn a messy task into a reusable AI workflow',
  description: 'A free 15-minute guided exercise. Write a five-part brief, run it in your own AI tool, check the result properly and keep a workflow card. No account needed.',
  path: '/learn/first-workflow',
});

export default function FirstWorkflowPage() {
  return (
    <>
      <section className="page-hero corners" style={{ paddingBottom: 'var(--s-6)' }}>
        <Corners n="01" letters={['E', 'X', 'R']} />
        <div className="container">
          <p className="eyebrow"><Link href="/learn" style={{ textDecoration: 'none' }}>Learn</Link> / Free exercise</p>
          <h1 style={{ fontSize: 'var(--step-4)', maxWidth: '18ch' }}>First workflow: from messy task to reusable.</h1>
        </div>
      </section>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container"><FirstWorkflow /></div>
        <noscript>
          <div className="container"><p className="alert alert--warning">This exercise needs JavaScript to run. Without it, you can follow the same method in the Field Notes guides: <Link href="/field-notes/five-part-brief">the five-part brief</Link> and <Link href="/field-notes/check-ai-answers">how to check an AI answer</Link>.</p></div>
        </noscript>
      </section>
    </>
  );
}
