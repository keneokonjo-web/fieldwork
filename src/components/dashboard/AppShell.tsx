'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/dashboard/parts';
import { navigate } from '@/components/ui/PageTransition';
import { useSession } from '@/lib/session';

export interface NavItem { label: string; href?: string; icon: string; soon?: boolean; locked?: boolean }

/** The dashboard frame: ink sidebar, a top bar with search and the user, and the page. Used by both dashboards. */
export function AppShell({ area, nav, children }: { area: string; nav: NavItem[]; children: ReactNode }) {
  const { session, signOut } = useSession();
  const initials = (session?.name ?? '?').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className="app">
      <aside className="app__side" aria-label={`${area} navigation`}>
        <Link href="/home" className="app__brand" aria-label="Fieldwork, home"><Logo form="wordmark-small" tone="dark" /></Link>
        <p className="app__area">{area}</p>
        <nav className="app__nav">
          <ul>
            {nav.map((n) => (
              <li key={n.label}>
                {n.href && !n.soon ? <a href={n.href}><Icon name={n.icon} />{n.label}{n.locked && <em>Paid</em>}</a> : <span aria-disabled="true"><Icon name={n.icon} />{n.label}<em>{n.soon ? 'Soon' : 'Paid'}</em></span>}
              </li>
            ))}
          </ul>
        </nav>
        <div className="app__foot">
          <Link href="/contact" className="app__help">Help and contact</Link>
          <button type="button" className="app__out" onClick={() => { signOut(); navigate('/login'); }}>Log out</button>
        </div>
      </aside>
      <div className="app__main">
        <header className="app__top">
          <label className="app__search"><span className="visually-hidden">Search</span><input type="search" placeholder="Search your dashboard" aria-label="Search your dashboard" /></label>
          <span className="app__plan">{session?.plan === 'paid' ? 'Paid (demo)' : 'Free'}</span>
          <span className="app__user"><i aria-hidden="true">{initials}</i><span><b>{session?.name}</b><small>{area}</small></span></span>
        </header>
        <div className="app__page">{children}</div>
      </div>
    </div>
  );
}
