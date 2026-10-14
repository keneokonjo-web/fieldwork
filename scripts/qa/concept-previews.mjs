// Screenshots each concept board (desktop + mobile full page as JPEG, a hero crop) and checks mobile and tablet overflow.
import { chromium } from 'playwright';
import path from 'node:path';
import sharp from 'sharp';
const dir = path.resolve(import.meta.dirname, '../../deliverables/fieldwork-launch-kit/01-brand/concepts');
const b = await chromium.launch();
for (const k of [1, 2, 3]) {
  const url = `file://${dir}/concept-${k}.html`;
  const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto(url); await d.waitForTimeout(500);
  await d.screenshot({ path: `${dir}/_tmp-d.png`, fullPage: true });
  await sharp(`${dir}/_tmp-d.png`).jpeg({ quality: 78, mozjpeg: true }).toFile(`${dir}/concept-${k}-desktop.jpg`);
  await d.addStyleTag({ content: '.bar{position:static!important}' });
  await d.locator('.frames').screenshot({ path: `${dir}/preview-${k}.png` });
  for (const w of [390, 768]) {
    const m = await b.newPage({ viewport: { width: w, height: 844 }, deviceScaleFactor: w === 390 ? 2 : 1 });
    await m.goto(url); await m.waitForTimeout(500);
    const over = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(`concept ${k} @${w}px: horizontal overflow = ${over}px`);
    if (w === 390) { await m.screenshot({ path: `${dir}/_tmp-m.png`, fullPage: true }); await sharp(`${dir}/_tmp-m.png`).resize({ width: 780 }).jpeg({ quality: 72, mozjpeg: true }).toFile(`${dir}/concept-${k}-mobile.jpg`); }
    await m.close();
  }
}
import fs from 'node:fs';
for (const f of ['_tmp-d.png', '_tmp-m.png']) fs.rmSync(path.join(dir, f), { force: true });
await b.close();
