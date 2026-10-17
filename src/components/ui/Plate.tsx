import Image from 'next/image';
import type { ReactNode } from 'react';
import { photo } from '@/lib/images';

type Ratio = '4 / 3' | '3 / 4' | '16 / 9' | '1 / 1' | '21 / 9' | '3 / 2' | '4 / 5';
type Common = { ratio?: Ratio; className?: string; priority?: boolean; sizes?: string; label?: ReactNode; labelFloat?: boolean; framed?: boolean; position?: string };
type PhotoProps = Common & { photo: string; art?: never };
type ArtProps = Common & { art: string; tone?: 'paper' | 'ink' | 'cobalt' | 'wash'; photo?: never };

/**
 * A shot: a photograph (curated stock, alt text from the image register) or pre-generated dot terrain (decorative),
 * in a hairline cell with a mono caption. Named Plate for continuity with earlier code.
 */
export function Plate(props: PhotoProps | ArtProps) {
  const { ratio = '4 / 3', className = '', priority, sizes = '(min-width: 62rem) 50vw, 100vw', label, labelFloat, position } = props;
  const isArt = 'art' in props && props.art;
  const p = !isArt ? photo((props as PhotoProps).photo) : null;
  const tone = isArt ? (props as ArtProps).tone ?? 'paper' : null;
  return (
    <figure className={`shot${isArt ? ' shot--art' : ''} ${className}`.trim()} style={{ ['--ratio' as string]: ratio }}>
      <div className="shot__img">
        {p ? (
          <Image src={p.file} alt={p.alt} width={p.width} height={p.height} sizes={sizes} priority={priority} style={position ? { objectPosition: position } : undefined} />
        ) : (
          <Image className="art" src={`/art/terrain-${(props as ArtProps).art}-${tone}.svg`} alt="" width={900} height={700} unoptimized aria-hidden="true" />
        )}
        {label && labelFloat && <div className="label label--float">{label}</div>}
      </div>
      {label && !labelFloat && <figcaption className="shot__cap">{label}</figcaption>}
    </figure>
  );
}

export function Label({ title, children, className = '' }: { title: string; children?: ReactNode; className?: string }) {
  return <div className={`label ${className}`.trim()}><b>{title}</b>{children}</div>;
}
