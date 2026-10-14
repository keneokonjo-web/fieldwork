import type { Attribution } from './validation';

const KEY = 'fw-attribution';

/** First-touch campaign attribution kept in sessionStorage (first-party, cleared when the tab closes).
 *  It is only transmitted when the visitor submits a form. See docs/marketing/ATTRIBUTION.md. */
export function readAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  let stored: Attribution = {};
  try { stored = JSON.parse(window.sessionStorage.getItem(KEY) ?? '{}'); } catch { /* ignore */ }
  const params = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const) {
    const v = params.get(k); if (v) fresh[k] = v.slice(0, 120);
  }
  const hasFresh = Object.keys(fresh).length > 0;
  if (!stored.landing_path) {
    stored = { ...fresh, referrer: document.referrer ? new URL(document.referrer).hostname : undefined, landing_path: window.location.pathname };
    try { window.sessionStorage.setItem(KEY, JSON.stringify(stored)); } catch { /* ignore */ }
  } else if (hasFresh && !stored.utm_source) {
    stored = { ...stored, ...fresh };
    try { window.sessionStorage.setItem(KEY, JSON.stringify(stored)); } catch { /* ignore */ }
  }
  return { ...stored, source_page: window.location.pathname };
}
