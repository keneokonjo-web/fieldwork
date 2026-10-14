import { chromium } from 'playwright';
const [,, url, out, w='1200', h='800', full='1'] = process.argv;
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(url); await p.waitForTimeout(400);
await p.screenshot({ path: out, fullPage: full === '1' });
await b.close();
