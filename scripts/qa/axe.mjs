// axe-core accessibility scan of every route at desktop and mobile. Writes qa/axe-results.json.
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'node:fs';
const routes = ['/', '/websites', '/automations', '/ai-workshop', '/about', '/about/why-fieldwork', '/demo', '/demo/properties', '/demo/properties/ashdown-mews-kensington', '/demo/new-homes/the-wharf', '/demo/about', '/demo/journal/preparing-a-home-for-sale', '/demo/contact', '/demo/admin', '/contact', '/image-credits', '/privacy', '/terms', '/cookies', '/accessibility', '/not-a-page'];
const b = await chromium.launch(); const out = []; let total = 0;
for (const [label, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const p = await (await b.newContext({ viewport: vp })).newPage();
  for (const r of routes) {
    await p.goto('http://localhost:3100' + r, { waitUntil: 'networkidle' });
    await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;transition:none!important}' });
    const res = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    for (const v of res.violations) { total++; out.push({ route: r, viewport: label, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) }); console.log(label, r, v.id, v.impact, v.nodes[0].target.join(' ')); }
  }
}
await b.close(); fs.writeFileSync('qa/axe-results.json', JSON.stringify({ ranAt: new Date().toISOString(), routes: routes.length, viewports: 2, violations: out }, null, 2));
console.log(total ? `${total} violation(s)` : `axe: 0 violations across ${routes.length} routes x 2 viewports`); process.exit(total ? 1 : 0);
