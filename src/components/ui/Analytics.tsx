'use client';
import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useSyncExternalStore } from 'react';
import { siteConfig } from '@/config/site';
import { getConsent, setConsent, subscribeConsent, track, type FieldworkEvent, EVENTS } from '@/lib/analytics';

/** Loads the analytics script only if a domain is configured AND the visitor has granted consent.
 *  Also wires `data-track` attributes on links and buttons to events. Renders nothing visible
 *  unless analytics is configured and no choice has been made. */
export function Analytics() {
  const configured = Boolean(siteConfig.analytics.plausibleDomain);
  // 'pending' on the server and during hydration, so the banner never flashes for returning visitors.
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => 'pending' as const);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
      const name = el?.dataset.track as FieldworkEvent | undefined;
      if (el && name && (EVENTS as readonly string[]).includes(name)) track(name, { label: el.dataset.trackLabel ?? '' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!configured) return null;
  return (
    <>
      {consent === 'granted' && (
        <Script defer data-domain={siteConfig.analytics.plausibleDomain} src={siteConfig.analytics.plausibleSrc} strategy="afterInteractive" />
      )}
      {consent === null && (
        <div className="consent-banner" role="region" aria-label="Analytics consent">
          <p>
            May we measure which pages are useful? We use privacy-focused analytics with no advertising and no personal data in events. You can change this later on the{' '}
            <Link href="/cookies">cookies page</Link>.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn--small btn--light" onClick={() => setConsent('granted')}>Allow analytics</button>
            <button type="button" className="btn btn--small btn--outline-light" onClick={() => setConsent('denied')}>No thanks</button>
          </div>
        </div>
      )}
    </>
  );
}
