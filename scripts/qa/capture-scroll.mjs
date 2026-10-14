// Scroll-through capture: one viewport screenshot per step so scroll-triggered reveals are seen as a visitor sees them.
// Usage: node capture-scroll.mjs <slug> <url> <desktop|mobile> [maxSteps]
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
const [,, slug, url, mode = 'desktop', max = '30'] = process.argv;
const out = 'deliverables/fieldwork-launch-kit/01-brand/research/screenshots/scroll';
fs.mkdirSync(out, { recursive: true });
const vp = mode === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const b = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mode === 'mobile' ? 2 : 1, hasTouch: mode === 'mobile', isMobile: mode === 'mobile' });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
await p.waitForTimeout(2000);
const total = await p.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
let i = 0;
for (let y = 0; y < total && i < +max; y += Math.round(vp.height * 0.9), i++) {
  await p.mouse.wheel(0, i === 0 ? 0 : Math.round(vp.height * 0.9));
  await p.waitForTimeout(1100);
  await p.screenshot({ path: path.join(out, `${slug}-${mode}-${String(i).padStart(2, '0')}.png`) });
}
console.log(slug, mode, 'frames', i, 'pageHeight', total);
await b.close();
