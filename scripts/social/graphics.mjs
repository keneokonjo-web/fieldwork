// The static media pack: carousels, general graphics and ads. Each entry is { file, w, h, html }.
import { page, corners, footer, browser, phoneShot, listingCard, phoneThread, thread, dots, photo, shot, logo, disc, art } from './lib.mjs';

const P = (n) => `calc(var(--s)*${n}px)`;
const BTN = (t, c = '') => `<span class="btn ${c}">${t}<span aria-hidden="true">→</span></span>`;
const card = (inner, extra = '') => `<div style="background:#fff;color:#121212;border:${P(2)} solid #121212;${extra}">${inner}</div>`;
const EX = 'Example · fictional listings';

const sections = [];
const add = (file, w, h, body, opts = {}) => sections.push({ file, w, h, html: page({ w, h, body, s: opts.s, cls: opts.cls }) });

/* ============ Carousel 1: what Fieldwork does (1080x1350) ============ */
const C1 = (n) => `carousel-1-what-fieldwork-does/slide-${String(n).padStart(2, '0')}.png`;
add(C1(1), 1080, 1350, `
  ${corners('FIELDWORK', 'WHAT WE DO', '01 / 07', '')}
  ${dots('6-circle-cobalt-clear', { right: P(-330), top: P(-260), width: P(900), op: .9 })}
  <div class="abs mono" style="left:${P(70)};top:${P(150)};color:var(--cobalt)">Websites · Workflows · Learning</div>
  <h1 class="h abs" style="left:${P(66)};top:${P(205)};width:${P(940)};font-size:${P(138)}">Websites and workflows for property businesses.</h1>
  <div class="abs" style="left:${P(70)};bottom:${P(130)};width:${P(520)};height:${P(340)};border:${P(2)} solid var(--ink);background:url(${photo('prop-exterior-white')}) center/cover"></div>
  <div class="abs" style="left:${P(620)};bottom:${P(130)};width:${P(390)}">
    <div class="mono" style="color:var(--grey)">Built for</div><div style="font-size:${P(34)};font-weight:600;letter-spacing:-.03em;line-height:1.15;margin-top:${P(8)}">Estate agents and property developers</div>
  </div>
  ${footer('dark', 'Swipe →')}`, { s: 1 });

add(C1(2), 1080, 1350, `
  ${corners('FIELDWORK', 'WEBSITES + LISTINGS', '02 / 07', '')}
  <div class="abs mono" style="left:${P(70)};top:${P(120)};color:var(--cobalt)">01 / Websites and listings</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(165)};width:${P(940)};font-size:${P(96)}">Professional websites. Listings you manage yourself.</h2>
  <p class="abs" style="left:${P(70)};top:${P(480)};width:${P(780)};font-size:${P(32)};color:var(--grey);line-height:1.35">Add, edit and publish properties without calling a developer. Search, filters and viewing requests are built in.</p>
  ${browser({ img: 'demo-properties-grid', left: P(70), top: P(660), width: P(940), url: 'halden.example/properties' })}
  `, { s: 1 });

add(C1(3), 1080, 1350, `
  ${corners('FIELDWORK', 'LEAD CAPTURE', '03 / 07', '')}
  ${dots('21-fade-right-cobaltlight-clear', { right: P(-120), bottom: P(-80), width: P(760), op: .5 })}
  <div class="abs mono" style="left:${P(70)};top:${P(120)};color:var(--cl)">02 / Lead capture and follow-up</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(165)};width:${P(940)};font-size:${P(96)}">Lead capture and follow-up workflows.</h2>
  <div class="abs" style="left:${P(70)};top:${P(470)};width:${P(940)};display:grid;gap:${P(20)}">
    ${[['1', 'Enquiry arrives', 'Sam Test · Larch Court · viewing request', 'Recorded'], ['2', 'Instant reply', '“Thanks Sam, we have your enquiry…”', 'Sent'], ['3', 'Agent notified', 'Assigned to Amara · follow-up set for 09:00', 'Done']].map(([n, t, d, tag]) => `<div style="display:flex;gap:${P(26)};align-items:center;background:var(--paper);color:var(--ink);padding:${P(26)} ${P(30)}"><span class="h" style="font-size:${P(78)};color:var(--cobalt);width:${P(60)}">${n}</span><div style="flex:1"><div style="font-size:${P(38)};font-weight:700;letter-spacing:-.03em">${t}</div><div style="font-size:${P(24)};color:var(--grey);margin-top:${P(4)}">${d}</div></div><span class="pill ok" style="font-size:${P(15)}">${tag}</span></div>`).join('')}
  </div>
  <p class="abs" style="left:${P(70)};top:${P(1090)};width:${P(850)};font-size:${P(30)};color:#c7c7be;line-height:1.35">Into your CRM, or a shared sheet. Nothing slips, nothing waits.</p>
  ${footer('light')}`, { s: 1, cls: 'ink' });

