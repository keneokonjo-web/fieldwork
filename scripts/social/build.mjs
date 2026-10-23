// Renders every static graphic to PNG: node build.mjs outDir
import { chromium } from 'playwright'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { pathToFileURL } from 'node:url';
import { graphics } from './graphics.mjs';
const out = process.argv[2]; const only = process.argv[3];
const b = await chromium.launch();
for (const g of graphics) {
  if (only && !g.file.includes(only)) continue;
  const p = await b.newPage({ viewport: { width: g.w, height: g.h }, deviceScaleFactor: 1 });
  const tmp = path.join(os.tmpdir(), 'fw-graphic.html'); fs.writeFileSync(tmp, g.html); await p.goto(pathToFileURL(tmp).href, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
  const f = path.join(out, g.file); fs.mkdirSync(path.dirname(f), { recursive: true });
  await p.screenshot({ path: f, clip: { x: 0, y: 0, width: g.w, height: g.h } }); await p.close();
}
await b.close(); console.log('rendered', graphics.length);
