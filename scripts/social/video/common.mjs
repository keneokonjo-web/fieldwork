// Shared pieces for the ad videos: CSS, headline helper, page assembly.
import fs from 'node:fs'; import path from 'node:path';
import { CSS, photo, shot, logo, art, browser, phoneShot, listingCard, thread, dots } from '../lib.mjs';
export { photo, shot, logo, art, browser, phoneShot, listingCard, thread, dots };
export const LEAD = 0.3; export const v = (x) => +(x + LEAD).toFixed(2);
const engine = fs.readFileSync(path.join(import.meta.dirname, 'engine.js'), 'utf8');

const VCSS = `
html,body{margin:0;background:#121212}
.vst{position:relative;overflow:hidden;width:calc(var(--W)*1px);height:calc(var(--H)*1px)}
.scn{position:absolute;inset:0;overflow:hidden}
.scn.pap{background:var(--paper);color:var(--ink)}.scn.ink{background:var(--ink);color:var(--paper)}.scn.cob{background:var(--cobalt);color:#fff}
.hd{position:absolute}
.hd h1{font-weight:700;letter-spacing:-.055em;line-height:.95;margin:0}
.hd .m{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.14em;margin-right:.2em}
.hd .w{display:inline-block;will-change:transform}
body[data-ar=portrait] .hd.long h1{font-size:calc(var(--u)*10.2)}body[data-ar=square] .hd.long h1{font-size:calc(var(--u)*7.4)}body[data-ar=landscape] .hd.long h1{font-size:calc(var(--u)*8)}
.hd .cb{color:var(--cobalt)}.scn.ink .hd .cb{color:var(--cl)}.scn.cob .hd .cb{color:var(--paper)}
.vz{position:absolute;display:flex;align-items:center;justify-content:center}
.vsc{position:relative;width:1000px;height:900px;flex:none;transform:scale(var(--vs,1));--s:1}
.brand{position:absolute;height:calc(var(--u)*4)}
#cap{position:absolute;font-weight:700;letter-spacing:-.03em;line-height:1.15;color:var(--ink);text-shadow:none}
#cap.on-dark{color:var(--paper)}
.mark{position:absolute;font:400 calc(var(--u)*1.7)/1.2 "GM",monospace;letter-spacing:.08em;text-transform:uppercase;opacity:.75}
body[data-ar=portrait] .hd{left:calc(var(--u)*7);top:calc(var(--u)*17);width:calc(var(--u)*88)}
body[data-ar=portrait] .hd h1{font-size:calc(var(--u)*14)}
body[data-ar=portrait] .vz{left:0;top:calc(var(--u)*66);width:calc(var(--u)*100);height:calc(var(--u)*88)}
body[data-ar=portrait] #cap{left:calc(var(--u)*7);right:calc(var(--u)*7);bottom:calc(var(--u)*12);font-size:calc(var(--u)*5)}
body[data-ar=portrait] .brand{left:calc(var(--u)*7);top:calc(var(--u)*7)}
body[data-ar=portrait] .mark{right:calc(var(--u)*7);top:calc(var(--u)*7.6)}
body[data-ar=square] .hd{left:calc(var(--u)*6);top:calc(var(--u)*13);width:calc(var(--u)*88)}
body[data-ar=square] .hd h1{font-size:calc(var(--u)*10.5)}
body[data-ar=square] .vz{left:calc(var(--u)*0);top:calc(var(--u)*43);width:calc(var(--u)*100);height:calc(var(--u)*50)}
body[data-ar=square] #cap{left:calc(var(--u)*6);right:calc(var(--u)*6);bottom:calc(var(--u)*3.2);font-size:calc(var(--u)*3.9)}
body[data-ar=square] .brand{left:calc(var(--u)*6);top:calc(var(--u)*5);height:calc(var(--u)*3.6)}
body[data-ar=square] .mark{right:calc(var(--u)*6);top:calc(var(--u)*5.3)}
body[data-ar=landscape] .hd{left:calc(var(--u)*6);top:calc(var(--u)*22);width:calc(var(--u)*80)}
body[data-ar=landscape] .hd h1{font-size:calc(var(--u)*11)}
body[data-ar=landscape] .vz{left:calc(var(--u)*92);top:calc(var(--u)*5);width:calc(var(--u)*80);height:calc(var(--u)*90)}
body[data-ar=landscape] #cap{left:calc(var(--u)*6);width:calc(var(--u)*80);bottom:calc(var(--u)*6);font-size:calc(var(--u)*4)}
body[data-ar=landscape] .brand{left:calc(var(--u)*6);top:calc(var(--u)*6)}
body[data-ar=landscape] .mark{left:calc(var(--u)*70);top:calc(var(--u)*6.6)}
.endwrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*5)}
body[data-ar=portrait] .endwrap{padding:0 calc(var(--u)*7)}body[data-ar=square] .endwrap{padding:0 calc(var(--u)*6)}body[data-ar=landscape] .endwrap{padding:0 calc(var(--u)*8)}
.endwrap img.big{width:calc(var(--u)*60)}body[data-ar=landscape] .endwrap img.big{width:calc(var(--u)*50)}body[data-ar=square] .endwrap img.big{width:calc(var(--u)*52)}
.endwrap .cta{display:inline-flex;align-self:flex-start;align-items:center;gap:calc(var(--u)*1.6);background:var(--paper);color:var(--ink);border-radius:99px;font-weight:700;padding:calc(var(--u)*2.4) calc(var(--u)*5);font-size:calc(var(--u)*3.6)}
.endwrap .sub{font-size:calc(var(--u)*4);line-height:1.25;color:#e5e9ff;max-width:calc(var(--u)*80)}
.cursor{position:absolute;width:34px;height:34px;z-index:30;pointer-events:none;opacity:0}.cursor svg{width:34px;height:34px;filter:drop-shadow(0 3px 4px rgba(0,0,0,.4))}
.card{background:#fff;color:#121212;border:2px solid #121212;border-radius:22px;box-shadow:0 40px 70px -40px rgba(0,0,0,.5)}
.scn.ink .card{border-color:#121212}
.typing::after{content:"";display:inline-block;width:3px;height:1.05em;background:currentColor;margin-left:3px;vertical-align:-4px}
.typ{position:absolute;left:0;top:0;background:#e9e9eb;border-radius:24px;border-bottom-left-radius:6px;padding:14px 18px;display:flex;gap:6px}.typ i{width:10px;height:10px;border-radius:50%;background:#8a8a8e}
`;

export const hd = ({ s, e, words, cls = '', f = .2 }) => `<div class="hd ${cls}" data-s="${s}" ${e !== undefined ? `data-e="${e}"` : ''} data-f="${f}"><h1>${words.map(([t, tm, c]) => `<span class="m"><span class="w ${c ?? ''}" data-t="${tm}">${t}</span></span>`).join('')}</h1></div>`;
export const cursorSvg = '<svg viewBox="0 0 24 24"><path d="M3 2l7 19 3-8 8-3z" fill="#121212" stroke="#fff" stroke-width="1.5"/></svg>';

export function makeHtml({ scenes, script, caps, total, brandOn = true }) {
  return (W, H) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}${VCSS}</style></head><body>
<div class="vst" style="--W:${W};--H:${H};--s:1">${scenes}<div id="cap"></div></div>
<script>window.CAPS=${JSON.stringify(caps)};${engine}</script>
<script>(function(){const {A,K,X,T,P,IN,$,$$}=window.E;const END=${total};${script}\ninitVideo({W:${W},H:${H},total:${total}});})();</script></body></html>`;
}
