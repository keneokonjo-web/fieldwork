// Real-browser behaviour tests against a production build. Usage: node scripts/qa/browser-tests.mjs
// Starts a mock lead webhook and a second server (port 3101) configured to use it, in addition to the default server on 3100.
import { chromium } from 'playwright';
import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const results = [];
const check = async (name, fn) => { try { await fn(); results.push({ name, pass: true }); console.log('PASS', name); } catch (e) { results.push({ name, pass: false, error: String(e.message).split('\n')[0] }); console.log('FAIL', name, '-', String(e.message).split('\n')[0]); } };
const ok = (c, m) => { if (!c) throw new Error(m); };
const B = 'http://localhost:3100';

// mock webhook
const received = [];
const mock = http.createServer((req, res) => { let d = ''; req.on('data', (c) => (d += c)); req.on('end', () => { received.push({ headers: req.headers, body: d }); res.writeHead(200); res.end('ok'); }); }).listen(4010);
const srv = spawn('node_modules/.bin/next', ['start', '-p', '3101'], { env: { ...process.env, LEAD_WEBHOOK_URL: 'http://localhost:4010/hook', LEAD_WEBHOOK_SECRET: 's3cret' }, stdio: 'ignore' });
for (let i = 0; i < 40; i++) { try { const r = await fetch('http://localhost:3101/'); if (r.ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }

const browser = await chromium.launch();
const REGION_JS = (r) => `try{if(${JSON.stringify(r)})localStorage.setItem('fw-region', JSON.stringify(${JSON.stringify(r)}))}catch(e){}`;
/** New browser context. `region` pre-selects a region so the pop-up does not interrupt; pass null for a first-time visitor. */
const mk = async (opts = {}) => { const { region = 'uk', ...rest } = opts; const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...rest }); if (region) await c.addInitScript(REGION_JS(region)); return c; };
const routes = ['/', '/websites', '/automations', '/ai-workshop', '/about', '/about/why-fieldwork', '/about/how-a-project-works', '/about/what-you-own', '/about/working-across-regions', '/demo', '/contact', '/image-credits', '/privacy', '/terms', '/cookies', '/accessibility'];
const imgSrcs = (p) => p.evaluate(() => [...document.images].map((i) => decodeURIComponent(i.currentSrc || i.src)).filter((s) => /\/images\/(ng|uk|us)-/.test(s)).map((s) => s.match(/\/images\/((?:ng|uk|us)-[a-z0-9-]+)/)[1]));

