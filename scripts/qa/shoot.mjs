// Usage: node scripts/qa/shoot.mjs <outDir> <path[,path...]> [width]  → full-page JPGs
import { chromium } from 'playwright';
import fs from 'node:fs';
const [outDir, paths, w = '1440'] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: +w < 600 ? 844 : 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
for (const path of paths.split(',')) {
  await p.goto('http://localhost:3100' + path, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => i.setAttribute('loading', 'eager')));
  await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await p.evaluate(() => Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
  await p.waitForTimeout(300);
  const name = (path === '/' ? 'home' : path.slice(1).replace(/\//g, '-')) + `-${w}`;
  await p.screenshot({ path: `${outDir}/${name}.jpg`, fullPage: true, type: 'jpeg', quality: 70 });
  console.log(name, await p.evaluate(() => document.documentElement.scrollWidth + 'x' + document.documentElement.scrollHeight));
}
await b.close();
