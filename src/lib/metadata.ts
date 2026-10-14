import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface Opts { title: string; description: string; path: string; type?: 'website' | 'article'; noindex?: boolean }

/** Per-page metadata. Canonical URLs are only emitted once a production URL is configured. */
export function pageMetadata({ title, description, path, type = 'website', noindex }: Opts): Metadata {
  const image = '/brand/og/og-default.png';
  return {
    title,
    description,
    alternates: siteConfig.url ? { canonical: path } : undefined,
    robots: !siteConfig.allowIndexing || noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title: `${title} | Fieldwork`, description, url: path, siteName: 'Fieldwork', locale: 'en_GB', type, images: [{ url: image, width: 1200, height: 630, alt: 'Fieldwork. Practise AI on real work.' }] },
    twitter: { card: 'summary_large_image', title: `${title} | Fieldwork`, description, images: [image] },
  };
}
