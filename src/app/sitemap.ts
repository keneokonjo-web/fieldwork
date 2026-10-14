import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { articles } from '@/content/field-notes';

const routes = ['/', '/individuals', '/learn', '/learn/first-workflow', '/business', '/business/real-estate', '/business/assessment', '/pricing', '/field-notes', '/about', '/contact', '/privacy', '/terms', '/cookies', '/accessibility'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...routes.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: 'monthly' as const, priority: p === '/' ? 1 : 0.7 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/field-notes/${a.slug}`), lastModified: new Date(a.updated ?? a.published), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}
