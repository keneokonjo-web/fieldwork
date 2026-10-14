import { contourSvg, halftoneSvg } from './brand/field-generator.mjs';
import fs from 'node:fs';
const out = process.argv[2];
let html = '<body style="margin:0;background:#FBF7F0;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:10px;width:1440px">';
const cols = ['#24112D', '#F4512C', '#2340FF'];
for (let s = 1; s <= 6; s++) html += `<div style="color:${cols[s%3]};background:${s%2?'#FFB627':'#CDB6F2'}">${contourSvg({ seed: s, w: 800, h: 520 })}</div>`;
html += `<div style="color:#2340FF;background:#F3F2ED;grid-column:span 3;height:360px">${halftoneSvg({ seed: 3, w: 1400, h: 360, step: 16, maxR: 6, mask: 'fade-right' })}</div></body>`;
fs.writeFileSync(out, html);
