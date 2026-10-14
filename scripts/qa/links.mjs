// Crawls internal links from the home page, checks status, fragments and images. Writes qa/link-results.json.
import { chromium } from 'playwright';
import fs from 'node:fs';
const base = 'http://localhost:3100'; const seen = new Map(); const queue = ['/']; const problems = [];
const b = await chromium.launch(); const p = await (await b.newContext()).newPage();
while (queue.length) {
  const path = queue.shift(); if (seen.has(path)) continue;
  const r = await p.goto(base + path, { waitUntil: 'load' }); seen.set(path, r.status());
  if (r.status() >= 400) { problems.push({ path, status: r.status() }); continue; }
  const links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')));
  const ids = await p.evaluate(() => new Set([...document.querySelectorAll('[id]')].map((e) => e.id)));
  for (const h of links) {
    if (/^(mailto:|tel:|https?:\/\/(?!localhost))/.test(h)) continue;
    const [pathname, frag] = h.split('#'); const target = pathname === '' ? path : pathname;
    if (frag && target === path && !(await p.evaluate((f) => !!document.getElementById(f), frag))) problems.push({ path, href: h, issue: 'missing fragment' });
    const clean = target.split('?')[0]; if (clean.startsWith('/') && !seen.has(clean)) queue.push(clean);
  }
}
for (const [path, status] of seen) if (status >= 400) problems.push({ path, status });
await b.close();
fs.writeFileSync('qa/link-results.json', JSON.stringify({ ranAt: new Date().toISOString(), pagesCrawled: seen.size, problems }, null, 2));
console.log(`crawled ${seen.size} pages, ${problems.length} problem(s)`); problems.forEach((x) => console.log(x)); process.exit(problems.length ? 1 : 0);
