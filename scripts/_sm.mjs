import { summit, smoothPath } from './brand/summit.mjs';
import fs from 'node:fs';
let h = '<body style="margin:0;background:#FBF7F0;display:grid;grid-template-columns:repeat(8,1fr);gap:14px;padding:16px;width:1440px;font:11px monospace">';
for (let s = 1; s <= 32; s++) {
  const m = summit({ seed: s, rings: 4, spread: 0.06 });
  if (!m) { h += `<div>seed ${s}: none</div>`; continue; }
  const paths = m.rings.map((r, i) => `<path d="${smoothPath(r, 2)}" fill="${i === m.rings.length - 1 ? '#1E1026' : 'none'}" stroke="#1E1026" stroke-width="${i === 0 ? 5 : 4}" stroke-linejoin="round"/>`).join('');
  h += `<div><svg viewBox="-6 -6 112 112" width="150">${paths}</svg>seed ${s} (${m.rings.length} rings)</div>`;
}
fs.writeFileSync(process.argv[2], h + '</body>');
