'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AppShell, type NavItem } from '@/components/dashboard/AppShell';
import { Gate } from '@/components/dashboard/Gate';
import { Accordion, Gauge, Panel, StatCard } from '@/components/dashboard/parts';
import { Chip } from '@/components/ui/Chip';
import { FREE_EXPERIENCE_PATH } from '@/config/site';
import { WORKFLOWS } from '@/content/corporate/workflows';
import { STARTER_TASKS } from '@/content/learn/first-workflow';
import { useSession } from '@/lib/session';

const NAV: NavItem[] = [
  { label: 'Overview', href: '#overview', icon: 'grid' },
  { label: 'Learning library', href: '#library', icon: 'book' },
  { label: 'Exercise studio', href: '#studio', icon: 'flask' },
  { label: 'AI learning assistant', href: '#assistant', icon: 'chat' },
  { label: 'Workflow library', href: '#workflows', icon: 'folder' },
  { label: 'Team', icon: 'users', soon: true },
  { label: 'Billing', icon: 'card', soon: true },
  { label: 'Settings', icon: 'gear', soon: true },
];
const SAMPLE = { modules: 3, week: [40, 75, 55, 90, 65, 20, 0], days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] };
const MODULE_STATE = ['Complete', 'Complete', 'Complete', 'In progress', 'Not started', 'Not started', 'Not started', 'Not started'] as const;

