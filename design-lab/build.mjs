// Builds self-contained concept boards from design-lab/src/*.html into the launch kit.
//   /*FONTS:a,b*/                                   -> base64 @font-face rules
//   <!--FIELD:contour:seed:w:h:levels:scale-->        -> generated contour field SVG (stroke = currentColor)
//   <!--FIELD:dots:seed:w:h:step:maxR:mask-->         -> generated halftone terrain SVG (fill = currentColor)
import fs from 'node:fs';
import path from 'node:path';
import { contourSvg, halftoneSvg } from '../scripts/brand/field-generator.mjs';
import { summit, smoothPath } from '../scripts/brand/summit.mjs';

const root = path.resolve(import.meta.dirname, '..');
const nm = (...p) => path.join(root, 'node_modules', ...p);
const b64 = (f) => fs.readFileSync(f).toString('base64');
const w2 = (family, file, weight = '400', style = 'normal') => `@font-face{font-family:"${family}";src:url(data:font/woff2;base64,${b64(file)}) format("woff2");font-weight:${weight};font-style:${style};font-display:swap}`;
const vf = (pkg, axis = 'wght', style = 'normal') => nm('@fontsource-variable', pkg, 'files', `${pkg}-latin-${axis}-${style}.woff2`);
const sf = (pkg, name) => nm('@fontsource', pkg, 'files', `${pkg}-latin-${name}.woff2`);

const faces = {
  gloock: () => w2('Gloock', sf('gloock', '400-normal')),
  hanken: () => w2('Hanken Grotesk', vf('hanken-grotesk'), '100 900'),
  geistmono: () => w2('Geist Mono', vf('geist-mono'), '100 900'),
  schibsted: () => w2('Schibsted Grotesk', vf('schibsted-grotesk'), '400 900'),
  cormorant: () => w2('Cormorant Garamond', sf('cormorant-garamond', '400-normal'), '400') + w2('Cormorant Garamond', sf('cormorant-garamond', '500-normal'), '500') + w2('Cormorant Garamond', sf('cormorant-garamond', '400-italic'), '400', 'italic') + w2('Cormorant Garamond', sf('cormorant-garamond', '500-italic'), '500', 'italic'),
  newsreader: () => w2('Newsreader', vf('newsreader'), '200 800') + w2('Newsreader', vf('newsreader', 'wght', 'italic'), '200 800', 'italic'),
  plexmono: () => w2('Plex Mono', sf('ibm-plex-mono', '400-normal'), '400') + w2('Plex Mono', sf('ibm-plex-mono', '500-normal'), '500'),
  instrumentsans: () => w2('Instrument Sans', vf('instrument-sans'), '400 700'),
};

// Torn-paper edge: irregular polyline filled with currentColor. <!--TORN:seed:width:amplitude-->
function tornSvg(seed, w, amp) {
  let a = seed * 9301 + 49297; const rnd = () => { a = (a * 9301 + 49297) % 233280; return a / 233280; };
  let d = `M0 ${amp * 2} `; let x = 0;
  while (x < w) { x += 6 + rnd() * 14; d += `L${Math.min(x, w).toFixed(1)} ${(amp + (rnd() - 0.5) * amp * 2).toFixed(1)} `; }
  d += `L${w} 0 L0 0Z`;
  return `<svg class="torn" viewBox="0 0 ${w} ${amp * 2}" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="${d}" fill="currentColor"/></svg>`;
}

// Summit mark: <!--SUMMIT:seed:rings:spread-->. Rings stroke with currentColor; the core (last ring) has class "core".
function summitSvg(seed, rings, spread) {
  const m = summit({ seed, rings, spread });
  const paths = m.rings.map((r, i) => `<path class="${i === m.rings.length - 1 ? 'core' : 'ring'}" d="${smoothPath(r, 2)}" fill="${i === m.rings.length - 1 ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="${i === 0 ? 6 : 5}" stroke-linejoin="round"/>`).join('');
  return `<svg class="summit" viewBox="-5 -5 110 110" aria-hidden="true" focusable="false">${paths}</svg>`;
}

const outDir = path.join(root, 'deliverables/fieldwork-launch-kit/01-brand/concepts');
fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(path.join(root, 'design-lab/src')).filter((x) => x.endsWith('.html'))) {
  let html = fs.readFileSync(path.join(root, 'design-lab/src', f), 'utf8');
  html = html.replace(/\/\*FONTS:([a-z,]+)\*\//g, (_, names) => names.split(',').map((n) => faces[n]()).join('\n'));
  html = html.replace(/<!--FIELD:contour:(\d+):(\d+):(\d+):(\d+):([\d.]+)-->/g, (_, seed, w, h, levels, scale) => contourSvg({ seed: +seed, w: +w, h: +h, levels: +levels, scale: +scale }));
  html = html.replace(/<!--FIELD:dots:(\d+):(\d+):(\d+):(\d+):([\d.]+):([a-z-]*)-->/g, (_, seed, w, h, step, maxR, mask) => halftoneSvg({ seed: +seed, w: +w, h: +h, step: +step, maxR: +maxR, mask: mask || null }));
  html = html.replace(/<!--TORN:(\d+):(\d+):(\d+)-->/g, (_, seed, w, amp) => tornSvg(+seed, +w, +amp));
  html = html.replace(/<!--SUMMIT:(\d+):(\d+):([\d.]+)-->/g, (_, seed, rings, spread) => summitSvg(+seed, +rings, +spread));
  fs.writeFileSync(path.join(outDir, f), html);
  console.log('built', f, (html.length / 1024).toFixed(0) + 'KB');
}
