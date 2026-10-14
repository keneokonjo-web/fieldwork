type Props = {
  /** lockup = benchmark + caps (header, documents). wordmark = lowercase display wordmark. symbol = benchmark only. */
  form?: 'lockup' | 'wordmark' | 'symbol' | 'stacked';
  /** Colourway: light = for chalk grounds, dark = for charcoal/indigo grounds. */
  tone?: 'light' | 'dark';
  className?: string;
};
const dims = { lockup: [554, 62], wordmark: [575, 138], symbol: [100, 100], stacked: [310, 120] } as const;

/** Renders the exported logo files from /public/brand/logo so the site never redraws the mark. */
export function Logo({ form = 'lockup', tone = 'light', className = 'logo' }: Props) {
  const file = form === 'stacked' ? `fieldwork-lockup-stacked-${tone}.svg` : `fieldwork-${form}-${tone}.svg`;
  const [w, h] = dims[form];
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/logo/${file}`} alt="Fieldwork" width={w} height={h} className={className} />;
}