export function BusinessDashboard() {
  const { session } = useSession();
  const [tab, setTab] = useState<'learn' | 'manage'>('learn');
  if (!session || session.role !== 'business') return <Gate role="business" next="/business/dashboard" />;
  const modules = [{ id: 'rules', title: 'Rules and safe handling' }, ...WORKFLOWS.map((w) => ({ id: w.id, title: w.title }))];
  const learnTasks = [
    { t: modules[3].title, s: 'Next: write the brief for an anonymised example', a: 'Continue', href: '/business/course' },
    { t: modules[4].title, s: 'Starts after the module above', a: 'Preview', href: '/business/course' },
    { t: 'Interactive exercise studio', s: 'Practise a task and save a workflow card', a: 'Open', href: FREE_EXPERIENCE_PATH },
  ];
  const manageTasks = [
    { t: 'Write your AI-use rule', s: 'What may be pasted, what never is, who checks what', a: 'Start', href: '/business/course' },
    { t: 'Invite your team', s: 'Team accounts are planned and not connected yet', a: 'Planned', href: '' },
    { t: 'Talk to us about your plan', s: 'Starter, Team, Business bundle or Enterprise', a: 'See pricing', href: '/pricing' },
  ];
  const tasks = tab === 'learn' ? learnTasks : manageTasks;
  return (
    <AppShell area="Business" nav={NAV}>
      <div id="overview" className="dash-head">
        <div>
          <h1>Hi, {session.name}</h1>
          <p className="muted">Your team’s learning at a glance.</p>
        </div>
        <Link href="/business/course" className="btn btn--secondary btn--small">Course outline</Link>
      </div>
      <p className="dash-note"><Chip tone="planned">Preview</Chip> Figures marked Sample show what this dashboard will look like. Tracking, team accounts and the assistant are not connected yet.</p>

      <div className="stats">
        <StatCard label="Modules complete" value={`${SAMPLE.modules}`} unit="/8" delta="Sample" spark={[0, 1, 1, 2, 2, 3, 3]} sample />
        <StatCard label="Team members" value="12" delta="Sample" spark={[2, 4, 6, 8, 9, 11, 12]} sample />
        <StatCard label="Hours learned" value="14.5" unit="hrs" delta="Sample" spark={[1, 2, 5, 6, 9, 12, 14.5]} sample />
        <StatCard label="Workflow cards saved" value="9" delta="Sample" spark={[0, 1, 2, 4, 5, 7, 9]} sample />
      </div>

      <div className="dash2">
        <div className="dash2__main">
          <Panel title="Your tasks" id="tasks" action={
            <div className="tabs" role="tablist" aria-label="Task type">
              <button type="button" role="tab" aria-selected={tab === 'learn'} onClick={() => setTab('learn')}>Learn</button>
              <button type="button" role="tab" aria-selected={tab === 'manage'} onClick={() => setTab('manage')}>Manage</button>
            </div>}>
            <ul className="tasks">
              {tasks.map((t) => (
                <li key={t.t}>
                  <span className="tasks__dot" aria-hidden="true" />
                  <div><b>{t.t}</b><span>{t.s}</span></div>
                  {t.href ? <Link href={t.href} className="btn btn--secondary btn--small">{t.a}</Link> : <Chip tone="planned">{t.a}</Chip>}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Learning library" id="library" action={<Link href="/business/course" className="link-arrow">View all modules</Link>}>
            <div className="modcards">
              {modules.map((m, i) => (
                <article key={m.id} className="modcard">
                  <p className="index">{String(i).padStart(2, '0')}</p>
                  <h3>{m.title}</h3>
                  <p className="modcard__meta"><span>About 45 min</span><Chip tone={MODULE_STATE[i] === 'Complete' ? 'available' : MODULE_STATE[i] === 'In progress' ? 'planned' : 'neutral'}>{MODULE_STATE[i]}</Chip></p>
                </article>
              ))}
            </div>
            <div className="seg" role="img" aria-label="Sample course progress: 3 complete, 1 in progress, 4 not started">
              <span style={{ flex: 3 }} className="seg__c">Complete 3</span><span style={{ flex: 1 }} className="seg__p">1</span><span style={{ flex: 4 }} className="seg__n">Not started 4</span>
            </div>
          </Panel>

          <Panel title="Interactive exercise studio" id="studio" action={<Link href={FREE_EXPERIENCE_PATH} className="link-arrow">Open the studio</Link>}>
            <div className="modcards">
              {STARTER_TASKS.slice(0, 4).map((t, i) => (
                <article key={t.id} className="modcard"><p className="index">{String(i + 1).padStart(2, '0')}</p><h3>{t.title}</h3><p className="modcard__meta"><span>{t.blurb}</span></p></article>
              ))}
            </div>
          </Panel>

          <Panel title="Workflow library" id="workflows" action={<span className="index">Sample</span>}>
            <div className="counts">
              <div><b>9</b><span>Saved workflow cards</span></div><div><b>4</b><span>Team briefs</span></div><div><b>2</b><span>House checklists</span></div><div><b>6</b><span>Shared with team</span></div>
            </div>
            <ul className="tasks">
              {WORKFLOWS.slice(0, 4).map((w) => <li key={w.id}><span className="tasks__dot" aria-hidden="true" /><div><b>{w.title}</b><span>People keep: {w.peopleKeep}</span></div><Chip tone="neutral">Template</Chip></li>)}
            </ul>
          </Panel>

          <Panel title="AI learning assistant" id="assistant" action={<Chip tone="planned">Planned, not yet available</Chip>}>
            <p className="muted">A guide that answers questions from your approved course material.</p>
            <div className="chatbox" aria-hidden="true"><span>Ask about a module…</span><i>Send</i></div>
          </Panel>
        </div>

        <aside className="dash2__rail" aria-label="Shortcuts and progress">
          <Panel title="Quick actions">
            <div className="quick">
              <Link href="/business/course"><b>Start next module</b></Link>
              <Link href={FREE_EXPERIENCE_PATH}><b>Open the studio</b></Link>
              <span aria-disabled="true"><b>Invite team</b><em>Soon</em></span>
            </div>
            <ul className="rail-links">
              <li><Link href="/business/course">Write your AI-use rule</Link></li>
              <li><Link href="/contact?topic=business">Request a demonstration</Link></li>
              <li><Link href="/pricing">See plans and pricing</Link></li>
            </ul>
          </Panel>
          <Panel title="Overall progress"><Gauge value={38} caption="Sample" /></Panel>
          <Panel title="Get started">
            <Accordion title="How the course works" done open><p className="small">Eight modules, each brief, run, check, keep. About two hours a week.</p></Accordion>
            <Accordion title="How to run a module"><p className="small">Write the brief, run it on an anonymised example, check every claim against the source, save the workflow card.</p></Accordion>
            <Accordion title="How to invite your team"><p className="small">Team accounts are planned. For now, ask us about your plan.</p></Accordion>
          </Panel>
          <Panel title="Learning this week" action={<span className="index">Sample</span>}>
            <div className="bars" role="img" aria-label="Sample hours learned each day this week">
              {SAMPLE.week.map((v, i) => <div key={i}><i style={{ height: `${Math.max(v, 4)}%` }} /><span>{SAMPLE.days[i]}</span></div>)}
            </div>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}
