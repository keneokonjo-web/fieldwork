'use client';
import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { siteConfig } from '@/config/site';
import { useRegion } from '@/lib/region';
import { getConsent, setConsent, subscribeConsent, track, type FieldworkEvent, EVENTS } from '@/lib/analytics';

/** Loads the analytics script only if a domain is configured AND the visitor has granted consent.
 *  Also wires `data-track` attributes on links and buttons to events. Renders nothing visible
 *  unless analytics is configured and no choice has been made. */
export function Analytics() {
  const configured = Boolean(siteConfig.analytics.plausibleDomain);
  // 'pending' on the server and during hydration, so the banner never flashes for returning visitors.
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => 'pending' as const);
  // The cookie pop-up appears about two seconds after the visit starts. A first-time visitor sees the region pop-up first, and this one follows it.
  const { chosen } = useRegion();
  const [due, setDue] = useState(false);
  useEffect(() => {
    if (consent !== null || !chosen) return;
    const t = setTimeout(() => setDue(true), 2000);
    return () => clearTimeout(t);
  }, [consent, chosen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
      const name = el?.dataset.track as FieldworkEvent | undefined;
      if (el && name && (EVENTS as readonly string[]).includes(name)) track(name, { label: el.dataset.trackLabel ?? '' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      {configured && consent === 'granted' && (
        <Script defer data-domain={siteConfig.analytics.plausibleDomain} src={siteConfig.analytics.plausibleSrc} strategy="afterInteractive" />
      )}
      {consent === null && due && (
        <div className="consent-banner" role="region" aria-label="Cookies and browser storage">
          <p>
            <strong>Cookies.</strong> We use a few essential items to run the site: your region, and a note that your visit has started. If you agree, we also use privacy-focused analytics, with no advertising and no personal data in events. Details are on the{' '}
            <Link href="/cookies">cookies page</Link>.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn--small btn--light" onClick={() => setConsent('granted')}>Accept all</button>
            <button type="button" className="btn btn--small btn--outline-light" onClick={() => setConsent('denied')}>Only necessary</button>
          </div>
        </div>
      )}
    </>
  );
}
