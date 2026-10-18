'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { navigate } from '@/components/ui/PageTransition';
import { track } from '@/lib/analytics';
import {
  ASSESS_QUESTIONS, BUSINESS_TYPES, LOGO_PRESETS, OPS_ITEMS, PALETTES, SALES_CHANNELS, WEBSITE_SECTIONS, assessOpportunity, generateIdea, logoSvg, refineIdea, reviveBuilder, EMPTY_BUILDER,
  type BuilderState, type LogoId,
} from '@/lib/builder';
import { useSession } from '@/lib/session';
import { useStoredState } from '@/lib/storage';

export const BUILDER_KEY = 'fw-builder';
const STEPS = ['Choose', 'Find an idea', 'Create the design', 'Build the product', 'Create the website', 'Sales and operations', 'Launch and improve'];
const MAX_LOGO_BYTES = 400 * 1024;

export function BusinessBuilder() {
  const [b, setB] = useStoredState<BuilderState>(BUILDER_KEY, EMPTY_BUILDER, reviveBuilder);
  const [step, setStep] = useState(0);
  const [logoError, setLogoError] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const { session } = useSession();
  const palette = PALETTES.find((p) => p.id === b.brand.palette) ?? PALETTES[0];

  const firstRun = useRef(true);
  useEffect(() => { if (firstRun.current) { firstRun.current = false; return; } headingRef.current?.focus(); }, [step]);
  const patch = (f: (s: BuilderState) => BuilderState) => { if (!started.current) { started.current = true; track('builder_started'); } setB(f); };
  const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const refined = refineIdea(b.idea);
  const assessment = b.assessed ? assessOpportunity(b.answers) : null;
  const canNext = step === 0 ? Boolean(b.type) : step === 1 ? Boolean(b.refined) && b.assessed : step === 2 ? Boolean(b.brand.name.trim() && b.brand.logo) : true;

  function pickType(id: BuilderState['type']) {
    patch((s) => ({ ...s, type: id }));
  }
  function suggest() {
    const i = generateIdea(b.type);
    patch((s) => ({ ...s, type: s.type === 'idea' || !s.type ? 'idea' : s.type, idea: { sells: i.idea, audience: i.audience, problem: i.problem, price: s.idea.price }, refined: '', assessed: false }));
  }
  function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    setLogoError('');
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/^image\/(png|jpeg|svg\+xml|webp)$/.test(f.type)) { setLogoError('Please choose a PNG, JPG, WebP or SVG image.'); return; }
    if (f.size > MAX_LOGO_BYTES) { setLogoError('That file is over 400 KB. Please choose a smaller image.'); return; }
    const r = new FileReader();
    r.onload = () => patch((s) => ({ ...s, brand: { ...s.brand, logo: 'custom', customLogo: String(r.result) } }));
    r.readAsDataURL(f);
  }
  function launch() {
    track('builder_launch_clicked');
    patch((s) => ({ ...s, launched: true }));
    navigate(session ? '/individuals/dashboard' : '/login?role=individual&next=%2Findividuals%2Fdashboard');
  }

  const logoMarkup = (id: LogoId) => ({ __html: logoSvg(id, b.brand.name || b.idea.sells, palette) });
  const chosenLogo = b.brand.logo === 'custom' && b.brand.customLogo
    // eslint-disable-next-line @next/next/no-img-element
    ? <img src={b.brand.customLogo} alt="Your logo" className="bb__logo" />
    : b.brand.logo && b.brand.logo !== 'custom' ? <span className="bb__logo" dangerouslySetInnerHTML={logoMarkup(b.brand.logo)} role="img" aria-label="Chosen logo" /> : null;

  return (
    <div className="learn-shell">
      <nav className="learn-nav" aria-label="Builder steps">
        <div className="learn-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round((step / (STEPS.length - 1)) * 100)} aria-label="Builder progress"><span style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} /></div>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s}><button type="button" onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined} disabled={i > step + (canNext ? 1 : 0)}><span className="num">{i}</span><span>{s}</span></button></li>
          ))}
        </ol>
      </nav>

      <div className="learn-step" role="region" aria-labelledby="bb-heading">
        <h2 id="bb-heading" ref={headingRef} tabIndex={-1}>{step === 0 ? 'What kind of business?' : STEPS[step]}</h2>

        {step === 0 && (
          <>
            <div className="choice-grid" role="group" aria-label="Business types">
              {BUSINESS_TYPES.map((t) => (
                <button key={t.id} type="button" className="choice" aria-pressed={b.type === t.id} onClick={() => pickType(t.id)}><strong>{t.label}</strong><span>{t.blurb}</span></button>
              ))}
            </div>
            <p className="small muted" style={{ marginTop: 'var(--s-4)' }}>Free to start. Everything stays in this browser until you create an account.</p>
          </>
        )}

        {step === 1 && (
          <div className="stack">
            <div className="btn-row"><button type="button" className="btn btn--secondary btn--small" onClick={suggest}>Suggest an idea</button><span className="small muted">Picked from a curated list. This is not an AI model.</span></div>
            <div className="field"><label className="field__label" htmlFor="i-sells">What will you sell?</label><input id="i-sells" className="input" value={b.idea.sells} onChange={(e) => patch((s) => ({ ...s, idea: { ...s.idea, sells: e.target.value }, refined: '' }))} /></div>
            <div className="field"><label className="field__label" htmlFor="i-aud">Who is it for?</label><input id="i-aud" className="input" value={b.idea.audience} onChange={(e) => patch((s) => ({ ...s, idea: { ...s.idea, audience: e.target.value }, refined: '' }))} /></div>
            <div className="field"><label className="field__label" htmlFor="i-prob">What problem does it solve?</label><input id="i-prob" className="input" value={b.idea.problem} onChange={(e) => patch((s) => ({ ...s, idea: { ...s.idea, problem: e.target.value }, refined: '' }))} /></div>
            <div className="field"><label className="field__label" htmlFor="i-price">First price to test <span className="opt">(optional)</span></label><input id="i-price" className="input" value={b.idea.price} onChange={(e) => patch((s) => ({ ...s, idea: { ...s.idea, price: e.target.value }, refined: '' }))} /></div>
            <div className="btn-row">
              <button type="button" className="btn btn--small" onClick={() => patch((s) => ({ ...s, refined: refined.statement }))} disabled={refined.missing.length > 0}>Refine my idea</button>
              {refined.missing.length > 0 && <span className="small muted">Add: {refined.missing.join(', ')}.</span>}
            </div>
            {b.refined && (
              <div className="kv res" role="status"><b>Your idea</b><span>{b.refined}</span></div>
            )}
            {b.refined && <ul className="ticks">{refined.prompts.map((p) => <li key={p}>{p}</li>)}</ul>}

            <h3 style={{ marginTop: 'var(--s-5)' }}>Basic opportunity assessment</h3>
            <p className="small muted">A short self-reported snapshot. It is not market research.</p>
            {ASSESS_QUESTIONS.map((q) => (
              <fieldset key={q.id} className="assess-q" style={{ marginBottom: 'var(--s-4)' }}>
                <legend style={{ fontSize: 'var(--step-1)' }}>{q.text}</legend>
                <div className="assess-opts">
                  {q.options.map((o, i) => (
                    <div className="check" key={o}><input id={`${q.id}-${i}`} type="radio" name={q.id} checked={b.answers[q.id] === i} onChange={() => patch((s) => ({ ...s, answers: { ...s.answers, [q.id]: i }, assessed: false }))} /><label htmlFor={`${q.id}-${i}`}>{o}</label></div>
                  ))}
                </div>
              </fieldset>
            ))}
            <div className="btn-row"><button type="button" className="btn btn--small" disabled={ASSESS_QUESTIONS.some((q) => b.answers[q.id] === undefined)} onClick={() => patch((s) => ({ ...s, assessed: true }))}>Assess my idea</button></div>
            {assessment && (
              <div className="callout" role="status">
                <p><span className="report-level">{assessment.level}</span> <strong>{assessment.score} of {assessment.max}</strong></p>
                <p>{assessment.text}</p>
                {assessment.next.length > 0 && <ul className="ticks">{assessment.next.map((n) => <li key={n}>{n}</li>)}</ul>}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="stack">
            <div className="field"><label className="field__label" htmlFor="b-name">Business name</label><input id="b-name" className="input" value={b.brand.name} onChange={(e) => patch((s) => ({ ...s, brand: { ...s.brand, name: e.target.value } }))} maxLength={40} /><span className="field__hint">Before you commit: search the name, check the domain, and check the trade mark register where you will trade.</span></div>
            <fieldset className="assess-q"><legend style={{ fontSize: 'var(--step-1)' }}>Colours</legend>
              <div className="swatches" role="group" aria-label="Colour palettes">
                {PALETTES.map((p) => (
                  <button key={p.id} type="button" className="swatch" aria-pressed={b.brand.palette === p.id} onClick={() => patch((s) => ({ ...s, brand: { ...s.brand, palette: p.id } }))} title={p.name}>
                    <span style={{ background: p.bg }} /><span style={{ background: p.ink }} /><span style={{ background: p.accent }} /><em className="visually-hidden">{p.name}</em>
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="assess-q"><legend style={{ fontSize: 'var(--step-1)' }}>Choose a logo</legend>
              <div className="logos" role="group" aria-label="Logo options">
                {LOGO_PRESETS.map((id) => (
                  <button key={id} type="button" className="logo-opt" aria-pressed={b.brand.logo === id} onClick={() => patch((s) => ({ ...s, brand: { ...s.brand, logo: id } }))} aria-label={`Logo option ${id}`} dangerouslySetInnerHTML={logoMarkup(id)} />
                ))}
              </div>
              <div className="field" style={{ marginTop: 'var(--s-4)' }}><label className="field__label" htmlFor="b-logo">Or add your own logo <span className="opt">(PNG, JPG, WebP or SVG, under 400 KB)</span></label><input id="b-logo" className="input" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={onLogo} />
                {logoError && <p className="field__error" role="alert">{logoError}</p>}
                <span className="field__hint">Your file stays in this browser. It is not uploaded.</span></div>
            </fieldset>
            {(b.brand.name || chosenLogo) && (
              <div className="bb__card" style={{ background: palette.bg, color: palette.ink, borderColor: palette.ink }} aria-label="Brand preview">
                {chosenLogo}<b style={{ color: palette.ink }}>{b.brand.name || 'Your business'}</b><i style={{ background: palette.accent }} />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="stack">
            <p className="muted">Product: <strong>{b.idea.sells || 'what you sell'}</strong></p>
            <div className="field"><label className="field__label" htmlFor="p-feat">Three benefits a customer gets</label><textarea id="p-feat" className="textarea" value={b.product.features} onChange={(e) => patch((s) => ({ ...s, product: { ...s.product, features: e.target.value } }))} /></div>
            <div className="field"><label className="field__label" htmlFor="p-first">What is the smallest first version you could sell in four weeks?</label><textarea id="p-first" className="textarea" value={b.product.firstVersion} onChange={(e) => patch((s) => ({ ...s, product: { ...s.product, firstVersion: e.target.value } }))} /></div>
          </div>
        )}

        {step === 4 && (
          <div className="stack">
            <fieldset className="assess-q"><legend style={{ fontSize: 'var(--step-1)' }}>Sections for a one-page website</legend>
              <div className="assess-opts">
                {WEBSITE_SECTIONS.map((sec) => (
                  <div className="check" key={sec}><input id={`w-${sec}`} type="checkbox" checked={b.website.sections.includes(sec)} onChange={() => patch((s) => ({ ...s, website: { sections: toggle(s.website.sections, sec) } }))} /><label htmlFor={`w-${sec}`}>{sec}</label></div>
                ))}
              </div>
            </fieldset>
            <div className="bb__site" style={{ background: palette.bg, color: palette.ink, borderColor: palette.ink }} aria-label="Website outline preview">
              <div className="bb__site-bar" style={{ borderColor: palette.ink }}>{chosenLogo}<b>{b.brand.name || 'Your business'}</b></div>
              {b.website.sections.length === 0 ? <p className="small">Choose sections to see the outline.</p> : b.website.sections.map((sec, i) => <div key={sec} className="bb__site-row" style={{ borderColor: palette.ink }}><span>({String(i + 1).padStart(2, '0')})</span>{sec}</div>)}
            </div>
            <p className="small muted">Full website building guidance and expanded generation tools are in the paid builder.</p>
          </div>
        )}

        {step === 5 && (
          <div className="stack">
            <fieldset className="assess-q"><legend style={{ fontSize: 'var(--step-1)' }}>Where will your first ten customers come from?</legend>
              <div className="assess-opts">{SALES_CHANNELS.map((c) => <div className="check" key={c}><input id={`c-${c}`} type="checkbox" checked={b.sales.channels.includes(c)} onChange={() => patch((s) => ({ ...s, sales: { ...s.sales, channels: toggle(s.sales.channels, c) } }))} /><label htmlFor={`c-${c}`}>{c}</label></div>)}</div>
            </fieldset>
            <fieldset className="assess-q"><legend style={{ fontSize: 'var(--step-1)' }}>What do you need in place to operate?</legend>
              <div className="assess-opts">{OPS_ITEMS.map((c) => <div className="check" key={c}><input id={`o-${c}`} type="checkbox" checked={b.sales.ops.includes(c)} onChange={() => patch((s) => ({ ...s, sales: { ...s.sales, ops: toggle(s.sales.ops, c) } }))} /><label htmlFor={`o-${c}`}>{c}</label></div>)}</div>
            </fieldset>
          </div>
        )}

        {step === 6 && (
          <div className="stack">
            <p className="lede">You have the basics. Launch and improve opens your workspace, where you can keep going.</p>
            <div className="cells cells--2">
              <div><p className="index">Free</p><ul className="ticks"><li>Refined business idea</li><li>Basic opportunity assessment</li><li>The builder preview you just used</li><li>A project workspace with a checklist</li></ul></div>
              <div><p className="index">Paid</p><ul className="ticks"><li>Build and develop a complete business</li><li>More detailed market research and validation tools</li><li>Full editable business plan and financial model</li><li>Complete brand and marketing toolkits</li><li>Website building guidance and expanded generation tools</li><li>Ongoing access to the business-building assistant</li></ul></div>
            </div>
            <div className="btn-row"><button type="button" className="btn btn--cobalt" onClick={launch}>Launch and improve</button><Link href="/pricing#tier-builder" className="btn btn--secondary">See the paid builder</Link></div>
            <p className="small muted">{session ? 'You are logged in. Your workspace opens next.' : 'You will be asked to log in or create an account first. Account sign-in is not connected yet, so a demo session is used.'}</p>
          </div>
        )}

        <div className="learn-step__nav">
          <button type="button" className="btn btn--secondary" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</button>
          {step < STEPS.length - 1 && <button type="button" className="btn" onClick={() => setStep((s) => s + 1)} disabled={!canNext}>{canNext ? 'Next' : step === 1 ? 'Refine and assess to continue' : step === 2 ? 'Add a name and logo to continue' : 'Choose a type to continue'}</button>}
        </div>
      </div>
    </div>
  );
}