add(C1(4), 1080, 1350, `
  ${corners('FIELDWORK', 'VIEWINGS', '04 / 07', '')}
  <div class="abs mono" style="left:${P(70)};top:${P(120)};color:var(--cobalt)">03 / Viewings</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(165)};width:${P(500)};font-size:${P(80)}">Viewing requests, reminders and feedback.</h2>
  <div class="abs" style="left:${P(70)};top:${P(700)};width:${P(430)};display:grid;gap:${P(14)}">
    ${['Requested', 'Confirmed by the agent', 'Reminded the day before', 'Feedback collected'].map((t, i) => `<div style="display:flex;gap:${P(16)};align-items:center;border-top:${P(2)} solid var(--ink);padding-top:${P(14)}"><span class="mono" style="color:var(--cobalt)">0${i + 1}</span><span style="font-size:${P(30)};font-weight:600;letter-spacing:-.02em">${t}</span></div>`).join('')}
  </div>
  ${phoneThread({ left: P(600), top: P(190), width: P(420), height: P(1100), items: [{ ts: 'Mon 19 Oct, 11:05' }, { t: '<b>Your viewing is confirmed.</b>Larch Court, Richmond TW10<br>Saturday 24 October, 11:00<br>With Amara Okoye' }, { t: 'Perfect, thank you!', out: 1 }, { ts: 'Fri 23 Oct, 17:00' }, { t: '<b>Reminder</b>Your viewing at Larch Court is tomorrow at 11:00.' }] })}
  ${footer('dark')}`, { s: 1 });

const mods = [['01', 'AI fundamentals for real estate'], ['02', 'Property listing preparation'], ['06', 'Lead follow-up'], ['08', 'Viewing and open-house workflows'], ['12', 'Social media and content planning'], ['16', 'Data protection and responsible AI']];
add(C1(5), 1080, 1350, `
  ${corners('FIELDWORK', 'AI WORKSHOP', '05 / 07', '')}
  <div class="abs mono" style="left:${P(70)};top:${P(120)};color:var(--cobalt)">04 / AI Workshop</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(165)};width:${P(940)};font-size:${P(96)}">Practical AI learning for real estate teams.</h2>
  <p class="abs" style="left:${P(70)};top:${P(480)};width:${P(800)};font-size:${P(32)};color:var(--grey);line-height:1.35">16 short modules on real property tasks, self-paced, with a manager view of progress.</p>
  <div class="abs" style="left:${P(70)};top:${P(640)};width:${P(940)};display:grid;grid-template-columns:1fr 1fr;border:${P(2)} solid var(--ink)">
    ${mods.map(([n, t], i) => `<div style="padding:${P(26)} ${P(28)};border-right:${i % 2 === 0 ? `${P(2)} solid var(--ink)` : '0'};border-bottom:${i < 4 ? `${P(2)} solid var(--ink)` : '0'};background:${i % 3 === 0 ? 'var(--wash)' : 'transparent'}"><div class="mono" style="color:var(--cobalt)">Module ${n}</div><div style="font-size:${P(31)};font-weight:700;letter-spacing:-.03em;line-height:1.1;margin-top:${P(8)}">${t}</div></div>`).join('')}
  </div>
  <div class="abs" style="left:${P(70)};top:${P(1170)}">${BTN('Register interest')}</div>
  ${footer('dark')}`, { s: 1, cls: 'wash' });

add(C1(6), 1080, 1350, `
  ${corners('FIELDWORK', 'HOW WE WORK', '06 / 07', '')}
  ${dots('12-circle-cobaltlight-clear', { right: P(-220), bottom: P(-180), width: P(980), op: .35 })}
  <div class="abs mono" style="left:${P(70)};top:${P(130)};color:#c9d0ff">The terms</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(250)};width:${P(960)};font-size:${P(150)}">Fixed price.<br>Your own accounts.<br>Beside your CRM.</h2>
  <p class="abs" style="left:${P(70)};top:${P(1020)};width:${P(780)};font-size:${P(32)};line-height:1.35;color:#e5e9ff">We set everything up on accounts you own, for an agreed scope and a fixed price.</p>
  ${footer('light')}`, { s: 1, cls: 'cob' });

