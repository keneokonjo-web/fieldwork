// Pre-generates the dot-terrain library (halftone terrain, Concept 2) as static SVG files.
// Output: public/art/terrain-<seed>-<mask>-<tone>.svg. Tones: paper (cobalt dots on paper), ink (cobalt-light on ink), cobalt (paper on cobalt), wash (ink dots on wash).
import fs from 'node:fs';
import path from 'node:path';
import { halftoneSvg } from './field-generator.mjs';
import { palette as P } from './palette.mjs';

const out = path.join(process.cwd(), 'public/art');
fs.mkdirSync(out, { recursive: true });
const tones = { paper: { bg: P.paper, ink: P.cobalt }, ink: { bg: P.ink, ink: P.cobaltLight }, cobalt: { bg: P.cobalt, ink: P.paper }, wash: { bg: P.wash, ink: P.ink } };
const W = 900, H = 700;
const sets = [[6, 'circle'], [4, 'fade-right'], [9, 'fade-down'], [21, 'fade-right'], [12, 'circle']];
let n = 0;
for (const [tone, t] of Object.entries(tones)) for (const [seed, mask] of sets) {
  const svg = halftoneSvg({ seed, w: W, h: H, step: 26, maxR: 10, mask }).replace(/currentColor/g, t.ink).replace('focusable="false">', `focusable="false"><rect width="${W}" height="${H}" fill="${t.bg}"/>`);
  fs.writeFileSync(path.join(out, `terrain-${seed}-${mask}-${tone}.svg`), svg); n++;
  // transparent version for layering over page grounds (dots only)
  if (tone === 'paper' || tone === 'ink') fs.writeFileSync(path.join(out, `terrain-${seed}-${mask}-${tone === 'paper' ? 'cobalt' : 'cobaltlight'}-clear.svg`), halftoneSvg({ seed, w: W, h: H, step: 26, maxR: 10, mask }).replace(/currentColor/g, t.ink)); 
}
console.log(`wrote ${n} art files (+clear)`);
