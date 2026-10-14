import { chromium } from 'playwright';
const [,, url, out, w='1440', h='900', full='1'] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(url); await p.waitForTimeout(500);
await p.screenshot({ path: out, fullPage: full === '1' });
await b.close();
