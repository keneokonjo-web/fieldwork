// Video 3: Automations (voice file: Hope, about 27 s). Times are video time (voice time + LEAD).
import { v, hd, makeHtml, cursorSvg, photo, shot, logo, dots } from './common.mjs';
const B = (variant) => `<img class="brand" src="${logo(variant)}" alt=""><span class="mark">Automations</span>`;
const dr = (n) => dots(n, { right: 'calc(var(--u)*-40)', top: 'calc(var(--u)*-30)', width: 'calc(var(--u)*120)', op: .5 }).replace('class="dots"', 'class="dots drift"');
const PH = (id, inner, style = 'left:230px;top:30px;width:520px;height:840px') => `<div class="ph" id="${id}" style="${style}"><div class="sc"><i class="nt"></i><div class="th"><div class="hd"><div style="font-size:26px">Halden</div><span style="font-size:17px">Business text</span></div>${inner}</div></div></div>`;
const bub = (id, txt, out = false) => `<div class="bw" style="position:relative;display:flex;${out ? 'justify-content:flex-end' : ''}">${out ? '' : `<div class="typ" id="${id}t" style="opacity:0"><i></i><i></i><i></i></div>`}<div class="b ${out ? 'out' : 'in'}" id="${id}" style="font-size:25px;opacity:0">${txt}</div></div>`;

