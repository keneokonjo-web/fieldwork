'use client';
import { useSyncExternalStore } from 'react';
import { siteConfig } from '@/config/site';
import { getConsent, setConsent, subscribeConsent } from '@/lib/analytics';

export function ConsentSettings() {
  const c = useSyncExternalStore(subscribeConsent, getConsent, () => 'pending' as const);
  if (!siteConfig.analytics.plausibleDomain) {
    return <div className="alert alert--info" role="status"><h3>No analytics are running</h3><p>This site is not currently set up to measure visits, so there is nothing to opt in or out of.</p></div>;
  }
  return (
    <div className="stack" aria-live="polite">
      <p>Your current choice: <strong>{c === 'granted' ? 'Analytics allowed' : c === 'denied' ? 'Analytics refused' : c === 'pending' ? 'Checking…' : 'No choice made yet'}</strong>.</p>
      <div className="btn-row">
        <button type="button" className="btn btn--small" onClick={() => setConsent('granted')} aria-pressed={c === 'granted'}>Allow analytics</button>
        <button type="button" className="btn btn--small btn--secondary" onClick={() => setConsent('denied')} aria-pressed={c === 'denied'}>Refuse analytics</button>
      </div>
    </div>
  );
}
