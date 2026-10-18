import Link from 'next/link';
import type { ReactNode } from 'react';
import type { FieldworkEvent } from '@/lib/analytics';

type Variant = 'primary' | 'secondary' | 'light' | 'outline-light' | 'cobalt';
type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  small?: boolean;
  /** Analytics event fired on click (consent permitting). */
  track?: FieldworkEvent;
  trackLabel?: string;
  className?: string;
};
const cls: Record<Variant, string> = { primary: '', secondary: ' btn--secondary', light: ' btn--light', 'outline-light': ' btn--outline-light', cobalt: ' btn--cobalt' };

export function ButtonLink({ href, children, variant = 'primary', small, track, trackLabel, className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`btn${cls[variant]}${small ? ' btn--small' : ''} ${className}`.trim()}
      data-track={track}
      data-track-label={trackLabel}
    >
      {children}
    </Link>
  );
}

export function TextLink({ href, children, track, trackLabel }: { href: string; children: ReactNode; track?: FieldworkEvent; trackLabel?: string }) {
  return (
    <Link href={href} className="link-arrow" data-track={track} data-track-label={trackLabel}>
      {children}
    </Link>
  );
}
