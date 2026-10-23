'use client';
import { useStoredState } from '@/lib/storage';

export type Region = 'uk' | 'ng' | 'us';
export const REGIONS = ['uk', 'ng', 'us'] as const satisfies readonly Region[];
export const REGION_NAME: Record<Region, string> = { uk: 'United Kingdom', ng: 'Nigeria', us: 'United States' };
export const REGION_SHORT: Record<Region, string> = { uk: 'UK', ng: 'NG', us: 'US' };
export const CURRENCY_NAME: Record<Region, string> = { uk: 'pounds sterling', ng: 'naira', us: 'US dollars' };
export const REGION_KEY = 'fw-region';
export const REGION_OPEN_EVENT = 'fw-region-open';

const revive = (p: unknown): Region | null => (p === 'uk' || p === 'ng' || p === 'us' ? p : null);

/** The visitor's chosen region. Until one is chosen the site shows the United Kingdom. Stored on this device only. */
export function useRegion() {
  const [stored, setStored] = useStoredState<Region | null>(REGION_KEY, null, revive);
  return { region: (stored ?? 'uk') as Region, chosen: stored !== null, setRegion: (r: Region) => setStored(r) };
}

export function openRegionDialog() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(REGION_OPEN_EVENT));
}
