'use client';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useStoredState } from '@/lib/storage';
import { LeadForm } from '@/components/forms/LeadForm';
import { PromptBlock } from '@/components/ui/PromptBlock';
import { BRIEF_FIELDS, CHECKS, STARTER_TASKS, WORKED_EXAMPLE } from '@/content/learn/first-workflow';
import { track } from '@/lib/analytics';
import { buildPrompt, wordCount, type Brief } from '@/lib/prompt';
import { buildWorkflowCard } from '@/lib/workflow-card';
import { siteConfig } from '@/config/site';

const STORAGE_KEY = 'fw-learn-v1';
const STEPS = ['Welcome', 'Choose a task', 'Write the brief', 'Run it', 'Check it', 'Keep it'] as const;

interface State {
  step: number; reached: number; taskId: string | null; brief: Brief; answer: string;
  checks: Record<string, boolean>; cardName: string; when: string; reflection: string; completed: boolean;
}
const emptyBrief: Brief = { task: '', audience: '', tone: '', format: '', rules: '', material: '' };
const initial: State = { step: 0, reached: 0, taskId: null, brief: emptyBrief, answer: '', checks: {}, cardName: '', when: '', reflection: '', completed: false };

function revive(p: unknown): State {
  const o = (p && typeof p === 'object' ? p : {}) as Partial<State>;
  return { ...initial, ...o, brief: { ...emptyBrief, ...(o.brief ?? {}) } };
}

