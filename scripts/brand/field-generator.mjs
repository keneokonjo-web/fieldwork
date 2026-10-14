// "The field": seeded generative terrain used as Fieldwork's signature artwork.
// Every exercise, note and social post can have its own unique field from a seed (e.g. its number).
// Renders (a) cartographic contour lines (marching squares, index contours heavier) or (b) a halftone dot terrain.

function mulberry32(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function makeNoise(seed) {
  const rnd = mulberry32(seed);
  const N = 256; const perm = new Uint8Array(N * 2); const grad = [];
  for (let i = 0; i < N; i++) { const a = rnd() * Math.PI * 2; grad.push([Math.cos(a), Math.sin(a)]); perm[i] = i; }
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  for (let i = 0; i < N; i++) perm[i + N] = perm[i];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const dot = (gi, x, y) => grad[gi % N][0] * x + grad[gi % N][1] * y;
  return (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y); const xf = x - xi, yf = y - yi;
    const X = xi & 255, Y = yi & 255; const u = fade(xf), v = fade(yf);
    const aa = perm[perm[X] + Y], ab = perm[perm[X] + Y + 1], ba = perm[perm[X + 1] + Y], bb = perm[perm[X + 1] + Y + 1];
    const l1 = dot(aa, xf, yf) * (1 - u) + dot(ba, xf - 1, yf) * u;
    const l2 = dot(ab, xf, yf - 1) * (1 - u) + dot(bb, xf - 1, yf - 1) * u;
    return l1 * (1 - v) + l2 * v;
  };
}

/** Height field in [0,1]. */
export function heightField({ seed = 1, cols = 120, rows = 80, scale = 3, octaves = 4 }) {
  const noise = makeNoise(seed * 7919 + 13);
  const f = new Float32Array((cols + 1) * (rows + 1));
  let min = Infinity, max = -Infinity;
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
    let amp = 1, fr = scale, v = 0;
    for (let o = 0; o < octaves; o++) { v += amp * noise((i / cols) * fr + o * 17.3, (j / rows) * fr * (rows / cols) + o * 9.1); amp *= 0.5; fr *= 2; }
    f[j * (cols + 1) + i] = v; if (v < min) min = v; if (v > max) max = v;
  }
  for (let k = 0; k < f.length; k++) f[k] = (f[k] - min) / (max - min);
  return { f, cols, rows };
}

/** Marching squares: returns segments for a level, chained into polylines. */
function contourPolylines({ f, cols, rows }, level, cw, ch) {
  const idx = (i, j) => j * (cols + 1) + i;
  const lerp = (a, b) => (level - a) / (b - a);
  const segs = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const a = f[idx(i, j)], b = f[idx(i + 1, j)], c = f[idx(i + 1, j + 1)], d = f[idx(i, j + 1)];
    const code = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
    if (code === 0 || code === 15) continue;
    const top = [i + lerp(a, b), j], right = [i + 1, j + lerp(b, c)], bottom = [i + lerp(d, c), j + 1], left = [i, j + lerp(a, d)];
    const t = { 1: [[left, bottom]], 2: [[bottom, right]], 3: [[left, right]], 4: [[top, right]], 5: [[left, top], [bottom, right]], 6: [[top, bottom]], 7: [[left, top]], 8: [[left, top]], 9: [[top, bottom]], 10: [[left, bottom], [top, right]], 11: [[top, right]], 12: [[left, right]], 13: [[bottom, right]], 14: [[left, bottom]] }[code];
    for (const s of t) segs.push(s);
  }
  // chain
  const key = (p) => `${Math.round(p[0] * 1000)},${Math.round(p[1] * 1000)}`;
  const map = new Map();
  segs.forEach((s, n) => { for (const p of s) { const k = key(p); if (!map.has(k)) map.set(k, []); map.get(k).push(n); } });
  const used = new Uint8Array(segs.length); const lines = [];
  for (let n = 0; n < segs.length; n++) {
    if (used[n]) continue; used[n] = 1;
    let line = [segs[n][0], segs[n][1]];
    for (const dir of [1, 0]) {
      let ext = true;
      while (ext) {
        ext = false;
        const end = dir ? line[line.length - 1] : line[0];
        for (const m of map.get(key(end)) ?? []) {
          if (used[m]) continue;
          const s = segs[m]; const other = key(s[0]) === key(end) ? s[1] : key(s[1]) === key(end) ? s[0] : null;
          if (!other) continue; used[m] = 1; dir ? line.push(other) : line.unshift(other); ext = true; break;
        }
      }
    }
    lines.push(line.map((p) => [(p[0] / cols) * cw, (p[1] / rows) * ch]));
  }
  return lines;
}

const pathOf = (lines) => lines.map((l) => 'M' + l.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L')).join('');

/** Contour field SVG. Strokes use currentColor so CSS sets colour. Every 5th line is an index contour. */
export function contourSvg({ seed = 1, w = 800, h = 520, levels = 16, scale = 2.6, octaves = 4, stroke = 1.1, indexStroke = 2.2, bg = null, label = true } = {}) {
  const cols = Math.round(w / 6), rows = Math.round(h / 6);
  const hf = heightField({ seed, cols, rows, scale, octaves });
  let body = '';
  for (let k = 1; k < levels; k++) {
    const level = k / levels; const lines = contourPolylines(hf, level, w, h);
    if (!lines.length) continue;
    body += `<path d="${pathOf(lines)}" fill="none" stroke="currentColor" stroke-width="${k % 5 === 0 ? indexStroke : stroke}" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}${body}</svg>`;
}

/** Halftone terrain: dots on a grid, radius follows height. */
export function halftoneSvg({ seed = 1, w = 800, h = 520, step = 14, scale = 2.2, octaves = 3, maxR = 6, threshold = 0.18, mask = null } = {}) {
  const cols = Math.round(w / step), rows = Math.round(h / step);
  const hf = heightField({ seed, cols, rows, scale, octaves });
  let d = '';
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
    let v = hf.f[j * (cols + 1) + i];
    if (mask === 'fade-right') v *= 1 - i / cols; if (mask === 'fade-down') v *= 1 - j / rows; if (mask === 'circle') { const dx = (i / cols - 0.5) * 2, dy = (j / rows - 0.5) * 2 * (h / w); v *= Math.max(0, 1 - Math.hypot(dx, dy)); }
    if (v < threshold) continue;
    const r = Math.min(maxR, (v - threshold) / (1 - threshold) * maxR * 1.6);
    if (r < 0.5) continue;
    const x = i * step, y = j * step;
    d += `M${(x - r).toFixed(1)} ${y.toFixed(1)}a${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(2 * r).toFixed(1)} 0a${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(-2 * r).toFixed(1)} 0z`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><path d="${d}" fill="currentColor"/></svg>`;
}
