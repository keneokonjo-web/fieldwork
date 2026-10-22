// Turns the chosen Wikimedia Commons candidates into site images and register entries (with author and licence for credits).
// Usage: node scripts/brand/curate-commons.mjs  (reads scripts/brand/commons-selection.json and assets/commons/candidates.json)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const sel = JSON.parse(fs.readFileSync(path.join(root, 'scripts/brand/commons-selection.json'), 'utf8'));
const cands = JSON.parse(fs.readFileSync(path.join(root, 'assets/commons/candidates.json'), 'utf8'));
const regFile = path.join(root, 'src/content/images.json');
const reg = JSON.parse(fs.readFileSync(regFile, 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (const s of sel) {
  const c = cands.find((x) => x.id === s.id); if (!c) { console.log('no candidate', s.id); continue; }
  const out = path.join(root, 'public/images', `${s.key}.jpg`);
  if (!fs.existsSync(out)) {
    let buf;
    for (let i = 0; i < 4; i++) {
      buf = execFileSync('curl', ['-s', '-L', '-m', '90', '-A', 'FieldworkImageResearch/1.0 (keneokonjo44@gmail.com)', 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(c.title.replace(/^File:/, '').replace(/ /g, '_')) + '?width=1920'], { maxBuffer: 64 * 1024 * 1024 });
      if (buf.length > 20000 && buf[0] === 0xff) break; await sleep(8000 * (i + 1));
    }
    if (!(buf.length > 20000 && buf[0] === 0xff)) { console.log('download failed', s.key); continue; }
    let img = sharp(buf).rotate();
    if (s.crop) { const m = await img.metadata(); const [l, t, w, h] = s.crop; img = sharp(await img.extract({ left: Math.round(l * m.width), top: Math.round(t * m.height), width: Math.round(w * m.width), height: Math.round(h * m.height) }).toBuffer()); }
    await img.resize({ width: 2000, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(out);
    await sleep(1500);
  }
  const m = await sharp(out).metadata();
  const entry = { file: `/images/${s.key}.jpg`, subject: s.subject, alt: s.alt, group: s.group, width: m.width, height: m.height, place: s.place, source: c.page, artist: c.artist, licence: c.licence };
  const i = reg.findIndex((r) => r.file === entry.file); if (i >= 0) reg[i] = entry; else reg.push(entry);
  console.log('ok', s.key, m.width + 'x' + m.height, '|', c.artist.slice(0, 30), c.licence);
}
fs.writeFileSync(regFile, JSON.stringify(reg, null, 2));
