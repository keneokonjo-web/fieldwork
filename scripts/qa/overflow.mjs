// Fails if any route scrolls horizontally at 390 / 768 / 1440.
import { chromium } from 'playwright';
const routes = ['/', '/websites', '/automations', '/ai-workshop', '/about', '/request-demo', '/image-credits', '/privacy', '/terms', '/cookies', '/accessibility', '/not-a-page'];
const b = await chromium.launch(); let bad = 0;
for (const w of [390, 768, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 800 } })).newPage();
  for (const r of routes) {
    await p.goto('http://localhost:3100' + r, { waitUntil: 'load' });
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w) { bad++; console.log('OVERFLOW', w, r, sw); }
  }
}
await b.close(); console.log(bad ? `${bad} overflow(s)` : 'no horizontal overflow on any route/width'); process.exit(bad ? 1 : 0);
