'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId, useState } from 'react';
import { useAdminSession, useEnquiries, useProperties } from '@/demo/store';

/** Gate and frame for the staff area. The demo login needs no real account. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const { signedIn, signIn, signOut } = useAdminSession();
  const { reset } = useProperties();
  const { clear } = useEnquiries();
  const pathname = usePathname();
  const uid = useId();
  const [pw, setPw] = useState('demo');
  const [error, setError] = useState('');

  if (!signedIn) {
    return (
      <div className="d-admin" style={{ minHeight: '60vh' }}>
        <form className="d-login" onSubmit={(e) => { e.preventDefault(); if (pw.trim().toLowerCase() === 'demo') signIn(); else setError('For the demo, the password is “demo”.'); }} aria-labelledby={`${uid}-t`}>
          <span className="d-eyebrow">Staff area</span>
          <h1 id={`${uid}-t`}>Sign <em>in.</em></h1>
          <p className="d-note">This is the listing system your team would use. It is a demonstration, so there are no real accounts: just press Sign in.</p>
          <div className="d-field"><label htmlFor={`${uid}-e`}>Email</label><input className="d-input" id={`${uid}-e`} defaultValue="agent@halden.example" autoComplete="username" /></div>
          <div className="d-field"><label htmlFor={`${uid}-p`}>Password</label><input className="d-input" id={`${uid}-p`} type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" />{error && <p className="d-error">{error}</p>}</div>
          <button type="submit" className="d-btn" style={{ width: '100%' }}>Sign in</button>
          <p className="d-note" style={{ marginTop: '1rem' }}>Everything you add or change is saved in this browser only, so the demo is yours to play with.</p>
        </form>
      </div>
    );
  }
  const link = (href: string, label: string, match: (p: string) => boolean) => <Link href={href} aria-current={match(pathname) ? 'page' : undefined}>{label}</Link>;
  return (
    <div className="d-admin">
      <div className="d-admin__bar">
        <div className="d-pad">
          <nav className="d-admin__nav" aria-label="Staff area">
            {link('/demo/admin', 'Listings', (p) => p === '/demo/admin' || p.startsWith('/demo/admin/properties'))}
            {link('/demo/admin/enquiries', 'Enquiries', (p) => p.startsWith('/demo/admin/enquiries'))}
          </nav>
          <div className="d-actions">
            <Link href="/demo" className="d-btn d-btn--ghost d-btn--small">View website</Link>
            <button type="button" className="d-btn d-btn--ghost d-btn--small" onClick={() => { if (window.confirm('Reset the demo to its original listings and clear all enquiries?')) { reset(); clear(); } }}>Reset demo data</button>
            <button type="button" className="d-btn d-btn--ghost d-btn--small" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </div>
      <div className="d-admin__main">{children}</div>
    </div>
  );
}
