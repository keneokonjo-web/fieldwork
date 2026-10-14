import { describe, expect, it } from 'vitest';
import { computeReport, isComplete, scoreReadiness } from '../src/lib/assessment';

const base = { usage: 'none', rules: 'none', workflows: ['listings', 'comms', 'research', 'marketing'], constraints: ['data', 'access'], onboarding: 'slow', size: '6-15', market: 'nigeria', owner: 'nobody' };

describe('assessment', () => {
  it('scores readiness from usage and rules', () => {
    expect(scoreReadiness(base)).toBe(0);
    expect(scoreReadiness({ ...base, usage: 'approved', rules: 'trained' })).toBe(6);
  });
  it('maps score to levels', () => {
    expect(computeReport(base).level).toBe('foundation');
    expect(computeReport({ ...base, usage: 'mostly', rules: 'written' }).level).toBe('emerging');
    expect(computeReport({ ...base, usage: 'approved', rules: 'written' }).level).toBe('ready');
  });
  it('limits and orders workflows, preferring listings first', () => {
    const r = computeReport(base);
    expect(r.workflows).toHaveLength(3);
    expect(r.workflows[0].workflow.id).toBe('listings');
    expect(r.workflows.map((w) => w.workflow.id)).not.toContain('marketing');
  });
  it('gives constraint actions and does not claim the onboarding platform exists', () => {
    const r = computeReport(base);
    expect(r.constraintActions).toHaveLength(2);
    expect(r.onboardingNote).toMatch(/not yet available/);
  });
  it('requires all single questions and at least one workflow', () => {
    expect(isComplete(base)).toBe(true);
    expect(isComplete({ ...base, market: undefined })).toBe(false);
    expect(isComplete({ ...base, workflows: [] })).toBe(false);
  });
});
