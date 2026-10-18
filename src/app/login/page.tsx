import Image from 'next/image';
import { Suspense } from 'react';
import { LoginPanel } from '@/components/auth/LoginPanel';
import { Corners } from '@/components/ui/Corners';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({ title: 'Log in', description: 'Log in or create an account to reach your Fieldwork dashboard as an individual or a business.', path: '/login', noindex: true });

export default function LoginPage() {
  return (
    <section className="auth corners">
      <Corners n="11" letters={['L', 'O', 'G']} />
      <Image className="auth__dots" src="/art/terrain-6-circle-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
      <div className="auth__inner">
        <Image src="/brand/logo/fieldwork-target-light.svg" alt="" width={56} height={56} unoptimized aria-hidden="true" />
        <h1>Welcome back.</h1>
        <p className="muted">Log in to your dashboard, or create an account.</p>
        <Suspense fallback={<p className="muted">Loading…</p>}><LoginPanel /></Suspense>
        <p className="hero__note" style={{ marginInline: 'auto' }}>Sign-in with Google, LinkedIn and Apple is not connected yet. Demo mode keeps a preview session in this browser only.</p>
      </div>
    </section>
  );
}
