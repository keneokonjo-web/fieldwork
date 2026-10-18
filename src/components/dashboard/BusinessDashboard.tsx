'use client';
import Link from 'next/link';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { Gate } from '@/components/dashboard/Gate';
import { WORKFLOWS } from '@/content/corporate/workflows';
import { FREE_EXPERIENCE_PATH } from '@/config/site';
import { STARTER_TASKS } from '@/content/learn/first-workflow';
import { useSession } from '@/lib/session';
import { navigate } from '@/components/ui/PageTransition';

export function BusinessDashboard() {
  const { session, signOut } = useSession();
  if (!session || session.role !== 'business') return <Gate role="business" next="/business/dashboard" />;
  return (
    <>
      <section className="page-hero corners" style={{ paddingBottom: 'var(--s-6)' }}>
        <Corners n="12" letters={['D', 'A', 'S']} />
        <div className="container">
          <p className="eyebrow">Business dashboard · demo preview</p>
          <h1 style={{ fontSize: 'var(--step-5)' }}>Welcome back, {session.name}.</h1>
          <div className="btn-row">
            <Link href="/business/course" className="btn btn--secondary btn--small">See the course</Link>
            <button type="button" className="btn btn--secondary btn--small" onClick={() => { signOut(); navigate('/login'); }}>Log out</button>
          </div>
          <p className="hero__note">Preview of the dashboard layout. Progress tracking, team accounts and the assistant are not connected yet.</p>
        </div>
      </section>

      <section className="section" aria-label="Dashboard">
        <div className="container">
          <div className="dash">
            <article className="dash__tile dash__tile--wide" aria-labelledby="lib-title">
              <p className="index">01</p><h2 id="lib-title">Learning library</h2>
              <ol className="dash__list">
                <li><span>Rules and safe handling</span><Chip tone="neutral">Not started</Chip></li>
                {WORKFLOWS.map((w) => <li key={w.id}><span>{w.title}</span><Chip tone="neutral">Not started</Chip></li>)}
              </ol>
              <Link href="/business/course" className="link-arrow">Course outline</Link>
            </article>
            <article className="dash__tile" aria-labelledby="studio-title">
              <p className="index">02</p><h2 id="studio-title">Interactive exercise studio</h2>
              <p className="muted">Practise a task with a five-part brief, check the result, and save a workflow card.</p>
              <ul className="dash__list">{STARTER_TASKS.slice(0, 4).map((t) => <li key={t.id}><span>{t.title}</span></li>)}</ul>
              <Link href={FREE_EXPERIENCE_PATH} className="btn btn--small">Open the studio</Link>
            </article>
            <article className="dash__tile" aria-labelledby="ai-title">
              <p className="index">03</p><h2 id="ai-title">AI learning assistant</h2>
              <p className="muted">A guide that answers questions from your approved course material.</p>
              <div className="dash__ask" aria-hidden="true">Ask about a module…</div>
              <Chip tone="planned">Planned, not yet available</Chip>
            </article>
            <article className="dash__tile dash__tile--wide" aria-labelledby="wf-title">
              <p className="index">04</p><h2 id="wf-title">Workflow library</h2>
              <div className="dash__cards">
                {WORKFLOWS.map((w) => (
                  <div key={w.id} className="card card--flat"><h3 style={{ fontSize: 'var(--step-1)' }}>{w.title}</h3><p className="small muted">People keep: {w.peopleKeep}</p></div>
                ))}
              </div>
              <p className="small muted">Saved workflow cards from your team will appear here.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
