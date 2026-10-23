'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { DEMO_PATH } from '@/config/site';

const W = 1440;
const H = 900;

/** A live, blurred preview of the demonstration website, scaled so the whole first screen is visible. The live demo opens from here. */
export function DemoPreview({ label = 'View demo', className = '' }: { label?: string; className?: string }) {
  const screen = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(0.4);
  useEffect(() => {
    const el = screen.current; if (!el) return;
    const fit = () => setScale(el.clientWidth / W);
    fit();
    const ro = new ResizeObserver(fit); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className={`demoprev ${className}`.trim()}>
      <span className="demoprev__bar" aria-hidden="true"><i /><i /><i /><b>halden.example</b></span>
      <span className="demoprev__screen" ref={screen} aria-hidden="true">
        <iframe className="demoprev__frame" src={DEMO_PATH} title="Preview of the demonstration website" loading="lazy" tabIndex={-1} style={{ width: W, height: H, transform: `scale(${scale})` }} />
      </span>
      <Link href={DEMO_PATH} className="demoprev__cta" aria-label={`${label}: open the demonstration website`} data-track="demo_request_clicked" data-track-label="demo-preview"><span>{label}<i aria-hidden="true">→</i></span></Link>
    </div>
  );
}
