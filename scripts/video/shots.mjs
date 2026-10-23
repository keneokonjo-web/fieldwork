// Screenshots at chosen times (seconds) for checking the scene: node shots.mjs outDir t1 t2 ...
import { chromium } from 'playwright'; import path from 'node:path';
const [out, ...ts] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto('file://' + path.join(import.meta.dirname, 'walkthrough.html')); await p.evaluate(() => document.fonts.ready);
for (const t of ts.map(Number).sort((a, b) => a - b)) { await p.evaluate((t) => window.render(t), t); await p.screenshot({ path: `${out}/t${String(t).replace('.', '_')}.png` }); }
console.log('errors', errs); await b.close();
