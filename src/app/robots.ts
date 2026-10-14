import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site';

/** Disallows everything until NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_ALLOW_INDEXING=true are both set. */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.allowIndexing) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }], sitemap: absoluteUrl('/sitemap.xml') };
}
