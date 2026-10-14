// Captures reference sites: viewport + full-page screenshots at desktop and mobile, plus page metadata and computed type/colour facts.
// Usage: node capture-reference.mjs <slug> <url> [outDir]
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
const [,, slug, url, out = 'deliverables/fieldwork-launch-kit/01-brand/research/screenshots'] = process.argv;
fs.mkdirSync(out, { recursive: true });
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const b = await chromium.launch({ proxy });
const sizes = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const facts = {};
for (const [name, vp] of Object.entries(sizes)) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: name === 'mobile' ? 2 : 1, userAgent: name === 'mobile' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' : undefined });
  const p = await ctx.newPage();
  try {
    const res = await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    facts.status = res?.status(); facts.finalUrl = p.url(); facts.title = await p.title();
    await p.waitForTimeout(1500);
    await p.screenshot({ path: path.join(out, `${slug}-${name}-viewport.png`) });
    // scroll through to trigger lazy content / reveals
    const h = await p.evaluate(async () => { let y = 0; const step = innerHeight * 0.7; while (y < document.body.scrollHeight) { scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); y += step; } scrollTo(0, 0); return document.body.scrollHeight; });
    await p.waitForTimeout(800);
    await p.screenshot({ path: path.join(out, `${slug}-${name}-full.png`), fullPage: true });
    if (name === 'desktop') {
      facts.height = h;
      facts.fonts = await p.evaluate(() => { const s = new Map(); for (const el of document.querySelectorAll('h1,h2,h3,p,a,button,nav,li,span')) { const c = getComputedStyle(el); const k = c.fontFamily.split(',')[0].trim(); s.set(k, (s.get(k) || 0) + 1); } return [...s.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6); });
      facts.headings = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].slice(0, 14).map(e => { const c = getComputedStyle(e); return { tag: e.tagName, text: e.textContent.trim().slice(0, 80), font: c.fontFamily.split(',')[0], size: c.fontSize, weight: c.fontWeight, lh: c.lineHeight, ls: c.letterSpacing }; }));
      facts.colors = await p.evaluate(() => { const m = new Map(); for (const el of document.querySelectorAll('body, body *')) { const c = getComputedStyle(el); for (const v of [c.color, c.backgroundColor]) if (v && !v.includes('rgba(0, 0, 0, 0)')) m.set(v, (m.get(v) || 0) + 1); } return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12); });
      facts.nav = await p.evaluate(() => [...document.querySelectorAll('header a, nav a')].slice(0, 14).map(a => ({ t: a.textContent.trim().slice(0, 30), h: a.getAttribute('href') })));
      facts.links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map(a => a.href))].slice(0, 60));
    }
    facts[`${name}Overflow`] = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  } catch (e) { facts[`${name}Error`] = String(e).slice(0, 200); }
  await ctx.close();
}
fs.writeFileSync(path.join(out, `${slug}-facts.json`), JSON.stringify(facts, null, 2));
console.log(slug, JSON.stringify({ status: facts.status, title: facts.title, h: facts.height, err: [facts.desktopError, facts.mobileError].filter(Boolean) }));
await b.close();