add(C1(7), 1080, 1350, `
  ${corners('FIELDWORK', 'SEE IT WORKING', '07 / 07', '')}
  ${dots('6-circle-cobaltlight-clear', { right: P(-260), top: P(-200), width: P(900), op: .55 })}
  <div class="abs mono" style="left:${P(70)};top:${P(130)};color:var(--cl)">The live demo</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(180)};width:${P(940)};font-size:${P(140)}">See it working.</h2>
  <p class="abs" style="left:${P(70)};top:${P(360)};width:${P(780)};font-size:${P(34)};line-height:1.35;color:#c7c7be">A real example website with a working listing system. Add a property, publish it, and watch it appear.</p>
  ${browser({ img: 'demo-home', left: P(70), top: P(600), width: P(700), url: 'halden.example' })}
  ${phoneShot({ img: 'demo-m-detail', left: P(690), top: P(540), width: P(320), height: P(660) })}
  <div class="abs" style="left:${P(70)};top:${P(1140)}">${BTN('View the live demo', 'cob')}</div>
  ${footer('light', 'Link in bio')}`, { s: 1, cls: 'ink' });

/* ============ Carousel 2: 5 things a property website should do ============ */
const C2 = (n) => `carousel-2-5-things-a-property-website-should-do/slide-${String(n).padStart(2, '0')}.png`;
add(C2(1), 1080, 1350, `
  ${corners('FIELDWORK', 'A CHECKLIST', '01 / 07', '')}
  ${dots('6-circle-cobaltlight-clear', { right: P(-380), top: P(-300), width: P(980), op: .8 })}
  <div class="abs mono" style="left:${P(70)};top:${P(150)};color:var(--cl)">A checklist for agents and developers</div>
  <div class="abs h" style="left:${P(60)};top:${P(180)};font-size:${P(520)};color:var(--cobalt);line-height:.85">5</div>
  <h1 class="h abs" style="left:${P(66)};top:${P(720)};width:${P(940)};font-size:${P(118)}">things a property website should do.</h1>
  ${footer('light', 'Swipe →')}`, { s: 1, cls: 'ink' });

