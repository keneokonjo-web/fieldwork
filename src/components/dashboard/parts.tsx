'use client';
import type { ReactNode } from 'react';

/** Small dashboard building blocks in the Fieldwork style: hairlines, one cobalt signal, mono labels. */

export function Sparkline({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(...data, 1), min = Math.min(...data, 0);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 24}`).join(' ');
  return (
    <svg className="spark" viewBox="0 0 100 30" preserveAspectRatio="none" role="img" aria-label={label}>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function Gauge({ value, caption }: { value: number; caption: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="gauge" role="img" aria-label={`${v}% ${caption}`}>
      <svg viewBox="0 0 200 110" aria-hidden="true">
        <path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="var(--hair)" strokeWidth="14" pathLength="100" />
        <path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="var(--cobalt)" strokeWidth="14" pathLength="100" strokeDasharray={`${v} 100`} />
        {[0, 25, 50, 75, 100].map((t) => { const a = Math.PI * (1 - t / 100); return <text key={t} x={100 + 108 * Math.cos(a)} y={102 - 108 * Math.sin(a)} className="gauge__tick" textAnchor="middle">{t}</text>; })}
      </svg>
      <div className="gauge__value"><b>{v}%</b><span>{caption}</span></div>
    </div>
  );
}

export function Ring({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <span className="ring" role="img" aria-label={`${v}%`}>
      <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" fill="none" stroke="var(--hair)" strokeWidth="4" /><circle cx="18" cy="18" r="15" fill="none" stroke="var(--cobalt)" strokeWidth="4" pathLength="100" strokeDasharray={`${v} 100`} transform="rotate(-90 18 18)" /></svg>
      <i>{v}%</i>
    </span>
  );
}

export function StatCard({ label, value, unit, delta, spark, sample }: { label: string; value: string; unit?: string; delta?: string; spark?: number[]; sample?: boolean }) {
  return (
    <div className="stat">
      <p className="stat__label">{label}{sample && <em className="sample">Sample</em>}</p>
      <p className="stat__value">{value}{unit && <small>{unit}</small>}</p>
      {delta && <p className="stat__delta">{delta}</p>}
      {spark && <Sparkline data={spark} label={`${label} trend, sample data`} />}
    </div>
  );
}

export function Panel({ title, action, children, id, className = '' }: { title: string; action?: ReactNode; children: ReactNode; id?: string; className?: string }) {
  return (
    <section className={`panel ${className}`.trim()} aria-labelledby={id ? `${id}-t` : undefined} id={id}>
      <header className="panel__head"><h2 id={id ? `${id}-t` : undefined}>{title}</h2>{action}</header>
      {children}
    </section>
  );
}

export function Accordion({ title, children, open = false, done = false }: { title: string; children: ReactNode; open?: boolean; done?: boolean }) {
  return (
    <details className="acc" open={open}>
      <summary><span className={`acc__dot${done ? ' is-done' : ''}`} aria-hidden="true" />{title}</summary>
      <div className="acc__body">{children}</div>
    </details>
  );
}

const ICONS: Record<string, string> = {
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  book: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11',
  flask: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3',
  chat: 'M4 5h16v11H9l-5 4z',
  folder: 'M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 11a3 3 0 1 0 0-6M17 14a6 6 0 0 1 4 6',
  card: 'M3 6h18v12H3zM3 10h18',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-2-4-2 1-2-1V5H9v2L7 8 5 7l-2 4 2 1v2l-2 1 2 4 2-1 2 1v2h6v-2l2-1 2 1 2-4-2-1z',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  rocket: 'M5 19c0-4 3-7 7-7M12 12l7-7c-5 0-9 2-11 6zM9 15l-3 5 5-3',
  bolt: 'M13 3L5 14h6l-1 7 8-11h-6z',
};
export function Icon({ name }: { name: string }) {
  return <svg className="ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d={ICONS[name] ?? ICONS.grid} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
