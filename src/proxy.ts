import { NextResponse, type NextRequest } from 'next/server';

const COOKIE = 'fw-landed';
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit/i;

/**
 * Every new visit lands on Websites & Listings first, even when they type the bare address.
 * The home page still exists and is reached from the logo once the visit has started. A session cookie marks the visit.
 */
export function proxy(req: NextRequest) {
  const landed = req.cookies.has(COOKIE);
  const isRoot = req.nextUrl.pathname === '/';
  const res = isRoot && !landed && !BOT.test(req.headers.get('user-agent') ?? '')
    ? NextResponse.redirect(new URL('/websites', req.url))
    : NextResponse.next();
  if (!landed) res.cookies.set(COOKIE, '1', { path: '/', sameSite: 'lax' });
  return res;
}

export const config = { matcher: ['/((?!_next|api|demo|brand|brand-pack|concepts|art|images|media|.*\\..*).*)'] };
