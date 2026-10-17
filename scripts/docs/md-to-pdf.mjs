// Brand-styled Markdown → PDF (Chromium). Usage: node scripts/docs/md-to-pdf.mjs <in.md> <out.pdf> [--title "..."] [--landscape]
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { chromium } from 'playwright';
import { palette as P } from '../brand/palette.mjs';

const [inp, outp, ...rest] = process.argv.slice(2);
const title = rest.includes('--title') ? rest[rest.indexOf('--title') + 1] : path.basename(inp, '.md').replace(/[-_]/g, ' ');
const landscape = rest.includes('--landscape');
const root = process.cwd();
const u = (p) => 'file://' + path.join(root, p);
// Drop internal production notes (blockquotes that start 'Production note') from the printed PDF.
const md = fs.readFileSync(inp, 'utf8').replace(/^> \*\*Production note[\s\S]*?\n\n/m, '');
const body = marked.parse(md, { gfm: true });
const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>${title}</title><style>
@font-face{font-family:Schibsted;font-weight:400 900;src:url(${u('node_modules/@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2')})}
@font-face{font-family:GeistMono;font-weight:100 900;src:url(${u('node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')})}
@page{size:A4 ${landscape ? 'landscape' : 'portrait'};margin:20mm 18mm 22mm}
html{background:${P.paper}}body{font:400 10pt/1.5 Schibsted,sans-serif;color:${P.ink};background:${P.paper};margin:0}
h1,h2,h3{font-family:Schibsted,sans-serif;font-weight:700;letter-spacing:-.045em;line-height:1}
h1{font-size:30pt;margin:0 0 6mm}h2{font-size:18pt;margin:9mm 0 3mm;border-top:1px solid ${P.ink};padding-top:3mm}h3{font-size:12.5pt;margin:6mm 0 2mm;letter-spacing:-.03em}
h4{font:600 10pt Schibsted;margin:4mm 0 1mm}
p,li{orphans:3;widows:3}a{color:${P.cobalt}}
code{font:8.5pt GeistMono,monospace;background:${P.wash};padding:0 1mm}pre{background:${P.paper};border:1px solid ${P.ink};padding:3mm;white-space:pre-wrap;font:8pt/1.5 GeistMono,monospace}
table{border-collapse:collapse;width:100%;font-size:8.5pt;margin:3mm 0}th{font:400 7pt GeistMono;text-transform:uppercase;letter-spacing:.06em;background:${P.wash};text-align:left}td,th{border:1px solid ${P.hair};padding:1.5mm 2mm;vertical-align:top}
blockquote{margin:3mm 0;padding:2mm 4mm;border-left:3px solid ${P.cobalt};background:${P.wash}}
hr{border:0;border-top:1px solid ${P.hair}}
.cover{page-break-after:always;height:250mm;display:flex;flex-direction:column;justify-content:space-between}
.cover .mono{font:400 8pt GeistMono;letter-spacing:.06em;text-transform:uppercase;color:${P.cobalt}}
.cover h1{font-size:50pt;line-height:.92;max-width:150mm;letter-spacing:-.06em}
</style></head><body>
<section class="cover"><div><img src="${u('public/brand/logo/fieldwork-wordmark-small-light.svg')}" style="height:11mm"></div><div><div class="mono">(${new Date().toISOString().slice(0, 10)})</div><h1>${title}</h1><p style="font:600 14pt Schibsted;letter-spacing:-.03em;color:${P.grey}">Fieldwork · Practise AI on real work.</p></div></section>
${body}</body></html>`;
const tmp = path.join(root, 'node_modules/.cache-md.html');
fs.writeFileSync(tmp, html);
const b = await chromium.launch(); const p = await b.newPage();
await p.goto('file://' + tmp, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
fs.mkdirSync(path.dirname(outp), { recursive: true });
await p.pdf({ path: outp, format: 'A4', landscape, printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: `<div style="font:7pt sans-serif;color:#6B6A63;width:100%;padding:0 18mm;display:flex;justify-content:space-between"><span>Fieldwork · ${title.replace(/</g, '')}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`, margin: { top: '20mm', bottom: '22mm', left: '18mm', right: '18mm' } });
await b.close(); fs.unlinkSync(tmp); console.log('wrote', outp);
