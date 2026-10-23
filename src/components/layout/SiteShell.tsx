'use client';
import { usePathname } from 'next/navigation';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { RegionDialog } from '@/components/region/RegionDialog';
import { Analytics } from '@/components/ui/Analytics';
import { MotionInit } from '@/components/ui/MotionInit';
import { PageTransition } from '@/components/ui/PageTransition';

/** The Fieldwork site chrome. The demonstration website at /demo is a separate brand and brings its own header and footer. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const demo = pathname === '/demo' || pathname.startsWith('/demo/');
  return (
    <>
      {!demo && <a className="skip-link" href="#main">Skip to main content</a>}
      {!demo && <SiteHeader />}
      {demo ? children : <main id="main" tabIndex={-1}>{children}</main>}
      {!demo && <SiteFooter />}
      {!demo && <Analytics />}
      {!demo && <MotionInit />}
      <PageTransition />
      {!demo && <RegionDialog />}
    </>
  );
}
