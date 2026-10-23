import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { notes } from '@/content/about/notes';

const routes = ['/', '/websites', '/automations', '/ai-workshop', '/about', '/demo', '/contact', '/image-credits', '/privacy', '/terms', '/cookies', '/accessibility'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...routes.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: 'monthly' as const, priority: p === '/' ? 1 : 0.7 })),
    ...notes.map((n) => ({ url: absoluteUrl(`/about/${n.slug}`), lastModified: new Date(n.published), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}
