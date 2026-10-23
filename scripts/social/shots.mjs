// Captures screens of the Halden demo website for use in the social graphics and videos.
import { chromium } from 'playwright'; import path from 'node:path';
const out = path.join(import.meta.dirname, 'assets'); const B = process.env.BASE ?? 'http://localhost:3100';
const b = await chromium.launch();
const mk = async (w, h, mobile = false) => { const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 3 : 2, isMobile: mobile, hasTouch: mobile }); await c.addInitScript(() => { try { sessionStorage.setItem('fw-demo-seen', '1'); sessionStorage.setItem('fw-demo-try-pop', '1'); } catch {} }); return c; };
const D = await mk(1440, 900); const p = await D.newPage();
const shot = async (pg, url, name, opt = {}) => { await pg.goto(B + url, { waitUntil: 'networkidle' }); await pg.waitForTimeout(1800); if (opt.scroll) { await pg.evaluate((y) => window.scrollTo(0, y), opt.scroll); await pg.waitForTimeout(600); } await pg.screenshot({ path: `${out}/${name}.jpg`, type: 'jpeg', quality: 92 }); };
await shot(p, '/demo', 'demo-home');
await shot(p, '/demo/properties?listing=sale', 'demo-properties', { scroll: 0 });
await shot(p, '/demo/properties?listing=sale', 'demo-properties-grid', { scroll: 560 });
await shot(p, '/demo/properties/ashdown-mews-kensington', 'demo-detail', { scroll: 0 });
await shot(p, '/demo/properties/ashdown-mews-kensington', 'demo-detail-form', { scroll: 700 });
await p.goto(B + '/demo/admin', { waitUntil: 'networkidle' }); await p.getByRole('button', { name: 'Sign in' }).click(); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/demo-admin.jpg`, type: 'jpeg', quality: 92 });
await p.goto(B + '/demo/admin/properties/new', { waitUntil: 'networkidle' }); await p.getByRole('button', { name: 'Autofill all details' }).click(); await p.waitForTimeout(600); await p.screenshot({ path: `${out}/demo-editor.jpg`, type: 'jpeg', quality: 92 });
const M = await mk(390, 844, true); const m = await M.newPage();
await shot(m, '/demo', 'demo-m-home'); await shot(m, '/demo/properties/ashdown-mews-kensington', 'demo-m-detail', { scroll: 0 }); await shot(m, '/demo/properties?listing=sale', 'demo-m-properties', { scroll: 0 });
await b.close(); console.log('ok');
