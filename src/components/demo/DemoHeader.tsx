'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { DemoMark } from '@/components/demo/Logo';
import { BRAND } from '@/demo/data';

const nav = [
  { href: '/demo/properties?listing=sale', label: 'Buy', match: '/demo/properties' },
  { href: '/demo/properties?listing=rent', label: 'Rent', match: '/demo/properties' },
  { href: '/demo/new-homes', label: 'New homes', match: '/demo/new-homes' },
  { href: '/demo/about', label: 'About', match: '/demo/about' },
  { href: '/demo/journal', label: 'Journal', match: '/demo/journal' },
  { href: '/demo/contact', label: 'Contact', match: '/demo/contact' },
];

export function DemoHeader() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const current = (m: string, label: string) => (label === 'Buy' || label === 'Rent' ? false : pathname === m || pathname.startsWith(`${m}/`));
  return (
    <header className="d-head">
      <div className="d-wrap d-head__in">
        <Link href="/demo" className="d-logo" aria-label={`${BRAND.name}, home`}><DemoMark />{BRAND.name}</Link>
        <nav className="d-nav" aria-label="Main">
          {nav.map((n) => <Link key={n.label} href={n.href} aria-current={current(n.match, n.label) ? 'page' : undefined}>{n.label}</Link>)}
        </nav>
        <div className="d-head__cta">
          <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a>
          <Link href="/demo/contact?topic=valuation" className="d-btn d-btn--small">Book a valuation</Link>
        </div>
        <button type="button" className="d-menu" aria-expanded={open} aria-controls="d-mobile" onClick={() => setOpenFor((p) => (p === pathname ? null : pathname))}>{open ? 'Close' : 'Menu'}</button>
      </div>
      {open && (
        <div id="d-mobile" className="d-mobile">
          <div className="d-wrap">
            <nav aria-label="Mobile">
              {nav.map((n) => <Link key={n.label} href={n.href}>{n.label}</Link>)}
              <Link href="/demo/contact?topic=valuation">Book a valuation</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
