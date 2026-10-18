import Link from 'next/link';
import type { Role } from '@/lib/session';

/** Shown instead of a dashboard when nobody is signed in (or the wrong kind of account is). */
export function Gate({ role, next }: { role: Role; next: string }) {
  return (
    <section className="page-hero" style={{ minHeight: '60vh' }}>
      <div className="container">
        <p className="eyebrow">{role === 'business' ? 'Business dashboard' : 'Your workspace'}</p>
        <h1 style={{ fontSize: 'var(--step-4)' }}>Log in to see it.</h1>
        <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
          <Link href={`/login?role=${role}&next=${encodeURIComponent(next)}`} className="btn">Log in</Link>
          <Link href={role === 'business' ? '/business' : '/individuals'} className="btn btn--secondary">Back</Link>
        </div>
      </div>
    </section>
  );
}
