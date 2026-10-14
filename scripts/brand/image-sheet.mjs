// Labelled contact sheet of images in a folder. Usage: node image-sheet.mjs <dir> <from> <to> <cols> <thumbW> <out>
import sharp from 'sharp'; import fs from 'node:fs';
const [,, dir, from, to, cols = '4', tw = '480', out] = process.argv;
const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort().slice(+from, +to);
const th = Math.round(+tw * 0.72);
const cells = await Promise.all(files.map(async (f, i) => {
  const img = await sharp(`${dir}/${f}`).resize(+tw, th, { fit: 'cover' }).toBuffer();
  const m = await sharp(`${dir}/${f}`).metadata();
  const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="34"><rect width="100%" height="100%" fill="#222"/><text x="6" y="22" font-size="14" fill="#fff" font-family="monospace">${+from + i}  ${f.replace('photo-', '').slice(0, 30)}  ${m.width}x${m.height}</text></svg>`);
  return { img, label, left: (i % +cols) * (+tw + 8), top: Math.floor(i / +cols) * (th + 42) };
}));
const rows = Math.ceil(files.length / +cols);
await sharp({ create: { width: +cols * (+tw + 8), height: rows * (th + 42), channels: 3, background: '#555' } })
  .composite(cells.flatMap((c) => [{ input: c.img, left: c.left, top: c.top }, { input: c.label, left: c.left, top: c.top + th }])).jpeg({ quality: 82 }).toFile(out);
console.log(files.length, 'images ->', out);
