import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/fraunces/wght.css';
import '@fontsource-variable/fraunces/wght-italic.css';
import '@fontsource-variable/instrument-sans/wght.css';
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/pages.css';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Analytics } from '@/components/ui/Analytics';
import { MotionInit } from '@/components/ui/MotionInit';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url ?? 'http://localhost:3000'),
  title: { default: 'Fieldwork: practise AI on real work', template: '%s | Fieldwork' },
  description: siteConfig.description,
  applicationName: 'Fieldwork',
  robots: siteConfig.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: [
      { url: '/brand/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/brand/favicon/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};
export const viewport: Viewport = { themeColor: '#F6F0E4', width: 'device-width', initialScale: 1 };

// Adds the motion class before first paint, only when motion is acceptable.
const motionScript = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head><script dangerouslySetInnerHTML={{ __html: motionScript }} /></head>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <Analytics />
        <MotionInit />
      </body>
    </html>
  );
}
