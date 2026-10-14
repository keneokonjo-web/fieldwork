// Builds the sales deck PPTX from docs/sales/SALES-DECK-OUTLINE.md (slide text is the single source).
import fs from 'node:fs';
import PptxGenJS from 'pptxgenjs';
import { palette as P } from '../brand/palette.mjs';

const md = fs.readFileSync('docs/sales/SALES-DECK-OUTLINE.md', 'utf8');
const main = md.split('## Appendix slides')[0];
const blocks = main.split(/\n## Slide \d+: /).slice(1);
const hex = (c) => c.replace('#', '');
const pptx = new PptxGenJS(); pptx.layout = 'LAYOUT_WIDE'; pptx.title = 'Fieldwork for Business'; pptx.company = 'Fieldwork';
const strip = (s) => s.replace(/\*\*/g, '').trim();
let n = 0;
for (const b of blocks) {
  const head = b.split('\n')[0]; const m = head.match(/^(.*) \((chalk|indigo|charcoal)\)$/);
  const bg = { chalk: P.chalk, indigo: P.indigo, charcoal: P.charcoal }[m ? m[2] : 'chalk']; const dark = m && m[2] !== 'chalk';
  const field = (k) => { const r = b.match(new RegExp(`\\*\\*${k}[^*]*:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*|\\n---|$)`)); return r ? r[1].trim() : ''; };
  const title = strip(field('Title')); const sub = strip(field('Sub')); const label = strip(field('Label')); const footer = strip(field('Footer')); const notes = strip(field('Notes'));
  const bodyRaw = field('Body'); const items = bodyRaw.split('\n').map((l) => l.replace(/^(\s*[-*]|\s*\d+\.)\s*/, '')).filter(Boolean).map(strip);
  const s = pptx.addSlide(); s.background = { color: hex(bg) }; n++;
  const ink = hex(dark ? P.chalk : P.charcoal); const acc = hex(dark ? P.clayLight : P.clay);
  s.addText(`[ ${String(n).padStart(2, '0')}${label ? ' · ' + label : ''} ]`, { x: 0.6, y: 0.45, w: 9, h: 0.3, fontFace: 'Courier New', fontSize: 10, color: acc, charSpacing: 2 });
  s.addText(title, { x: 0.6, y: 0.9, w: 12, h: n === 1 ? 2.6 : 1.5, fontFace: 'Arial', bold: true, fontSize: n === 1 ? 54 : 36, color: ink, valign: 'top' });
  let y = n === 1 ? 3.8 : 2.6;
  if (sub) s.addText(sub, { x: 0.6, y, w: 11, h: 0.6, fontFace: 'Georgia', italic: true, fontSize: 22, color: ink });
  if (items.length && n !== 1) s.addText(items.map((t) => ({ text: t, options: { bullet: { code: '25CF' }, breakLine: true, paraSpaceAfter: 8 } })), { x: 0.6, y, w: 11.5, h: 3.7, fontFace: 'Arial', fontSize: 18, color: ink, valign: 'top' });
  if (footer) s.addText(footer, { x: 0.6, y: 6.85, w: 12, h: 0.4, fontFace: 'Courier New', fontSize: 10, color: ink });
  s.addText('Fieldwork', { x: 11.2, y: 7.0, w: 1.8, h: 0.3, fontFace: 'Georgia', fontSize: 11, color: acc, align: 'right' });
  if (notes) s.addNotes(notes);
}
fs.mkdirSync('deliverables/fieldwork-launch-kit/04-corporate-sales', { recursive: true });
await pptx.writeFile({ fileName: 'deliverables/fieldwork-launch-kit/04-corporate-sales/fieldwork-sales-deck.pptx' });
console.log('slides', n);
