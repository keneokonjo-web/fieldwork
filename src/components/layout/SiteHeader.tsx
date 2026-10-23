'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { RegionButton } from '@/components/region/RegionButton';
import { DEMO_PATH, mainNav } from '@/config/site';

const isCurrent = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigating closes it without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = false) => {
    setOpenFor(null);
    if (restoreFocus) btnRef.current?.focus();
  }, []);

  // Body scroll lock, focus into the panel, Escape to close, simple focus trap
  useEffect(() => {
    if (!open) { document.body.style.overflow = ''; return; }
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
      if (e.key !== 'Tab') return;
      const items = [btnRef.current, ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])].filter(Boolean) as HTMLElement[];
      if (!items.length) return;
      const first = items[0]; const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.matchMedia('(min-width: 62rem)').matches) close(); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); document.body.style.overflow = ''; };
  }, [open, close]);

  return (
    <header className="bar">
      <div className="container bar__in">
        <Link href="/" className="brand-link" aria-label="Fieldwork, home">
          <Logo form="wordmark-small" tone="dark" />
        </Link>
        <nav className="nav" aria-label="Main">
          {mainNav.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isCurrent(pathname, l.href) ? 'page' : undefined}>{l.label}</Link>
          ))}
        </nav>
        <div className="bar__end">
          <RegionButton variant="bar" />
          <Link href={DEMO_PATH} className="bar__login" data-track="demo_request_clicked" data-track-label="header">View demo</Link>
        </div>
        <button
          ref={btnRef}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpenFor((p) => (p === pathname ? null : pathname))}
        >
          <span className="menu-btn__icon" aria-hidden="true" />
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>
      <div id="mobile-nav" className="mobile-nav" ref={panelRef} hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            <li><Link className="mobile-nav__link" href="/" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link></li>
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link className="mobile-nav__link" href={l.href} aria-current={isCurrent(pathname, l.href) ? 'page' : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href={DEMO_PATH} className="btn btn--cobalt" data-track="demo_request_clicked" data-track-label="mobile-menu">View demo</Link>
      </div>
    </header>
  );
}
