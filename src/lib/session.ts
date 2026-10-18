'use client';
import { useStoredState } from '@/lib/storage';

/**
 * Demo session, stored in this browser only. There is no account system yet: Google, LinkedIn and Apple sign-in are not connected.
 * The session lets the dashboards be previewed and keeps the Build a business workspace on the device.
 */
export type Role = 'individual' | 'business';
export type Provider = 'google' | 'linkedin' | 'apple' | 'demo';
export interface Session { role: Role; name: string; plan: 'free' | 'paid'; provider: Provider }

export const SESSION_KEY = 'fw-session';
const revive = (p: unknown): Session | null => {
  const o = p as Partial<Session> | null;
  if (!o || (o.role !== 'individual' && o.role !== 'business')) return null;
  return { role: o.role, name: typeof o.name === 'string' && o.name.trim() ? o.name.trim().slice(0, 60) : 'there', plan: o.plan === 'paid' ? 'paid' : 'free', provider: (['google', 'linkedin', 'apple', 'demo'] as const).includes(o.provider as Provider) ? (o.provider as Provider) : 'demo' };
};

export function useSession() {
  const [session, setSession, clear] = useStoredState<Session | null>(SESSION_KEY, null, revive);
  return {
    session,
    signIn: (s: Session) => setSession(s),
    setPlan: (plan: 'free' | 'paid') => setSession((prev) => (prev ? { ...prev, plan } : prev)),
    signOut: clear,
  };
}

export const homeFor = (role: Role) => (role === 'business' ? '/business/dashboard' : '/individuals/dashboard');
