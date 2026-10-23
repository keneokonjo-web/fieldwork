// Video 2: Websites and listings (voice file: Hope, about 22 s). Times below are in video time (voice time + LEAD).
import { v, hd, makeHtml, cursorSvg, photo, shot, logo, listingCard, dots } from './common.mjs';
const B = (variant) => `<img class="brand" src="${logo(variant)}" alt=""><span class="mark">Websites + listings</span>`;
const th = (img) => `<i style="width:190px;height:140px;border-radius:12px;background:url(${photo(img)}) center/cover;display:block;opacity:0"></i>`;
const lc = (o) => listingCard({ ...o, width: '440px' });

const scenes = `
<section class="scn cob" data-s="0" data-e="${v(4.5)}" data-f=".01">${B('light')}
  ${dots('12-circle-cobaltlight-clear', { right: 'calc(var(--u)*-30)', top: 'calc(var(--u)*30)', width: 'calc(var(--u)*110)', op: .5 }).replace('class="dots"', 'class="dots drift"')}
  ${hd({ s: 0, e: v(1.95), cls: '', words: [['Add', v(.09)], ['a', v(.33)], ['listing', v(.36)], ['in', v(.87)], ['minutes.', v(1.08), 'cb']] })}
  ${hd({ s: v(1.95), e: v(4.5), words: [['Photos.', v(2.04)], ['Price.', v(2.94)], ['Publish.', v(3.75), 'cb']] })}
  <div class="vz"><div class="vsc">
    <div class="card abs" id="form" style="left:40px;top:40px;width:920px;padding:38px 40px 40px">
      <div class="mono" style="color:var(--grey);font-size:20px">Add a property</div>
      <div class="lbl" style="font-size:18px">Photographs</div>
      <div style="display:flex;gap:18px">${th('prop-exterior-day')}${th('home-living-light')}${th('home-kitchen-white')}</div>
      <div class="lbl" style="font-size:18px">Title</div><div class="in-f" style="height:70px;font-size:28px">Marlow Lodge, Richmond</div>
      <div class="lbl" style="font-size:18px">Price</div><div class="in-f" id="price" style="height:70px;font-size:28px"></div>
      <div style="margin-top:30px"><span class="btn" id="pub" style="width:100%;justify-content:center;height:84px;font-size:30px">Publish</span></div>
    </div>
    <div class="cursor" id="cur1">${cursorSvg}</div>
  </div></div>
</section>

<section class="scn pap" data-s="${v(4.5)}" data-e="${v(10.5)}">${B('dark')}
  ${hd({ s: v(4.5), e: v(6.4), words: [["It's", v(5.04)], ['live', v(5.25)], ['on', v(5.58)], ['your', v(5.7)], ['website.', v(5.82), 'cb']] })}
  ${hd({ s: v(6.4), e: v(10.5), words: [['Search.', v(6.72)], ['Filters.', v(7.32)], ['Viewing requests.', v(8.38), 'cb']] })}
  <div class="vz"><div class="vsc">
    <div class="abs" id="search" style="left:40px;top:20px;width:920px;background:#fff;border:2px solid var(--ink);border-radius:26px;padding:26px 30px">
      <div class="lbl" style="margin-top:0;font-size:17px">Area, street or postcode</div><div class="in-f" id="q" style="height:64px;font-size:26px"></div>
      <div id="chips" style="display:flex;gap:12px;margin-top:18px"><span class="chip" style="font-size:20px;opacity:0">House</span><span class="chip" style="font-size:20px;opacity:0">3+ beds</span><span class="chip" style="font-size:20px;opacity:0">Up to £3m</span></div>
    </div>
    <div class="abs" id="card1" style="left:40px;top:300px;width:440px">${lc({ img: 'prop-exterior-day', price: '£2,395,000', title: 'Marlow Lodge', addr: 'Richmond TW9', meta: '<b>4</b> bed · <b>3</b> bath · <b>2,640</b> sq ft', badge: 'For sale' })}<div style="margin-top:16px"><span class="btn" id="vbtn" style="height:64px;font-size:23px;opacity:0">Request a viewing</span></div></div>
    <div class="abs" id="card2" style="left:520px;top:300px;width:440px">${lc({ img: 'prop-exterior-white', price: '£4,250,000', title: 'Ashdown House', addr: 'Kensington W8', meta: '<b>5</b> bed · <b>4</b> bath · <b>3,480</b> sq ft', badge: 'For sale' })}</div>
  </div></div>
</section>

<section class="scn ink dk" data-s="${v(10.5)}" data-e="${v(15.4)}">${B('light')}
  ${hd({ s: v(10.5), e: v(13.7), words: [['Reserved?', v(10.86)], ['One', v(11.79)], ['click.', v(12.06), 'cb']] })}
  ${hd({ s: v(13.7), e: v(15.4), words: [['Sold?', v(13.89)], ['Same.', v(14.7), 'cb']] })}
  <div class="vz"><div class="vsc">
    <div class="abs" style="left:230px;top:40px;width:540px"><div class="lc" style="background:transparent"><div class="im" style="background-image:url(${photo('prop-exterior-day')});border-radius:22px"><span class="bd" id="badge" style="font-size:18px;padding:9px 20px">For sale</span></div><div class="pr" style="font-size:52px;color:var(--paper)">£2,395,000</div><div class="ti" style="font-size:28px;color:var(--paper)">Marlow Lodge</div><div class="ad" style="font-size:22px">Richmond TW9</div></div></div>
    <div class="card abs" id="panel" style="left:230px;top:640px;width:540px;padding:22px 26px"><div class="mono" style="color:var(--grey);font-size:17px">Status</div><div class="in-f" id="status" style="height:64px;font-size:26px;margin-top:8px;justify-content:space-between"><span id="stxt">For sale</span><span>▾</span></div></div>
    <div class="cursor" id="cur2">${cursorSvg}</div>
  </div></div>
</section>

<section class="scn cob" data-s="${v(15.4)}" data-e="${v(17.8)}">${B('light')}
  ${dots('6-circle-cobaltlight-clear', { right: 'calc(var(--u)*-40)', top: 'calc(var(--u)*-30)', width: 'calc(var(--u)*120)', op: .5 }).replace('class="dots"', 'class="dots drift"')}
  ${hd({ s: v(15.4), e: v(17.8), words: [['No', v(15.57)], ['developer.', v(15.87)], ['No', v(16.65)], ['waiting.', v(17.04), 'cb']] })}
</section>

<section class="scn pap" data-s="${v(17.8)}" data-e="${v(21.3)}">${B('dark')}
  ${hd({ s: v(17.8), e: v(21.3), cls: 'long', words: [['Professional', v(17.82)], ['websites,', v(18.45)], ['with', v(19.17)], ['listings', v(19.35)], ['you', v(19.89)], ['run', v(20.19)], ['yourself.', v(20.46), 'cb']] })}
  <div class="vz"><div class="vsc">
    <div class="abs" id="hbrowser" style="left:0;top:60px;width:760px"></div>
  </div></div>
</section>

<section class="scn cob" data-s="${v(21.3)}">
  ${dots('12-circle-cobaltlight-clear', { right: 'calc(var(--u)*-40)', bottom: 'calc(var(--u)*-30)', width: 'calc(var(--u)*120)', op: .5 }).replace('class="dots"', 'class="dots drift"')}
  <div class="endwrap"><img class="big" src="${logo('light')}" alt=""><div class="sub">Professional websites, with listings you run yourself.</div><span class="cta" id="endcta">See the live demo <span>→</span></span><div class="mark" style="position:static;opacity:.8">Example listings are fictional</div></div>
</section>`;