const five = [
  ['1', 'Present listings clearly.', 'Big photographs, the price up front, bedrooms, size and a clear status: for sale, reserved or sold.', () => `<div class="abs" style="left:${P(70)};top:${P(720)};width:${P(450)}">${listingCard({ img: 'prop-exterior-white', price: '£4,250,000', title: 'Ashdown House', addr: 'Kensington W8', meta: '<b>5</b> bed · <b>4</b> bath · <b>3,480</b> sq ft', badge: 'For sale' })}</div><div class="abs" style="left:${P(560)};top:${P(720)};width:${P(450)}">${listingCard({ img: 'prop-exterior-black-dusk', price: '£2,150,000', title: 'The Black House', addr: 'Clapham SW4', meta: '<b>3</b> bed · <b>3</b> bath · <b>1,980</b> sq ft', badge: 'Reserved', badgeCls: 'rs' })}</div>`],
  ['2', 'Make searching effortless.', 'Area, street or postcode, type, bedrooms and price, on every device.', () => `<div class="abs" style="left:${P(70)};top:${P(730)};width:${P(940)};background:var(--paper);border:${P(2)} solid var(--ink);border-radius:${P(26)};padding:${P(30)}"><div style="display:inline-flex;border:${P(2)} solid var(--ink);border-radius:99px;padding:${P(5)}"><span style="background:var(--ink);color:var(--paper);border-radius:99px;padding:${P(10)} ${P(34)};font-size:${P(24)}">Buy</span><span style="padding:${P(10)} ${P(34)};font-size:${P(24)}">Rent</span></div><div class="lbl">Area, street or postcode</div><div class="in-f" style="color:#8d8b82">e.g. Richmond, Seldon Road, SW4</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:${P(18)}"><div><div class="lbl">Type</div><div class="in-f">House</div></div><div><div class="lbl">Bedrooms</div><div class="in-f">3+</div></div><div><div class="lbl">Max price</div><div class="in-f">£3m</div></div></div></div>`],
  ['3', 'Capture every enquiry.', 'A viewing request on every property, and every request goes straight to your team.', () => `${phoneShot({ img: 'demo-m-detail', left: P(110), top: P(700), width: P(380), height: P(760) })}<div class="abs" style="left:${P(540)};top:${P(760)};width:${P(470)}">${card(`<div class="mono" style="padding:${P(16)} ${P(22)};border-bottom:${P(2)} solid #121212;font-size:${P(15)}">Viewing request</div><div style="padding:${P(22)}"><div class="lbl" style="margin-top:0">Your name</div><div class="in-f">Sam Test</div><div class="lbl">Preferred day</div><div class="in-f">Saturday, 11:00</div><div style="margin-top:${P(22)}"><span class="btn" style="height:${P(64)};font-size:${P(23)}">Request viewing</span></div></div>`)}</div>`],
  ['4', 'Let you update it yourself.', 'Add a property, change a price, mark it sold. No developer, no waiting.', () => `${browser({ img: 'demo-admin', left: P(70), top: P(710), width: P(940), url: 'halden.example/admin' })}`],
  ['5', 'Work beautifully on a phone.', 'Most visitors will arrive on one. Fast, clear and easy to use with a thumb.', () => `${phoneShot({ img: 'demo-m-home', left: P(80), top: P(700), width: P(320), height: P(660) })}${phoneShot({ img: 'demo-m-properties', left: P(440), top: P(750), width: P(320), height: P(660) })}${phoneShot({ img: 'demo-m-detail', left: P(800), top: P(800), width: P(320), height: P(660) })}`],
];
five.forEach(([n, t, d, vis], i) => add(C2(i + 2), 1080, 1350, `
  ${corners('FIELDWORK', '5 THINGS', `0${i + 2} / 07`, '')}
  <div class="abs h" style="left:${P(54)};top:${P(60)};font-size:${P(300)};color:var(--cobalt);line-height:.9">${n}</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(330)};width:${P(940)};font-size:${P(92)}">${t}</h2>
  <p class="abs" style="left:${P(70)};top:${P(555)};width:${P(820)};font-size:${P(30)};color:var(--grey);line-height:1.35">${d}</p>
  ${vis()}
  <div class="abs mono" style="right:${P(40)};top:${P(70)};color:var(--grey)">${EX}</div>`, { s: 1 }));

add(C2(7), 1080, 1350, `
  ${corners('FIELDWORK', 'THE LIVE DEMO', '07 / 07', '')}
  ${dots('21-fade-right-cobaltlight-clear', { right: P(-120), bottom: P(-60), width: P(800), op: .4 })}
  <div class="abs mono" style="left:${P(70)};top:${P(130)};color:#c9d0ff">That is what we build</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(190)};width:${P(940)};font-size:${P(150)}">All five. One fixed price.</h2>
  <p class="abs" style="left:${P(70)};top:${P(560)};width:${P(780)};font-size:${P(36)};line-height:1.35;color:#e5e9ff">Professional websites with listings you manage yourself, set up on your own accounts.</p>
  <div class="abs" style="left:${P(70)};top:${P(780)}">${BTN('See the live demo', 'pap')}</div>
  ${footer('light', 'Link in bio')}`, { s: 1, cls: 'cob' });

/* ============ General graphics ============ */
const G = (n) => `general-graphics/${n}.png`;
add(G('01-add-a-listing-1x1'), 1080, 1080, `
  ${corners('FIELDWORK', 'LISTINGS', '', '')}
  <div class="abs mono" style="left:${P(60)};top:${P(100)};color:var(--cobalt)">Self-managed listings</div>
  <h2 class="h abs" style="left:${P(56)};top:${P(140)};width:${P(960)};font-size:${P(112)}">Add a listing in minutes.</h2>
  ${browser({ img: 'demo-editor', left: P(60), top: P(420), width: P(960), url: 'halden.example/admin/new' })}
  `, { s: 1 });
