// timeline.json is the single source of truth for scene timing and cues. This writes timeline.js for the HTML scene.
import fs from 'node:fs'; import path from 'node:path';
const d = import.meta.dirname; const tl = JSON.parse(fs.readFileSync(path.join(d, 'timeline.json'), 'utf8'));
fs.writeFileSync(path.join(d, 'timeline.js'), 'window.TL = ' + JSON.stringify(tl) + ';\n'); console.log('timeline.js written');
