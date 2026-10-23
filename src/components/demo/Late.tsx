'use client';
import { useEffect, useState, type ReactNode } from 'react';

/** Saved listings load from browser storage just after the page appears. This shows `children` only after a short wait. */
export function Late({ children, ms = 700 }: { children: ReactNode; ms?: number }) {
  const [late, setLate] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLate(true), ms); return () => clearTimeout(t); }, [ms]);
  return late ? <>{children}</> : <div className="d-wrap" style={{ padding: '6rem 0' }}><p className="d-note">Loading…</p></div>;
}
