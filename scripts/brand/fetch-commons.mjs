// Collects candidate photos from Wikimedia Commons using the normal website pages (the API is rate-limited from this network).
// Only CC0, public domain, CC BY and CC BY-SA files are kept (commercial reuse allowed with credit). Records full credit data.
// Usage: node fetch-commons.mjs <slug> "<search>" [count] [minWidth]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const curl = (args) => execFileSync('curl', ['-s', '-L', '-m', '60', '-A', 'FieldworkImageResearch/1.0 (keneokonjo44@gmail.com)', ...args], { maxBuffer: 64 * 1024 * 1024 });
const [,, slug, query, count = '8', minW = '1600'] = process.argv;
const root = path.resolve(import.meta.dirname, '../../assets/commons');
fs.mkdirSync(path.join(root, 'thumbs'), { recursive: true });
const metaFile = path.join(root, 'candidates.json');
const all = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const licenceFor = (u) => {
  if (!u) return null;
  if (/publicdomain\/zero/.test(u)) return 'CC0 1.0';
  if (/publicdomain\/mark/.test(u)) return 'Public domain';
  const m = u.match(/licenses\/(by(?:-sa)?)\/([0-9.]+)/);
  return m ? `CC ${m[1].toUpperCase()} ${m[2]}` : null;
};
const get = async (url) => { for (let i = 0; i < 5; i++) { const b = curl([url]).toString(); if (b.length > 3000 && !/too many requests/i.test(b.slice(0, 500))) return b; await sleep(15000 * (i + 1)); } return ''; };

const sUrl = `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(query)}&title=Special:Search&profile=advanced&fulltext=1&ns6=1&limit=40`;
const sHtml = await get(sUrl);
const titles = [...new Set([...sHtml.matchAll(/href="\/wiki\/(File:[^"#]+?\.(?:jpe?g))"/gi)].map((m) => decodeURIComponent(m[1])))];
console.log(query, '->', titles.length, 'files');
let n = 0;
for (const title of titles) {
  if (n >= +count) break;
  if (all.some((c) => c.title === title)) continue;
  await sleep(2000);
  const h = await get('https://commons.wikimedia.org/wiki/' + encodeURIComponent(title.replace(/ /g, '_')).replace(/%2F/g, '/'));
  if (!h) continue;
  const lic = licenceFor(h.match(/<link rel="license" href="([^"]+)"/)?.[1]);
  if (!lic) continue;
  const dim = h.match(/class="fileInfo">\(([\d,]+) × ([\d,]+) pixels/);
  if (!dim) continue;
  const w = +dim[1].replace(/,/g, ''), hh = +dim[2].replace(/,/g, '');
  if (w < +minW || w < hh * 1.15) continue;
  const orig = h.match(/class="fullMedia"><bdi dir="ltr"><a href="([^"?]+)/)?.[1];
  if (!orig) continue;
  const artistCell = h.match(/id="fileinfotpl&#95;aut"[^>]*>Author<\/td>\s*<td>([\s\S]*?)<\/td>/)?.[1] ?? h.match(/id="fileinfotpl&#95;aut"[^>]*>Photographer<\/td>\s*<td>([\s\S]*?)<\/td>/)?.[1] ?? '';
  const desc = text(h.match(/id="fileinfotpl&#95;desc"[^>]*>Description<\/td>\s*<td>([\s\S]*?)<\/td>/)?.[1] ?? '').slice(0, 200);
  const id = `${slug}-${String(n + 1).padStart(2, '0')}`;
  await sleep(1500);
  const buf = curl(['https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(title.replace(/^File:/, '').replace(/ /g, '_')) + '?width=960']);
  if (buf.length < 8000 || buf[0] !== 0xff) { console.log('skip (thumb)', title); continue; }
  fs.writeFileSync(path.join(root, 'thumbs', id + '.jpg'), buf);
  all.push({ id, query, title, url: orig, page: 'https://commons.wikimedia.org/wiki/' + title.replace(/ /g, '_'), width: w, height: hh, artist: text(artistCell) || 'Unknown', licence: lic, desc });
  console.log(id, '|', title.slice(0, 60), '|', lic, `${w}x${hh}`, '|', text(artistCell).slice(0, 30));
  n++;
}
fs.writeFileSync(metaFile, JSON.stringify(all, null, 1));
