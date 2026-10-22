import { describe, expect, it } from 'vitest';
import { validateLead } from '../src/lib/validation';
import { toRecord } from '../src/lib/leads';
import { rateLimited } from '../src/lib/rate-limit';

describe('validateLead', () => {
  it('lowercases and trims the email address', () => {
    const r = validateLead({ type: 'demo_request', email: 'A@Example.com ', name: 'A', company: 'C', market: 'nigeria', message: 'Hello there friends', privacyAcknowledged: true });
    expect(r.ok && r.data.email).toBe('a@example.com');
  });
  it('rejects bad email and missing consent with useful messages', () => {
    const r = validateLead({ type: 'contact', email: 'nope', name: 'A', message: 'Hello there friends', privacyAcknowledged: false });
    expect(r.ok).toBe(false);
    if (!r.ok) { expect(r.errors.email).toMatch(/format/); expect(r.errors.privacyAcknowledged).toBeTruthy(); }
  });
  it('requires business fields for demo requests', () => {
    const r = validateLead({ type: 'demo_request', email: 'a@b.co', privacyAcknowledged: true });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors)).toEqual(expect.arrayContaining(['name', 'company', 'message', 'market']));
  });
  it('workshop interest needs no message but does need a company and market', () => {
    const ok = validateLead({ type: 'workshop_interest', email: 'a@b.co', name: 'A', company: 'C', market: 'uk', privacyAcknowledged: true });
    expect(ok.ok).toBe(true);
    const bad = validateLead({ type: 'workshop_interest', email: 'a@b.co', name: 'A', privacyAcknowledged: true });
    expect(bad.ok).toBe(false);
  });
  it('the retired lead types are no longer accepted', () => {
    expect(validateLead({ type: 'newsletter', email: 'a@b.co', privacyAcknowledged: true }).ok).toBe(false);
  });
  it('rejects unknown types and non-objects', () => {
    expect(validateLead({ type: 'x' }).ok).toBe(false);
    expect(validateLead(null).ok).toBe(false);
  });
  it('strips control characters and truncates', () => {
    const r = validateLead({ type: 'contact', email: 'a@b.co', name: 'N\u0000ame', message: 'x'.repeat(5000), privacyAcknowledged: true });
    expect(r.ok && r.data.name).toBe('Name');
    expect(r.ok && r.data.message?.length).toBe(4000);
  });
});

describe('lead record', () => {
  it('builds a CRM-friendly record with consent evidence', () => {
    const v = validateLead({ type: 'demo_request', email: 'a@b.co', name: 'A', company: 'C', market: 'uk', message: 'Hello there friends', privacyAcknowledged: true, attribution: { utm_source: 'linkedin' } });
    if (!v.ok) throw new Error('invalid');
    const rec = toRecord(v.data, new Date('2026-01-01T00:00:00Z'));
    expect(rec.crm).toEqual({ lifecycleStage: 'lead', leadSource: 'linkedin', audience: 'business' });
    expect(rec.consent.privacyAcknowledged).toBe(true);
  });
});

describe('rate limiter', () => {
  it('blocks after the limit within the window', () => {
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) expect(rateLimited('t', 3, 1000, now + i)).toBe(false);
    expect(rateLimited('t', 3, 1000, now + 5)).toBe(true);
    expect(rateLimited('t', 3, 1000, now + 5000)).toBe(false);
  });
});
