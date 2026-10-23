import type { Metadata } from 'next';
import Link from 'next/link';
import './demo.css';
import { DemoFooter } from '@/components/demo/DemoFooter';
import { DemoRail } from '@/components/demo/DemoRail';
import { TryPopup } from '@/components/demo/TryPopup';
import { BRAND } from '@/demo/data';

export const metadata: Metadata = {
  title: { default: `${BRAND.name} | Demonstration website`, template: `%s | ${BRAND.name}` },
  description: 'A demonstration real estate website with a working listing system, using fictional properties. Created by Fieldwork.',
  robots: { index: false, follow: false },
};

// Plays the opening animation once per browser session. When the page is shown inside a preview frame it is switched to embed mode.
const introScript = `try{if(self!==top){document.documentElement.setAttribute('data-embed','1')}else if(sessionStorage.getItem('fw-demo-seen'))document.documentElement.setAttribute('data-demo-seen','1');else sessionStorage.setItem('fw-demo-seen','1')}catch(e){}`;

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="demo">
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <a className="d-skip" href="#main">Skip to main content</a>
      <div className="d-intro" aria-hidden="true"><div><span>halden<em>.</em></span></div></div>
      <div className="d-notice">
        <div className="d-pad">
          <span className="d-notice__long">Demonstration website · fictional company and properties</span>
          <span className="d-notice__short">Demo · fictional company</span>
          <span className="d-notice__links">
            <Link href="/demo/properties?listing=sale">Properties</Link>
            <Link href="/demo/admin">Try the listing system</Link>
            <Link href="/websites">← Back to Fieldwork</Link>
          </span>
        </div>
      </div>
      <DemoRail />
      <div className="d-body">
        <main id="main">{children}</main>
        <DemoFooter />
      </div>
      <TryPopup />
    </div>
  );
}
