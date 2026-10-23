'use client';
import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

/** Fades a block in as it scrolls into view. Content is visible without JavaScript or with reduced motion. */
export function DemoReveal({ children, as: Tag = 'div', className = '', delay = 0 }: { children: ReactNode; as?: ElementType; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { el.classList.add('d-in'); return; }
    const io = new IntersectionObserver((entries) => { for (const e of entries) if (e.isIntersecting) { e.target.classList.add('d-in'); io.unobserve(e.target); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`d-reveal ${className}`.trim()} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</Tag>;
}
