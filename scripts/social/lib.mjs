// Shared building blocks for the Fieldwork social graphics and ads. Every graphic is an HTML page rendered to PNG.
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '../..');
export const url = (p) => pathToFileURL(path.join(root, p)).href;
export const photo = (n) => url(`public/concepts/img/${n}.jpg`);
export const shot = (n) => url(`scripts/social/assets/${n}.jpg`);
// 'dark' means the logo for a light background (dark-coloured); 'light' means the logo for a dark background. The files are named the other way round.
export const logo = (v = 'dark') => url(`public/brand/logo/fieldwork-wordmark-${v === 'dark' ? 'light' : 'dark'}.svg`);
export const disc = (v = 'cobalt') => url(`public/brand/logo/fieldwork-disc-${v}.svg`);
export const art = (n) => url(`public/art/terrain-${n}.svg`);
const FONT_SG = url('node_modules/@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2');
const FONT_GM = url('node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2');

export const CSS = `
@font-face{font-family:"SG";src:url("${FONT_SG}") format("woff2");font-weight:400 900}
@font-face{font-family:"GM";src:url("${FONT_GM}") format("woff2");font-weight:100 900}
:root{--paper:#F3F2ED;--ink:#121212;--cobalt:#2340FF;--cl:#7C8FFF;--cp:#B8C2FF;--grey:#6B6A63;--hair:#D3D2CA;--wash:#E8E7E0;--green:#1f7a3d;--amber:#c47a00;--red:#d63f22;--blue:#1d7bff}
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow:hidden;background:var(--paper);font-family:"SG",system-ui,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}
.st{position:relative;overflow:hidden;width:calc(var(--w)*1px);height:calc(var(--h)*1px)}
.mono{font:400 calc(var(--s)*21px)/1.3 "GM",monospace;letter-spacing:.07em;text-transform:uppercase}
.h{font-weight:700;letter-spacing:-.055em;line-height:.93}
.abs{position:absolute}
.ink{background:var(--ink);color:var(--paper)}.cob{background:var(--cobalt);color:#fff}.wash{background:var(--wash)}
.corner{position:absolute;font:400 calc(var(--s)*15px) "GM",monospace;color:var(--grey);letter-spacing:.06em}
.ink .corner{color:#8f8f86}.cob .corner{color:#c9d0ff}
.tl{left:calc(var(--s)*26px);top:calc(var(--s)*22px)}.tr{right:calc(var(--s)*26px);top:calc(var(--s)*22px)}.bl{left:calc(var(--s)*26px);bottom:calc(var(--s)*22px)}.br{right:calc(var(--s)*26px);bottom:calc(var(--s)*22px)}
.dots{position:absolute;pointer-events:none}
.btn{display:inline-flex;align-items:center;gap:calc(var(--s)*14px);background:var(--ink);color:var(--paper);border-radius:99px;height:calc(var(--s)*76px);padding:0 calc(var(--s)*40px);font-weight:600;font-size:calc(var(--s)*28px)}
.btn.cob{background:var(--cobalt);color:#fff}.btn.pap{background:var(--paper);color:var(--ink)}
.chip{display:inline-flex;align-items:center;border:calc(var(--s)*2px) solid currentColor;border-radius:99px;padding:calc(var(--s)*8px) calc(var(--s)*22px);font:500 calc(var(--s)*22px) "GM",monospace;letter-spacing:.06em;text-transform:uppercase}
.pill{display:inline-block;border:1px solid currentColor;border-radius:99px;padding:calc(var(--s)*3px) calc(var(--s)*12px);font:500 calc(var(--s)*13px) "GM",monospace;text-transform:uppercase;letter-spacing:.06em}
.ok{color:var(--green)}.am{color:var(--amber)}.bl{color:var(--cobalt)}
/* browser and phone frames */
.br-win{position:absolute;background:#fff;border:calc(var(--s)*2px) solid var(--ink);border-radius:calc(var(--s)*14px);overflow:hidden;box-shadow:0 calc(var(--s)*40px) calc(var(--s)*80px) calc(var(--s)*-34px) rgba(0,0,0,.5)}
.br-bar{height:calc(var(--s)*46px);background:#ecebe6;border-bottom:1px solid var(--hair);display:flex;align-items:center;gap:calc(var(--s)*8px);padding:0 calc(var(--s)*16px)}
.br-bar i{width:calc(var(--s)*12px);height:calc(var(--s)*12px);border-radius:50%;background:#d6d4cc}.br-bar i:nth-child(1){background:#ee6a5e}.br-bar i:nth-child(2){background:#f4bf4f}.br-bar i:nth-child(3){background:#61c454}
.br-bar b{margin-left:calc(var(--s)*14px);flex:1;max-width:calc(var(--s)*420px);background:#fff;border:1px solid var(--hair);border-radius:99px;padding:calc(var(--s)*4px) calc(var(--s)*14px);font:400 calc(var(--s)*14px) "GM",monospace;color:var(--grey)}
.br-win img.sc{display:block;width:100%}
.ph{position:absolute;background:#0c0c0c;border-radius:calc(var(--s)*56px);padding:calc(var(--s)*12px);box-shadow:0 calc(var(--s)*50px) calc(var(--s)*90px) calc(var(--s)*-40px) rgba(0,0,0,.6)}
.ph .sc{position:relative;width:100%;height:100%;border-radius:calc(var(--s)*44px);overflow:hidden;background:#fff}
.ph .sc img{display:block;width:100%}
.ph .nt{position:absolute;left:50%;top:calc(var(--s)*10px);width:calc(var(--s)*92px);height:calc(var(--s)*26px);border-radius:99px;background:#0c0c0c;transform:translateX(-50%);z-index:3}
/* message thread (iMessage style) */
.th{padding:calc(var(--s)*60px) calc(var(--s)*16px) calc(var(--s)*16px);display:flex;flex-direction:column;gap:calc(var(--s)*8px)}
.th .hd{text-align:center;margin:calc(var(--s)*-16px) 0 calc(var(--s)*8px);font-size:calc(var(--s)*18px);font-weight:700}
.th .hd span{display:block;font-size:calc(var(--s)*13px);font-weight:400;color:#8a8a8e}
.th .ts{text-align:center;font-size:calc(var(--s)*13px);color:#8a8a8e;margin:calc(var(--s)*6px) 0 0}
.b{max-width:82%;padding:calc(var(--s)*12px) calc(var(--s)*17px);border-radius:calc(var(--s)*24px);font-size:calc(var(--s)*19px);line-height:1.3}
.b.in{background:#e9e9eb;color:#111;border-bottom-left-radius:calc(var(--s)*6px);align-self:flex-start}
.b.out{background:var(--blue);color:#fff;border-bottom-right-radius:calc(var(--s)*6px);align-self:flex-end}
.b b{display:block;margin-bottom:calc(var(--s)*3px)}
/* listing card as on the demo site */
.lc{background:var(--paper);color:var(--ink)}
.lc .im{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:calc(var(--s)*18px);background:#222 center/cover}
.lc .bd{position:absolute;left:calc(var(--s)*14px);top:calc(var(--s)*14px);background:var(--paper);color:var(--ink);font:600 calc(var(--s)*13px) "SG";letter-spacing:.12em;text-transform:uppercase;padding:calc(var(--s)*6px) calc(var(--s)*14px);border-radius:99px}
.lc .bd.rs{background:var(--red);color:#fff}.lc .bd.sd{background:var(--ink);color:var(--paper)}
.lc .pr{font:500 calc(var(--s)*38px) "SG";letter-spacing:-.04em;margin:calc(var(--s)*14px) 0 calc(var(--s)*2px)}
.lc .ti{font-weight:600;font-size:calc(var(--s)*21px)}
.lc .ad{color:var(--grey);font-size:calc(var(--s)*17px);margin:calc(var(--s)*2px) 0 calc(var(--s)*8px)}
.lc .fa{font-size:calc(var(--s)*17px);color:var(--grey)}.lc .fa b{color:var(--ink)}
.in-f{border:calc(var(--s)*2px) solid #cfcdc4;border-radius:calc(var(--s)*12px);height:calc(var(--s)*58px);padding:0 calc(var(--s)*18px);display:flex;align-items:center;font-size:calc(var(--s)*22px);background:#fff;color:var(--ink)}
.lbl{font:500 calc(var(--s)*14px) "GM",monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--grey);margin:calc(var(--s)*14px) 0 calc(var(--s)*6px)}
.foot{position:absolute;left:calc(var(--s)*56px);right:calc(var(--s)*56px);bottom:calc(var(--s)*44px);display:flex;justify-content:space-between;align-items:center}
.foot img{height:calc(var(--s)*34px)}
.lg{position:absolute}
`;

