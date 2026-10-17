// Builds the Fieldwork logo system (Concept 2, The Brief) as outlined SVG + PNG/ICO exports.
// Primary mark: lowercase Schibsted Grotesk, tight, with the dot of the dotless i replaced by a disc of halftone terrain.
// Icon: the survey-benchmark "target" (ring, cross-hairs, centre dot) kept from the earlier identity.
import opentype from 'opentype.js';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { palette as P } from './palette.mjs';
import { halftoneSvg } from './field-generator.mjs';

const root = process.cwd();
const out = (...p) => path.join(root, 'public/brand', ...p);
for (const d of ['logo/png', 'favicon', 'social']) fs.mkdirSync(out(d), { recursive: true });

const sb = fs.readFileSync(path.join(root, 'assets/fonts-build/schibsted-700.ttf'));
const sans = opentype.parse(sb.buffer.slice(sb.byteOffset, sb.byteOffset + sb.byteLength));
const f = (n) => +n.toFixed(2);

function run(text, size, tracking) {
  let x = 0, d = ''; const info = [];
  const glyphs = [...text].map((ch) => sans.charToGlyph(ch));
  glyphs.forEach((g, i) => {
    d += g.getPath(x, 0, size).toPathData(2);
    const adv = (g.advanceWidth * size) / sans.unitsPerEm;
    info.push({ x, adv });
    x += adv + tracking * size;
    if (i < glyphs.length - 1) x += (sans.getKerningValue(g, glyphs[i + 1]) * size) / sans.unitsPerEm;
  });
  return { d, width: x - tracking * size, info };
}

// ---- halftone disc (the dot of the i, and the standalone dot-matrix symbol) ----
// A regular dot grid inside a circle; dot radius follows a soft light from the upper left, so it reads as a small dot-matrix planet.
const discCache = {};
function discPath(n, maxR) {
  const key = `${n}-${maxR}`;
  if (!discCache[key]) {
    let d = ''; const R = 50, step = 100 / n;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const x = (i + 0.5) * step, y = (j + 0.5) * step; const dx = x - R, dy = y - R; const dist = Math.hypot(dx, dy);
      if (dist > R - step * 0.3) continue;
      const light = 0.5 + 0.5 * ((-dx - dy) / (Math.SQRT2 * R)); // 0..1, brighter top-left
      const r = maxR * (0.28 + 0.72 * Math.max(0, Math.min(1, 0.25 + light * 0.75 - (dist / R) * 0.25)));
      d += `M${(x - r).toFixed(1)} ${y.toFixed(1)}a${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(2 * r).toFixed(1)} 0a${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(-2 * r).toFixed(1)} 0z`;
    }
    discCache[key] = d;
  }
  return discCache[key];
}
// Returns SVG markup for a disc occupying a (cx, cy, diameter) box. Coarsens at small sizes; plain circle below 24px.
function disc({ cx, cy, d, fill, px }) {
  const s = d / 100;
  if (px && px < 24) return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(d / 2)}" fill="${fill}"/>`;
  const [n, maxR] = px && px < 56 ? [5, 9] : [9, 5.6];
  return `<g transform="translate(${f(cx - d / 2)} ${f(cy - d / 2)}) scale(${f(s)})"><path d="${discPath(n, maxR)}" fill="${fill}"/></g>`;
}

// ---- benchmark target symbol (100 box) ----
export function target({ ink, accent, variant = 'full', x = 0, y = 0, s = 1 }) {
  const stroke = variant === 'small' ? 9 : 6;
  const r = variant === 'small' ? 30 : 27.5;
  const ticks = variant === 'small' ? '' : `<path d="M50 4v21M50 75v21M4 50h21M75 50h21" stroke="${ink}" stroke-width="${stroke}" fill="none"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="50" cy="50" r="${r}" fill="none" stroke="${ink}" stroke-width="${stroke}"/><circle cx="50" cy="50" r="${variant === 'small' ? 11 : 7}" fill="${accent}"/>${ticks}</g>`;
}

const colourways = {
  light: { ink: P.ink, accent: P.cobalt, bg: P.paper },
  dark: { ink: P.paper, accent: P.cobaltLight, bg: P.ink },
  cobalt: { ink: P.paper, accent: P.paper, bg: P.cobalt },
  'mono-ink': { ink: P.ink, accent: P.ink, bg: '#FFFFFF' },
  'mono-paper': { ink: '#FFFFFF', accent: '#FFFFFF', bg: P.ink },
};
const svgDoc = (w, h, inner, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(w)} ${f(h)}" width="${f(w)}" height="${f(h)}" role="img" aria-label="${title}"><title>${title}</title>${inner}</svg>\n`;

// ---- primary wordmark ----
function wordmark(c, px) {
  const size = 100;
  const r = run('fıeldwork', size, -0.065);
  const gl = sans.charToGlyph('ı'); const bb = gl.getBoundingBox();
  const i = { x: r.info[1].x + ((bb.x1 + bb.x2) / 2 / sans.unitsPerEm) * size, adv: 0 };
  const xh = (sans.tables.os2.sxHeight * size) / sans.unitsPerEm;
  const d = 28; // disc diameter
  const cx = i.x + 4, cy = -xh - d / 2 - 5;
  const pad = 4, top = cy - d / 2 - pad, bottom = size * 0.24;
  const inner = `<g transform="translate(${pad} ${f(-top)})"><path d="${r.d}" fill="${c.ink}"/>${disc({ cx, cy, d, fill: c.accent, px })}</g>`;
  return { w: r.width + pad * 2, h: bottom - top, inner };
}
// ---- target lockup (icon + wordmark, horizontal) ----
function lockup(c) {
  const w = wordmark(c, 400);
  const sym = w.h * 0.62, gap = sym * 0.4;
  const inner = target({ ink: c.ink, accent: c.accent, s: sym / 100, y: (w.h - sym) / 2 }) + `<g transform="translate(${f(sym + gap)} 0)">${w.inner}</g>`;
  return { w: sym + gap + w.w, h: w.h, inner };
}