await check('every route returns 200 with one h1, a title, no console errors, no broken images', async () => {
  const ctx = await mk(); const p = await ctx.newPage(); const errs = [];
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  for (const r of routes) {
    const resp = await p.goto(B + r, { waitUntil: 'networkidle' });
    ok(resp.status() === 200, `${r} status ${resp.status()}`);
    ok((await p.locator('h1').count()) === 1, `${r} h1 count`);
    ok((await p.title()).length > 5, `${r} title`);
    await p.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => i.setAttribute('loading', 'eager')));
    await p.waitForTimeout(150);
    const broken = await p.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
    ok(!broken.length, `${r} broken images ${broken[0]}`);
  }
  ok(!errs.length, 'console errors: ' + errs[0]);
});
await check('unknown route shows the custom 404 with a 404 status', async () => {
  const p = await (await mk()).newPage(); const r = await p.goto(B + '/does-not-exist'); ok(r.status() === 404, 'status ' + r.status()); ok(await p.getByText('We could not find that page').isVisible(), '404 copy');
});
await check('retired pages redirect to the right place', async () => {
  const p = await (await mk()).newPage();
  for (const [from, to] of [['/home', '/'], ['/individuals', '/'], ['/business', '/'], ['/pricing', '/websites'], ['/request-demo', '/contact'], ['/login', '/demo'], ['/learn', '/ai-workshop'], ['/field-notes', '/about']]) { await p.goto(B + from, { waitUntil: 'load' }); ok(new URL(p.url()).pathname === to, `${from} -> ${p.url()}`); }
});
await check('header: a View demo button and a region button; no log-in link; no "Request a demo" anywhere', async () => {
  const p = await (await mk()).newPage();
  for (const r of ['/', '/websites', '/automations', '/ai-workshop', '/about', '/contact']) {
    await p.goto(B + r); ok(/view demo/i.test(await p.locator('.bar__login').innerText()), r + ' demo button'); ok(await p.locator('.region-btn--bar').isVisible(), r + ' region button');
    ok((await p.getByRole('link', { name: /^Log in$/i }).count()) === 0, r + ' no log in'); ok((await p.getByText(/request a demo/i).count()) === 0, r + ' still says Request a demo');
  }
});
await check('logo returns to home from an inner page', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/about'); await p.getByRole('link', { name: 'Fieldwork, home' }).click(); await p.waitForURL(B + '/');
});
await check('desktop navigation reaches every main section', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/');
  for (const [label, url] of [['Websites & Listings', '/websites'], ['Automations', '/automations'], ['AI Workshop', '/ai-workshop'], ['About', '/about']]) { await p.locator('nav[aria-label="Main"]').getByRole('link', { name: label }).click(); await p.waitForURL(B + url); ok((await p.locator('h1').count()) === 1, url + ' h1'); }
  await p.locator('.bar__login').click(); await p.waitForURL(B + '/demo');
});
await check('mobile menu opens, closes with Escape, navigates and closes', async () => {
  const ctx = await mk({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage(); await p.goto(B + '/');
  const btn = p.getByRole('button', { name: /menu/i }); await btn.click(); ok(await p.locator('#mobile-nav').isVisible(), 'menu visible');
  await p.keyboard.press('Escape'); ok(!(await p.locator('#mobile-nav').isVisible()), 'closed by Escape');
  await btn.click(); await p.locator('#mobile-nav').getByRole('link', { name: 'Automations' }).click(); await p.waitForURL(B + '/automations'); ok(!(await p.locator('#mobile-nav').isVisible()), 'closed after navigation');
});
await check('skip link is first tab stop and moves focus to main', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/'); await p.keyboard.press('Tab'); const t = await p.evaluate(() => document.activeElement.textContent); ok(/skip to main/i.test(t), 'first tab: ' + t); await p.keyboard.press('Enter'); ok(await p.evaluate(() => document.activeElement.id === 'main'), 'focus moved to main');
});
await check('keyboard focus is visible on links and buttons', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/'); for (let i = 0; i < 4; i++) await p.keyboard.press('Tab');
  const o = await p.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle + ' ' + s.outlineWidth; }); ok(/solid 3px/.test(o), 'outline ' + o);
});
await check('reduced motion shows content immediately and skips the page transition', async () => {
  const ctx = await mk({ reducedMotion: 'reduce' }); const p = await ctx.newPage(); await p.goto(B + '/');
  const hidden = await p.evaluate(() => [...document.querySelectorAll('.reveal')].filter((e) => getComputedStyle(e).opacity !== '1').length); ok(hidden === 0, hidden + ' hidden reveals');
  await p.locator('nav[aria-label="Main"]').getByRole('link', { name: 'About' }).click(); await p.waitForURL(B + '/about'); ok((await p.locator('.curtain').count()) === 0, 'no curtain');
});

