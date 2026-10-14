// Builds a contact sheet from scroll frames. Usage: node contact-sheet.mjs <slug-mode-prefix> <from> <to> <cols> <thumbWidth> <out>
import sharp from 'sharp';
import fs from 'node:fs';
const [,, prefix, from, to, cols = '3', tw = '640', out] = process.argv;
const dir = 'deliverables/fieldwork-launch-kit/01-brand/research/screenshots/scroll';
const files = fs.readdirSync(dir).filter((f) => f.startsWith(prefix)).sort().slice(+from, +to);
const thumbs = await Promise.all(files.map((f) => sharp(`${dir}/${f}`).resize({ width: +tw }).toBuffer()));
const metas = await Promise.all(thumbs.map((t) => sharp(t).metadata()));
const th = Math.max(...metas.map((m) => m.height));
const rows = Math.ceil(thumbs.length / +cols);
await sharp({ create: { width: +cols * (+tw + 8), height: rows * (th + 8), channels: 3, background: '#777' } })
  .composite(thumbs.map((input, i) => ({ input, left: (i % +cols) * (+tw + 8), top: Math.floor(i / +cols) * (th + 8) }))).png().toFile(out);
console.log(files.length, 'frames ->', out);
