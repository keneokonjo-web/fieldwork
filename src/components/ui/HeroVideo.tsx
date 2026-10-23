'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const FILE = '/media/automation-walkthrough.mp4';
const POSTER = '/media/automation-walkthrough-poster.jpg';
const CHAPTERS: [number, string][] = [[0, 'Introduction'], [2.8, '01 · Enquiry arrives'], [15.2, '02 · Confirmation sent'], [27.5, '03 · Agent notified'], [40, '04 · Viewing confirmed'], [53.5, '05 · Feedback collected'], [64.7, 'Summary']];
const EXPAND_MS = 900;

/**
 * The automations walkthrough. It sits in a card first, then about a second after the page loads it starts to play and grows to fill the
 * screen below the navigation bar (which stays visible and usable). The cross closes it back to the card. With reduced motion it waits for a click.
 */
export function HeroVideo({ title }: { title: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const playBtn = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [full, setFull] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const barBottom = () => document.querySelector('header.bar')?.getBoundingClientRect().bottom ?? 56;

  const expand = useCallback(() => {
    const b = box.current, h = holder.current; if (!b || !h) return;
    const r = h.getBoundingClientRect(); const bar = barBottom();
    b.style.transition = 'none';
    Object.assign(b.style, { position: 'fixed', top: `${r.top}px`, left: `${r.left}px`, width: `${r.width}px`, height: `${r.height}px`, zIndex: '45' });
    void b.offsetWidth;
    b.style.transition = reduced() ? 'none' : `top ${EXPAND_MS}ms var(--ease), left ${EXPAND_MS}ms var(--ease), width ${EXPAND_MS}ms var(--ease), height ${EXPAND_MS}ms var(--ease)`;
    Object.assign(b.style, { top: `${bar}px`, left: '0px', width: '100vw', height: `calc(100svh - ${bar}px)` });
    document.documentElement.style.overflow = 'hidden';
    setFull(true);
    setTimeout(() => closeBtn.current?.focus(), reduced() ? 0 : EXPAND_MS * 0.6);
  }, []);

  const collapse = useCallback((pause = true) => {
    const b = box.current, h = holder.current; if (!b || !h) return;
    const r = h.getBoundingClientRect();
    b.style.transition = reduced() ? 'none' : `top ${EXPAND_MS}ms var(--ease), left ${EXPAND_MS}ms var(--ease), width ${EXPAND_MS}ms var(--ease), height ${EXPAND_MS}ms var(--ease)`;
    Object.assign(b.style, { top: `${r.top}px`, left: `${r.left}px`, width: `${r.width}px`, height: `${r.height}px` });
    if (pause) vid.current?.pause();
    setFull(false);
    document.documentElement.style.overflow = '';
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { b.removeAttribute('style'); playBtn.current?.focus({ preventScroll: true }); }, reduced() ? 0 : EXPAND_MS);
  }, []);

  const start = useCallback(async () => {
    const v = vid.current; if (!v) return;
    try { await v.play(); } catch { return; }
    expand();
  }, [expand]);

  // Autoplay a moment after the page loads, but never if the visitor has already scrolled or prefers reduced motion.
  useEffect(() => {
    if (reduced()) return;
    const id = setTimeout(() => { if (scrollY < 60) void start(); }, 1000);
    return () => clearTimeout(id);
  }, [start]);

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') collapse(); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [full, collapse]);
  useEffect(() => () => { document.documentElement.style.overflow = ''; if (timer.current) clearTimeout(timer.current); }, []);

  const chapter = [...CHAPTERS].reverse().find(([s]) => t >= s)?.[1] ?? '';
  const toggle = () => { const v = vid.current; if (!v) return; if (v.paused) void v.play(); else v.pause(); };
  return (
    <div className="hv" ref={holder}>
      <div className={`hv__box${full ? ' is-full' : ''}`} ref={box}>
        <video ref={vid} muted={muted} playsInline preload="auto" poster={POSTER} aria-label={title} onClick={full ? toggle : undefined}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); collapse(false); }}
          onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}>
          <source src={FILE} type="video/mp4; codecs=&quot;avc1.42E01E&quot;" />
          <source src={FILE.replace('.mp4', '.webm')} type="video/webm" />
        </video>
        {!full && (
          <button ref={playBtn} type="button" className="hv__play" aria-label={`${playing || t > 0 ? 'Continue' : 'Play'}: ${title}`} onClick={() => { if (vid.current?.ended) vid.current.currentTime = 0; void start(); }}>
            <span aria-hidden="true"><i /></span>
            <b>{t > 0 ? 'Continue the walkthrough' : 'Watch the walkthrough'}</b>
          </button>
        )}
        {full && (
          <>
            <button ref={closeBtn} type="button" className="hv__x" aria-label="Close the video" onClick={() => collapse()}>×</button>
            <div className="hv__bar">
              <span className="hv__chap" aria-live="off">{chapter}</span>
              <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? 'Pause' : 'Play'}</button>
              <button type="button" onClick={() => { const v = vid.current; if (v) { v.muted = !muted; setMuted(!muted); } }} aria-pressed={!muted}>{muted ? 'Sound off' : 'Sound on'}</button>
              <span className="hv__time" aria-hidden="true"><i style={{ width: `${dur ? (t / dur) * 100 : 0}%` }} /></span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