add(G('02-reserved-sold-4x5'), 1080, 1350, `
  ${corners('FIELDWORK', 'STATUS', '', '')}
  <div class="abs mono" style="left:${P(70)};top:${P(120)};color:var(--cobalt)">One click</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(160)};width:${P(940)};font-size:${P(120)}">Reserved. Sold. Updated for you.</h2>
  <div class="abs" style="left:${P(70)};top:${P(520)};width:${P(430)}">${listingCard({ img: 'prop-villa-pool', price: '£5,200,000', title: 'Pinewood House', addr: 'Cobham KT11', meta: '<b>6</b> bed · <b>5</b> bath · <b>5,600</b> sq ft', badge: 'For sale' })}</div>
  <div class="abs mono" style="left:${P(522)};top:${P(640)};color:var(--cobalt);font-size:${P(40)}">→</div>
  <div class="abs" style="left:${P(580)};top:${P(520)};width:${P(430)}">${listingCard({ img: 'prop-villa-pool', price: '£5,200,000', title: 'Pinewood House', addr: 'Cobham KT11', meta: '<b>6</b> bed · <b>5</b> bath · <b>5,600</b> sq ft', badge: 'Sold', badgeCls: 'sd' })}</div>
  <p class="abs" style="left:${P(70)};top:${P(1170)};width:${P(850)};font-size:${P(28)};color:var(--grey)">The badge on your website changes the moment you save.</p>
  <div class="abs mono" style="right:${P(40)};top:${P(70)};color:var(--grey)">${EX}</div>`, { s: 1 });
add(G('03-listing-card-1x1'), 1080, 1080, `
  ${corners('FIELDWORK', 'THE WEBSITE', '', '')}
  <div class="abs" style="left:${P(60)};top:${P(90)};width:${P(520)};height:${P(900)};background:url(${photo('prop-modernist')}) center/cover"></div>
  <div class="abs" style="left:${P(620)};top:${P(110)};width:${P(400)}"><div class="mono" style="color:var(--cobalt)">Just listed</div><div class="h" style="font-size:${P(86)};margin:${P(18)} 0 ${P(24)}">Larch Court</div><div class="pr" style="font:500 ${P(54)} 'SG';letter-spacing:-.04em">£2,750,000</div><div style="font-size:${P(26)};color:var(--grey);margin-top:${P(10)};line-height:1.4">Richmond TW10<br>House · 4 bed · 3 bath<br>2,490 sq ft</div><div style="margin-top:${P(36)}"><span class="btn" style="height:${P(66)};font-size:${P(24)}">Book a viewing</span></div></div>
  <div class="abs mono" style="left:${P(620)};bottom:${P(100)};color:var(--grey);width:${P(400)}">${EX}</div>
  ${footer('dark')}`, { s: 1 });
add(G('04-every-viewing-confirmed-story-9x16'), 1080, 1920, `
  ${corners('FIELDWORK', 'VIEWINGS', '', '')}
  ${dots('9-fade-down-cobalt-clear', { right: P(-420), top: P(-330), width: P(1100), op: .85 })}
  <div class="abs mono" style="left:${P(70)};top:${P(190)};color:var(--cobalt)">Automatic follow-up</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(240)};width:${P(940)};font-size:${P(140)}">Every viewing confirmed.</h2>
  ${phoneThread({ left: P(250), top: P(660), width: P(580), height: P(1000), items: [{ ts: 'Mon 19 Oct, 11:05' }, { t: '<b>Your viewing is confirmed.</b>Larch Court, Richmond TW10<br>Saturday 24 October, 11:00<br>With Amara Okoye' }, { t: 'Perfect, thank you!', out: 1 }, { ts: 'Fri 23 Oct, 17:00' }, { t: '<b>Reminder</b>Your viewing at Larch Court is tomorrow at 11:00. Amara will meet you at the front door.' }] })}
  ${footer('dark', 'Fieldwork')}`, { s: 1 });
add(G('05-statement-1x1'), 1080, 1080, `
  ${corners('FIELDWORK', '', '', '')}
  ${dots('6-circle-cobalt-clear', { right: P(-200), top: P(-180), width: P(900) })}
  <h1 class="h abs" style="left:${P(56)};top:${P(300)};width:${P(960)};font-size:${P(132)}">Your enquiries. Your listings. <span style="color:var(--cobalt)">Sorted.</span></h1>
  ${footer('dark', 'Websites · Workflows')}`, { s: 1 });
