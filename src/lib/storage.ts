'use client';
import { useCallback, useMemo, useSyncExternalStore } from 'react';

/** localStorage with an in-memory fallback (private windows, blocked storage). Safe on the server. */
const memory = new Map<string, string>();
const listeners = new Set<() => void>();

function read(key: string): string | null {
  try { const v = window.localStorage.getItem(key); if (v !== null) return v; } catch { /* fall through */ }
  return memory.get(key) ?? null;
}
function write(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key); else window.localStorage.setItem(key, value);
  } catch { /* use memory only */ }
  if (value === null) memory.delete(key); else memory.set(key, value);
  listeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener('storage', cb);
  return () => { listeners.delete(cb); window.removeEventListener('storage', cb); };
}

/** Persisted state that renders `initial` on the server and during hydration, then the stored value. */
export function useStoredState<T>(key: string, initial: T, revive?: (parsed: unknown) => T) {
  const raw = useSyncExternalStore(subscribe, () => read(key), () => null);
  const value = useMemo<T>(() => {
    if (raw === null) return initial;
    try { const p = JSON.parse(raw); return revive ? revive(p) : (p as T); } catch { return initial; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);
  const set = useCallback((next: T | ((prev: T) => T)) => {
    let prev = initial;
    const cur = read(key);
    if (cur !== null) { try { const p = JSON.parse(cur); prev = revive ? revive(p) : (p as T); } catch { /* keep initial */ } }
    const v = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
    write(key, JSON.stringify(v));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const clear = useCallback(() => write(key, null), [key]);
  return [value, set, clear] as const;
}
