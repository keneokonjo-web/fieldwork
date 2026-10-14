/**
 * Privacy-first event tracking. Events only leave the browser when (a) an analytics domain is configured and
 * (b) the visitor has granted consent. Event names and their triggers are documented in docs/website/ANALYTICS-EVENTS.md.
 * Never pass personal data (emails, names, free text) in event properties.
 */
export const EVENTS = [
  'consumer_cta_clicked',
  'business_cta_clicked',
  'free_experience_started',
  'free_experience_step_completed',
  'free_experience_completed',
  'prompt_copied',
  'email_signup_submitted',
  'business_enquiry_submitted',
  'demo_request_submitted',
  'contact_submitted',
  'assessment_started',
  'assessment_completed',
  'pricing_viewed',
  'purchase_completed',
] as const;
export type FieldworkEvent = (typeof EVENTS)[number];

export const CONSENT_KEY = 'fw-consent';
export type Consent = 'granted' | 'denied' | null;

export function getConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch { return null; }
}
export function subscribeConsent(cb: () => void) {
  window.addEventListener('fw-consent-change', cb);
  window.addEventListener('storage', cb);
  return () => { window.removeEventListener('fw-consent-change', cb); window.removeEventListener('storage', cb); };
}
export function setConsent(v: 'granted' | 'denied') {
  try { window.localStorage.setItem(CONSENT_KEY, v); } catch { /* storage unavailable */ }
  window.dispatchEvent(new Event('fw-consent-change'));
}

const SAFE_KEYS = new Set(['location', 'label', 'step', 'task', 'market', 'audience', 'level', 'tool']);
type Plausible = (name: string, opts?: { props?: Record<string, string | number | boolean> }) => void;

export function track(event: FieldworkEvent, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { plausible?: Plausible };
  if (!w.plausible || getConsent() !== 'granted') return;
  const safe: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(props)) if (SAFE_KEYS.has(k)) safe[k] = typeof v === 'string' ? v.slice(0, 60) : v;
  w.plausible(event, { props: safe });
}
