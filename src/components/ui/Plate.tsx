import Image from 'next/image';
import type { ReactNode } from 'react';
import { photo } from '@/lib/images';

type Ratio = '4 / 3' | '3 / 4' | '16 / 9' | '1 / 1' | '21 / 9' | '3 / 2' | '4 / 5';
type Common = { ratio?: Ratio; className?: string; priority?: boolean; sizes?: string; label?: ReactNode; labelFloat?: boolean; framed?: boolean; position?: string };
type PhotoProps = Common & { photo: string; art?: never };
type ArtProps = Common & { art: string; tone?: 'chalk' | 'char' | 'indigo'; photo?: never };

/**
 * A plate: a framed print with a gallery mat and an optional museum label.
 * Holds either a curated stock photograph (alt text from the image register) or pre-generated field art (decorative).
 */
export function Plate(props: PhotoProps | ArtProps) {
  const { ratio = '4 / 3', className = '', priority, sizes = '(min-width: 62rem) 50vw, 100vw', label, labelFloat, framed = true, position } = props;
  const isArt = 'art' in props && props.art;
  const p = !isArt ? photo((props as PhotoProps).photo) : null;
  const tone = isArt ? (props as ArtProps).tone ?? 'chalk' : null;
  return (
    <figure className={`plate${isArt ? ' plate--art' : ''}${tone === 'char' ? ' plate--dark' : ''}${framed ? '' : ' plate--bleed'} ${className}`.trim()} style={{ ['--ratio' as string]: ratio }}>
      <div className="plate__frame">
        <div className="plate__img">
          {p ? (
            <Image src={p.file} alt={p.alt} width={p.width} height={p.height} sizes={sizes} priority={priority} style={position ? { objectPosition: position } : undefined} />
          ) : (
            <Image className="art" src={`/art/field-${(props as ArtProps).art}-${tone}.svg`} alt="" width={1000} height={750} unoptimized aria-hidden="true" />
          )}
          {label && labelFloat && <div className="label label--float">{label}</div>}
        </div>
      </div>
      {label && !labelFloat && <figcaption className="plate__cap"><div className="label">{label}</div></figcaption>}
    </figure>
  );
}

export function Label({ title, children, className = '' }: { title: string; children?: ReactNode; className?: string }) {
  return <div className={`label ${className}`.trim()}><b>{title}</b>{children}</div>;
}
