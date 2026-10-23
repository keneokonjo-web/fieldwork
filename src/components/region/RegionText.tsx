'use client';
import { CURRENCY_NAME, REGION_NAME, useRegion } from '@/lib/region';

/** The chosen region's name (or its currency) for use inside a sentence. */
export function RegionText({ of = 'name', the = false }: { of?: 'name' | 'currency'; the?: boolean }) {
  const { region } = useRegion();
  if (of === 'currency') return <>{CURRENCY_NAME[region]}</>;
  return <>{the && region !== 'ng' ? 'the ' : ''}{REGION_NAME[region]}</>;
}
