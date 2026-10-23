import type { Metadata } from 'next';
import Link from 'next/link';
import '@fontsource-variable/fraunces/wght.css';
import '@fontsource-variable/instrument-sans/index.css';
import './demo.css';
import { DemoFooter } from '@/components/demo/DemoFooter';
import { DemoHeader } from '@/components/demo/DemoHeader';
import { BRAND } from '@/demo/data';

export const metadata: Metadata = {
  title: { default: `${BRAND.name} | Demonstration website`, template: `%s | ${BRAND.name}` },
  description: 'A demonstration estate agency website with a working listing system, using fictional properties. Created by Fieldwork.',
  robots: { index: false, follow: false },
};

// Plays the opening animation once per browser session.
const introScript = `try{if(sessionStorage.getItem('fw-demo-seen'))document.documentElement.setAttribute('data-demo-seen','1');else sessionStorage.setItem('fw-demo-seen','1')}catch(e){}`;
const NAME = BRAND.name.split('');

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="demo">
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <a className="d-skip" href="#main">Skip to main content</a>
      <div className="d-intro" aria-hidden="true">
        <svg viewBox="0 0 48 48"><path d="M6 22 24 7l18 15" /><path d="M11 20v21h26V20" /><path d="M20 41V29a4 4 0 0 1 8 0v12" /></svg>
        <div className="d-intro__name">{NAME.map((c, i) => <span key={i} style={{ animationDelay: `${0.35 + i * 0.035}s` }}>{c === ' ' ? ' ' : c}</span>)}</div>
        <div className="d-intro__sub">Estate agents · London</div>
      </div>
      <div className="d-notice">
        <div className="d-wrap">
          <span>Demonstration website · fictional company and properties</span>
          <span className="d-notice__links"><Link href="/demo/admin">Try the listing system</Link><Link href="/websites">← Back to Fieldwork</Link></span>
        </div>
      </div>
      <DemoHeader />
      <main id="main" tabIndex={-1}>{children}</main>
      <DemoFooter />
    </div>
  );
}
