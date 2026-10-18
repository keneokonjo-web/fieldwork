'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { track, type FieldworkEvent } from '@/lib/analytics';

interface Props {
  /** Milliseconds on the page before the pop-up appears. */
  delay: number;
  /** Remembered for the browser session so it appears once. */
  storageKey: string;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  href: string;
  event?: FieldworkEvent;
}

/** A single, dismissible pop-up that appears after a delay. Escape, the close button and the backdrop all dismiss it. */
export function TimedPopup({ delay, storageKey, eyebrow, title, body, ctaLabel, href, event }: Props) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    let seen = false;
    try { seen = window.sessionStorage.getItem(storageKey) === '1'; } catch { /* storage blocked */ }
    if (seen) return;
    const t = setTimeout(() => {
      opener.current = document.activeElement;
      setOpen(true);
      try { window.sessionStorage.setItem(storageKey, '1'); } catch { /* ignore */ }
    }, delay);
    return () => clearTimeout(t);
  }, [delay, storageKey]);

  useEffect(() => {
    if (!open) return;
    ctaRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') {
        const items = [ctaRef.current, closeRef.current].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function close() {
    setOpen(false);
    (opener.current as HTMLElement | null)?.focus?.();
  }
  if (!open) return null;
  return (
    <div className="popup" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="popup__card" role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <button ref={closeRef} type="button" className="popup__close" onClick={close} aria-label="Close">×</button>
        <span className="popup__corner" aria-hidden="true">F</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="popup__mark" src="/brand/logo/fieldwork-target-dark.svg" alt="" width={44} height={44} aria-hidden="true" />
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="popup-title">{title}</h2>
        <p>{body}</p>
        <div className="btn-row">
          <Link ref={ctaRef} href={href} className="btn btn--light" onClick={() => { if (event) track(event, { location: 'popup', label: storageKey }); }}>{ctaLabel}</Link>
          <button type="button" className="btn btn--outline-light" onClick={close}>Not now</button>
        </div>
      </div>
    </div>
  );
}
