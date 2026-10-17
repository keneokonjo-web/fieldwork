type Props = {
  /** wordmark = lowercase display wordmark with the halftone-disc dot. lockup = target icon + wordmark. target = icon only. disc = dot-matrix symbol. */
  form?: 'wordmark' | 'wordmark-small' | 'lockup' | 'target' | 'disc';
  /** Colourway: light = for paper grounds, dark = for ink grounds, cobalt = for cobalt grounds. */
  tone?: 'light' | 'dark' | 'cobalt';
  className?: string;
  alt?: string;
};
const dims = { wordmark: [607, 138], 'wordmark-small': [607, 138], lockup: [690, 138], target: [100, 100], disc: [100, 100] } as const;

/** Renders the exported logo files from /public/brand/logo so the site never redraws the mark. */
export function Logo({ form = 'wordmark-small', tone = 'light', className = 'logo', alt = 'Fieldwork' }: Props) {
  const [w, h] = dims[form];
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/logo/fieldwork-${form}-${tone}.svg`} alt={alt} width={w} height={h} className={className} />;
}
