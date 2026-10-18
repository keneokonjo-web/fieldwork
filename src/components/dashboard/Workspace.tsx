'use client';
import Link from 'next/link';
import { BUILDER_KEY } from '@/components/build/BusinessBuilder';
import { Gate } from '@/components/dashboard/Gate';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { navigate } from '@/components/ui/PageTransition';
import { EMPTY_BUILDER, builderDocs, checklist, reviveBuilder, type BuilderState, type Status } from '@/lib/builder';
import { useSession } from '@/lib/session';
import { useStoredState } from '@/lib/storage';

const STATUS_LABEL: Record<Status, string> = { complete: 'Complete', 'in-progress': 'In progress', 'not-started': 'Not started' };
const LINKS: Record<string, string> = { idea: '/build', model: '/build', brand: '/build', launch: '/build' };
const PAID_FEATURES = [
  'Build and develop a complete business',
  'More detailed market research and validation tools',
  'Full editable business plan and financial model',
  'Complete brand and marketing toolkits',
  'Website building guidance and expanded generation tools',
  'Ongoing access to the business-building assistant',
];

function download(name: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

export function Workspace() {
  const { session, signOut, setPlan } = useSession();
  const [b] = useStoredState<BuilderState>(BUILDER_KEY, EMPTY_BUILDER, reviveBuilder);
  if (!session || session.role !== 'individual') return <Gate role="individual" next="/individuals/dashboard" />;
  const paid = session.plan === 'paid';
  const items = checklist(b);
  const done = items.filter((i) => i.status === 'complete').length;
  const docs = builderDocs(b);
  const hasProject = Boolean(b.type || b.idea.sells);
  return (
    <>
      <section className="page-hero corners" style={{ paddingBottom: 'var(--s-6)' }}>
        <Corners n="13" letters={['W', 'O', 'R']} />
        <div className="container">
          <p className="eyebrow">Your workspace · demo preview</p>
          <h1 style={{ fontSize: 'var(--step-5)' }}>Welcome back, {session.name}.</h1>
          <div className="btn-row">
            <Link href="/build" className="btn btn--cobalt">{hasProject ? 'Continue building' : 'Build a business'}</Link>
            <button type="button" className="btn btn--secondary btn--small" onClick={() => { signOut(); navigate('/login'); }}>Log out</button>
          </div>
          <p className="hero__note">Plan: {paid ? 'Paid (demo preview)' : 'Free'} · stored in this browser only</p>
        </div>
      </section>

      <section className="section" aria-labelledby="proj-title">
        <div className="container">
          <div className="dash">
            <article className="dash__tile dash__tile--wide" aria-labelledby="proj-title">
              <p className="index">Project</p>
              <h2 id="proj-title">{b.brand.name || b.idea.sells || 'Your first project'}</h2>
              {b.refined && <p className="lede" style={{ marginBottom: 0 }}>{b.refined}</p>}
              <p className="small muted">{done} of {items.length} steps complete</p>
              <ul className="dash__list" aria-label="Project checklist">
                {items.map((i) => (
                  <li key={i.id}>
                    <Link href={LINKS[i.id]} style={{ textDecoration: 'none', fontWeight: 600 }}>{i.label}</Link>
                    <Chip tone={i.status === 'complete' ? 'available' : i.status === 'in-progress' ? 'planned' : 'neutral'}>{STATUS_LABEL[i.status]}</Chip>
                  </li>
                ))}
              </ul>
              {!hasProject && <p className="muted">Nothing here yet. Start with the builder to fill this in.</p>}
            </article>

            <article className="dash__tile" aria-labelledby="docs-title">
              <p className="index">02</p><h2 id="docs-title">My documents</h2>
              {paid ? (
                <ul className="dash__list">
                  {docs.map((d) => <li key={d.id}><span>{d.name}</span><button type="button" className="btn btn--secondary btn--small" onClick={() => download(d.filename, d.text)}>Download</button></li>)}
                </ul>
              ) : (
                <Locked what="Saved and downloadable documents" />
              )}
            </article>

            <article className="dash__tile" aria-labelledby="ask-title">
              <p className="index">03</p><h2 id="ask-title">Ask AI</h2>
              {paid ? (
                <>
                  <div className="dash__ask" aria-hidden="true">Ask about your business…</div>
                  <Chip tone="planned">Assistant not connected yet</Chip>
                  <p className="small muted">This is where the business-building assistant will answer questions about your project.</p>
                </>
              ) : (
                <Locked what="The business-building assistant" />
              )}
            </article>

            <article className="dash__tile dash__tile--wide" aria-labelledby="paid-title">
              <p className="index">{paid ? 'Included in paid' : 'Paid builder'}</p>
              <h2 id="paid-title">{paid ? 'Paid features' : 'What the paid builder adds'}</h2>
              <ul className="dash__list">
                {PAID_FEATURES.map((f) => <li key={f}><span>{f}</span>{paid ? <Chip tone="neutral">Preview</Chip> : <Link href="/pricing#tier-builder" className="link-arrow">Unlock</Link>}</li>)}
              </ul>
              <div className="btn-row">
                {!paid && <Link href="/pricing#tier-builder" className="btn">See pricing</Link>}
                <button type="button" className="btn btn--secondary btn--small" onClick={() => setPlan(paid ? 'free' : 'paid')}>{paid ? 'Switch back to the free view (demo)' : 'Preview the paid view (demo)'}</button>
              </div>
              <p className="small muted">Demo only: payments are not connected, so nothing is charged. The toggle just shows what the paid view will look like.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

function Locked({ what }: { what: string }) {
  return (
    <div className="locked">
      <span className="locked__icon" aria-hidden="true">Paid</span>
      <p>{what} is part of the paid builder.</p>
      <Link href="/pricing#tier-builder" className="btn btn--small">Unlock with the paid builder</Link>
    </div>
  );
}
