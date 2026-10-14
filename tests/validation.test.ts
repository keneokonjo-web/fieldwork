import { describe, expect, it } from 'vitest';
import { validateLead } from '../src/lib/validation';
import { toRecord } from '../src/lib/leads';
import { rateLimited } from '../src/lib/rate-limit';
import { buildPrompt } from '../src/lib/prompt';
import { buildWorkflowCard } from '../src/lib/workflow-card';

describe('validateLead', () => {
  it('accepts a newsletter signup', () => {
    const r = validateLead({ type: 'newsletter', email: 'A@Example.com ', privacyAcknowledged: true });
    expect(r.ok && r.data.email).toBe('a@example.com');
  });
  it('rejects bad email and missing consent with useful messages', () => {
    const r = validateLead({ type: 'newsletter', email: 'nope', privacyAcknowledged: false });
    expect(r.ok).toBe(false);
    if (!r.ok) { expect(r.errors.email).toMatch(/format/); expect(r.errors.privacyAcknowledged).toBeTruthy(); }
  });
  it('requires business fields for enquiries', () => {
    const r = validateLead({ type: 'business_enquiry', email: 'a@b.co', privacyAcknowledged: true });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors)).toEqual(expect.arrayContaining(['name', 'company', 'message', 'market']));
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

describe('prompt builder', () => {
  const brief = { task: 'Write an update', audience: 'My manager', tone: 'Plain', format: 'Bullets', rules: '- Keep dates exact\n\nNo filler', material: 'Mon: call' };
  it('includes every part and the no-invention rules', () => {
    const p = buildPrompt(brief);
    expect(p).toContain('Task: Write an update');
    expect(p).toContain('- Keep dates exact');
    expect(p).toContain('- No filler');
    expect(p).toContain('Do not invent facts');
    expect(p).toContain('Mon: call');
  });
  it('shows a placeholder when material is empty', () => {
    expect(buildPrompt({ ...brief, material: '' })).toContain('[PASTE YOUR MATERIAL HERE]');
  });
  it('builds a workflow card with checked items', () => {
    const c = buildWorkflowCard({ name: 'Weekly update', when: 'Fridays', brief, reflection: '', passedChecks: ['facts'] });
    expect(c).toContain('# Workflow card: Weekly update');
    expect(c).toContain('- [x] Every date, name and amount');
    expect(c).toContain('- [ ] Nothing was added');
  });
});
