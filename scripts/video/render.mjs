// Renders walkthrough.html frame by frame (exact timing, no real-time capture) and encodes silent 1080p video.
// Usage: node render.mjs out.mp4 [seconds]
import { chromium } from 'playwright'; import { spawn } from 'node:child_process'; import path from 'node:path'; import fs from 'node:fs';
const [out, only] = process.argv.slice(2); const tl = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'timeline.json'), 'utf8')); const fps = tl.fps;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await p.goto('file://' + path.join(import.meta.dirname, 'walkthrough.html')); await p.evaluate(() => document.fonts.ready);
const total = await p.evaluate(() => window.TOTAL); const dur = only ? Number(only) : total; const n = Math.round(dur * fps);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
const t0 = Date.now();
for (let i = 0; i < n; i++) {
  await p.evaluate((t) => window.render(t), i / fps);
  const buf = await p.screenshot({ type: 'jpeg', quality: 96 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % 60 === 0) console.log(`frame ${i}/${n} ${(((Date.now() - t0) / 1000) | 0)}s`);
}
ff.stdin.end(); await new Promise((r) => ff.on('close', r)); await b.close(); console.log('done', ((Date.now() - t0) / 1000) | 0, 's');
