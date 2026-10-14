// Pre-generates the field artwork library as static SVG files (no runtime generation, no layout shift).
// Output: public/art/field-<kind>-<seed>-<tone>.svg. Tones: chalk (indigo ink on chalk), char (clay-light on charcoal), indigo (chalk on indigo), clay (chalk on clay).
import fs from 'node:fs';
import path from 'node:path';
import { contourSvg, halftoneSvg } from './field-generator.mjs';
import { palette as P } from './palette.mjs';

const out = path.join(process.cwd(), 'public/art');
fs.mkdirSync(out, { recursive: true });
const tones = {
  chalk: { bg: P.chalk, ink: P.indigo },
  char: { bg: P.charcoal, ink: P.clayLight },
  indigo: { bg: P.indigo, ink: P.clayLight },
};
const paint = (svg, t, w, h) => svg.replace('aria-hidden="true"', `aria-hidden="true" color="${t.ink}"`).replace(/currentColor/g, t.ink)
  .replace('focusable="false">', `focusable="false"><rect width="${w}" height="${h}" fill="${t.bg}"/>`);
const W = 1000, H = 750;
const contours = [8, 12, 17, 33];
const dots = [5];
let n = 0;
for (const [tone, t] of Object.entries(tones)) {
  for (const seed of contours) {
    fs.writeFileSync(path.join(out, `field-contour-${seed}-${tone}.svg`), paint(contourSvg({ seed, w: W, h: H, levels: 20, scale: 2.4 }), t, W, H)); n++;
  }
  for (const seed of dots) {
    fs.writeFileSync(path.join(out, `field-dots-${seed}-${tone}.svg`), paint(halftoneSvg({ seed, w: W, h: H, step: 20, maxR: 9 }), t, W, H)); n++;
  }
}
console.log(`wrote ${n} art files`);