// ---- region ----
await check('first visit: a "Select your region" pop-up appears after about two seconds, with three countries and flags', async () => {
  const ctx = await mk({ region: null }); const p = await ctx.newPage(); await p.goto(B + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1000); ok((await p.locator('[role=dialog]').count()) === 0, 'not shown before 1s');
  await p.locator('[role=dialog]').waitFor({ state: 'visible', timeout: 3500 }); ok(await p.getByRole('heading', { name: 'Select your region' }).isVisible(), 'title');
  ok(await p.getByRole('button', { name: 'Confirm' }).isDisabled(), 'confirm disabled until a country is chosen');
  await p.locator('.region__trigger').click(); const opts = await p.locator('[role=option]').allInnerTexts(); ok(opts.join('|') === 'United Kingdom|Nigeria|United States', 'options: ' + opts.join('|')); ok((await p.locator('[role=option] svg.flag').count()) === 3, 'flags');
});
await check('choosing a region sets the currency everywhere, removes the market toggle, and is remembered', async () => {
  for (const [name, sym, price, tag] of [['United Kingdom', '£', '£1,500', 'uk'], ['Nigeria', '₦', '₦2,500,000', 'ng'], ['United States', '$', '$2,000', 'us']]) {
    const ctx = await mk({ region: null }); const p = await ctx.newPage(); await p.goto(B + '/websites', { waitUntil: 'networkidle' });
    await p.locator('[role=dialog]').waitFor({ state: 'visible', timeout: 4000 }); await p.locator('.region__trigger').click(); await p.getByRole('option', { name }).click(); await p.getByRole('button', { name: 'Confirm' }).click();
    await p.locator('[role=dialog]').waitFor({ state: 'detached', timeout: 2000 });
    ok(new RegExp(price.replace(/[$£₦.]/g, (m) => '\\' + m)).test(await p.locator('[data-product=website]').innerText()), name + ' price ' + price);
    ok((await p.locator('.market-toggle').count()) === 0, 'no market toggle'); ok(!(await p.locator('main').innerText()).match(name === 'Nigeria' ? /£\d/ : /₦\d/), 'only one currency on the page');
    for (const other of ['/automations', '/']) { await p.goto(B + other, { waitUntil: 'networkidle' }); const t = await p.locator('main').innerText(); if (other === '/automations') ok(t.includes(sym), name + ' symbol on automations'); }
    await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(2600); ok((await p.locator('[role=dialog]').count()) === 0, 'remembered: no pop-up on reload'); ok(await p.locator('.region-btn--bar').innerText().then((t) => t.trim().toLowerCase() === tag.replace('uk', 'uk').toUpperCase().toLowerCase()), 'header shows ' + tag);
  }
});
await check('the header region button reopens the selector and changes the region', async () => {
  const p = await (await mk({ region: 'uk' })).newPage(); await p.goto(B + '/automations', { waitUntil: 'networkidle' }); ok(/£400/.test(await p.locator('#price').innerText()), 'UK first');
  await p.locator('.region-btn--bar').click(); await p.locator('[role=dialog]').waitFor(); await p.locator('.region__trigger').click(); await p.getByRole('option', { name: 'Nigeria' }).click(); await p.getByRole('button', { name: 'Confirm' }).click();
  const t = await p.locator('#price').innerText(); ok(/₦799,000/.test(t) && /₦1,200,000/.test(t) && !/£/.test(t), 'NG prices: ' + t.slice(0, 80));
});
await check('region text follows the choice (eyebrow, pricing title), with no "UK and Nigeria" wording on the home page', async () => {
  for (const [r, name] of [['uk', 'the United Kingdom'], ['ng', 'Nigeria'], ['us', 'the United States']]) { const p = await (await mk({ region: r })).newPage(); await p.goto(B + '/', { waitUntil: 'networkidle' }); const t = await p.locator('main').innerText(); ok(new RegExp('Priced for ' + name, 'i').test(t), r + ' pricing title'); ok(!/UK and Nigeria/i.test(t), r + ' mentions UK and Nigeria'); ok(new RegExp('Real estate · ' + name.replace('the ', ''), 'i').test(t), r + ' eyebrow'); }
});
await check('photographs follow the region: UK and US visitors see only their own country; Nigeria sees Nigerian and UK photographs', async () => {
  for (const [r, allowed] of [['uk', ['uk']], ['us', ['us']], ['ng', ['ng', 'uk']]]) {
    const p = await (await mk({ region: r })).newPage();
    for (const route of ['/', '/websites', '/automations', '/about']) { await p.goto(B + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => i.setAttribute('loading', 'eager'))); await p.waitForTimeout(300); const keys = await imgSrcs(p); for (const k of keys) ok(allowed.includes(k.slice(0, 2)), `${r} ${route} shows ${k}`); if (route === '/') ok(keys.length >= 6, `${r} home has ${keys.length} country photographs`); }
    if (r === 'ng') { await p.goto(B + '/', { waitUntil: 'networkidle' }); await p.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => i.setAttribute('loading', 'eager'))); await p.waitForTimeout(300); const keys = await imgSrcs(p); ok(keys.some((k) => k.startsWith('ng-')), 'Nigerian photographs shown to Nigeria'); }
  }
});