export function FirstWorkflow() {
  const [s, setS, clearStored] = useStoredState<State>(STORAGE_KEY, initial, revive);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    headingRef.current?.focus();
  }, [s.step]);

  const task = STARTER_TASKS.find((t) => t.id === s.taskId) ?? null;
  const prompt = useMemo(() => buildPrompt(s.brief), [s.brief]);
  const set = useCallback(<K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v })), [setS]);
  const setBrief = (k: keyof Brief, v: string) => setS((p) => ({ ...p, brief: { ...p.brief, [k]: v } }));

  function go(step: number) {
    setS((p) => ({ ...p, step, reached: Math.max(p.reached, step) }));
    window.scrollTo({ top: document.getElementById('learn-top')?.offsetTop ?? 0, behavior: 'auto' });
  }
  function next() {
    track('free_experience_step_completed', { step: STEPS[s.step] });
    go(Math.min(s.step + 1, STEPS.length - 1));
  }
  function pick(id: string) {
    const t = STARTER_TASKS.find((x) => x.id === id)!;
    setS((p) => ({ ...p, taskId: id, brief: { ...t.brief }, cardName: t.id === 'own-task' ? '' : t.title, checks: {}, answer: '' }));
  }
  function reset() {
    clearStored();
  }

  const briefReady = s.brief.task.trim().length > 3 && s.brief.format.trim().length > 3;
  const unchecked = CHECKS.filter((c) => !s.checks[c.id]);
  const passed = CHECKS.filter((c) => s.checks[c.id]).map((c) => c.id);
  const card = buildWorkflowCard({ name: s.cardName, when: s.when, brief: s.brief, reflection: s.reflection, passedChecks: passed });

  function download() {
    const blob = new Blob([card], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${(s.cardName || 'workflow-card').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.md`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }
  function finish() {
    if (!s.completed) track('free_experience_completed', { task: s.taskId ?? 'none' });
    set('completed', true);
  }

  const progress = Math.round((s.step / (STEPS.length - 1)) * 100);

  return (
    <div className="learn-shell" id="learn-top">
      <nav className="learn-nav" aria-label="Exercise steps">
        <div className="learn-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Exercise progress"><span style={{ width: `${progress}%` }} /></div>
        <ol>
          {STEPS.map((label, i) => (
            <li key={label}>
              <button type="button" onClick={() => go(i)} aria-current={s.step === i ? 'step' : undefined} disabled={i > s.reached + 0 && i > s.step}>
                <span className="num">{i + 1}</span>
                <span>{label}</span>
                {i < s.reached && s.step !== i && <span className="done" aria-label="completed">✓</span>}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="learn-step" role="region" aria-labelledby="step-heading">
        {s.step === 0 && (
          <>
            <p className="eyebrow">01 / Welcome</p>
            <h2 id="step-heading" ref={headingRef} tabIndex={-1}>Turn a messy task into a workflow you can reuse</h2>
            <p className="lede">In about 15 minutes you will take one real task, write a clear brief for an AI tool, check what comes back, and keep a workflow card you can use again.</p>
            <div className="grid grid--2" style={{ marginBlock: 'var(--s-5)' }}>
              <div className="card card--flat"><h3>What you will do</h3>
                <ul className="ticks"><li>Pick a task (or bring your own)</li><li>Write a five-part brief</li><li>Run it in an AI tool of your choice</li><li>Check the result properly</li><li>Save a workflow card</li></ul></div>
              <div className="card card--flat"><h3>What you need</h3>
                <ul className="ticks"><li>Any AI chat tool. Free versions are fine. We do not endorse a particular one.</li><li>A phone or computer. The page is light and works on slow connections.</li><li>No account with Fieldwork.</li></ul></div>
            </div>
            <div className="callout callout--safe"><p><strong>What stays on your device.</strong> Everything you type here is saved only in this browser so you can come back. Nothing is sent to Fieldwork unless you choose to join the email list at the end. This page does not talk to an AI model. You will use your own tool for that step.</p></div>
            <div className="learn-step__nav"><span /><button type="button" className="btn" onClick={() => { track('free_experience_started'); next(); }}>Start the exercise</button></div>
          </>
        )}

        {s.step === 1 && (
          <>
            <p className="eyebrow">02 / Choose a task</p>
            <h2 id="step-heading" ref={headingRef} tabIndex={-1}>Pick a task to practise on</h2>
            <p>Choose the one closest to your life. Each comes with realistic material so you can start straight away. Or choose your own and paste in your material.</p>
            <div className="choice-grid" role="group" aria-label="Starter tasks">
              {STARTER_TASKS.map((t) => (
                <button key={t.id} type="button" className="choice" aria-pressed={s.taskId === t.id} onClick={() => pick(t.id)}>
                  <strong>{t.title}</strong><span>{t.blurb}</span>
                </button>
              ))}
            </div>
            {task && (
              <div className="callout" aria-live="polite">
                <p><strong>The starting problem.</strong> {task.problem}</p>
                {task.fictionalNote && <p className="small muted">{task.fictionalNote}</p>}
              </div>
            )}
            <div className="learn-step__nav">
              <button type="button" className="btn btn--secondary" onClick={() => go(0)}>Back</button>
              <button type="button" className="btn" onClick={next} disabled={!task} aria-disabled={!task}>{task ? 'Write the brief' : 'Choose a task to continue'}</button>
            </div>
          </>
        )}

        {s.step === 2 && task && (
          <>
            <p className="eyebrow">03 / Write the brief</p>
            <h2 id="step-heading" ref={headingRef} tabIndex={-1}>Brief the tool like a new colleague</h2>
            <p>A good brief has five parts. Edit the starting points below. The prompt on the right updates as you type.</p>
            <div className="form">
              {BRIEF_FIELDS.map((f) => (
                <div className="field" key={f.key}>
                  <label className="field__label" htmlFor={`b-${f.key}`}>{f.label}</label>
                  {f.multiline
                    ? <textarea id={`b-${f.key}`} className="textarea" style={{ minHeight: '5.5rem' }} value={s.brief[f.key]} onChange={(e) => setBrief(f.key, e.target.value)} aria-describedby={`b-${f.key}-h`} />
                    : <input id={`b-${f.key}`} className="input" value={s.brief[f.key]} onChange={(e) => setBrief(f.key, e.target.value)} aria-describedby={`b-${f.key}-h`} />}
                  <p className="field__hint" id={`b-${f.key}-h`}>{f.hint}</p>
                </div>
              ))}
              <div className="field">
                <label className="field__label" htmlFor="b-material">{task.materialLabel}</label>
                <textarea id="b-material" className="textarea" style={{ minHeight: '10rem' }} value={s.brief.material} onChange={(e) => setBrief('material', e.target.value)} aria-describedby="b-material-h" />
                <p className="field__hint" id="b-material-h">This is the real input the tool should work from. Remove names, phone numbers and anything confidential first. {wordCount(s.brief.material)} words.</p>
              </div>
            </div>
            <h3 style={{ marginTop: 'var(--s-6)' }}>Your prompt</h3>
            <PromptBlock title="Ready to copy" text={prompt} context="brief" />
            {!briefReady && <p className="alert alert--info" role="status">Add a task and a shape for the answer to continue.</p>}
            <div className="learn-step__nav">
              <button type="button" className="btn btn--secondary" onClick={() => go(1)}>Back</button>
              <button type="button" className="btn" onClick={next} disabled={!briefReady} aria-disabled={!briefReady}>Run it in your AI tool</button>
            </div>
          </>
        )}

        {s.step === 3 && (
          <>
            <p className="eyebrow">04 / Run it</p>
            <h2 id="step-heading" ref={headingRef} tabIndex={-1}>Run it in the AI tool you already use</h2>
            <ol className="steps">
              <li><h3>Copy your prompt</h3><p>Use the button below. It copies the whole brief, including your material.</p></li>
              <li><h3>Open your AI tool and paste it in</h3><p>Any general chat assistant will do. A free account is enough. If you have no account, many tools allow a few messages without signing in.</p></li>
              <li><h3>Send it and read the answer once, slowly</h3><p>If the answer stops part-way, reply with the single word “continue”.</p></li>
              <li><h3>Optional: paste the answer here</h3><p>It stays on your device and makes the next step easier because you can see it beside the checks.</p></li>
            </ol>
            <PromptBlock title="Your prompt" text={prompt} context="run" />
            <div className="field">
              <label className="field__label" htmlFor="answer">The tool’s answer <span className="opt">(optional)</span></label>
              <textarea id="answer" className="textarea" style={{ minHeight: '9rem' }} value={s.answer} onChange={(e) => set('answer', e.target.value)} />
            </div>
            <div className="callout"><p><strong>Before you paste anything real.</strong> Do not paste passwords, bank details, medical information or other people’s private details. If your work has rules about AI tools, follow them first. When in doubt, replace names with [CLIENT] or [ADDRESS].</p></div>
            <div className="learn-step__nav">
              <button type="button" className="btn btn--secondary" onClick={() => go(2)}>Back</button>
              <button type="button" className="btn" onClick={next}>Check the result</button>
            </div>
          </>
        )}

        {s.step === 4 && (
          <>
            <p className="eyebrow">05 / Check it</p>
            <h2 id="step-heading" ref={headingRef} tabIndex={-1}>Never use the first answer unchecked</h2>
            <p>AI tools write fluently whether or not they are right. Work through each check against your own material. Tick only what you have really verified.</p>
            {s.answer.trim() && (
              <details style={{ marginBlock: 'var(--s-4)' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 650 }}>Show the answer you pasted</summary>
                <pre className="prompt" style={{ padding: 'var(--s-4)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontFamily: 'inherit' }}>{s.answer}</pre>
              </details>
            )}
            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="visually-hidden">Checks</legend>
              <div className="stack">
                {CHECKS.map((c) => (
                  <div className="card card--flat" key={c.id}>
                    <div className="check">
                      <input id={`c-${c.id}`} type="checkbox" checked={Boolean(s.checks[c.id])} onChange={(e) => setS((p) => ({ ...p, checks: { ...p.checks, [c.id]: e.target.checked } }))} />
                      <label htmlFor={`c-${c.id}`} style={{ fontSize: 'var(--step-0)', fontWeight: 650 }}>{c.label}</label>
                    </div>
                    <p className="small muted" style={{ marginLeft: '2.1rem' }}><strong>How to check:</strong> {c.how}</p>
                  </div>
                ))}
              </div>
            </fieldset>
            <div aria-live="polite" style={{ marginTop: 'var(--s-5)' }}>
              {unchecked.length === 0 ? (
                <div className="alert alert--success"><h3>All six checks ticked</h3><p>Good. If you really did verify each one, the result is ready to use.</p></div>
              ) : (
                <>
                  <h3>Fix what is not ticked yet</h3>
                  <p>Copy a follow-up prompt below into the same conversation, then check again.</p>
                  {unchecked.map((c) => <PromptBlock key={c.id} title={`Fix: ${c.label.replace(/\.$/, '')}`} text={c.fixPrompt} context="fix" />)}
                </>
              )}
            </div>
            <details style={{ marginTop: 'var(--s-6)' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 650, fontSize: 'var(--step-1)' }}>See a finished example</summary>
              <div className="stack" style={{ marginTop: 'var(--s-4)' }}>
                <p className="alert alert--info">{WORKED_EXAMPLE.intro}</p>
                <div className="compare">
                  <div className="compare__col"><h3>First draft (illustrative)</h3><pre>{WORKED_EXAMPLE.firstDraft}</pre></div>
                  <div className="compare__col"><h3>After checking and one follow-up</h3><pre>{WORKED_EXAMPLE.improved}</pre></div>
                </div>
                <h3>What the checks found</h3>
                <ul className="ticks">{WORKED_EXAMPLE.found.map((f) => <li key={f.check}><strong>{f.check}.</strong> {f.finding}</li>)}</ul>
                <PromptBlock title="The follow-up prompt" text={WORKED_EXAMPLE.followUp} context="example" />
                <p><strong>{WORKED_EXAMPLE.lesson}</strong></p>
              </div>
            </details>
            <div className="learn-step__nav">
              <button type="button" className="btn btn--secondary" onClick={() => go(3)}>Back</button>
              <button type="button" className="btn" onClick={next}>Save as a workflow</button>
            </div>
          </>
        )}

        {s.step === 5 && (
          <>
            <p className="eyebrow">06 / Keep it</p>
            <h2 id="step-heading" ref={headingRef} tabIndex={-1}>Save this as a workflow you can reuse</h2>
            <p>A workflow is a brief and a set of checks you trust. Name it, say when you will use it, and note what you had to fix. Next time it takes minutes.</p>
            <div className="form">
              <div className="form-row form-row--2">
                <div className="field"><label className="field__label" htmlFor="card-name">Name this workflow</label><input id="card-name" className="input" value={s.cardName} onChange={(e) => set('cardName', e.target.value)} /></div>
                <div className="field"><label className="field__label" htmlFor="card-when">When will you use it?</label><input id="card-when" className="input" value={s.when} placeholder="e.g. every Friday afternoon" onChange={(e) => set('when', e.target.value)} /></div>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="card-reflection">What did you have to fix after checking?</label>
                <textarea id="card-reflection" className="textarea" value={s.reflection} onChange={(e) => set('reflection', e.target.value)} />
                <p className="field__hint">One or two lines. This is what makes the next brief better.</p>
              </div>
            </div>
            <h3 style={{ marginTop: 'var(--s-6)' }}>Your workflow card</h3>
            <PromptBlock title="Workflow card (Markdown)" text={card} context="card" />
            <div className="btn-row">
              <button type="button" className="btn" onClick={download}>Download as a file</button>
              <button type="button" className="btn btn--secondary" onClick={() => window.print()}>Print or save as PDF</button>
            </div>

            {!s.completed ? (
              <div className="learn-step__nav">
                <button type="button" className="btn btn--secondary" onClick={() => go(4)}>Back</button>
                <button type="button" className="btn" onClick={finish}>I have finished the exercise</button>
              </div>
            ) : (
              <section aria-labelledby="done-heading" className="stack" style={{ marginTop: 'var(--s-7)' }}>
                <div className="alert alert--success" role="status"><h3 id="done-heading">Exercise finished</h3><p>You have a brief, a set of checks and a workflow card. Use it on a real task this week. That is the point of the exercise.</p></div>
                <h3>Where next</h3>
                <div className="grid grid--3">
                  <Link className="card card--link" href="/field-notes/five-part-brief"><h3>Field Notes</h3><p>Go deeper on writing a brief, then on checking answers.</p></Link>
                  <Link className="card card--link" href="/pricing"><h3>What is planned</h3><p>Guided projects and a membership are in development. See honest status and test prices.</p></Link>
                  <Link className="card card--link" href="/business/real-estate"><h3>Working in property?</h3><p>See how teams practise the same method on listings and enquiries.</p></Link>
                </div>
                <div className="card">
                  <h3>Want the next exercise when it is ready?</h3>
                  <p className="muted">Optional. We will email you when new exercises and guided projects are available. Nothing else.</p>
                  <LeadForm type="newsletter" variant="email" submitLabel="Notify me" interest="free-exercise-complete" location="free-exercise-complete"
                    successTitle="You are on the list" successBody="Thank you. We will email you when the next exercise is ready. You can unsubscribe at any time." fallbackEmail={siteConfig.email.general} />
                </div>
              </section>
            )}
            <p className="small muted" style={{ marginTop: 'var(--s-6)' }}>
              Your entries are saved only in this browser. <button type="button" className="link-arrow" style={{ background: 'none', border: 0, font: 'inherit', cursor: 'pointer', padding: 0 }} onClick={reset}>Clear my entries and start again</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
