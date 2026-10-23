'use client';
import { useCallback, useMemo } from 'react';
import { useStoredState } from '@/lib/storage';
import { SEED_PROPERTIES, type Property } from '@/demo/data';

/** The demo keeps everything in this browser only, so each visitor can add, edit and delete without affecting anyone else. */
const KEY = 'fw-demo-properties-v1';
const ENQ_KEY = 'fw-demo-enquiries-v1';
const ADMIN_KEY = 'fw-demo-admin-v1';

const reviveProps = (p: unknown): Property[] => (Array.isArray(p) ? (p as Property[]) : SEED_PROPERTIES);

export function useProperties() {
  const [stored, setStored, clear] = useStoredState<Property[]>(KEY, SEED_PROPERTIES, reviveProps);
  const all = stored;
  const published = useMemo(() => all.filter((p) => p.published), [all]);

  const save = useCallback((p: Property) => {
    setStored((prev) => (prev.some((x) => x.id === p.id) ? prev.map((x) => (x.id === p.id ? p : x)) : [p, ...prev]));
  }, [setStored]);
  const remove = useCallback((id: string) => setStored((prev) => prev.filter((x) => x.id !== id)), [setStored]);
  const patch = useCallback((id: string, change: Partial<Property>) => setStored((prev) => prev.map((x) => (x.id === id ? { ...x, ...change } : x))), [setStored]);
  const reset = useCallback(() => clear(), [clear]);
  return { all, published, save, remove, patch, reset };
}

export function useProperty(id: string) {
  const { all } = useProperties();
  return all.find((p) => p.id === id);
}

export interface DemoEnquiry {
  id: string;
  kind: 'enquiry' | 'viewing';
  propertyId?: string;
  propertyTitle?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  preferredTime?: string;
  status: 'new' | 'acknowledged' | 'confirmed';
  at: string;
}

export function useEnquiries() {
  const [list, setList, clear] = useStoredState<DemoEnquiry[]>(ENQ_KEY, [], (p) => (Array.isArray(p) ? (p as DemoEnquiry[]) : []));
  const add = useCallback((e: Omit<DemoEnquiry, 'id' | 'status' | 'at'>) => {
    setList((prev) => [{ ...e, id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`, status: e.kind === 'viewing' ? 'new' : 'acknowledged', at: new Date().toISOString() }, ...prev]);
  }, [setList]);
  const confirm = useCallback((id: string) => setList((prev) => prev.map((x) => (x.id === id ? { ...x, status: 'confirmed' } : x))), [setList]);
  const remove = useCallback((id: string) => setList((prev) => prev.filter((x) => x.id !== id)), [setList]);
  return { list, add, confirm, remove, clear };
}

export function useAdminSession() {
  const [on, setOn, clear] = useStoredState<boolean>(ADMIN_KEY, false, (p) => p === true);
  return { signedIn: on, signIn: () => setOn(true), signOut: () => clear() };
}

