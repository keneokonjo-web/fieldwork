import Image from 'next/image';
import images from '@/content/images.json';
import type { Photo } from '@/lib/images';

const byKey = new Map<string, Photo>((images as Photo[]).map((i) => [i.file.replace(/^\/images\//, '').replace(/\.jpg$/, ''), i]));

/** A photograph from the image register (by key), or an image the visitor uploaded in the listing editor (a data URL). */
export function DemoPhoto({ src, alt, ratio = '4 / 3', sizes = '(min-width: 62rem) 33vw, 100vw', priority, className = '', cover = true }: { src: string; alt?: string; ratio?: string; sizes?: string; priority?: boolean; className?: string; cover?: boolean }) {
  const p = src.startsWith('data:') ? null : byKey.get(src);
  const text = alt ?? p?.alt ?? '';
  return (
    <div className={`d-photo ${className}`.trim()} style={ratio === 'auto' ? { position: 'absolute', inset: 0 } : { aspectRatio: ratio }}>
      {src.startsWith('data:') ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={text} loading="lazy" style={{ objectFit: cover ? 'cover' : 'contain' }} />
      ) : p ? (
        <Image src={p.file} alt={text} fill sizes={sizes} priority={priority} style={{ objectFit: cover ? 'cover' : 'contain' }} />
      ) : null}
    </div>
  );
}

/** The URL of a photograph by key, or the data URL of an uploaded image. Used where a plain <img> is needed. */
export function photoSrc(src: string): string {
  if (src.startsWith('data:')) return src;
  return byKey.get(src)?.file ?? '';
}