// ---- page transition ----
await check('page transition: the curtain covers the page BEFORE the destination loads, then lifts away, without scrolling', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/websites', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
  const t0 = Date.now(); await p.locator('nav[aria-label="Main"]').getByRole('link', { name: 'Automations' }).click();
  await p.locator('.curtain').waitFor({ state: 'visible', timeout: 600 });
  const bg = await p.locator('.curtain').evaluate((e) => getComputedStyle(e).backgroundColor); ok(bg === 'rgb(243, 242, 237)', 'curtain is paper coloured: ' + bg); ok((await p.locator('.curtain__word img').count()) === 1, 'wordmark present');
  await p.waitForTimeout(250); ok(new URL(p.url()).pathname === '/websites', 'still on the old page while the curtain comes down: ' + p.url());
  await p.waitForURL(B + '/automations'); const tNav = Date.now() - t0; ok(tNav >= 450, 'destination only requested after the curtain covered: ' + tNav + 'ms');
  ok((await p.locator('.curtain').count()) === 1, 'curtain still down when the new page arrives');
  await p.locator('.curtain').waitFor({ state: 'detached', timeout: 5000 }); const dt = Date.now() - t0; ok(dt >= 1100, 'curtain lasted ' + dt + 'ms'); ok((await p.evaluate(() => window.scrollY)) === 0, 'new page starts at the top');
});
await check('heroes: cropped wordmark at the bottom edge on Home, Websites and AI Workshop; Automations has a video hero; no auto-scroll', async () => {
  for (const r of ['/', '/websites', '/ai-workshop']) {
    const p = await (await mk()).newPage(); await p.goto(B + r, { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
    ok((await p.evaluate(() => window.scrollY)) === 0, r + ' scrolled on load');
    const m = await p.evaluate(() => { const h = document.querySelector('.hero').getBoundingClientRect(); const w = document.querySelector('.hero__big').getBoundingClientRect(); return { hb: h.bottom, wb: w.bottom, wt: w.top, vh: innerHeight }; });
    ok(m.wb > m.hb + 2, r + ' wordmark is not cropped by the hero edge'); ok(m.wt < m.vh - 40, r + ' wordmark top is on the first screen (' + Math.round(m.wt) + ' of ' + m.vh + ')');
  }
  const p = await (await mk()).newPage(); await p.goto(B + '/automations', { waitUntil: 'networkidle' }); ok((await p.locator('.hero__big').count()) === 0, 'automations has no wordmark hero'); ok(await p.locator('.vhero .video').isVisible(), 'video frame'); ok((await p.locator('.chapters li').count()) === 5, 'five chapters');
  const desc = await p.locator('.vhero__desc').evaluate((e) => Math.round(e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight))); ok(desc <= 4, 'description is ' + desc + ' lines');
});

// ---- pages ----
await check('home: three aligned product cards without index brackets; CRM heading; no "Buy one or all"', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/', { waitUntil: 'networkidle' });
  for (const t of ['Websites & Listings', 'Automations', 'AI Workshop']) ok(await p.locator('#products').getByRole('heading', { name: t }).isVisible(), 'product ' + t);
  ok((await p.getByText(/buy one or all/i).count()) === 0, 'buy one or all gone'); ok((await p.locator('.prod__link .index').count()) === 0, 'no (01) fixed price lines');
  const tops = await p.locator('.prod__link').evaluateAll((els) => els.map((e) => [e.querySelector('h3').getBoundingClientRect().top, e.querySelector('.link-arrow').getBoundingClientRect().top])); ok(Math.max(...tops.map((t) => t[0])) - Math.min(...tops.map((t) => t[0])) < 2, 'headings aligned ' + tops.map((t) => Math.round(t[0])));
  ok(Math.max(...tops.map((t) => t[1])) - Math.min(...tops.map((t) => t[1])) < 2, 'links aligned');
  ok(await p.getByRole('heading', { name: 'Improve one part of the process at a time.' }).isVisible(), 'CRM heading'); ok(await p.getByText(/do not have to replace your CRM/i).isVisible(), 'CRM message');
  ok(await p.locator('.hero__duo img').count() === 2, 'two hero photographs'); ok((await p.locator('main img').count()) >= 12, 'plenty of photographs: ' + (await p.locator('main img').count()));
});
await check('websites: demo preview hero, upmarket title, package section, no handover section, pricing before the add-on', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/websites', { waitUntil: 'networkidle' });
  ok(await p.getByRole('heading', { name: 'Websites and custom listings.' }).isVisible(), 'title'); ok(await p.locator('.hero .demoprev').isVisible(), 'demo preview'); ok((await p.locator('.hero .shot').count()) === 0, 'no photograph in the hero');
  ok(await p.getByRole('link', { name: 'See the package' }).isVisible(), 'see the package'); ok(await p.locator('.hero').getByRole('link', { name: 'View demo', exact: true }).isVisible(), 'view demo');
  ok(await p.getByRole('heading', { name: 'Website package' }).isVisible(), 'package heading'); const h = await p.getByRole('heading', { name: 'Website package' }).evaluate((e) => Math.round(e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight))); ok(h === 1, 'package heading on one line: ' + h);
  const t = await p.locator('main').innerText(); ok(!/not two products|single deliverable/i.test(t), 'no explaining what it is not'); ok(!/Every screen size/i.test(t) && /News and blog page/.test(t), 'news and blog page replaces screen sizes'); ok(!/Handover and limits/i.test(t), 'handover section gone'); ok(!/one price for the build/i.test(t), 'old price title gone'); ok(!/not an ongoing social media service/i.test(t), 'no negative framing');
  const order = await p.evaluate(() => ['price', 'brand-title'].map((id) => document.getElementById(id)?.getBoundingClientRect().top)); ok(order[0] < order[1], 'pricing comes before the add-on'); const who = await p.evaluate(() => document.getElementById('two-title').getBoundingClientRect().top); ok(who < order[0], 'agencies and developers come before pricing');
  const ex = p.getByRole('link', { name: 'View examples' }); ok(await ex.isVisible(), 'view examples button'); ok(await p.getByText(/See the templates, colours and prompts/i).isVisible(), 'nudge text');
  await p.locator('.hero .demoprev').click(); await p.waitForURL(B + '/demo');
});
await check('automations: no "three ways in", pricing before installation, installation covers CRM or Google Sheets, channels have no "Planned"', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/automations', { waitUntil: 'networkidle' }); const t = await p.locator('main').innerText();
  ok(!/three ways in/i.test(t), 'three ways in removed'); ok(await p.getByRole('heading', { name: 'Lead capture and follow-up' }).isVisible(), 'lead'); ok(await p.getByRole('heading', { name: 'Viewing and feedback' }).first().isVisible(), 'viewing');
  const o = await p.evaluate(() => ['price-title', 'install-title'].map((id) => document.getElementById(id)?.getBoundingClientRect().top)); ok(o[0] < o[1], 'pricing before installation'); ok(/Google Sheet/.test(t) && /CRM/.test(t), 'install mentions CRM and Google Sheets'); ok(!/What one installation includes/i.test(t), 'old scope section gone');
  ok(!/\bPlanned\b/.test(t), 'no Planned wording'); ok(/£400/.test(t) && /£699/.test(t), 'UK prices');
});
await check('AI Workshop: new title, "16 modules.", no "planned / not yet available" anywhere on the site, no price shown', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/ai-workshop'); ok(await p.getByRole('heading', { name: 'AI training for real estate teams.' }).isVisible(), 'title'); ok((await p.locator('#curriculum li').count()) === 16, 'sixteen modules'); ok(await p.getByRole('heading', { name: '16 modules.' }).isVisible(), '16 modules title');
  ok(await p.getByText(/not covered/i).first().isVisible(), 'not covered kept'); ok(await p.getByText(/to be announced/i).first().isVisible(), 'price tba'); ok((await p.getByText(/£\d/).count()) === 0, 'no invented price');
  for (const r of routes) { await p.goto(B + r); const t = await p.locator('body').innerText(); ok(!/not yet available|planned, not/i.test(t), r + ' says planned / not yet available'); }
});
await check('about: Field Notes style index of notes, each note opens, and the page keeps the honest status', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/about'); ok((await p.locator('.lookback a').count()) === 4, 'four notes'); ok(await p.getByText(/no client list/i).first().isVisible(), 'honest status');
  await p.locator('.lookback a').first().click(); await p.waitForURL(/\/about\/.+/); ok((await p.locator('h1').count()) === 1, 'note h1'); ok(await p.locator('.prose').isVisible(), 'note body'); ok(await p.getByText(/About this note/i).isVisible(), 'basis statement');
});
await check('demo page opens from View demo, and the brand examples anchor exists', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/demo'); ok(await p.getByRole('heading', { name: 'The demo.' }).isVisible(), 'demo heading'); ok(await p.locator('#brand').count() === 1, 'brand anchor');
});
await check('photographs are credited, with a credits page', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/image-credits'); ok((await p.locator('.credits tbody tr').count()) >= 10, 'credit rows'); ok(/CC BY/.test(await p.locator('.credits').innerText()), 'licences listed');
  await p.goto(B + '/'); ok(await p.locator('.shot__cap').filter({ hasText: /Photo:/ }).count() >= 2, 'captions credit authors');
});
await check('contact form validates, then reports honest not-configured when no adapter is set', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/contact'); const form = p.locator('#demo form');
  await form.getByRole('button', { name: 'Send message' }).click(); ok(await form.locator('.field__error').count() > 0, 'validation errors');
  await form.locator('input[name=name]').fill('Test Person'); await form.locator('input[name=company]').fill('Test Homes'); await form.locator('input[name=email]').fill('test@example.com'); ok((await form.locator('select[name=market]').inputValue()) === 'uk', 'market preselected from region'); await form.locator('textarea[name=message]').fill('We would like a project website.'); await form.locator('input[name=privacy]').check(); await p.waitForTimeout(1500);
  await form.getByRole('button', { name: 'Send message' }).click(); await p.getByText('Not connected yet').first().waitFor({ timeout: 8000 }); ok(!(await p.getByText('Thank you, we have your request').isVisible().catch(() => false)), 'must not claim success');
});
await check('contact message is delivered to the mock webhook with business type, interest, attribution and secret', async () => {
  const p = await (await mk()).newPage(); await p.goto('http://localhost:3101/?utm_source=test&utm_campaign=qa'); await p.goto('http://localhost:3101/contact'); const form = p.locator('#demo form');
  await form.locator('input[name=name]').fill('Ada Okafor'); await form.locator('input[name=company]').fill('Test Estates'); await form.locator('input[name=email]').fill('ada@example.com'); await form.locator('select[name=market]').selectOption('us');
  await form.locator('select[name=businessType]').selectOption('Property developer'); await form.locator('select[name=interest]').selectOption('Website and listings');
  await form.locator('textarea[name=message]').fill('We want a project website with listings.'); await form.locator('input[name=privacy]').check(); await p.waitForTimeout(1500);
  await form.getByRole('button', { name: 'Send message' }).click(); await p.getByText('Thank you, we have your request').waitFor({ timeout: 8000 });
  const last = received[received.length - 1]; ok(last.headers['x-fieldwork-secret'] === 's3cret', 'secret header'); ok(/Test Estates/.test(last.body) && /Property developer/.test(last.body) && /Website and listings/.test(last.body) && /"market":"us"/.test(last.body), 'payload: ' + last.body.slice(0, 220));
});
await check('workshop interest is delivered as its own lead type', async () => {
  const p = await (await mk()).newPage(); await p.goto('http://localhost:3101/ai-workshop'); const form = p.locator('#interest form');
  await form.locator('input[name=name]').fill('Bola Ade'); await form.locator('input[name=company]').fill('Ade Properties'); await form.locator('input[name=email]').fill('bola@example.com'); await form.locator('select[name=market]').selectOption('nigeria'); await form.locator('input[name=privacy]').check(); await p.waitForTimeout(1500);
  await form.getByRole('button', { name: 'Register interest' }).click(); await p.getByText('Thank you, you are on the list').waitFor({ timeout: 8000 });
  const last = received[received.length - 1]; ok(/workshop_interest/.test(last.body) && /Ade Properties/.test(last.body), 'payload');
});
await check('honeypot submissions are silently dropped, not delivered', async () => {
  const before = received.length; const r = await fetch('http://localhost:3101/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'contact', name: 'Bot', email: 'bot@example.com', message: 'spam spam spam spam', privacyAcknowledged: true, website: 'http://spam', startedAt: Date.now() - 20000 }) });
  ok(r.status < 500, 'status ' + r.status); await new Promise((x) => setTimeout(x, 400)); ok(received.length === before, 'not delivered');
});
await check('site is noindex and robots disallows by default', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/'); ok(/noindex/.test(await p.locator('meta[name=robots]').getAttribute('content')), 'meta noindex'); const robots = await (await fetch(B + '/robots.txt')).text(); ok(/Disallow: \//.test(robots), 'robots');
});
await check('no analytics script loads without configuration or consent', async () => {
  const ctx = await mk(); const p = await ctx.newPage(); const reqs = []; p.on('request', (r) => reqs.push(r.url())); await p.goto(B + '/', { waitUntil: 'networkidle' }); ok(!reqs.some((u) => /plausible|google-analytics|googletagmanager|facebook/.test(u)), 'tracker request found');
});
await check('no horizontal overflow at 390, 768 and 1440 on every page', async () => {
  for (const w of [390, 768, 1440]) { const p = await (await mk({ viewport: { width: w, height: 800 } })).newPage(); for (const r of routes) { await p.goto(B + r); const sw = await p.evaluate(() => document.documentElement.scrollWidth); ok(sw <= w, `${r} @${w} scrollWidth ${sw}`); } }
});

await browser.close(); srv.kill(); mock.close();
fs.mkdirSync('qa', { recursive: true });
fs.writeFileSync('qa/browser-results.json', JSON.stringify({ ranAt: new Date().toISOString(), results }, null, 2));
const failed = results.filter((r) => !r.pass); console.log(`\n${results.length - failed.length}/${results.length} passed`); process.exit(failed.length ? 1 : 0);