add(G('06-the-flow-4x5'), 1080, 1350, `
  ${corners('FIELDWORK', 'THE FLOW', '', '')}
  <div class="abs mono" style="left:${P(70)};top:${P(120)};color:var(--cl)">From first message to feedback</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(160)};width:${P(940)};font-size:${P(104)}">One flow. Nothing dropped.</h2>
  <div class="abs" style="left:${P(70)};top:${P(480)};width:${P(940)};border-top:${P(2)} solid var(--paper)">
    ${[['Enquiry arrives', 'Recorded in your CRM or a shared sheet'], ['Instant reply', 'Email and text, in your wording'], ['Agent notified', 'Assigned by your rules, follow-up set'], ['Viewing confirmed', 'One click; the buyer is told; reminder sent'], ['Feedback collected', 'A short form, a prompt to follow up']].map(([t, d], i) => `<div style="display:flex;gap:${P(26)};align-items:baseline;padding:${P(24)} 0;border-bottom:${P(2)} solid #3a3a37"><span class="mono" style="color:var(--cl);width:${P(60)}">0${i + 1}</span><span style="font-size:${P(46)};font-weight:700;letter-spacing:-.035em;width:${P(450)}">${t}</span><span style="font-size:${P(24)};color:#bdbdb4;flex:1;line-height:1.3">${d}</span></div>`).join('')}
  </div>
  ${footer('light')}`, { s: 1, cls: 'ink' });
add(G('07-fixed-price-1x1'), 1080, 1080, `
  ${corners('FIELDWORK', '', '', '')}
  ${dots('12-circle-cobaltlight-clear', { right: P(-200), bottom: P(-220), width: P(900), op: .3 })}
  <div class="abs mono" style="left:${P(60)};top:${P(110)};color:#c9d0ff">How we work</div>
  <h1 class="h abs" style="left:${P(56)};top:${P(180)};width:${P(960)};font-size:${P(170)}">Fixed price. Agreed scope.</h1>
  <p class="abs" style="left:${P(60)};top:${P(780)};width:${P(800)};font-size:${P(34)};line-height:1.35;color:#e5e9ff">An agreed scope, set up on accounts you own.</p>
  ${footer('light')}`, { s: 1, cls: 'cob' });
add(G('08-search-story-9x16'), 1080, 1920, `
  ${corners('FIELDWORK', 'SEARCH', '', '')}
  <div class="abs mono" style="left:${P(70)};top:${P(190)};color:var(--cobalt)">Built into every site</div>
  <h2 class="h abs" style="left:${P(66)};top:${P(240)};width:${P(940)};font-size:${P(130)}">Search by area, street, postcode, type, bedrooms and price.</h2>
  <div class="abs" style="left:${P(70)};top:${P(920)};width:${P(940)};background:var(--paper);border:${P(2)} solid var(--ink);border-radius:${P(26)};padding:${P(34)}"><div style="display:inline-flex;border:${P(2)} solid var(--ink);border-radius:99px;padding:${P(5)}"><span style="background:var(--ink);color:var(--paper);border-radius:99px;padding:${P(12)} ${P(40)};font-size:${P(26)}">Buy</span><span style="padding:${P(12)} ${P(40)};font-size:${P(26)}">Rent</span></div><div class="lbl">Area, street or postcode</div><div class="in-f">Richmond</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:${P(20)}"><div><div class="lbl">Property type</div><div class="in-f">House</div></div><div><div class="lbl">Bedrooms</div><div class="in-f">3+</div></div></div><div class="lbl">Max price</div><div class="in-f">£3m</div></div>
  ${footer('dark', 'Fieldwork')}`, { s: 1 });

/* ============ Ads ============ */
const A = (n) => `ads/${n}.png`;
// Ad 1: full-bleed property photograph (Instagram feed)
add(A('ad-1-instagram-feed-4x5'), 1080, 1350, `
  <div class="abs" style="inset:0;background:url(${photo('prop-exterior-timber-dusk')}) center/cover"></div>
  <div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,0) 35%,rgba(0,0,0,.78))"></div>
  <div class="abs mono" style="left:${P(60)};top:${P(60)};color:#fff">Fieldwork · Websites + listings</div>
  <h1 class="h abs" style="left:${P(56)};bottom:${P(300)};width:${P(960)};font-size:${P(150)};color:#fff">Your listings, live in minutes.</h1>
  <div class="abs" style="left:${P(60)};bottom:${P(130)}">${BTN('See the live demo', 'cob')}</div>
  <img src="${logo('light')}" class="abs" style="right:${P(60)};bottom:${P(150)};height:${P(40)}" alt="">`, { s: 1, cls: 'ink' });
