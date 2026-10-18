'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_MS = 1000;
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
  const [active, setActive] = useState(false);
  const started = useRef(0);
  const from = useRef(pathname);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((href: string) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { router.push(href); return; }
    started.current = Date.now();
    from.current = window.location.pathname;
    setActive(true);
    if (failsafe.current) clearTimeout(failsafe.current);
    failsafe.current = setTimeout(() => setActive(false), MAX_MS);
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
    const wait = Math.max(0, MIN_MS - (Date.now() - started.current));
    const t = setTimeout(() => { setActive(false); if (failsafe.current) clearTimeout(failsafe.current); }, wait);
    return () => clearTimeout(t);
  }, [pathname, active]);

  if (!active) return null;
  return (
    <div className="transition" role="status" aria-live="polite">
      <svg className="transition__mark" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="t-ring" cx="50" cy="50" r="27.5" fill="none" strokeWidth="6" pathLength="100" />
        <path className="t-tick t-tick--n" d="M50 4v21" /><path className="t-tick t-tick--s" d="M50 75v21" />
        <path className="t-tick t-tick--w" d="M4 50h21" /><path className="t-tick t-tick--e" d="M75 50h21" />
        <circle className="t-dot" cx="50" cy="50" r="7" />
      </svg>
      <span className="transition__label">Loading</span>
    </div>
  );
}
