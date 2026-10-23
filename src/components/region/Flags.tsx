import type { Region } from '@/lib/region';

/** Small flags drawn as SVG, so they look the same on every device (emoji flags do not show on Windows). */
export function Flag({ region, className = 'flag' }: { region: Region; className?: string }) {
  const id = `fc-${region}`;
  return (
    <svg className={className} viewBox="0 0 60 40" width="24" height="16" role="img" aria-hidden="true" focusable="false">
      <defs><clipPath id={id}><rect width="60" height="40" rx="3" /></clipPath></defs>
      <g clipPath={`url(#${id})`}>
        {region === 'uk' && (
          <>
            <rect width="60" height="40" fill="#012169" />
            <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
            <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" />
            <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
            <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8" />
          </>
        )}
        {region === 'ng' && (
          <>
            <rect width="60" height="40" fill="#008751" />
            <rect x="20" width="20" height="40" fill="#fff" />
          </>
        )}
        {region === 'us' && (
          <>
            <rect width="60" height="40" fill="#fff" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} y={i * 5.714 * 1} width="60" height="2.857" fill="#B22234" />)}
            <rect width="26" height="21.5" fill="#3C3B6E" />
            {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => <circle key={`${r}-${c}`} cx={3.5 + c * 4.8 + (r % 2) * 2.4} cy={3.2 + r * 4.8} r="0.9" fill="#fff" />))}
          </>
        )}
      </g>
      <rect width="60" height="40" rx="3" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
    </svg>
  );
}