// Ad 2: typographic, LinkedIn square + landscape
add(A('ad-2-linkedin-1200x1200'), 1200, 1200, `
  ${corners('FIELDWORK', 'FOR ESTATE AGENTS + DEVELOPERS', '', '')}
  ${dots('6-circle-cobaltlight-clear', { right: P(-180), top: P(-160), width: P(860), op: .55 })}
  <h1 class="h abs" style="left:${P(70)};top:${P(230)};width:${P(1000)};font-size:${P(138)}">Every enquiry answered. Every viewing <span style="color:var(--cl)">confirmed.</span></h1>
  <p class="abs" style="left:${P(74)};top:${P(830)};width:${P(800)};font-size:${P(34)};color:#c7c7be;line-height:1.35">Fixed-price lead capture and viewing workflows that sit beside your CRM.</p>
  ${footer('light', 'Learn more →')}`, { s: 1.1111, cls: 'ink' });
add(A('ad-2-linkedin-1200x628'), 1200, 628, `
  ${dots('6-circle-cobaltlight-clear', { right: P(-120), top: P(-120), width: P(560), op: .55 })}
  <div class="abs mono" style="left:${P(50)};top:${P(44)};color:var(--cl);font-size:${P(15)}">Fieldwork · For estate agents + developers</div>
  <h1 class="h abs" style="left:${P(46)};top:${P(110)};width:${P(760)};font-size:${P(84)}">Every enquiry answered. Every viewing <span style="color:var(--cl)">confirmed.</span></h1>
  <p class="abs" style="left:${P(50)};top:${P(430)};width:${P(560)};font-size:${P(22)};color:#c7c7be;line-height:1.35">Fixed-price workflows beside your CRM.</p>
  <img src="${logo('light')}" class="abs" style="left:${P(50)};bottom:${P(40)};height:${P(30)}" alt="">
  <span class="btn cob abs" style="right:${P(50)};bottom:${P(34)};height:${P(54)};font-size:${P(20)}">Learn more →</span>`, { s: 1, cls: 'ink' });
// Ad 3: product mock-up on paper (Google responsive display)
const ad3 = () => `
  ${corners('FIELDWORK', '', '', '')}
  ${dots('21-fade-right-cobalt-clear', { right: P(-60), bottom: P(-60), width: P(660), op: .3 })}
  <div class="abs mono" style="left:${P(54)};top:${P(70)};color:var(--cobalt);font-size:${P(17)}">Websites + listings</div>
  <h1 class="h abs" style="left:${P(50)};top:${P(104)};width:${P(520)};font-size:${P(66)}">A property website you run yourself.</h1>
  <span class="btn abs" style="left:${P(54)};bottom:${P(56)};height:${P(54)};font-size:${P(20)};padding:0 ${P(28)}">See the live demo →</span>
  ${browser({ img: 'demo-home', left: P(620), top: P(96), width: P(520), url: 'halden.example' })}
  ${phoneShot({ img: 'demo-m-detail', left: P(560), top: P(300), width: P(190), height: P(390) })}`;
add(A('ad-3-google-1200x628'), 1200, 628, ad3(), { s: 1 });
add(A('ad-3-google-1200x1200'), 1200, 1200, `
  ${corners('FIELDWORK', '', '', '')}
  <div class="abs mono" style="left:${P(70)};top:${P(90)};color:var(--cobalt)">Websites + listings</div>
  <h1 class="h abs" style="left:${P(66)};top:${P(135)};width:${P(1060)};font-size:${P(132)}">A property website you run yourself.</h1>
  ${browser({ img: 'demo-home', left: P(70), top: P(580), width: P(720), url: 'halden.example' })}
  ${phoneShot({ img: 'demo-m-detail', left: P(760), top: P(540), width: P(330), height: P(680) })}
  <span class="btn abs" style="left:${P(70)};bottom:${P(60)};height:${P(66)};font-size:${P(24)}">See the live demo →</span>`, { s: 1 });
add(A('ad-3-google-1200x1500'), 1200, 1500, `
  ${corners('FIELDWORK', '', '', '')}
  <div class="abs mono" style="left:${P(70)};top:${P(110)};color:var(--cobalt)">Websites + listings</div>
  <h1 class="h abs" style="left:${P(66)};top:${P(160)};width:${P(1060)};font-size:${P(138)}">A property website you run yourself.</h1>
  ${browser({ img: 'demo-properties-grid', left: P(70), top: P(690), width: P(780), url: 'halden.example/properties' })}
  ${phoneShot({ img: 'demo-m-home', left: P(810), top: P(650), width: P(330), height: P(680) })}
  <span class="btn abs" style="left:${P(70)};bottom:${P(80)}">See the live demo →</span>`, { s: 1 });
