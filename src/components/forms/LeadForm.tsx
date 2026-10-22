'use client';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { readAttribution } from '@/lib/attribution';
import { track, type FieldworkEvent } from '@/lib/analytics';
import { validateLead, type FieldErrors, type LeadInput, type LeadType } from '@/lib/validation';

type Variant = 'business' | 'contact';
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'not_configured';

interface Props {
  type: LeadType;
  variant: Variant;
  submitLabel: string;
  /** Wording for the required checkbox */
  consentLabel?: string;
  interest?: string;
  context?: string;
  successTitle: string;
  successBody: string;
  messageLabel?: string;
  messageHint?: string;
  compact?: boolean;
  /** Include the optional "keep me updated" tick for enquiries */
  offerMarketingOptIn?: boolean;
  /** Where this form sits, sent to analytics without personal data */
  location: string;
  /** Contact address for fallback, if configured */
  fallbackEmail?: string;
}

const EVENT_FOR: Record<LeadType, FieldworkEvent> = {
  demo_request: 'demo_request_submitted',
  workshop_interest: 'workshop_interest_submitted',
  contact: 'contact_submitted',
};

export function LeadForm(props: Props) {
  const { type, variant, submitLabel, interest, context, successTitle, successBody, location } = props;
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState('');
  const startedAt = useRef<number>(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  const isBusiness = variant === 'business';
  const needsName = true;

  useEffect(() => {
    if (Object.keys(errors).length) summaryRef.current?.focus();
  }, [errors]);
  useEffect(() => {
    if (status === 'success' || status === 'not_configured' || status === 'error') resultRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => (fd.get(k) as string | null) ?? '';
    const payload: Partial<LeadInput> & Record<string, unknown> = {
      type,
      email: get('email'),
      name: get('name'),
      company: get('company'),
      role: get('role'),
      market: (get('market') || undefined) as LeadInput['market'],
      message: get('message'),
      interest: get('interest') || interest,
      context: [get('businessType') && `Business type: ${get('businessType')}`, context].filter(Boolean).join('. ') || undefined,
      privacyAcknowledged: fd.get('privacy') === 'on',
      marketingOptIn: fd.get('marketing') === 'on',
      website: get('website'),
      startedAt: startedAt.current,
      attribution: readAttribution(),
    };
    const v = validateLead(payload);
    if (!v.ok) { setErrors(v.errors); setStatus('idle'); return; }
    setErrors({}); setStatus('submitting'); setServerMessage('');
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setStatus('success');
        track(EVENT_FOR[type], { location, audience: 'business' });
        form.reset();
        return;
      }
      if (res.status === 422 && body.fieldErrors) { setErrors(body.fieldErrors); setStatus('idle'); return; }
      setServerMessage(body.message || 'Something went wrong. Please try again.');
      setStatus(body.error === 'not_configured' ? 'not_configured' : 'error');
    } catch {
      setServerMessage('We could not reach the server. Check your connection and try again.');
      setStatus('error');
    }
  }

  const errKeys = Object.keys(errors) as (keyof FieldErrors)[];
  const fieldId = (k: string) => id(k === 'privacyAcknowledged' ? 'privacy' : k);
  const err = (k: keyof FieldErrors) => errors[k];
  const describe = (k: keyof FieldErrors, hint?: boolean) => [err(k) ? id(`${k}-err`) : '', hint ? id(`${k}-hint`) : ''].filter(Boolean).join(' ') || undefined;

  if (status === 'success') {
    return (
      <div ref={resultRef} tabIndex={-1} className="alert alert--success" role="status">
        <h3>{successTitle}</h3>
        <p>{successBody}</p>
      </div>
    );
  }

  const consentLabel =
    props.consentLabel ??
    'I have read the privacy notice and agree to you using my details to reply to this enquiry.';

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-label={submitLabel}>
      {errKeys.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className="alert alert--error error-summary" role="alert">
          <h3>There is a problem</h3>
          <ul>
            {errKeys.map((k) => (
              <li key={k}><a href={`#${fieldId(k)}`}>{errors[k]}</a></li>
            ))}
          </ul>
        </div>
      )}
      {(status === 'error' || status === 'not_configured') && (
        <div ref={resultRef} tabIndex={-1} className={`alert ${status === 'not_configured' ? 'alert--warning' : 'alert--error'}`} role="alert">
          <h3>{status === 'not_configured' ? 'Not connected yet' : 'Your details were not sent'}</h3>
          <p>{serverMessage}</p>
          {props.fallbackEmail && <p>You can also email <a href={`mailto:${props.fallbackEmail}`}>{props.fallbackEmail}</a>.</p>}
        </div>
      )}

      {needsName && (
        <div className={isBusiness ? 'form-row form-row--2' : 'form-row'}>
          <div className="field">
            <label className="field__label" htmlFor={id('name')}>Your name</label>
            <input className="input" id={id('name')} name="name" autoComplete="name" aria-invalid={err('name') ? true : undefined} aria-describedby={describe('name')} />
            {err('name') && <p className="field__error" id={id('name-err')}>{err('name')}</p>}
          </div>
          {isBusiness && (
            <div className="field">
              <label className="field__label" htmlFor={id('company')}>Company</label>
              <input className="input" id={id('company')} name="company" autoComplete="organization" aria-invalid={err('company') ? true : undefined} aria-describedby={describe('company')} />
              {err('company') && <p className="field__error" id={id('company-err')}>{err('company')}</p>}
            </div>
          )}
        </div>
      )}

      <div className="field">
        <label className="field__label" htmlFor={id('email')}>Work email</label>
        <input className="input" id={id('email')} name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={err('email') ? true : undefined} aria-describedby={describe('email')} />
        {err('email') && <p className="field__error" id={id('email-err')}>{err('email')}</p>}
      </div>

      {isBusiness && (
        <>
          <div className="form-row form-row--2">
            <div className="field">
              <label className="field__label" htmlFor={id('role')}>Your role <span className="opt">(optional)</span></label>
              <input className="input" id={id('role')} name="role" autoComplete="organization-title" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor={id('market')}>Where is the business based?</label>
              <select className="select" id={id('market')} name="market" defaultValue="" aria-invalid={err('market') ? true : undefined} aria-describedby={describe('market')}>
                <option value="" disabled>Choose one</option>
                <option value="uk">United Kingdom</option>
                <option value="nigeria">Nigeria</option>
                <option value="other">Somewhere else</option>
              </select>
              {err('market') && <p className="field__error" id={id('market-err')}>{err('market')}</p>}
            </div>
          </div>
          <div className="form-row form-row--2">
            <div className="field">
              <label className="field__label" htmlFor={id('businessType')}>What kind of business? <span className="opt">(optional)</span></label>
              <select className="select" id={id('businessType')} name="businessType" defaultValue="">
                <option value="">Choose one</option>
                <option value="Property developer">Property developer</option>
                <option value="Estate agency or brokerage">Estate agency or brokerage</option>
                <option value="Other property business">Other property business</option>
              </select>
            </div>
            {!interest && (
              <div className="field">
                <label className="field__label" htmlFor={id('interest')}>What are you interested in? <span className="opt">(optional)</span></label>
                <select className="select" id={id('interest')} name="interest" defaultValue="">
                  <option value="">Not sure yet</option>
                  <option value="Website and listings">Website and listings</option>
                  <option value="Lead capture and follow-up">Lead capture and follow-up</option>
                  <option value="Viewing and feedback">Viewing and feedback</option>
                  <option value="Both automations">Both automations</option>
                  <option value="Brand and social starter pack">Brand and social starter pack</option>
                  <option value="AI Workshop">AI Workshop</option>
                </select>
              </div>
            )}
          </div>
        </>
      )}

      {(variant === 'business' || variant === 'contact') && (
        <div className="field">
          <label className="field__label" htmlFor={id('message')}>{props.messageLabel ?? 'How can we help?'}</label>
          <textarea className="textarea" id={id('message')} name="message" aria-invalid={err('message') ? true : undefined} aria-describedby={describe('message', Boolean(props.messageHint))} />
          {props.messageHint && <p className="field__hint" id={id('message-hint')}>{props.messageHint}</p>}
          {err('message') && <p className="field__error" id={id('message-err')}>{err('message')}</p>}
        </div>
      )}

      <div className="hp" aria-hidden="true">
        <label>Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="field">
        <div className="check">
          <input id={id('privacy')} name="privacy" type="checkbox" aria-invalid={err('privacyAcknowledged') ? true : undefined} aria-describedby={describe('privacyAcknowledged')} />
          <label htmlFor={id('privacy')}>
            {consentLabel} <Link href="/privacy">Privacy notice</Link>.
          </label>
        </div>
        {err('privacyAcknowledged') && <p className="field__error" id={id('privacy-err')}>{err('privacyAcknowledged')}</p>}
      </div>
      {props.offerMarketingOptIn && (
        <div className="check">
          <input id={id('marketing')} name="marketing" type="checkbox" />
          <label htmlFor={id('marketing')}>Also send me occasional practical updates from Fieldwork. Optional.</label>
        </div>
      )}

      <div>
        <button type="submit" className="btn" disabled={status === 'submitting'} aria-disabled={status === 'submitting'}>
          {status === 'submitting' ? (<><span className="spinner" aria-hidden="true" /> Sending…</>) : submitLabel}
        </button>
      </div>
    </form>
  );
}
