// Screenshots each concept board (desktop full page, mobile full page, hero crop) and checks mobile overflow.
import { chromium } from 'playwright';
import path from 'node:path';
import sharp from 'sharp';
const dir = path.resolve(import.meta.dirname, '../../deliverables/fieldwork-launch-kit/01-brand/concepts');
const b = await chromium.launch();
for (const k of ['a', 'b', 'c']) {
  const url = `file://${dir}/concept-${k}.html`;
  const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto(url); await d.waitForTimeout(400);
  await d.screenshot({ path: `${dir}/concept-${k}-desktop.png`, fullPage: true });
  const box = await d.evaluate(() => { const h = document.querySelector('.hero'); const r = h.getBoundingClientRect(); return { y: r.top + scrollY, h: r.height }; });
  await sharp(`${dir}/concept-${k}-desktop.png`).extract({ left: 0, top: Math.round(box.y), width: 1440, height: Math.min(Math.round(box.h), 900) }).resize({ width: 1200 }).toFile(`${dir}/preview-${k}.png`);
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await m.goto(url); await m.waitForTimeout(400);
  const over = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`concept ${k}: mobile horizontal overflow = ${over}px`);
  await m.screenshot({ path: `${dir}/concept-${k}-mobile.png`, fullPage: true });
}
await b.close();
