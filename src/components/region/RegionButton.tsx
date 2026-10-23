'use client';
import { Flag } from '@/components/region/Flags';
import { REGION_NAME, REGION_SHORT, openRegionDialog, useRegion } from '@/lib/region';

/** Shows the current region and lets the visitor change it. */
export function RegionButton({ variant = 'bar' }: { variant?: 'bar' | 'footer' }) {
  const { region } = useRegion();
  return (
    <button type="button" className={`region-btn region-btn--${variant}`} onClick={openRegionDialog} aria-label={`Region: ${REGION_NAME[region]}. Change region`}>
      <Flag region={region} />
      <span>{variant === 'bar' ? REGION_SHORT[region] : REGION_NAME[region]}</span>
    </button>
  );
}
