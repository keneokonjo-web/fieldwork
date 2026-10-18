import { Suspense } from 'react';
import { LoginPanel } from '@/components/auth/LoginPanel';
import { Corners } from '@/components/ui/Corners';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({ title: 'Log in', description: 'Log in to your Fieldwork dashboard as an individual or a business.', path: '/login', noindex: true });

export default function LoginPage() {
  return (
    <section className="page-hero corners" style={{ minHeight: 'calc(100svh - var(--bar-h))' }}>
      <Corners n="11" letters={['L', 'O', 'G']} />
      <div className="container">
        <p className="eyebrow">Log in</p>
        <h1>Welcome back.</h1>
        <div style={{ maxWidth: '40rem' }}>
          <Suspense fallback={<p className="muted">Loading…</p>}><LoginPanel /></Suspense>
          <p className="hero__note">Sign-in with Google, LinkedIn and Apple is not connected yet. Demo mode keeps a preview session in this browser only.</p>
        </div>
      </div>
    </section>
  );
}