export function page({ w, h, body, cls = '', s: scale }) {
  const s = (scale ?? w / 1080).toFixed(4);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="st ${cls}" style="--w:${w};--h:${h};--s:${s}">${body}</div></body></html>`;
}

export const corners = (a = 'FIELDWORK', b = '', c = '', d = '') => `<i class="corner tl">${a}</i><i class="corner tr">${b}</i><i class="corner bl">${c}</i><i class="corner br">${d}</i>`;
export const footer = (variant = 'dark', right = 'Fieldwork') => `<div class="foot"><img src="${logo(variant)}" alt=""><span class="mono" style="font-size:calc(var(--s)*17px)">${right}</span></div>`;
export const browser = ({ img, left, top, width, url: u = 'halden.example', h }) => `<div class="br-win" style="left:${left};top:${top};width:${width};${h ? `height:${h};` : ''}"><div class="br-bar"><i></i><i></i><i></i><b>${u}</b></div><img class="sc" src="${shot(img)}" alt=""></div>`;
export const phoneShot = ({ img, left, top, width, height, shift = '0px' }) => `<div class="ph" style="left:${left};top:${top};width:${width};height:${height}"><div class="sc"><i class="nt"></i><img src="${shot(img)}" alt="" style="margin-top:${shift}"></div></div>`;
export const listingCard = ({ img, price, title, addr, meta, badge, badgeCls = '', width }) => `<div class="lc" style="${width ? `width:${width}` : ''}"><div class="im" style="background-image:url(${photo(img)})">${badge ? `<span class="bd ${badgeCls}">${badge}</span>` : ''}</div><div class="pr">${price}</div><div class="ti">${title}</div><div class="ad">${addr}</div><div class="fa">${meta}</div></div>`;
export const thread = (items, { name = 'Halden', sub = 'Business text' } = {}) => `<div class="th"><div class="hd">${name}<span>${sub}</span></div>${items.map((i) => (i.ts ? `<div class="ts">${i.ts}</div>` : `<div class="b ${i.out ? 'out' : 'in'}">${i.t}</div>`)).join('')}</div>`;
export const phoneThread = ({ items, left, top, width, height, name }) => `<div class="ph" style="left:${left};top:${top};width:${width};height:${height}"><div class="sc"><i class="nt"></i>${thread(items, { name })}</div></div>`;
export const dots = (n, { left, top, width, right, bottom, op = 1 }) => `<img class="dots" src="${art(n)}" alt="" style="${left !== undefined ? `left:${left};` : ''}${right !== undefined ? `right:${right};` : ''}${top !== undefined ? `top:${top};` : ''}${bottom !== undefined ? `bottom:${bottom};` : ''}width:${width};opacity:${op}">`;