// Ad 4: cobalt field (Instagram story)
add(A('ad-4-instagram-story-9x16'), 1080, 1920, `
  ${corners('FIELDWORK', '', '', '')}
  ${dots('12-circle-cobaltlight-clear', { right: P(-260), top: P(260), width: P(1200), op: .32 })}
  <div class="abs mono" style="left:${P(70)};top:${P(200)};color:#c9d0ff">Websites · Workflows</div>
  <h1 class="h abs" style="left:${P(64)};top:${P(280)};width:${P(960)};font-size:${P(190)}">Fixed price. Your own accounts.</h1>
  <p class="abs" style="left:${P(70)};top:${P(1090)};width:${P(820)};font-size:${P(42)};line-height:1.3;color:#e5e9ff">Professional property websites and lead workflows, set up for you.</p>
  <div class="abs" style="left:${P(70)};top:${P(1480)}">${BTN('See the live demo', 'pap')}</div>
  <img src="${logo('light')}" class="abs" style="left:${P(70)};bottom:${P(120)};height:${P(46)}" alt="">`, { s: 1, cls: 'cob' });
// Ad 5: split panel
add(A('ad-5-split-instagram-4x5'), 1080, 1350, `
  <div class="abs" style="left:0;top:0;width:${P(540)};height:${P(1350)};background:var(--paper)"></div>
  <div class="abs" style="left:${P(540)};top:0;width:${P(540)};height:${P(1350)};background:var(--ink)"></div>
  <div class="abs mono" style="left:${P(50)};top:${P(70)};color:var(--cobalt)">01 / Websites</div>
  <h2 class="h abs" style="left:${P(46)};top:${P(120)};width:${P(450)};font-size:${P(90)}">Websites and listings.</h2>
  ${phoneShot({ img: 'demo-m-detail', left: P(110), top: P(560), width: P(320), height: P(610) })}
  <div class="abs mono" style="left:${P(590)};top:${P(70)};color:var(--cl)">02 / Workflows</div>
  <h2 class="h abs" style="left:${P(586)};top:${P(120)};width:${P(450)};font-size:${P(90)};color:var(--paper)">Lead and viewing workflows.</h2>
  ${phoneThread({ left: P(640), top: P(560), width: P(320), height: P(610), items: [{ ts: 'Now' }, { t: '<b>Your viewing is confirmed.</b>Larch Court, Saturday 11:00' }, { t: 'Perfect, thank you!', out: 1 }] })}
  <div class="abs" style="left:${P(70)};bottom:${P(70)};right:${P(70)};display:flex;justify-content:space-between;align-items:center"><span class="btn cob">One fixed price →</span><img src="${logo('light')}" style="height:${P(36)};filter:drop-shadow(0 0 0 #000)" alt=""></div>
  <div class="abs" style="left:${P(70)};bottom:${P(70)};width:${P(1)};height:${P(1)}"></div>`, { s: 1 });
// Ad 5 banners
add(A('ad-5-google-300x250'), 300, 250, `
  <div class="abs" style="inset:0;background:var(--ink)"></div>
  ${dots('6-circle-cobaltlight-clear', { right: P(-70), top: P(-60), width: P(230), op: .6 })}
  <div class="abs mono" style="left:${P(16)};top:${P(14)};color:var(--cl);font-size:${P(9)}">Fieldwork</div>
  <h1 class="h abs" style="left:${P(14)};top:${P(40)};width:${P(250)};font-size:${P(32)};color:var(--paper)">Websites. Workflows. One fixed price.</h1>
  <span class="btn cob abs" style="left:${P(16)};bottom:${P(16)};height:${P(34)};font-size:${P(12)};padding:0 ${P(16)}">See the live demo →</span>`, { s: 1, cls: 'ink' });
add(A('ad-5-google-728x90'), 728, 90, `
  <div class="abs" style="inset:0;background:var(--ink)"></div>
  ${dots('6-circle-cobaltlight-clear', { right: P(-40), top: P(-110), width: P(300), op: .5 })}
  <img src="${logo('light')}" class="abs" style="left:${P(20)};top:${P(31)};height:${P(26)}" alt="">
  <div class="h abs" style="left:${P(150)};top:${P(31)};font-size:${P(25)};color:var(--paper);width:${P(440)};line-height:1;white-space:nowrap">Websites. Workflows. One price.</div>
  <span class="btn cob abs" style="right:${P(18)};top:${P(22)};height:${P(46)};font-size:${P(15)};padding:0 ${P(22)}">See the demo →</span>`, { s: 1, cls: 'ink' });

export const graphics = sections;