const scenes = `
<section class="scn cob" data-s="0" data-e="${v(2.3)}" data-f=".01">${B('light')}${dr('6-circle-cobaltlight-clear')}
  ${hd({ s: 0, e: v(2.3), words: [['An', v(.06)], ['enquiry', v(.27)], ['arrives.', v(.81), 'cb']] })}
  <div class="vz"><div class="vsc">
    <div class="card abs" id="enq" style="left:60px;top:90px;width:880px;padding:40px 44px">
      <div style="display:flex;justify-content:space-between;align-items:center"><span class="mono" style="color:var(--cobalt);font-size:20px">New enquiry</span><span class="pill bl" style="font-size:16px">Website form</span></div>
      <div style="font-size:60px;font-weight:700;letter-spacing:-.04em;margin:18px 0 6px">Sam Test</div>
      <div style="font-size:30px;color:var(--grey);line-height:1.35">Larch Court, Richmond<br>Viewing request · Saturday</div>
      <div style="margin-top:26px;display:flex;gap:12px"><span class="chip" style="font-size:20px">Recorded</span><span class="chip" style="font-size:20px">Consent given</span></div>
    </div>
  </div></div>
</section>

<section class="scn pap" data-s="${v(2.3)}" data-e="${v(5.0)}">${B('dark')}
  ${hd({ s: v(2.3), e: v(5.0), words: [['They', v(2.43)], ['get', v(2.61)], ['a', v(2.79)], ['reply,', v(2.85)], ['straight', v(3.66)], ['away.', v(4.08), 'cb']] })}
  <div class="vz"><div class="vsc">${PH('ph2', `<div class="ts">Mon 19 Oct, 10:42</div>${bub('r1', '<b>Thanks Sam.</b>We have your enquiry about Larch Court, and Amara from Halden will be in touch shortly to arrange your viewing.')}`, 'left:250px;top:30px;width:500px;height:840px')}</div></div>
</section>

<section class="scn ink dk" data-s="${v(5.0)}" data-e="${v(8.9)}">${B('light')}${dr('21-fade-right-cobaltlight-clear')}
  ${hd({ s: v(5.0), e: v(7.0), words: [['The', v(5.13)], ['right', v(5.31)], ['agent', v(5.64)], ['is', v(6.03)], ['told.', v(6.21), 'cb']] })}
  ${hd({ s: v(7.0), e: v(8.9), words: [['A', v(7.2)], ['follow-up', v(7.29)], ['is', v(7.86)], ['set.', v(7.98), 'cb']] })}
  <div class="vz"><div class="vsc">
    <div class="card abs" id="push" style="left:60px;top:50px;width:880px;padding:30px 36px;border-radius:30px"><div style="display:flex;justify-content:space-between" class="mono"><span style="font-size:17px;color:var(--grey)">Halden CRM</span><span style="font-size:17px;color:var(--grey)">now</span></div><div style="font-size:44px;font-weight:700;letter-spacing:-.03em;margin:8px 0 4px">New lead: Sam Test</div><div style="font-size:28px;color:var(--grey)">Larch Court · assigned to Amara</div></div>
    <div class="card abs" id="tasks" style="left:60px;top:330px;width:880px">
      <div class="mono" style="padding:20px 36px;border-bottom:2px solid #121212;font-size:18px">Amara's follow-ups</div>
      <div style="padding:26px 36px;border-bottom:1px solid var(--hair);font-size:30px;display:flex;justify-content:space-between"><span>Call J. Moore · The Forge</span><span class="mono" style="font-size:16px;color:var(--grey)">Today</span></div>
      <div id="task" style="padding:26px 36px;font-size:30px;display:flex;justify-content:space-between;background:#e8ecff"><b>Follow up Sam Test</b><span class="mono" style="font-size:16px;color:var(--cobalt)">Tomorrow 09:00</span></div>
    </div>
  </div></div>
</section>

<section class="scn cob" data-s="${v(8.9)}" data-e="${v(12.1)}">${B('light')}${dr('12-circle-cobaltlight-clear')}
  ${hd({ s: v(8.9), e: v(12.1), cls: 'long', words: [['The', v(9.06)], ['agent', v(9.24)], ['confirms', v(9.6)], ['the', v(10.14)], ['viewing', v(10.23)], ['in', v(10.65)], ['one', v(10.86)], ['click.', v(11.19), 'cb']] })}
  <div class="vz"><div class="vsc">
    <div class="card abs" id="vcard" style="left:60px;top:100px;width:880px;padding:40px 44px">
      <div style="display:flex;justify-content:space-between;align-items:center"><span class="mono" style="font-size:20px">Viewing request</span><span class="pill am" id="vst" style="font-size:16px">Needs confirming</span></div>
      <div style="font-size:54px;font-weight:700;letter-spacing:-.04em;margin:16px 0 6px">Larch Court, Richmond</div>
      <div style="font-size:30px;color:var(--grey);line-height:1.4">Sam Test · Saturday 24 Oct, 11:00<br>Agent: Amara Okoye</div>
      <div style="margin-top:34px"><span class="btn" id="conf" style="width:100%;justify-content:center;height:96px;font-size:36px;background:var(--blue)">Confirm viewing</span></div>
    </div>
    <div class="cursor" id="cur3">${cursorSvg}</div>
  </div></div>
</section>

<section class="scn pap" data-s="${v(12.1)}" data-e="${v(15.6)}">${B('dark')}
  ${hd({ s: v(12.1), e: v(15.6), cls: 'long', words: [['The', v(12.27)], ['buyer', v(12.42)], ['is', v(12.7)], ['told,', v(12.9)], ['and', v(13.44)], ['reminded', v(13.8)], ['the', v(14.4)], ['day', v(14.49)], ['before.', v(14.67), 'cb']] })}
  <div class="vz"><div class="vsc">${PH('ph5', `<div class="ts">Mon 19 Oct, 11:05</div>${bub('c1', '<b>Your viewing is confirmed.</b>Larch Court, Richmond TW10<br>Saturday 24 October, 11:00<br>With Amara Okoye')}<div class="ts" id="day" style="opacity:0">Fri 23 Oct, 17:00</div>${bub('c2', '<b>Reminder</b>Your viewing at Larch Court is tomorrow at 11:00.')}`, 'left:250px;top:30px;width:500px;height:840px')}</div></div>
</section>

<section class="scn ink dk" data-s="${v(15.6)}" data-e="${v(19.9)}">${B('light')}${dr('6-circle-cobaltlight-clear')}
  ${hd({ s: v(15.6), e: v(19.9), cls: 'long', words: [['Afterwards,', v(15.96)], ['feedback', v(16.83)], ['comes', v(17.34)], ['back,', v(17.61)], ['with', v(18.03)], ['a', v(18.24)], ['prompt', v(18.27)], ['to', v(18.72)], ['follow', v(18.84)], ['up.', v(19.17), 'cb']] })}
  <div class="vz"><div class="vsc">
    <div class="card abs" id="fb" style="left:60px;top:60px;width:880px;padding:36px 44px">
      <span class="mono" style="color:var(--cobalt);font-size:20px">Feedback received</span>
      <div style="font-size:56px;font-weight:700;letter-spacing:-.04em;margin:12px 0 4px">Sam Test · 4 of 5</div>
      <div style="font-size:46px;color:#e8a400;letter-spacing:6px">★★★★<span style="color:#d6d4cc">★</span></div>
      <div style="display:flex;gap:10px;margin:16px 0"><span class="chip bl" style="font-size:18px">Garden</span><span class="chip bl" style="font-size:18px">Kitchen</span><span class="chip bl" style="font-size:18px">Natural light</span></div>
      <div style="font-size:30px;color:#444;line-height:1.35">“Loved the garden. Would like a second viewing.”</div>
    </div>
    <div class="abs" id="nudge" style="left:60px;top:470px;width:880px;background:#e8ecff;color:#121212;border-radius:18px;padding:28px 36px;font-size:32px"><b>Prompt:</b> offer Sam a second viewing</div>
  </div></div>
</section>

<section class="scn cob" data-s="${v(19.9)}" data-e="${v(22.4)}">${B('light')}${dr('12-circle-cobaltlight-clear')}
  ${hd({ s: v(19.9), e: v(22.4), words: [['Nothing', v(20.13)], ['slips.', v(20.55)], ['Nothing', v(21.3)], ['waits.', v(21.84), 'cb']] })}
</section>

<section class="scn ink" data-s="${v(22.4)}">
  ${dots('6-circle-cobaltlight-clear', { right: 'calc(var(--u)*-40)', bottom: 'calc(var(--u)*-30)', width: 'calc(var(--u)*120)', op: .45 }).replace('class="dots"', 'class="dots drift"')}
  <div class="endwrap"><img class="big" src="${logo('light')}" alt=""><div class="sub" style="color:#c7c7be">Automations. Fixed price, beside your CRM.</div><span class="cta" id="endcta">See the live demo <span>→</span></span><div class="mark" style="position:static;opacity:.7">Illustrative example with fictional people and properties</div></div>
</section>`;

