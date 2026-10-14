import { LOGO_SIZES } from './logo-data';

type Props = { variant?: 'light' | 'dark'; className?: string; symbolOnly?: boolean };

/** Renders the real exported logo files from /public/brand/logo so the site never redraws the mark. */
export function Logo({ variant = 'light', className = 'logo', symbolOnly = false }: Props) {
  const size = symbolOnly ? LOGO_SIZES.symbol : LOGO_SIZES.lockup;
  const file = symbolOnly ? `fieldwork-symbol-${variant}.svg` : `fieldwork-logo-${variant}.svg`;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/logo/${file}`} alt="Fieldwork" width={size.width / 10} height={size.height / 10} className={className} />;
}
