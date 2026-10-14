// Converts large PNG captures to JPEG (q80) to keep the repository small. Usage: node compress-shots.mjs <dir>
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
let before = 0, after = 0;
for (const f of walk(process.argv[2]).filter((f) => f.endsWith('.png'))) {
  const size = fs.statSync(f).size; before += size;
  const out = f.replace(/\.png$/, '.jpg');
  const m = await sharp(f).metadata();
  // JPEG max dimension is 65535; very tall pages are split-safe at this height
  await sharp(f).resize({ width: Math.min(m.width, 1440), withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(out);
  after += fs.statSync(out).size; fs.unlinkSync(f);
}
console.log(`compressed ${(before / 1e6).toFixed(0)}MB -> ${(after / 1e6).toFixed(0)}MB`);
