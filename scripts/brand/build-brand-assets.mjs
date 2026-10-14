// Builds every logo asset from one geometry definition so the website, documents
// and social files always use the same mark. Output: public/brand/**, src/components/brand/logo-data.ts
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';
import { palette as P } from './palette.mjs';

const root = path.resolve(import.meta.dirname, '../..');
const out = (...p) => path.join(root, 'public/brand', ...p);
for (const d of ['logo', 'logo/concepts', 'logo/png', 'favicon', 'social']) fs.mkdirSync(out(d), { recursive: true });

const loadFont = (file) => {
  const b = fs.readFileSync(path.join(root, 'node_modules/@fontsource/fraunces/files', file));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const fontNormal = loadFont('fraunces-latin-600-normal.woff');
const fontItalic = loadFont('fraunces-latin-500-italic.woff');

/** Lay out a string as outlined paths. Returns { d, width, glyphs } with baseline at y=0. */
function layout(font, text, size, tracking = 0) {
  const scale = size / font.unitsPerEm;
  let x = 0;
  const cmds = [];
  const chars = [...text];
  chars.forEach((ch, i) => {
    const g = font.charToGlyph(ch);
    const p = g.getPath(x, 0, size);
    cmds.push(p.toPathData(2));
    x += g.advanceWidth * scale + tracking * size;
    const next = chars[i + 1];
    if (next) x += font.getKerningValue(g, font.charToGlyph(next)) * scale;
  });
  return { d: cmds.join(' '), width: x - tracking * size };
}

/** Find the dot of the dotted "i": the highest contour. */
function iDot(font, size) {
  const g = font.charToGlyph('i');
  const p = g.getPath(0, 0, size);
  const contours = [];
  let cur = [];
  for (const c of p.commands) {
    if (c.type === 'M' && cur.length) { contours.push(cur); cur = []; }
    cur.push(c);
  }
  contours.push(cur);
  const boxes = contours.map((cs) => {
    const pts = cs.flatMap((c) => ['x', 'x1', 'x2'].filter((k) => c[k] !== undefined).map((k, j) => [c[k], c['y' + k.slice(1)]]));
    const xs = pts.map((q) => q[0]); const ys = pts.map((q) => q[1]);
    return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
  });
  boxes.sort((a, b) => a.y0 - b.y0);
  const b = boxes[0];
  return { cx: (b.x0 + b.x1) / 2, cy: (b.y0 + b.y1) / 2, r: Math.max(b.x1 - b.x0, b.y1 - b.y0) / 2, w: g.advanceWidth * size / font.unitsPerEm };
}

// ---------- Wordmark: "Fieldwork" with a drawn dot on the i ----------
const SIZE = 100;
const TRACK = -0.012;
const iIndex = 1;
// Build text with dotless i (ı) and add a circle where the dot belongs.
const wm = layout(fontNormal, 'Fıeldwork', SIZE, TRACK);
const dot = iDot(fontNormal, SIZE);
// x offset of the i = advance of "F" + tracking + kerning
const fAdv = (() => {
  const gF = fontNormal.charToGlyph('F'); const gI = fontNormal.charToGlyph('ı');
  return gF.advanceWidth * SIZE / fontNormal.unitsPerEm + TRACK * SIZE + fontNormal.getKerningValue(gF, gI) * SIZE / fontNormal.unitsPerEm;
})();
const wordDot = { cx: fAdv + dot.cx, cy: dot.cy, r: dot.r * 1.12 };
const wmBounds = { x: 0, y: -80, w: wm.width, h: 82 }; // cap/ascender top to just below baseline

// ---------- Symbol: the plot ----------
const symbolParts = (c, { ticks = true } = {}) => {
  const t = ticks
    ? `<g stroke="${c.frame}" stroke-width="4" stroke-linecap="butt"><path d="M50 2V11M50 89V98M2 50H11M89 50H98"/></g>`
    : '';
  return `${t}<rect x="14" y="14" width="72" height="72" fill="none" stroke="${c.frame}" stroke-width="6"/>` +
    `<path d="M20 80V38A42 42 0 0 1 62 80Z" fill="${c.quarter}"/>` +
    `<circle cx="67" cy="33" r="9" fill="${c.dot}"/>`;
};

const colourways = {
  light: { frame: P.burgundy, quarter: P.terracotta, dot: P.saffron, word: P.ink, wordDot: P.terracotta, bg: P.paper },
  dark: { frame: P.paper, quarter: P.terracottaBright, dot: P.saffron, word: P.paper, wordDot: P.terracottaBright, bg: P.ink },
  'mono-ink': { frame: P.ink, quarter: P.ink, dot: P.ink, word: P.ink, wordDot: P.ink, bg: '#FFFFFF' },
  'mono-paper': { frame: P.paper, quarter: P.paper, dot: P.paper, word: P.paper, wordDot: P.paper, bg: P.ink },
};

const svg = (vb, inner, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="Fieldwork"${extra}>${inner}</svg>\n`;
const wordInner = (c) => `<path d="${wm.d}" fill="${c.word}"/><circle cx="${wordDot.cx.toFixed(2)}" cy="${wordDot.cy.toFixed(2)}" r="${wordDot.r.toFixed(2)}" fill="${c.wordDot}"/>`;

// Horizontal lockup geometry: symbol scaled so frame matches ~1.15x cap height
const SYM = 104;           // symbol box edge in the lockup
const symY = -SYM + 18;    // baseline-relative placement
const gap = 26;
const lockup = (c, { ticks = true } = {}) => {
  const sym = `<g transform="translate(0 ${symY})">${symbolParts(c, { ticks })}</g>`;
  const word = `<g transform="translate(${SYM + gap} 0)">${wordInner(c)}</g>`;
  const w = SYM + gap + wm.width;
  const vb = `-2 ${symY - 2} ${(w + 4).toFixed(1)} ${SYM + 4}`;
  return { svg: svg(vb, sym + word), vb, w: w + 4, h: SYM + 4 };
};
const stacked = (c) => {
  const w = Math.max(wm.width, SYM);
  const sym = `<g transform="translate(${(w - SYM) / 2} 0)">${symbolParts(c)}</g>`;
  const word = `<g transform="translate(${(w - wm.width) / 2} ${SYM + 82})">${wordInner(c)}</g>`;
  const vb = `-2 -2 ${(w + 4).toFixed(1)} ${SYM + 82 + 18}`;
  return svg(vb, sym + word);
};

const files = {};
const write = (rel, content) => { fs.writeFileSync(out(rel), content); files[rel] = content; };

for (const [name, c] of Object.entries(colourways)) {
  write(`logo/fieldwork-logo-${name}.svg`, lockup(c).svg);
  write(`logo/fieldwork-wordmark-${name}.svg`, svg(`-2 -80 ${(wm.width + 4).toFixed(1)} 84`, wordInner(c)));
  write(`logo/fieldwork-symbol-${name}.svg`, svg('0 0 100 100', symbolParts(c)));
  write(`logo/fieldwork-logo-stacked-${name}.svg`, stacked(c));
}
// Symbol without ticks (small sizes)
write('logo/fieldwork-symbol-small-light.svg', svg('0 0 100 100', symbolParts({ ...colourways.light }, { ticks: false })));

// Favicon: burgundy tile, paper frame, saffron dot. Ticks removed for legibility at 16px.
const favSvg = (size = 100, rx = 22) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}"><rect width="100" height="100" rx="${rx}" fill="${P.burgundy}"/><rect x="18" y="18" width="64" height="64" fill="none" stroke="${P.paper}" stroke-width="8"/><path d="M26 74V42A32 32 0 0 1 58 74Z" fill="${P.terracottaBright}"/><circle cx="64" cy="36" r="9" fill="${P.saffron}"/></svg>\n`;
write('favicon/favicon.svg', favSvg());
write('favicon/avatar.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${P.burgundy}"/><g transform="translate(14 14) scale(.72)">${symbolParts({ frame: P.paper, quarter: P.terracottaBright, dot: P.saffron })}</g></svg>\n`);

// ---------- PNG exports ----------
const png = async (svgStr, file, width, { bg } = {}) => {
  let s = sharp(Buffer.from(svgStr), { density: 300 }).resize({ width });
  if (bg) s = s.flatten({ background: bg });
  await s.png().toFile(file);
};
const run = async () => {
  for (const name of Object.keys(colourways)) {
    const bg = name.endsWith('paper') || name === 'dark' ? undefined : undefined;
    await png(files[`logo/fieldwork-logo-${name}.svg`], out(`logo/png/fieldwork-logo-${name}-2000w.png`), 2000);
    await png(files[`logo/fieldwork-symbol-${name}.svg`], out(`logo/png/fieldwork-symbol-${name}-1024.png`), 1024);
    await png(files[`logo/fieldwork-wordmark-${name}.svg`], out(`logo/png/fieldwork-wordmark-${name}-1600w.png`), 1600);
  }
  const fav = files['favicon/favicon.svg'];
  const sizes = { 'favicon-16.png': 16, 'favicon-32.png': 32, 'favicon-48.png': 48, 'apple-touch-icon.png': 180, 'icon-192.png': 192, 'icon-512.png': 512 };
  for (const [f, w] of Object.entries(sizes)) {
    const svgStr = f === 'apple-touch-icon.png' ? favSvg(180, 0) : fav;
    await png(svgStr, out(`favicon/${f}`), w);
  }
  await png(files['favicon/avatar.svg'], out('social/fieldwork-avatar-1024.png'), 1024);
  await png(files['favicon/avatar.svg'], out('social/fieldwork-avatar-400.png'), 400);
  // ICO with embedded PNGs (16, 32, 48)
  const imgs = await Promise.all([16, 32, 48].map((w) => sharp(out(`favicon/favicon-${w}.png`)).png().toBuffer()));
  const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4);
  let offset = 6 + 16 * imgs.length;
  const entries = imgs.map((b, i) => {
    const w = [16, 32, 48][i]; const e = Buffer.alloc(16);
    e.writeUInt8(w, 0); e.writeUInt8(w, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(b.length, 8); e.writeUInt32LE(offset, 12);
    offset += b.length; return e;
  });
  fs.writeFileSync(out('favicon/favicon.ico'), Buffer.concat([head, ...entries, ...imgs]));
  fs.copyFileSync(out('favicon/favicon.ico'), path.join(root, 'src/app/favicon.ico'));
};

// ---------- Logo metadata for React (intrinsic sizes only; the SVG files are the source of truth) ----------
const lt = lockup(colourways.light);
const tsData = `// GENERATED by scripts/brand/build-brand-assets.mjs. Do not edit by hand.
export const LOGO_SIZES = {
  lockup: { width: ${Math.round(lt.w * 10)}, height: ${Math.round(lt.h * 10)} },
  symbol: { width: 100, height: 100 },
} as const;
`;
fs.mkdirSync(path.join(root, 'src/components/brand'), { recursive: true });
fs.mkdirSync(path.join(root, 'src/app'), { recursive: true });
fs.writeFileSync(path.join(root, 'src/components/brand/logo-data.ts'), tsData);

// ---------- Concept directions (for evaluation sheet) ----------
const italic = layout(fontItalic, 'Fieldwork', 100, -0.01);
const conceptA = `<g transform="translate(40 150)">${lockup(colourways.light).svg.replace(/^<svg[^>]*>|<\/svg>\n$/g, '').replace(/^/, '')}</g>`;
const bars = [0, 1, 2, 3].map((i) => `<rect x="${i * 20}" y="${64 - (i + 1) * 14}" width="12" height="${(i + 1) * 14 + 20}" fill="${[P.moss, P.saffron, P.terracotta, P.burgundy][i]}"/>`).join('') + `<path d="M84 84 L98 68 L120 30" stroke="${P.burgundy}" stroke-width="10" fill="none" stroke-linecap="butt"/>`;
const conceptsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520" font-family="Instrument Sans, sans-serif"><rect width="1200" height="520" fill="${P.paper}"/>
<g transform="translate(40 40)"><text y="0" font-size="13" fill="${P.inkSoft}" letter-spacing="2">A / THE PLOT</text></g>
<g transform="translate(40 150) scale(.58)">${lockup(colourways.light).svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\n$/, '')}</g>
<g transform="translate(40 290) scale(.9)"><g>${symbolParts(colourways.light)}</g></g>
<g transform="translate(40 460)"><text font-size="13" fill="${P.ink}">Survey square, a made shape, a note.</text></g>
<line x1="420" y1="30" x2="420" y2="490" stroke="${P.line}"/>
<g transform="translate(450 40)"><text font-size="13" fill="${P.inkSoft}" letter-spacing="2">B / THE MARGIN NOTE</text></g>
<g transform="translate(450 200) scale(.7)"><path d="${italic.d}" fill="${P.ink}"/><text x="${italic.width + 4}" y="-40" font-family="Fraunces, serif" font-size="56" fill="${P.terracotta}">*</text></g>
<g transform="translate(450 260)"><line x1="0" y1="0" x2="320" y2="0" stroke="${P.terracotta}" stroke-width="1.5"/><text y="24" font-size="14" fill="${P.inkSoft}">* practise AI on real work</text></g>
<g transform="translate(450 460)"><text font-size="13" fill="${P.ink}">Italic wordmark and a note mark. Weak symbol.</text></g>
<line x1="830" y1="30" x2="830" y2="490" stroke="${P.line}"/>
<g transform="translate(860 40)"><text font-size="13" fill="${P.inkSoft}" letter-spacing="2">C / THE FURROWS</text></g>
<g transform="translate(870 160) scale(1.3)">${bars}</g>
<g transform="translate(860 460)"><text font-size="13" fill="${P.ink}">Rows rising to a tick. Reads as a chart.</text></g>
</svg>\n`;
fs.writeFileSync(out('logo/concepts/fieldwork-logo-directions.svg'), conceptsSvg);

await run();
console.log('brand assets built');