const script = `
IN('#enq', ${v(.45)}, { y: 80, s: .93 }, .7, 'back');
IN('#ph2', ${v(2.4)}, { y: 80 }, .8); IN('#ph2 .ts', ${v(2.6)}, {}, .4);
A('#r1t', ${v(2.7)}, .2, { o: [0, 1] }); A('#r1t', ${v(3.3)}, .1, { o: [1, 0] }); A('#r1', ${v(3.3)}, .35, { o: [0, 1], s: [.85, 1] }, 'back');
IN('#push', ${v(5.25)}, { y: -50 }, .6, 'back'); IN('#tasks', ${v(5.9)}, { y: 60 }, .7); IN('#task', ${v(7.25)}, { x: -40 }, .6);
IN('#vcard', ${v(9.0)}, { y: 80 }, .7);
P('#cur3', [[${v(10.0)}, 880, 760], [${v(11.15)}, 560, 560], [${v(11.5)}, 580, 585]]);
A('#conf', ${v(11.3)}, .12, { s: [1, .96] }); A('#conf', ${v(11.42)}, .2, { s: [.96, 1] });
K('#vst', ${v(11.42)}, 'ok'); X('#vst', [[${v(11.42)}, 'Confirmed ✓']]); K('#vst', ${v(11.42)}, 'am-off');
IN('#ph5', ${v(12.2)}, { y: 80 }, .8); A('#c1t', ${v(12.4)}, .2, { o: [0, 1] }); A('#c1t', ${v(12.9)}, .1, { o: [1, 0] }); A('#c1', ${v(12.9)}, .35, { o: [0, 1], s: [.85, 1] }, 'back');
A('#day', ${v(14.0)}, .35, { o: [0, 1] }); A('#c2t', ${v(14.0)}, .2, { o: [0, 1] }); A('#c2t', ${v(14.5)}, .1, { o: [1, 0] }); A('#c2', ${v(14.5)}, .35, { o: [0, 1], s: [.85, 1] }, 'back');
IN('#fb', ${v(16.75)}, { y: 80, s: .93 }, .7, 'back'); IN('#nudge', ${v(18.4)}, { y: 30 }, .6);
IN('#endcta', ${v(23.2)}, { y: 30 }, .6);
`;
const caps = [[.06, 1.41, 'An enquiry arrives.'], [2.43, 3.45, 'They get a reply,'], [3.66, 4.5, 'straight away.'], [5.13, 6.72, 'The right agent is told.'], [7.2, 8.43, 'A follow-up is set.'], [9.06, 11.7, 'The agent confirms the viewing in one click.'], [12.27, 13.41, 'The buyer is told,'], [13.44, 15.21, 'and reminded the day before.'], [15.96, 18.0, 'Afterwards, feedback comes back,'], [18.03, 19.5, 'with a prompt to follow up.'], [20.13, 21.12, 'Nothing slips.'], [21.3, 22.08, 'Nothing waits.'], [22.77, 24.0, 'Fieldwork automations.'], [24.45, 26.7, 'Fixed price, beside your CRM.']].map(([a, b, t]) => [v(a), v(b), t]);

export const name = 'v3-automations';
export const voice = 'h2.mp3';
export const total = 29.2;
export const html = makeHtml({ scenes, script, caps, total });
export const sfx = [[v(.5), 'pop_in'], [v(3.3), 'pop_in'], [v(5.3), 'ping'], [v(6.0), 'pop_in'], [v(7.3), 'pop_in'], [v(9.05), 'pop_in'], [v(11.3), 'click'], [v(11.45), 'success'], [v(12.9), 'pop_in'], [v(14.5), 'ping'], [v(16.8), 'pop_in'], [v(18.45), 'success'], [v(22.5), 'pop_in'], [v(23.3), 'success']];
