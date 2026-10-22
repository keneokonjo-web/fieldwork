'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_MS = 950; // the curtain stays down at least this long, then lifts
const EXIT_MS = 620;
const MAX_MS = 5000;
export const NAVIGATE_EVENT = 'fw-navigate';
/** Navigate with the loading animation from code (for example after signing in). */
export function navigate(href: string) { window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: href })); }

/**
 * A one-second loading animation between pages, so the next page has loaded before it is shown.
 * Internal link clicks are intercepted; modified clicks, new-tab links, downloads, hash links and external links are left alone.
 * With reduced motion the animation is skipped and navigation is immediate.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<'idle' | 'cover' | 'lift'>('idle');
  const active = phase === 'cover';
  const started = useRef(0);
  const from = useRef(pathname);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((href: string) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { router.push(href); return; }
    started.current = Date.now();
    from.current = window.location.pathname;
    setPhase('cover');
    if (failsafe.current) clearTimeout(failsafe.current);
    failsafe.current = setTimeout(() => setPhase('lift'), MAX_MS);
    router.push(href);
  }, [router]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download') || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return; // same page or hash only
      e.preventDefault();
      e.stopPropagation(); // capture phase: stop the framework's own Link handler so navigation happens once, after the animation starts
      go(url.pathname + url.search + url.hash);
    };
    const onNav = (e: Event) => go(String((e as CustomEvent).detail));
    document.addEventListener('click', onClick, true);
    window.addEventListener(NAVIGATE_EVENT, onNav);
    return () => { document.removeEventListener('click', onClick, true); window.removeEventListener(NAVIGATE_EVENT, onNav); };
  }, [go]);

  // Hide once the new page is in and at least a second has passed.
  useEffect(() => {
    if (!active || pathname === from.current) return;
    if (!window.location.hash) window.scrollTo(0, 0); // new pages always start at the top, instantly
    const wait = Math.max(0, MIN_MS - (Date.now() - started.current));
    const t = setTimeout(() => { setPhase('lift'); if (failsafe.current) clearTimeout(failsafe.current); }, wait);
    return () => clearTimeout(t);
  }, [pathname, active]);

  // After the curtain lifts, remove it from the page.
  useEffect(() => {
    if (phase !== 'lift') return;
    const t = setTimeout(() => setPhase('idle'), EXIT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === 'idle') return null;
  return (
    <div className={`curtain${phase === 'lift' ? ' curtain--lift' : ''}`} role="status" aria-live="polite" aria-label="Loading page">
      <div className="curtain__inner">
        <span className="curtain__word">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo/fieldwork-wordmark-light.svg" alt="" width={607} height={138} aria-hidden="true" />
        </span>
        <span className="curtain__rule" aria-hidden="true"><i /></span>
      </div>
    </div>
  );
}
