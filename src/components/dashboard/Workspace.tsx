'use client';
import Link from 'next/link';
import { BUILDER_KEY } from '@/components/build/BusinessBuilder';
import { AppShell, type NavItem } from '@/components/dashboard/AppShell';
import { Gate } from '@/components/dashboard/Gate';
import { Accordion, Gauge, Panel, Ring, StatCard } from '@/components/dashboard/parts';
import { Chip } from '@/components/ui/Chip';
import { FREE_EXPERIENCE_PATH } from '@/config/site';
import { EMPTY_BUILDER, builderDocs, checklist, reviveBuilder, webAddress, type BuilderState, type Status } from '@/lib/builder';
import { useSession } from '@/lib/session';
import { useStoredState } from '@/lib/storage';

const STATUS_LABEL: Record<Status, string> = { complete: 'Complete', 'in-progress': 'In progress', 'not-started': 'Not started' };
const STATUS_PCT: Record<Status, number> = { complete: 100, 'in-progress': 50, 'not-started': 0 };
const STAGE: Record<string, string> = { idea: 'Find an idea', model: 'Build the product', brand: 'Design and website', launch: 'Sales and launch' };
const NAV: NavItem[] = [
  { label: 'Overview', href: '#overview', icon: 'grid' },
  { label: 'My project', href: '#project', icon: 'list' },
  { label: 'My documents', href: '#documents', icon: 'folder' },
  { label: 'Ask AI', href: '#ask', icon: 'chat' },
  { label: 'AI learning', icon: 'book', soon: true },
  { label: 'Plan and billing', href: '#plan', icon: 'card' },
];
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
  const { session, setPlan } = useSession();
  const [b] = useStoredState<BuilderState>(BUILDER_KEY, EMPTY_BUILDER, reviveBuilder);
  if (!session || session.role !== 'individual') return <Gate role="individual" next="/individuals/dashboard" />;
  const paid = session.plan === 'paid';
  const items = checklist(b);
  const done = items.filter((i) => i.status === 'complete').length;
  const pct = Math.round(items.reduce((n, i) => n + STATUS_PCT[i.status], 0) / items.length);
  const docs = builderDocs(b);
  const hasProject = Boolean(b.type || b.idea.sells);
  const next = items.find((i) => i.status !== 'complete');
  const address = webAddress(b.website.domain);
  return (
    <AppShell area="Workspace" nav={NAV}>
      <div id="overview" className="dash-head">
        <div>
          <h1>Hi, {session.name}</h1>
          <p className="muted">{hasProject ? `Your project: ${b.brand.name || b.idea.sells}` : 'Start a project to fill this workspace.'}</p>
        </div>
        <Link href="/build" className="btn btn--cobalt">{hasProject ? 'Continue building' : 'Build a business'}</Link>
      </div>
      <p className="dash-note"><Chip tone="planned">Preview</Chip> Stored in this browser only. Sign-in and payments are not connected yet.</p>

      <div className="stats">
        <StatCard label="Steps complete" value={`${done}`} unit={`/${items.length}`} />
        <StatCard label="Project progress" value={`${pct}`} unit="%" />
        <StatCard label="Documents ready" value={paid ? `${docs.length}` : 'Paid'} delta={paid ? 'Download below' : 'Unlock with the paid builder'} />
        <StatCard label="Plan" value={paid ? 'Paid' : 'Free'} delta={paid ? 'Demo preview' : 'Basic builder'} />
      </div>

      <div className="dash2">
        <div className="dash2__main">
          <Panel title="Your tasks" id="tasks">
            <ul className="tasks">
              {items.map((i) => (
                <li key={i.id}>
                  <span className={`tasks__dot${i.status === 'complete' ? ' is-done' : ''}`} aria-hidden="true" />
                  <div><b>{i.label}</b><span>{STATUS_LABEL[i.status]}</span></div>
                  <Link href="/build" className="btn btn--secondary btn--small">{i.status === 'complete' ? 'Review' : i.status === 'in-progress' ? 'Continue' : 'Start'}</Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Project summary" id="project">
            <h3 style={{ margin: '0 0 var(--s-3)' }}>{b.brand.name || 'Your business'}</h3>
            <div className="table-wrap" tabIndex={0} role="region" aria-label="Project summary, scrolls sideways on small screens">
              <table className="table">
                <caption className="visually-hidden">Project summary</caption>
                <thead><tr><th scope="col">Step</th><th scope="col">Stage</th><th scope="col">Status</th><th scope="col">Progress</th></tr></thead>
                <tbody>
                  {items.map((i) => (
                    <tr key={i.id} aria-label="Project checklist row"><th scope="row">{i.label}</th><td>{STAGE[i.id]}</td><td><Chip tone={i.status === 'complete' ? 'available' : i.status === 'in-progress' ? 'planned' : 'neutral'}>{STATUS_LABEL[i.status]}</Chip></td><td><Ring value={STATUS_PCT[i.status]} /></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="visually-hidden" aria-label="Project checklist">
              {items.map((i) => <li key={i.id}><Link href="/build" style={{ textDecoration: 'none', fontWeight: 600 }}>{i.label}</Link><Chip tone={i.status === 'complete' ? 'available' : i.status === 'in-progress' ? 'planned' : 'neutral'}>{STATUS_LABEL[i.status]}</Chip></li>)}
            </ul>
            {b.refined && <p className="lede" style={{ marginTop: 'var(--s-4)', marginBottom: 0 }}>{b.refined}</p>}
            {address && <p className="small muted" style={{ marginTop: 'var(--s-3)' }}>Preferred web address: <strong>{address}</strong> (availability not checked)</p>}
          </Panel>

          <div className="two-up">
            <Panel title="My documents" id="documents">
              {paid ? (
                <ul className="dash__list">{docs.map((d) => <li key={d.id}><span>{d.name}</span><button type="button" className="btn btn--secondary btn--small" onClick={() => download(d.filename, d.text)}>Download</button></li>)}</ul>
              ) : <Locked what="Saved and downloadable documents" />}
            </Panel>
            <Panel title="Ask AI" id="ask">
              {paid ? (
                <>
                  <div className="chatbox" aria-hidden="true"><span>Ask about your business…</span><i>Send</i></div>
                  <Chip tone="planned">Assistant not connected yet</Chip>
                </>
              ) : <Locked what="The business-building assistant" />}
            </Panel>
          </div>
        </div>

        <aside className="dash2__rail" aria-label="Shortcuts and progress">
          <Panel title="Quick actions">
            <div className="quick">
              <Link href="/build"><b>{hasProject ? 'Continue building' : 'Start building'}</b></Link>
              <Link href={FREE_EXPERIENCE_PATH}><b>Try the exercise</b></Link>
              <Link href="/pricing#tier-builder"><b>See pricing</b></Link>
            </div>
            {next && <p className="small muted" style={{ marginTop: 'var(--s-3)' }}>Next: <strong>{next.label}</strong></p>}
          </Panel>
          <Panel title="Overall progress"><Gauge value={pct} caption="Complete" /></Panel>
          <Panel title="Get started">
            <Accordion title="How the builder works" done open><p className="small">Six steps from idea to launch. Your answers are saved in this browser.</p></Accordion>
            <Accordion title="How to test your idea"><p className="small">Talk to five real people in your first week. Ask how they handle the problem today.</p></Accordion>
            <Accordion title="How to choose a name"><p className="small">Search it, check the web address and check the trade mark register where you will trade.</p></Accordion>
          </Panel>
          <Panel title="Plan and billing" id="plan">
            <p className="small"><strong>{paid ? 'Paid (demo preview)' : 'Free'}</strong></p>
            <ul className="dash__list">{PAID_FEATURES.map((f) => <li key={f}><span>{f}</span>{paid ? <Chip tone="neutral">Preview</Chip> : <Link href="/pricing#tier-builder" className="link-arrow">Unlock</Link>}</li>)}</ul>
            <div className="btn-row" style={{ marginTop: 'var(--s-3)' }}>
              {!paid && <Link href="/pricing#tier-builder" className="btn btn--small">See pricing</Link>}
              <button type="button" className="btn btn--secondary btn--small" onClick={() => setPlan(paid ? 'free' : 'paid')}>{paid ? 'Back to free view (demo)' : 'Preview the paid view (demo)'}</button>
            </div>
            <p className="small muted">Demo only: payments are not connected and nothing is charged.</p>
          </Panel>
        </aside>
      </div>
    </AppShell>
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