// The home-page mock-up (browser + phone) is built from the same screenshots as the static ads.
const finalMock = `${shot('demo-home')}`;
const scenes2 = scenes.replace('<div class="abs" id="hbrowser" style="left:0;top:60px;width:760px"></div>', `
  <div class="br-win" id="hb" style="left:0;top:80px;width:780px"><div class="br-bar"><i></i><i></i><i></i><b>halden.example</b></div><img class="sc" src="${shot('demo-home')}" alt=""></div>
  <div class="ph" id="hp" style="left:640px;top:200px;width:340px;height:700px"><div class="sc"><i class="nt"></i><img src="${shot('demo-m-detail')}" alt=""></div></div>`);

const script = `
const D = ${JSON.stringify({ v2: 1 })};
// scene 1
IN('#form', ${v(.5)}, { y: 60 }, .8);
IN('#form .lbl', 0, {}, .01);
[${v(2.04)}, ${v(2.34)}, ${v(2.64)}].forEach((t, i) => A('#form i:nth-of-type(' + (i + 1) + ')', t, .45, { o: [0, 1], s: [.85, 1] }, 'back'));
T('#price', ${v(2.95)}, 18, '£2,395,000');
P('#cur1', [[${v(3.6)}, 860, 760], [${v(4.0)}, 520, 760]]);
A('#pub', ${v(4.05)}, .12, { s: [1, .96] }); A('#pub', ${v(4.17)}, .2, { s: [.96, 1] });
K('#pub', ${v(4.17)}, 'ok'); X('#pub', [[${v(4.17)}, 'Published ✓']]);
// scene 2
IN('#card1', ${v(5.04)}, { y: 80, s: .9 }, .7, 'back'); IN('#card2', ${v(5.3)}, { y: 60 }, .6); A('#search', ${v(6.4)}, .6, { o: [0, 1], y: [-30, 0] });
T('#q', ${v(6.75)}, 9, 'Richmond');
[${v(7.1)}, ${v(7.45)}, ${v(7.8)}].forEach((t, i) => A('#chips span:nth-child(' + (i + 1) + ')', t, .35, { o: [0, 1], y: [14, 0] }));
A('#vbtn', ${v(8.4)}, .4, { o: [0, 1], y: [12, 0] }); A('#vbtn', ${v(9.5)}, .25, { s: [1, 1.07] }); A('#vbtn', ${v(9.75)}, .25, { s: [1.07, 1] });
// scene 3
P('#cur2', [[${v(10.9)}, 880, 780], [${v(11.5)}, 640, 690], [${v(13.3)}, 640, 690], [${v(13.7)}, 640, 690]]);
X('#stxt', [[${v(11.75)}, 'Reserved'], [${v(13.9)}, 'Sold']]); X('#badge', [[${v(11.75)}, 'Reserved'], [${v(13.9)}, 'Sold']]);
K('#badge', ${v(11.75)}, 'rs', ${v(13.9)}); K('#badge', ${v(13.9)}, 'sd');
A('#panel', ${v(11.65)}, .12, { s: [1, .97] }); A('#panel', ${v(11.77)}, .2, { s: [.97, 1] }); A('#panel', ${v(13.8)}, .12, { s: [1, .97] }); A('#panel', ${v(13.92)}, .2, { s: [.97, 1] });
// scene 5
IN('#hb', ${v(17.9)}, { y: 70 }, .8); IN('#hp', ${v(18.4)}, { y: 90 }, .8);
// end
IN('#endcta', ${v(21.9)}, { y: 30 }, .6);
`;
const caps = [[.39, 2.04, 'Add a listing in minutes.'], [2.34, 3.0, 'Photos.'], [3.24, 3.84, 'Price.'], [4.05, 4.68, 'Publish.'], [5.04, 6.33, "It's live on your website,"], [6.48, 7.98, 'with search, filters,'], [7.98, 10.47, 'and a viewing request on every property.'], [10.86, 11.46, 'Reserved?'], [11.79, 13.62, 'One click, and the badge updates.'], [13.89, 14.4, 'Sold?'], [14.7, 15.18, 'Same.'], [15.57, 16.56, 'No developer.'], [16.65, 17.52, 'No waiting.'], [17.82, 19.11, 'Professional websites,'], [19.17, 21.12, 'with listings you run yourself.']].map(([a, b, t]) => [v(a), v(b), t]);

export const name = 'v2-websites-and-listings';
export const voice = 'h1.mp3';
export const total = 24.3;
export const html = makeHtml({ scenes: scenes2, script, caps, total });
export const sfx = [[v(.5), 'pop_in'], [v(2.04), 'pop_in'], [v(2.34), 'pop_in'], [v(2.64), 'pop_in'], [v(4.15), 'click'], [v(4.2), 'success'], [v(5.1), 'pop_in'], [v(6.4), 'pop_out'], [v(7.1), 'tick'], [v(7.45), 'tick'], [v(7.8), 'tick'], [v(8.5), 'pop_in'], [v(11.65), 'click'], [v(11.8), 'pop_out'], [v(13.8), 'click'], [v(13.95), 'pop_out'], [v(17.95), 'pop_in'], [v(21.4), 'success']];
