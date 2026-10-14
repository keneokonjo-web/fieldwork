// Extracts nested closed contour rings around the highest point of a seeded field: the Fieldwork "summit" mark.
import { heightField } from './field-generator.mjs';

function pip(pt, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c; } return c; }

function contourAt(hf, level) {
  const { f, cols, rows } = hf; const idx = (i, j) => j * (cols + 1) + i; const segs = [];
  const lerp = (a, b) => (level - a) / (b - a);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const a = f[idx(i, j)], b = f[idx(i + 1, j)], c = f[idx(i + 1, j + 1)], d = f[idx(i, j + 1)];
    const code = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
    if (code === 0 || code === 15) continue;
    const top = [i + lerp(a, b), j], right = [i + 1, j + lerp(b, c)], bottom = [i + lerp(d, c), j + 1], left = [i, j + lerp(a, d)];
    const t = { 1: [[left, bottom]], 2: [[bottom, right]], 3: [[left, right]], 4: [[top, right]], 5: [[left, top], [bottom, right]], 6: [[top, bottom]], 7: [[left, top]], 8: [[left, top]], 9: [[top, bottom]], 10: [[left, bottom], [top, right]], 11: [[top, right]], 12: [[left, right]], 13: [[bottom, right]], 14: [[left, bottom]] }[code];
    segs.push(...t);
  }
  const key = (p) => `${Math.round(p[0] * 1000)},${Math.round(p[1] * 1000)}`;
  const map = new Map(); segs.forEach((s, n) => { for (const p of s) { const k = key(p); (map.get(k) ?? map.set(k, []).get(k)).push(n); } });
  const used = new Uint8Array(segs.length); const loops = [];
  for (let n = 0; n < segs.length; n++) {
    if (used[n]) continue; used[n] = 1; const line = [segs[n][0], segs[n][1]]; let ext = true;
    while (ext) { ext = false; const end = line[line.length - 1]; for (const m of map.get(key(end)) ?? []) { if (used[m]) continue; const s = segs[m]; const o = key(s[0]) === key(end) ? s[1] : key(s[1]) === key(end) ? s[0] : null; if (!o) continue; used[m] = 1; line.push(o); ext = true; break; } }
    if (key(line[0]) === key(line[line.length - 1]) && line.length > 6) loops.push(line);
  }
  return loops;
}

/** Returns { rings: [[x,y]...] (normalised to a 0..100 box, largest first), seed } */
export function summit({ seed = 1, rings = 4, scale = 1.7, octaves = 3, spread = 0.07 } = {}) {
  const cols = 90, rows = 90; const hf = heightField({ seed, cols, rows, scale, octaves });
  let best = 0, bi = 0; hf.f.forEach((v, i) => { if (v > best) { best = v; bi = i; } });
  const peak = [bi % (cols + 1), Math.floor(bi / (cols + 1))];
  const out = [];
  for (let k = 0; k < rings; k++) {
    const level = best - spread * (k + 1) - 0.01;
    const loops = contourAt(hf, level).filter((l) => pip(peak, l));
    if (!loops.length) break;
    loops.sort((a, b) => b.length - a.length); out.push(loops[0]);
  }
  if (!out.length) return null;
  out.reverse(); // largest first
  const all = out[0]; const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys); const s = 100 / Math.max(x1 - x0, y1 - y0);
  const norm = (l) => l.map((p) => [(p[0] - x0) * s + (100 - (x1 - x0) * s) / 2, (p[1] - y0) * s + (100 - (y1 - y0) * s) / 2]);
  return { seed, rings: out.map(norm) };
}

/** Smooth closed path (Catmull-Rom to Bezier) from points, subsampled. */
export function smoothPath(pts, step = 3) {
  const p = pts.filter((_, i) => i % step === 0); const n = p.length; if (n < 4) return '';
  let d = `M${p[0][0].toFixed(2)} ${p[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d + 'Z';
}
