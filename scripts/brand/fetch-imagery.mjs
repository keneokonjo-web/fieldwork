// Searches Wikimedia Commons for public-domain / CC0 images on given topics, downloads web-size copies and records full credits.
// Only files whose licence metadata says Public domain or CC0 are kept. Usage: node fetch-imagery.mjs <slug> "<search>" [count]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
// Node's fetch ignores the sandbox proxy, so requests go through curl.
const curl = (args, opts = {}) => execFileSync('curl', ['-s', '-m', '60', '-A', 'Mozilla/5.0 (compatible; FieldworkBrandResearch/1.0)', ...args], { maxBuffer: 64 * 1024 * 1024, ...opts });
const [,, slug, query, count = '3'] = process.argv;
const UA = 'Mozilla/5.0 (compatible; FieldworkBrandResearch/1.0)';
const outDir = path.resolve(import.meta.dirname, '../../assets/imagery/originals');
const creditsFile = path.resolve(import.meta.dirname, '../../assets/imagery/credits.json');
const credits = fs.existsSync(creditsFile) ? JSON.parse(fs.readFileSync(creditsFile, 'utf8')) : [];
const url = new URL('https://commons.wikimedia.org/w/api.php');
for (const [k, v] of Object.entries({ action: 'query', generator: 'search', gsrsearch: query, gsrnamespace: 6, gsrlimit: 25, prop: 'imageinfo', iiprop: 'url|extmetadata|size|mime', iiurlwidth: 1400, format: 'json' })) url.searchParams.set(k, v);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let res;
for (let i = 0; i < 6; i++) {
  const txt = curl([url.toString()]).toString();
  try { res = JSON.parse(txt); break; } catch { console.log('rate limited, waiting', 25 * (i + 1), 's'); await sleep(25000 * (i + 1)); }
}
if (!res) throw new Error('Commons API unavailable');
const pages = Object.values(res.query?.pages ?? {}).sort((a, b) => a.index - b.index);
let n = 0;
for (const p of pages) {
  if (n >= +count) break;
  const ii = p.imageinfo?.[0]; if (!ii || !/^image\/(jpeg|png)$/.test(ii.mime)) continue;
  const m = ii.extmetadata; const lic = m.LicenseShortName?.value ?? '';
  if (!/public domain|cc0|pd-/i.test(lic) || /cc by|sa/i.test(lic)) continue;
  if (ii.width < 700) continue;
  const file = `${slug}-${n + 1}.jpg`;
  await sleep(4000);
  const buf = curl([ii.thumburl]);
  if (buf.length < 5000 || buf[0] !== 0xff) { console.log('skip', p.title, 'download failed'); continue; }
  fs.writeFileSync(path.join(outDir, file), buf);
  const strip = (s) => (s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  credits.push({ file, title: p.title.replace(/^File:/, ''), artist: strip(m.Artist?.value), credit: strip(m.Credit?.value).slice(0, 200), licence: lic, source: ii.descriptionurl, date: strip(m.DateTimeOriginal?.value) });
  console.log('saved', file, '|', p.title.slice(0, 70), '|', lic);
  n++;
}
fs.writeFileSync(creditsFile, JSON.stringify(credits, null, 2));
