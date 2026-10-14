import { NextResponse } from 'next/server';
import { deliverLead } from '@/lib/leads';
import { rateLimited } from '@/lib/rate-limit';
import { validateLead } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'cache-control': 'no-store' } });

export async function POST(req: Request) {
  // Same-origin only
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (origin && host) {
    try { if (new URL(origin).host !== host) return json({ ok: false, error: 'forbidden' }, 403); } catch { return json({ ok: false, error: 'forbidden' }, 403); }
  }
  const len = Number(req.headers.get('content-length') ?? 0);
  if (len > 30_000) return json({ ok: false, error: 'too_large' }, 413);

  const ip = (req.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return json({ ok: false, error: 'rate_limited', message: 'Too many submissions. Please try again in a few minutes.' }, 429);

  let body: unknown;
  try { body = await req.json(); } catch { return json({ ok: false, error: 'invalid_json' }, 400); }

  const result = validateLead(body);
  if (!result.ok) return json({ ok: false, error: 'validation', fieldErrors: result.errors }, 422);

  // Spam checks: honeypot filled, or form submitted implausibly fast. Pretend success, deliver nothing.
  const { website, startedAt } = result.data;
  if (website || (typeof startedAt === 'number' && Date.now() - startedAt < 1200)) return json({ ok: true });

  const delivered = await deliverLead(result.data);
  if (!delivered.ok) {
    if (delivered.reason === 'not_configured') {
      return json({ ok: false, error: 'not_configured', message: 'Sign-up is not connected yet, so nothing was saved. Please try again later.' }, 503);
    }
    return json({ ok: false, error: 'delivery_failed', message: 'We could not save your details just now. Please try again in a moment.' }, 502);
  }
  return json({ ok: true });
}

export function GET() {
  return json({ ok: false, error: 'method_not_allowed' }, 405);
}
