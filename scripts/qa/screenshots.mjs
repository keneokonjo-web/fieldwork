// Captures desktop and mobile full-page screenshots of every route into qa/screenshots/.
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const base = process.env.BASE_URL ?? 'http://localhost:3100';
const outDir = path.resolve(import.meta.dirname, '../../qa/screenshots');
fs.mkdirSync(outDir, { recursive: true });
const only = process.argv[2];
const routes = [
  ['home', '/'], ['websites', '/websites'], ['automations', '/automations'], ['ai-workshop', '/ai-workshop'], ['about', '/about'], ['demo', '/demo'], ['contact', '/contact'], ['about-note', '/about/why-fieldwork'],
  ['image-credits', '/image-credits'], ['privacy', '/privacy'], ['terms', '/terms'], ['cookies', '/cookies'], ['accessibility', '/accessibility'], ['404', '/does-not-exist'],
];
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const browser = await chromium.launch();
for (const [vpName, vp] of Object.entries(viewports)) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: vpName === 'mobile' ? 2 : 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const [name, route] of routes) {
    if (only && !name.includes(only)) continue;
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(outDir, `${name}-${vpName}.png`), fullPage: true });
  }
  await ctx.close();
}
await browser.close();
console.log('screenshots done');
