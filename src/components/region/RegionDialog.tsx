'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Flag } from '@/components/region/Flags';
import { REGIONS, REGION_NAME, REGION_OPEN_EVENT, useRegion, type Region } from '@/lib/region';

const SHOW_AFTER_MS = 2000;

/** "Select your region" pop-up. Shown two seconds after the first visit, and again whenever the visitor chooses to change region. */
export function RegionDialog() {
  const { region, chosen, setRegion } = useRegion();
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<Region | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const show = useCallback((preset: Region | null) => {
    returnTo.current = (document.activeElement as HTMLElement | null) ?? null;
    setPicked(preset); setListOpen(false); setOpen(true);
  }, []);

  // First visit: open after two seconds. Changing region later: opened by the header and footer buttons.
  useEffect(() => {
    const onOpen = () => show(chosen ? region : null);
    window.addEventListener(REGION_OPEN_EVENT, onOpen);
    let t: ReturnType<typeof setTimeout> | undefined;
    if (!chosen) t = setTimeout(() => show(null), SHOW_AFTER_MS);
    return () => { window.removeEventListener(REGION_OPEN_EVENT, onOpen); if (t) clearTimeout(t); };
  }, [chosen, region, show]);

  const close = useCallback(() => { setOpen(false); setListOpen(false); returnTo.current?.focus?.(); }, []);

  useEffect(() => {
    if (!open) { document.body.style.overflow = ''; return; }
    document.body.style.overflow = 'hidden';
    triggerRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); if (listOpen) setListOpen(false); else close(); return; }
      if (e.key !== 'Tab') return;
      const items = Array.from(cardRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [role="option"]') ?? []);
      if (!items.length) return;
      const first = items[0]; const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, listOpen, close]);

  const choose = (r: Region) => { setPicked(r); setListOpen(false); triggerRef.current?.focus(); };
  const confirm = () => { if (!picked) return; setRegion(picked); close(); };
  const onOptionKey = (e: React.KeyboardEvent<HTMLLIElement>, r: Region, i: number) => {
    const opts = Array.from(cardRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
    if (e.key === 'ArrowDown') { e.preventDefault(); opts[Math.min(i + 1, opts.length - 1)]?.focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); opts[Math.max(i - 1, 0)]?.focus(); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(r); }
  };

  if (!open) return null;
  return (
    <div className="popup region" role="presentation">
      <div ref={cardRef} className="popup__card region__card" role="dialog" aria-modal="true" aria-labelledby="region-title">
        <p className="eyebrow">Region</p>
        <h2 id="region-title">Select your region</h2>
        <p className="region__lede">Prices and examples across the site will match the region you choose.</p>
        <div className="region__select">
          <button
            ref={triggerRef} type="button" className="region__trigger" aria-haspopup="listbox" aria-expanded={listOpen} aria-controls="region-list"
            onClick={() => setListOpen((o) => !o)}
            onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setListOpen(true); setTimeout(() => cardRef.current?.querySelector<HTMLElement>('[role="option"]')?.focus(), 0); } }}
          >
            {picked ? <><Flag region={picked} /><span>{REGION_NAME[picked]}</span></> : <span className="region__ph">Country</span>}
            <i className="region__caret" aria-hidden="true" />
          </button>
          {listOpen && (
            <ul id="region-list" className="region__list" role="listbox" aria-label="Country">
              {REGIONS.map((r, i) => (
                <li key={r} role="option" tabIndex={0} aria-selected={picked === r} onClick={() => choose(r)} onKeyDown={(e) => onOptionKey(e, r, i)}>
                  <Flag region={r} /><span>{REGION_NAME[r]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="button" className="btn btn--light region__confirm" disabled={!picked} onClick={confirm}>Confirm</button>
      </div>
    </div>
  );
}
