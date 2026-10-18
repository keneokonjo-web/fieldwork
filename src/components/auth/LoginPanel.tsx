'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AppleIcon, GoogleIcon, LinkedInIcon } from '@/components/auth/BrandIcons';
import { navigate } from '@/components/ui/PageTransition';
import { track } from '@/lib/analytics';
import { homeFor, useSession, type Role } from '@/lib/session';

type Mode = 'login' | 'signup';
const PROVIDERS = [
  { id: 'google', name: 'Google', Icon: GoogleIcon },
  { id: 'linkedin', name: 'LinkedIn', Icon: LinkedInIcon },
  { id: 'apple', name: 'Apple', Icon: AppleIcon },
] as const;

export function LoginPanel() {
  const params = useSearchParams();
  const initial = params.get('role');
  const next = params.get('next');
  const [role, setRole] = useState<Role>(initial === 'business' ? 'business' : 'individual');
  const [mode, setMode] = useState<Mode>(params.get('mode') === 'signup' ? 'signup' : 'login');
  const [notice, setNotice] = useState<string | null>(null);
  const [name, setName] = useState('');
  const { signIn } = useSession();
  const signup = mode === 'signup';

  function demo(e: React.FormEvent) {
    e.preventDefault();
    signIn({ role, name: name.trim() || 'there', plan: 'free', provider: 'demo' });
    const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : homeFor(role);
    navigate(safeNext);
  }

  return (
    <div className="auth__card">
      <div className="auth__tabs" role="tablist" aria-label="Log in or create an account">
        <button type="button" role="tab" aria-selected={!signup} onClick={() => { setMode('login'); setNotice(null); }}>Log in</button>
        <button type="button" role="tab" aria-selected={signup} onClick={() => { setMode('signup'); setNotice(null); }}>Create account</button>
      </div>

      <div className="auth__role" role="group" aria-label="I am an">
        {(['individual', 'business'] as Role[]).map((r) => (
          <button key={r} type="button" aria-pressed={role === r} onClick={() => { setRole(r); track('login_started', { audience: r }); }}>{r === 'individual' ? 'Individual' : 'Business'}</button>
        ))}
      </div>

      <div className="auth__providers">
        {PROVIDERS.map(({ id, name: n, Icon }) => (
          <button key={id} type="button" className="provider" onClick={() => setNotice(`${n} sign-in is not connected yet. No account is created. Continue in demo mode below to preview your ${role === 'business' ? 'business dashboard' : 'workspace'}.`)}>
            <span className="provider__icon"><Icon /></span>{signup ? 'Sign up' : 'Continue'} with {n}
          </button>
        ))}
      </div>
      {notice && <p className="alert alert--warning" role="status" style={{ textAlign: 'left' }}>{notice}</p>}

      <p className="auth__or"><span>or</span></p>
      <form className="form" onSubmit={demo}>
        <div className="field" style={{ textAlign: 'left' }}>
          <label className="field__label" htmlFor="login-name">Your name {signup ? '' : '(for the demo welcome)'}</label>
          <input id="login-name" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={60} required={signup} />
        </div>
        <button type="submit" className="btn" style={{ width: '100%' }}>{signup ? 'Create demo account' : 'Continue in demo mode'}</button>
      </form>
      <p className="auth__switch">
        {signup ? 'Already have an account? ' : 'New to Fieldwork? '}
        <button type="button" className="auth__link" onClick={() => { setMode(signup ? 'login' : 'signup'); setNotice(null); }}>{signup ? 'Log in' : 'Create an account'}</button>
      </p>
    </div>
  );
}
