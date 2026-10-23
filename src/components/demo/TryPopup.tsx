'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const KEY = 'fw-demo-try-pop';
const DELAY_MS = 15000;

/** After about 15 seconds on the demo website, a centred dialog offers the listing system once per visit. */
export function TryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const primary = useRef<HTMLAnchorElement>(null);
  const openerRef = useRef<Element | null>(null);
  const inAdmin = pathname.startsWith('/demo/admin');
  useEffect(() => {
    if (inAdmin) return;
    try { if (self !== top || sessionStorage.getItem(KEY)) return; } catch { return; }
    const t = setTimeout(() => {
      try { if (sessionStorage.getItem(KEY)) return; sessionStorage.setItem(KEY, '1'); } catch { return; }
      openerRef.current = document.activeElement;
      setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, [inAdmin]);
  const close = () => { setOpen(false); (openerRef.current as HTMLElement | null)?.focus?.(); };
  useEffect(() => {
    if (!open) return;
    primary.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);
  if (!open) return null;
  return (
    <div className="d-modal-root">
      <div className="d-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="d-modal__box" role="dialog" aria-modal="true" aria-labelledby="d-try-t">
          <button type="button" className="d-modal__x" aria-label="Close" onClick={close}>×</button>
          <span className="d-eyebrow">The listing system</span>
          <h2 id="d-try-t">Want to try the <em>listing system?</em></h2>
          <p>Add a property, publish it and watch this website update. It takes about a minute, and an autofill button does the typing for you.</p>
          <div className="d-modal__row">
            <Link ref={primary} href="/demo/admin" className="d-btn d-btn--red" onClick={() => setOpen(false)}>Try the listing system</Link>
            <button type="button" className="d-btn d-btn--ghost" onClick={close}>Not now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
