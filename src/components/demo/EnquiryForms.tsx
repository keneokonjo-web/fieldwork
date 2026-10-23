'use client';
import Link from 'next/link';
import { useId, useState } from 'react';
import { useEnquiries } from '@/demo/store';

const SLOTS = ['09:30', '11:00', '12:30', '14:00', '15:30', '17:00'];
function nextDays(n: number) {
  const out: { value: string; label: string }[] = [];
  const d = new Date(Date.UTC(2026, 9, 24));
  while (out.length < n) { d.setUTCDate(d.getUTCDate() + 1); if (d.getUTCDay() === 0) continue; out.push({ value: d.toISOString().slice(0, 10), label: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }) }); }
  return out;
}
const DAYS = nextDays(7);

interface Props { kind: 'enquiry' | 'viewing'; propertyId?: string; propertyTitle?: string; topic?: string }

/** Enquiry and viewing-request forms. In this demo they save to the staff area in this browser instead of sending anything. */
export function EnquiryForm({ kind, propertyId, propertyTitle, topic }: Props) {
  const uid = useId(); const id = (n: string) => `${uid}-${n}`;
  const { add } = useEnquiries();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget); const g = (k: string) => String(fd.get(k) ?? '').trim();
    const err: Record<string, string> = {};
    if (!g('name')) err.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g('email'))) err.email = 'Enter an email address in the format name@example.com.';
    if (kind === 'viewing' && !g('day')) err.day = 'Choose a day.';
    if (fd.get('consent') !== 'on') err.consent = 'Tick the box to agree to us contacting you about this.';
    setErrors(err); if (Object.keys(err).length) return;
    add({ kind, propertyId, propertyTitle: propertyTitle ?? (topic === 'valuation' ? 'Valuation request' : undefined), name: g('name'), email: g('email'), phone: g('phone') || undefined, message: g('message') || undefined, preferredTime: kind === 'viewing' ? `${g('day')} ${g('slot')}` : undefined });
    setDone(true);
  }

  if (done) {
    return (
      <div className="d-ok" role="status">
        <b>{kind === 'viewing' ? 'Viewing requested.' : 'Thank you, message received.'}</b>
        <p style={{ margin: '0.4rem 0 0' }}>{kind === 'viewing' ? 'An agent would confirm the time before you are told it is booked.' : 'We would reply within one working day.'}</p>
        <p className="d-note" style={{ margin: '0.8rem 0 0' }}>This is a demonstration, so nothing was sent. The request has been added to the <Link className="d-link" href="/demo/admin/enquiries">staff area</Link> in this browser.</p>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} noValidate aria-label={kind === 'viewing' ? 'Request a viewing' : 'Send an enquiry'}>
      <div className="d-field"><label htmlFor={id('name')}>Your name</label><input className="d-input" id={id('name')} name="name" autoComplete="name" aria-invalid={errors.name ? true : undefined} />{errors.name && <p className="d-error">{errors.name}</p>}</div>
      <div className="d-row2">
        <div className="d-field"><label htmlFor={id('email')}>Email</label><input className="d-input" id={id('email')} name="email" type="email" autoComplete="email" aria-invalid={errors.email ? true : undefined} />{errors.email && <p className="d-error">{errors.email}</p>}</div>
        <div className="d-field"><label htmlFor={id('phone')}>Phone (optional)</label><input className="d-input" id={id('phone')} name="phone" type="tel" autoComplete="tel" /></div>
      </div>
      {kind === 'viewing' && (
        <div className="d-row2">
          <div className="d-field"><label htmlFor={id('day')}>Preferred day</label><select className="d-select" id={id('day')} name="day" defaultValue="">
            <option value="" disabled>Choose a day</option>{DAYS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}</select>{errors.day && <p className="d-error">{errors.day}</p>}</div>
          <div className="d-field"><label htmlFor={id('slot')}>Time</label><select className="d-select" id={id('slot')} name="slot" defaultValue={SLOTS[1]}>{SLOTS.map((s) => <option key={s}>{s}</option>)}</select></div>
        </div>
      )}
      <div className="d-field"><label htmlFor={id('message')}>{topic === 'valuation' ? 'About your property' : 'Message (optional)'}</label><textarea className="d-textarea" id={id('message')} name="message" defaultValue={topic === 'valuation' ? '' : kind === 'enquiry' && propertyTitle ? `I would like to know more about ${propertyTitle}.` : ''} /></div>
      <div className="d-check"><input id={id('consent')} name="consent" type="checkbox" /><label htmlFor={id('consent')}>I agree to {`Larkfield & Pryce`} contacting me about this. (Demonstration only.)</label></div>
      {errors.consent && <p className="d-error" style={{ marginTop: '-0.6rem', marginBottom: '1rem' }}>{errors.consent}</p>}
      <button type="submit" className="d-btn" style={{ width: '100%' }}>{kind === 'viewing' ? 'Request viewing' : topic === 'valuation' ? 'Request a valuation' : 'Send enquiry'}</button>
    </form>
  );
}
