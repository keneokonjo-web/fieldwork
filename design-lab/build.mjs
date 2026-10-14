// Builds self-contained concept boards (fonts embedded as base64) from design-lab/src/*.html.
// Replaces the /*FONTS:name,name*/ marker with @font-face rules. Output: design-lab/dist/*.html
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const nm = (...p) => path.join(root, 'node_modules', ...p);
const b64 = (f) => fs.readFileSync(f).toString('base64');

const faces = {
  bricolage: () => `@font-face{font-family:"Bricolage";src:url(data:font/woff2;base64,${b64(nm('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2'))}) format("woff2");font-weight:200 800;font-stretch:75% 100%;font-display:swap}`,
  newsreader: () => `@font-face{font-family:"Newsreader";src:url(data:font/woff2;base64,${b64(nm('@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2'))}) format("woff2");font-weight:200 800;font-style:normal;font-display:swap}@font-face{font-family:"Newsreader";src:url(data:font/woff2;base64,${b64(nm('@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2'))}) format("woff2");font-weight:200 800;font-style:italic;font-display:swap}`,
  plexmono: () => `@font-face{font-family:"Plex Mono";src:url(data:font/woff2;base64,${b64(nm('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'))}) format("woff2");font-weight:400;font-display:swap}@font-face{font-family:"Plex Mono";src:url(data:font/woff2;base64,${b64(nm('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2'))}) format("woff2");font-weight:500;font-display:swap}`,
  instrumentserif: () => `@font-face{font-family:"Instrument Serif";src:url(data:font/woff2;base64,${b64(nm('@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2'))}) format("woff2");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:"Instrument Serif";src:url(data:font/woff2;base64,${b64(nm('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2'))}) format("woff2");font-weight:400;font-style:italic;font-display:swap}`,
  instrumentsans: () => `@font-face{font-family:"Instrument Sans";src:url(data:font/woff2;base64,${b64(nm('@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2'))}) format("woff2");font-weight:400 700;font-display:swap}`,
  dmsans: () => `@font-face{font-family:"DM Sans";src:url(data:font/woff2;base64,${b64(nm('@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2'))}) format("woff2");font-weight:100 1000;font-display:swap}`,
  spacegrotesk: () => `@font-face{font-family:"Space Grotesk";src:url(data:font/woff2;base64,${b64(nm('@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2'))}) format("woff2");font-weight:300 700;font-display:swap}`,
};

fs.mkdirSync(path.join(root, 'deliverables/fieldwork-launch-kit/01-brand/concepts'), { recursive: true });
for (const f of fs.readdirSync(path.join(root, 'design-lab/src')).filter((x) => x.endsWith('.html'))) {
  let html = fs.readFileSync(path.join(root, 'design-lab/src', f), 'utf8');
  html = html.replace(/\/\*FONTS:([a-z,]+)\*\//g, (_, names) => names.split(',').map((n) => faces[n]()).join('\n'));
  fs.writeFileSync(path.join(root, 'deliverables/fieldwork-launch-kit/01-brand/concepts', f), html);
  console.log('built', f, (html.length / 1024).toFixed(0) + 'KB');
}
