// Screenshot one element. Usage: node element-shot.mjs <url> <selector> <out> [width] [index]
import { chromium } from 'playwright';
const [,, url, sel, out, w = '1440', idx = '0'] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: 900 }, deviceScaleFactor: 1 });
await p.goto(url); await p.waitForTimeout(500);
await p.locator(sel).nth(+idx).screenshot({ path: out });
await b.close();
