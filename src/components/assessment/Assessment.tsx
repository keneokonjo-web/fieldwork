'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { LeadForm } from '@/components/forms/LeadForm';
import { CopyButton } from '@/components/ui/CopyButton';
import { NOT_FOR_AI } from '@/content/corporate/workflows';
import { siteConfig } from '@/config/site';
import { track } from '@/lib/analytics';
import { QUESTIONS, computeReport, isComplete, type Answers } from '@/lib/assessment';

export function Assessment() {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const started = useRef(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  const touch = () => { if (!started.current) { started.current = true; track('assessment_started'); } };
  const setSingle = (id: string, v: string) => { touch(); setAnswers((a) => ({ ...a, [id]: v })); };
  const toggle = (id: string, v: string) => {
    touch();
    setAnswers((a) => { const cur = Array.isArray(a[id]) ? (a[id] as string[]) : []; return { ...a, [id]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] }; });
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isComplete(answers)) {
      setError('Please answer every question, and choose at least one task that takes repeated time.');
      setTimeout(() => errRef.current?.focus(), 0);
      return;
    }
    setError(''); setSubmitted(true); track('assessment_completed', { level: computeReport(answers).level });
    setTimeout(() => reportRef.current?.focus(), 0);
  }

  if (submitted) {
    const r = computeReport(answers);
    return (
      <div className="report stack" ref={reportRef} tabIndex={-1}>
        <p className="eyebrow">Your results</p>
        <h2>{r.levelLabel}</h2>
        <p className="lede">{r.levelText}</p>
        <div className="alert alert--info"><h3>How to read this</h3><p>This is a short self-reported snapshot, not an audit. It suggests where to look first. Anything marked as a recommendation needs checking against how your business really works, and nothing here is legal or regulatory advice.</p></div>

        <h2>Where to practise first</h2>
        <div className="stack">
          {r.workflows.map(({ workflow, reason }) => (
            <div className="card" key={workflow.id}>
              <h3>{workflow.title}</h3>
              <p>{reason}</p>
              <p><strong>AI can help with:</strong> {workflow.aiHelps}</p>
              <p><strong>People keep:</strong> {workflow.peopleKeep}</p>
              <p><strong>A first practice task:</strong> {workflow.practice}</p>
              <p className="small muted"><strong>Watch out for:</strong> {workflow.risk}</p>
            </div>
          ))}
        </div>

        {r.constraintActions.length > 0 && (<><h2>Your constraints, and what to do about them</h2><ul className="ticks">{r.constraintActions.map((c) => <li key={c}>{c}</li>)}</ul></>)}

        <h2>Onboarding</h2>
        <p>{r.onboardingNote}</p>
        <h2>A sensible way to start</h2>
        <p>{r.format}</p>
        <p>{r.ownerNote}</p>

        <h2>What stays with people</h2>
        <ul className="crosses">{NOT_FOR_AI.map((n) => <li key={n}>{n}</li>)}</ul>

        <div className="btn-row no-print">
          <button type="button" className="btn" onClick={() => window.print()}>Print or save as PDF</button>
          <CopyButton text={r.summary} label="Copy a short summary" context="assessment" small={false} />
          <button type="button" className="btn btn--secondary" onClick={() => { setSubmitted(false); window.scrollTo({ top: 0 }); }}>Change my answers</button>
        </div>

        <div className="card no-print" style={{ marginTop: 'var(--s-6)' }}>
          <h3>Want to talk it through?</h3>
          <p className="muted">Send us this summary and a few details. We will reply to arrange a conversation. Your answers are only sent if you submit this form.</p>
          <LeadForm type="demo_request" variant="business" submitLabel="Request a conversation" context={r.summary} location="assessment-results" interest="assessment"
            messageLabel="Anything we should know?" messageHint="For example the main thing you want your team to do better. Your assessment summary is included."
            successTitle="Thank you, we have your request" successBody="We will reply to the email address you gave to arrange a short conversation about your team." offerMarketingOptIn fallbackEmail={siteConfig.email.business} />
        </div>
        <p className="small muted">This assessment is a self-reported guide. It does not measure your actual practices and is not an audit or legal advice. <Link href="/business">About Fieldwork for Business</Link></p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {error && <div ref={errRef} tabIndex={-1} className="alert alert--error" role="alert" style={{ marginBottom: 'var(--s-5)' }}><h3>There is a problem</h3><p>{error}</p></div>}
      {QUESTIONS.map((q, i) => (
        <fieldset className="assess-q" key={q.id}>
          <legend><span className="index" style={{ display: 'block', marginBottom: '.3rem' }}>Question {i + 1} of {QUESTIONS.length}</span>{q.text}</legend>
          {q.hint && <p className="field__hint" style={{ marginBottom: 'var(--s-3)' }}>{q.hint}</p>}
          <div className="assess-opts">
            {q.options.map((o) => {
              const id = `${q.id}-${o.value}`;
              const checked = q.type === 'single' ? answers[q.id] === o.value : Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(o.value);
              return (
                <div className="check" key={o.value}>
                  <input id={id} type={q.type === 'single' ? 'radio' : 'checkbox'} name={q.id} checked={checked} onChange={() => (q.type === 'single' ? setSingle(q.id, o.value) : toggle(q.id, o.value))} />
                  <label htmlFor={id}>{o.label}</label>
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}
      <button type="submit" className="btn">See my results</button>
      <p className="small muted" style={{ marginTop: 'var(--s-4)' }}>Nothing you select is sent anywhere unless you choose to request a conversation afterwards.</p>
    </form>
  );
}
