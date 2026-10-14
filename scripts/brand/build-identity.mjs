// Builds the Fieldwork logo system as outlined SVG (no font dependency) + PNG/ICO exports.
// Display wordmark: Schibsted Grotesk 800 lowercase with a drawn benchmark tittle.
// Compact lockup: Cormorant Garamond 500 capitals + benchmark symbol.
// Archive: the Concept 2 "Brief" wordmark with a halftone-disc tittle.
import opentype from 'opentype.js';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { palette as P } from './palette.mjs';

const root = process.cwd();
const out = (...p) => path.join(root, 'public/brand', ...p);
for (const d of ['logo/png', 'logo/archive', 'favicon', 'social']) fs.mkdirSync(out(d), { recursive: true });

const sb = fs.readFileSync(path.join(root, 'assets/fonts-build/schibsted-800.ttf'));
const sans = opentype.parse(sb.buffer.slice(sb.byteOffset, sb.byteOffset + sb.byteLength));
const caps = JSON.parse(fs.readFileSync(path.join(root, 'assets/fonts-build/cormorant-caps.json'), 'utf8'));

const f = (n) => +n.toFixed(2);
function run(font, text, size, tracking = 0, kern = true) {
  let x = 0, d = '';
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  const info = [];
  glyphs.forEach((g, i) => {
    const p = g.getPath(x, 0, size);
    d += p.toPathData(2);
    info.push({ x, adv: g.advanceWidth * size / font.unitsPerEm, ch: text[i] });
    x += g.advanceWidth * size / font.unitsPerEm + tracking * size;
    if (kern && i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * size / font.unitsPerEm;
  });
  return { d, width: x - tracking * size, info };
}


// Caps from pre-extracted Cormorant outlines (opentype.js mis-parses the W). Returns a group placed at baseline (0,0).
function capsRun(text, size, tracking) {
  const k = size / caps.upm; let x = 0, body = '';
  for (const ch of text) {
    const g = caps.g[ch];
    body += `<path transform="translate(${f(x)} 0) scale(${k} ${-k})" d="${g.d}"/>`;
    x += g.adv * k + tracking * size;
  }
  return { body, width: x - tracking * size, cap: caps.cap * k };
}

// ---- benchmark symbol (100 box) ----
export function symbol({ ink, accent, variant = 'full', x = 0, y = 0, s = 1 }) {
  const stroke = variant === 'small' ? 9 : variant === 'mid' ? 7 : 6;
  const ticks = variant === 'small' ? '' : `<path d="M50 4v21M50 75v21M4 50h21M75 50h21" stroke="${ink}" stroke-width="${stroke}" stroke-linecap="butt" fill="none"/>`;
  const r = variant === 'small' ? 30 : 27.5;
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="50" cy="50" r="${r}" fill="none" stroke="${ink}" stroke-width="${stroke}"/><circle cx="50" cy="50" r="${variant === 'small' ? 11 : 7}" fill="${accent}"/>${ticks}</g>`;
}

const colourways = {
  light: { ink: P.charcoal, accent: P.clay, bg: P.chalk },
  dark: { ink: P.chalk, accent: P.clayLight, bg: P.charcoal },
  indigo: { ink: P.chalk, accent: P.clayLight, bg: P.indigo },
  'mono-ink': { ink: P.charcoal, accent: P.charcoal, bg: '#FFFFFF' },
  'mono-paper': { ink: '#FFFFFF', accent: '#FFFFFF', bg: P.charcoal },
};
const svgDoc = (w, h, inner, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(w)} ${f(h)}" width="${f(w)}" height="${f(h)}" role="img" aria-label="${title}"><title>${title}</title>${inner}</svg>\n`;

// ---- display wordmark: lowercase, dotless i, benchmark tittle ----
function displayWordmark(c) {
  const size = 100;
  const r = run(sans, 'fıeldwork', size, 0.004);
  const i = r.info[1];
  const capH = sans.tables.os2.sxHeight * size / sans.unitsPerEm;
  const cx = i.x + i.adv / 2;
  const ringR = 13, tilt = ringR + 8;
  const cy = -capH - tilt - 2;
  const pad = 6;
  const top = cy - ringR - pad, bottom = size * 0.26;
  const tittle = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${ringR - 2.5}" fill="none" stroke="${c.accent}" stroke-width="5"/><circle cx="${f(cx)}" cy="${f(cy)}" r="3.4" fill="${c.accent}"/>`;
  const inner = `<g transform="translate(${pad} ${f(-top)})"><path d="${r.d}" fill="${c.ink}"/>${tittle}</g>`;
  return { w: r.width + pad * 2, h: bottom - top, inner };
}

// ---- compact caps lockup (horizontal) ----
function capsLockup(c) {
  const size = 64;
  const r = capsRun('FIELDWORK', size, 0.2); r.d = '';
  const cap = r.cap;
  const sym = cap * 1.55;
  const gap = sym * 0.45;
  const h = sym;
  const inner = symbol({ ink: c.ink, accent: c.accent, variant: 'mid', s: sym / 100 }) +
    `<g fill="${c.ink}" transform="translate(${f(sym + gap)} ${f(h / 2 + cap / 2)})">${r.body}</g>`;
  return { w: sym + gap + r.width, h, inner };
}
function capsStacked(c) {
  const size = 64;
  const r = capsRun('FIELDWORK', size, 0.2);
  const cap = r.cap;
  const sym = 72, w = Math.max(r.width, sym);
  const inner = symbol({ ink: c.ink, accent: c.accent, variant: 'full', x: (w - sym) / 2, s: sym / 100 }) +
    `<g fill="${c.ink}" transform="translate(${f((w - r.width) / 2)} ${f(sym + 18 + cap)})">${r.body}</g>`;
  return { w, h: sym + 18 + cap, inner };
}
// ---- archived Concept 2 wordmark: halftone-disc tittle ----
function briefWordmark(c) {
  const size = 100;
  const r = run(sans, 'fıeldwork', size, 0.004);
  const i = r.info[1];
  const capH = sans.tables.os2.sxHeight * size / sans.unitsPerEm;
  const cx = i.x + i.adv / 2, cy = -capH - 24, R = 15;
  let dots = '';
  const step = 5.2;
  for (let gy = -R; gy <= R; gy += step) for (let gx = -R; gx <= R; gx += step) {
    const d = Math.hypot(gx, gy); if (d > R) continue;
    const rr = 0.7 + (1 - d / R) * 2.1;
    dots += `<circle cx="${f(cx + gx)}" cy="${f(cy + gy)}" r="${f(rr)}" fill="${c.accent}"/>`;
  }
  const pad = 6, top = cy - R - pad, bottom = size * 0.26;
  return { w: r.width + pad * 2, h: bottom - top, inner: `<g transform="translate(${pad} ${f(-top)})"><path d="${r.d}" fill="${c.ink}"/>${dots}</g>` };
}

const sheet = [];
for (const [name, c] of Object.entries(colourways)) {
  const items = {
    'wordmark': displayWordmark(c), 'lockup': capsLockup(c), 'lockup-stacked': capsStacked(c),
  };
  for (const [k, v] of Object.entries(items)) {
    fs.writeFileSync(out('logo', `fieldwork-${k}-${name}.svg`), svgDoc(v.w, v.h, v.inner, 'Fieldwork'));
  }
  const sv = svgDoc(100, 100, symbol({ ink: c.ink, accent: c.accent }), 'Fieldwork benchmark symbol');
  fs.writeFileSync(out('logo', `fieldwork-symbol-${name}.svg`), sv);
  if (name === 'light' || name === 'dark') fs.writeFileSync(out('logo', `fieldwork-symbol-small-${name}.svg`), svgDoc(100, 100, symbol({ ink: c.ink, accent: c.accent, variant: 'small' }), 'Fieldwork symbol'));
  if (name === 'light' || name === 'dark') {
    const b = briefWordmark(c);
    fs.writeFileSync(out('logo/archive', `fieldwork-brief-wordmark-${name}.svg`), svgDoc(b.w, b.h, b.inner, 'Fieldwork (Brief wordmark, archive)'));
  }
}

// ---- PNG exports ----
async function png(svgFile, dest, width, bg) {
  let img = sharp(svgFile, { density: 384 }).resize({ width });
  if (bg) img = img.flatten({ background: bg });
  await img.png().toFile(dest);
}
for (const n of ['light', 'dark', 'indigo', 'mono-ink', 'mono-paper']) {
  for (const k of ['wordmark', 'lockup', 'lockup-stacked', 'symbol']) {
    await png(out('logo', `fieldwork-${k}-${n}.svg`), out('logo/png', `fieldwork-${k}-${n}.png`), k === 'symbol' ? 1024 : 2400);
  }
}

// ---- favicons / avatar / OG ----
const favSvg = (bg, ink, accent, rounded = true) => svgDoc(100, 100, `<rect width="100" height="100" ${rounded ? 'rx="20"' : ''} fill="${bg}"/>` + symbol({ ink, accent, variant: 'small', x: 14, y: 14, s: 0.72 }), 'Fieldwork');
fs.writeFileSync(out('favicon/favicon.svg'), svgDoc(100, 100, `<style>@media (prefers-color-scheme:dark){.i{stroke:${P.chalk}}.a{fill:${P.clayLight}}}</style><circle class="i" cx="50" cy="50" r="30" fill="none" stroke="${P.charcoal}" stroke-width="10"/><circle class="a" cx="50" cy="50" r="12" fill="${P.clay}"/>`, 'Fieldwork'));
const iconSvg = Buffer.from(favSvg(P.charcoal, P.chalk, P.clayLight));
for (const [n, s] of [['favicon-16', 16], ['favicon-32', 32], ['favicon-48', 48], ['apple-touch-icon', 180], ['icon-192', 192], ['icon-512', 512]]) await sharp(iconSvg, { density: 600 }).resize(s, s).png().toFile(out('favicon', n + '.png'));
// ICO (PNG-in-ICO, 16/32/48)
const pngs = await Promise.all([16, 32, 48].map((s) => sharp(iconSvg, { density: 600 }).resize(s, s).png().toBuffer()));
const hdr = Buffer.alloc(6); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length; const dir = [];
pngs.forEach((b, i) => { const e = Buffer.alloc(16); const s = [16, 32, 48][i]; e[0] = s; e[1] = s; e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(b.length, 8); e.writeUInt32LE(offset, 12); offset += b.length; dir.push(e); });
fs.writeFileSync(out('favicon/favicon.ico'), Buffer.concat([hdr, ...dir, ...pngs]));
const avatar = svgDoc(100, 100, `<rect width="100" height="100" fill="${P.charcoal}"/>` + symbol({ ink: P.chalk, accent: P.clayLight, variant: 'mid', x: 20, y: 20, s: 0.6 }), 'Fieldwork avatar');
fs.writeFileSync(out('favicon/avatar.svg'), avatar);
for (const s of [400, 1024]) await sharp(Buffer.from(avatar), { density: 600 }).resize(s, s).png().toFile(out('social', `fieldwork-avatar-${s}.png`));

// OG image 1200x630: chalk, giant wordmark, label
const wm = displayWordmark(colourways.light);
const wmW = 1040, sc = wmW / wm.w;
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><rect width="1200" height="630" fill="${P.chalk}"/><rect x="40" y="40" width="1120" height="550" fill="none" stroke="${P.hairline}" stroke-width="2"/><g transform="translate(80 ${f(300 - wm.h * sc / 2 + 20)}) scale(${f(sc)})">${wm.inner}</g><rect x="80" y="500" width="330" height="2" fill="${P.charcoal}"/></svg>`;
await sharp(Buffer.from(og), { density: 144 }).resize(1200, 630).png().toFile(out('social/og-default.png'));
console.log('identity built');
