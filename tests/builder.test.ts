import { describe, expect, it } from 'vitest';
import { ASSESS_QUESTIONS, EMPTY_BUILDER, assessOpportunity, checklist, generateIdea, logoSvg, refineIdea, reviveBuilder } from '../src/lib/builder';
import { businessPlans, businessPilot, businessAddOns } from '../src/content/pricing';

describe('idea generator', () => {
  it('returns an idea of the requested type, deterministically for a fixed random source', () => {
    const a = generateIdea('software', () => 0); const b = generateIdea('software', () => 0);
    expect(a).toEqual(b); expect(a.type).toBe('software');
  });
  it('picks from any type for "help me find an idea"', () => {
    expect(generateIdea('idea', () => 0.99).idea.length).toBeGreaterThan(10);
  });
});
describe('refineIdea', () => {
  it('lists missing parts and builds nothing until they are filled', () => {
    const r = refineIdea({ sells: '', audience: 'freelancers', problem: '', price: '' });
    expect(r.statement).toBe(''); expect(r.missing).toEqual(['what you sell', 'the problem it solves']);
  });
  it('builds a statement from the three parts', () => {
    const r = refineIdea({ sells: 'Monthly bookkeeping', audience: 'freelancers', problem: 'They avoid their accounts until tax time', price: '£40 a month' });
    expect(r.statement).toBe('The problem: they avoid their accounts until tax time. For freelancers, we offer monthly bookkeeping at around £40 a month.');
  });
});
describe('assessOpportunity', () => {
  it('scores from 0 to the maximum and picks the weakest areas', () => {
    expect(assessOpportunity({}).level).toBe('Early');
    const all = Object.fromEntries(ASSESS_QUESTIONS.map((q) => [q.id, 2]));
    const strong = assessOpportunity(all); expect(strong.score).toBe(12); expect(strong.level).toBe('Strong start'); expect(strong.next).toEqual([]);
    const mixed = assessOpportunity({ ...all, reach: 0, edge: 1 }); expect(mixed.next.length).toBe(2); expect(mixed.level).toBe('Promising');
  });
});
describe('workspace checklist', () => {
  it('starts all not started and moves as steps are done', () => {
    expect(checklist(EMPTY_BUILDER).every((c) => c.status === 'not-started')).toBe(true);
    const b = reviveBuilder({ refined: 'x', assessed: true, product: { features: 'a', firstVersion: '' } });
    const c = Object.fromEntries(checklist(b).map((i) => [i.id, i.status]));
    expect(c.idea).toBe('complete'); expect(c.model).toBe('in-progress'); expect(c.brand).toBe('not-started'); expect(c.launch).toBe('not-started');
  });
  it('survives junk in storage', () => { expect(reviveBuilder('junk').type).toBeNull(); expect(reviveBuilder(null).sales.channels).toEqual([]); });
});
describe('logo presets', () => {
  it('uses only the first letter of the name, escaped to a safe character', () => {
    expect(logoSvg('monogram-circle', '<script>', { bg: '#fff', ink: '#000', accent: '#00f' })).not.toContain('<script');
  });
});
describe('business pricing data', () => {
  it('has the founder-set GBP and NGN prices', () => {
    const by = Object.fromEntries(businessPlans.map((p) => [p.id, p]));
    expect(by.starter.price?.uk).toBe('£25'); expect(by.starter.price?.ng).toBe('₦30,000'); expect(by.starter.minSpend).toBeUndefined();
    expect(by.team.price?.uk).toBe('£18'); expect(by.team.price?.ng).toBe('₦22,000'); expect(by.team.minSpend?.uk).toBe('£200 a month');
    expect(by.bundle.price?.uk).toBe('£12'); expect(by.bundle.minSpend?.uk).toBe('£500 a month');
    expect(by.enterprise.quoted).toBe(true); expect(by.enterprise.price).toBeUndefined();
    expect(businessPilot.price.uk).toBe('£250 to £500');
    expect(businessAddOns.map((a) => a.price.uk)).toEqual(['£150', '£350 to £600', '£500 to £1,500', 'Quoted separately']);
  });
  it('prices every market for every priced plan', () => {
    for (const p of businessPlans.filter((x) => !x.quoted)) for (const m of ['uk', 'ng', 'us'] as const) expect(p.price?.[m]).toBeTruthy();
  });
});
