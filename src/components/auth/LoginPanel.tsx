'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { navigate } from '@/components/ui/PageTransition';
import { track } from '@/lib/analytics';
import { homeFor, useSession, type Provider, type Role } from '@/lib/session';

const PROVIDERS: { id: Exclude<Provider, 'demo'>; label: string; glyph: string }[] = [
  { id: 'google', label: 'Continue with Google', glyph: 'G' },
  { id: 'linkedin', label: 'Continue with LinkedIn', glyph: 'in' },
  { id: 'apple', label: 'Continue with Apple', glyph: 'A' },
];

export function LoginPanel() {
  const params = useSearchParams();
  const initial = params.get('role');
  const next = params.get('next');
  const [pick, setPick] = useState<Role | null>(initial === 'business' || initial === 'individual' ? initial : null);
  const [notice, setNotice] = useState<string | null>(null);
  const [name, setName] = useState('');
  const { signIn } = useSession();
  const role = pick;

  function demo(e: React.FormEvent) {
    e.preventDefault();
    if (!role) return;
    signIn({ role, name: name.trim() || 'there', plan: 'free', provider: 'demo' });
    const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : homeFor(role);
    navigate(safeNext);
  }

  if (!role) {
    return (
      <div className="entry__choices" role="group" aria-label="Choose how you will use Fieldwork">
        <button type="button" className="entry__choice entry__button" onClick={() => { setPick('individual'); track('login_started', { audience: 'individual' }); }}>
          <span className="index">01</span><span className="entry__name">Individual</span><span className="entry__line">Learn AI on your own work, or build a business.</span>
        </button>
        <button type="button" className="entry__choice entry__choice--ink entry__button" onClick={() => { setPick('business'); track('login_started', { audience: 'business' }); }}>
          <span className="index">02</span><span className="entry__name">Business</span><span className="entry__line">Your team’s course, library and progress.</span>
        </button>
      </div>
    );
  }
  return (
    <div className="login">
      <p className="index">{role === 'business' ? 'Business' : 'Individual'}</p>
      <h2 style={{ fontSize: 'var(--step-3)' }}>Log in</h2>
      <div className="providers">
        {PROVIDERS.map((p) => (
          <button key={p.id} type="button" className="provider" onClick={() => setNotice(`${p.label.replace('Continue with ', '')} sign-in is not connected yet. No account is created. You can continue in demo mode below to preview your ${role === 'business' ? 'business' : 'workspace'} dashboard.`)}>
            <span className="provider__glyph" aria-hidden="true">{p.glyph}</span>{p.label}
          </button>
        ))}
      </div>
      {notice && <p className="alert alert--warning" role="status">{notice}</p>}
      <form className="form" onSubmit={demo} style={{ marginTop: 'var(--s-5)' }}>
        <div className="field">
          <label className="field__label" htmlFor="login-name">Your name (for the demo welcome)</label>
          <input id="login-name" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={60} />
          <span className="field__hint">Stored in this browser only.</span>
        </div>
        <div className="btn-row">
          <button type="submit" className="btn">Continue in demo mode</button>
          <button type="button" className="btn btn--secondary" onClick={() => { setPick(null); setNotice(null); }}>Back</button>
        </div>
      </form>
    </div>
  );
}
