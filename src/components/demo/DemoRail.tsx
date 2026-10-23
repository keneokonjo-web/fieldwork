'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BRAND } from '@/demo/data';
import { DemoMark } from '@/components/demo/Logo';

const nav = [
  { href: '/demo/properties?listing=sale', label: 'Buy', match: '' },
  { href: '/demo/properties?listing=rent', label: 'Rent', match: '' },
  { href: '/demo/new-homes', label: 'New homes', match: '/demo/new-homes' },
  { href: '/demo/about', label: 'About', match: '/demo/about' },
  { href: '/demo/journal', label: 'Journal', match: '/demo/journal' },
  { href: '/demo/contact', label: 'Contact', match: '/demo/contact' },
];

/** The fixed side rail and the menu drawer. */
export function DemoRail() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (v: boolean) => setOpenFor(v ? pathname : null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpenFor(null); menuRef.current?.focus(); } };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <>
      <aside className="d-rail" aria-label="Site">
        <Link href="/demo" aria-label={`${BRAND.name}, home`} data-testid="mark"><DemoMark /></Link>
        <span className="d-rail__vt" aria-hidden="true">{BRAND.name} · Residential real estate</span>
        <button ref={menuRef} type="button" className="d-rail__menu" aria-expanded={open} aria-controls="d-drawer" onClick={() => setOpen(true)}><i /><i />Menu</button>
      </aside>
      <div className={`d-scrim${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <div id="d-drawer" className={`d-drawer${open ? ' is-open' : ''}`} role="dialog" aria-label="Menu" aria-hidden={!open} {...(open ? {} : { inert: true })}>
        <button ref={closeRef} type="button" className="d-drawer__x" onClick={() => { setOpen(false); menuRef.current?.focus(); }}>Close</button>
        <nav aria-label="Main">
          <Link href="/demo" aria-current={pathname === '/demo' ? 'page' : undefined}>Home</Link>
          {nav.map((n) => <Link key={n.label} href={n.href} aria-current={n.match && (pathname === n.match || pathname.startsWith(`${n.match}/`)) ? 'page' : undefined}>{n.label}</Link>)}
        </nav>
        <div>
          <Link href="/demo/admin" className="d-btn d-btn--light d-drawer__try">Try the listing system</Link>
          <p style={{ marginTop: '1.4rem' }}>London · New York · Lagos<br />{BRAND.email}</p>
        </div>
      </div>
    </>
  );
}
