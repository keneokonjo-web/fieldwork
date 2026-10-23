// Renders one ad video frame by frame: node render.mjs <v2|v3|v1> <9x16|1x1|16x9> out.mp4 [seconds]
import { chromium } from 'playwright'; import { spawn } from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { pathToFileURL } from 'node:url';
const [which, ar, out, only] = process.argv.slice(2);
const mod = await import(`./${which}.mjs`); const [W, H] = { '9x16': [1080, 1920], '1x1': [1080, 1080], '16x9': [1920, 1080] }[ar]; const fps = 30;
const tmp = path.join(os.tmpdir(), `fw-${which}-${ar}.html`); fs.writeFileSync(tmp, mod.html(W, H));
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto(pathToFileURL(tmp).href); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
if (errs.length) console.log('errors', errs);
if (process.env.SHOTS) { for (const t of process.env.SHOTS.split(',').map(Number)) { await p.evaluate((t) => window.render(t), t); await p.screenshot({ path: `${out}-${t}.png` }); } await b.close(); process.exit(0); }
const dur = only ? Number(only) : mod.total; const n = Math.round(dur * fps);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
const t0 = Date.now();
for (let i = 0; i < n; i++) { await p.evaluate((t) => window.render(t), i / fps); const buf = await p.screenshot({ type: 'jpeg', quality: 95 }); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); if (i % 90 === 0) console.log(`${which} ${ar} ${i}/${n} ${((Date.now() - t0) / 1000) | 0}s`); }
ff.stdin.end(); await new Promise((r) => ff.on('close', r)); await b.close(); console.log('done', which, ar);