for (const [name, c] of Object.entries(colourways)) {
  const items = { wordmark: wordmark(c, 400), 'wordmark-small': wordmark(c, 32), lockup: lockup(c) };
  for (const [k, v] of Object.entries(items)) fs.writeFileSync(out('logo', `fieldwork-${k}-${name}.svg`), svgDoc(v.w, v.h, v.inner, 'Fieldwork'));
  fs.writeFileSync(out('logo', `fieldwork-target-${name}.svg`), svgDoc(100, 100, target({ ink: c.ink, accent: c.accent }), 'Fieldwork target icon'));
  fs.writeFileSync(out('logo', `fieldwork-target-small-${name}.svg`), svgDoc(100, 100, target({ ink: c.ink, accent: c.accent, variant: 'small' }), 'Fieldwork target icon'));
  fs.writeFileSync(out('logo', `fieldwork-disc-${name}.svg`), svgDoc(100, 100, disc({ cx: 50, cy: 50, d: 100, fill: c.accent }), 'Fieldwork dot-matrix symbol'));
}

// ---- PNG exports ----
async function png(svgFile, dest, width) { await sharp(svgFile, { density: 384 }).resize({ width }).png().toFile(dest); }
for (const n of Object.keys(colourways)) for (const k of ['wordmark', 'lockup', 'target', 'disc']) await png(out('logo', `fieldwork-${k}-${n}.svg`), out('logo/png', `fieldwork-${k}-${n}.png`), ['target', 'disc'].includes(k) ? 1024 : 2400);

// ---- favicons / avatar ----
const tile = (bg, ink, accent) => svgDoc(100, 100, `<rect width="100" height="100" rx="16" fill="${bg}"/>` + target({ ink, accent, variant: 'small', x: 14, y: 14, s: 0.72 }), 'Fieldwork');
fs.writeFileSync(out('favicon/favicon.svg'), svgDoc(100, 100, `<style>.i{stroke:${P.ink}}.a{fill:${P.cobalt}}@media (prefers-color-scheme:dark){.i{stroke:${P.paper}}.a{fill:${P.cobaltLight}}}</style><circle class="i" cx="50" cy="50" r="30" fill="none" stroke-width="10"/><circle class="a" cx="50" cy="50" r="12"/>`, 'Fieldwork'));
const iconSvg = Buffer.from(tile(P.cobalt, P.paper, P.paper));
for (const [n, s] of [['favicon-16', 16], ['favicon-32', 32], ['favicon-48', 48], ['apple-touch-icon', 180], ['icon-192', 192], ['icon-512', 512]]) await sharp(iconSvg, { density: 600 }).resize(s, s).png().toFile(out('favicon', n + '.png'));
const pngs = await Promise.all([16, 32, 48].map((s) => sharp(iconSvg, { density: 600 }).resize(s, s).png().toBuffer()));
const hdr = Buffer.alloc(6); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length; const dir = [];
pngs.forEach((b, i) => { const e = Buffer.alloc(16); const s = [16, 32, 48][i]; e[0] = s; e[1] = s; e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(b.length, 8); e.writeUInt32LE(offset, 12); offset += b.length; dir.push(e); });
fs.writeFileSync(out('favicon/favicon.ico'), Buffer.concat([hdr, ...dir, ...pngs]));
fs.copyFileSync(out('favicon/favicon.ico'), path.join(root, 'src/app/favicon.ico'));
const avatar = svgDoc(100, 100, `<rect width="100" height="100" fill="${P.cobalt}"/>` + target({ ink: P.paper, accent: P.paper, x: 20, y: 20, s: 0.6 }), 'Fieldwork avatar');
fs.writeFileSync(out('favicon/avatar.svg'), avatar);
for (const s of [400, 1024]) await sharp(Buffer.from(avatar), { density: 600 }).resize(s, s).png().toFile(out('social', `fieldwork-avatar-${s}.png`));

// ---- Open Graph image 1200x630: paper, dot terrain, giant cropped wordmark, corner letters ----
const terrain = halftoneSvg({ seed: 6, w: 900, h: 700, step: 26, maxR: 10, mask: 'circle' }).match(/<path d="([^"]*)"/)[1];
const wm = wordmark(colourways.light, 400); const sc = 1180 / wm.w;
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><rect width="1200" height="630" fill="${P.paper}"/><g transform="translate(660 -40) scale(.7)"><path d="${terrain}" fill="${P.cobalt}"/></g><g font-family="monospace" font-size="14" fill="${P.grey}"><text x="18" y="30">F</text><text x="1170" y="30" text-anchor="end">(02)</text><text x="18" y="612">I</text><text x="1170" y="612" text-anchor="end">E</text></g><text x="40" y="200" font-family="Arial,sans-serif" font-weight="700" font-size="40" fill="${P.ink}" letter-spacing="-1.5">Practise AI on real work.</text><g transform="translate(10 ${f(660 - wm.h * sc + wm.h * sc * 0.05)}) scale(${f(sc)})">${wm.inner}</g></svg>`;
await sharp(Buffer.from(og), { density: 144 }).resize(1200, 630).png().toFile(out('social/og-default.png'));
console.log('identity built');
