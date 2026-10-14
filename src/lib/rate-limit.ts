/** Best-effort in-memory limiter. On serverless platforms each instance has its own memory, so this only slows
 *  casual abuse. For stronger protection use Vercel Firewall rate limiting (see docs/operations/CONFIGURATION.md). */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 8, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return recent.length > limit;
}
