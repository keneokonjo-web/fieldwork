import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';

const routes = ['/', '/websites', '/automations', '/ai-workshop', '/about', '/request-demo', '/image-credits', '/privacy', '/terms', '/cookies', '/accessibility'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: 'monthly' as const, priority: p === '/' ? 1 : 0.7 }));
}
