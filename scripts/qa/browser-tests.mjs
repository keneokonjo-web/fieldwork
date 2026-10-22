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
const mk = async (opts = {}) => { const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts }); return c; };
const routes = ['/', '/websites', '/automations', '/ai-workshop', '/about', '/request-demo', '/image-credits', '/privacy', '/terms', '/cookies', '/accessibility'];

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
  for (const [from, to] of [['/home', '/'], ['/individuals', '/'], ['/business', '/'], ['/pricing', '/websites'], ['/contact', '/request-demo'], ['/login', '/request-demo'], ['/learn', '/ai-workshop']]) { await p.goto(B + from, { waitUntil: 'load' }); ok(new URL(p.url()).pathname === to, `${from} -> ${p.url()}`); }
});
await check('there is no individual/business chooser and no log-in link', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/');
  ok((await p.getByText(/I am an individual|Who is it for/).count()) === 0, 'chooser gone'); ok((await p.getByRole('link', { name: /^Log in$/i }).count()) === 0, 'no log in link');
  ok(await p.locator('.bar__login').isVisible(), 'demo button in bar'); ok(/Request a demo/.test(await p.locator('.bar__login').innerText()), 'demo label');
});
await check('logo returns to home from an inner page', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/about'); await p.getByRole('link', { name: 'Fieldwork, home' }).click(); await p.waitForURL(B + '/');
});
await check('desktop navigation reaches every main section', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/');
  for (const [label, url] of [['Websites & Listings', '/websites'], ['Automations', '/automations'], ['AI Workshop', '/ai-workshop'], ['About', '/about']]) { await p.locator('nav[aria-label="Main"]').getByRole('link', { name: label }).click(); await p.waitForURL(B + url); ok((await p.locator('h1').count()) === 1, url + ' h1'); }
  await p.locator('.bar__login').click(); await p.waitForURL(B + '/request-demo');
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
await check('page transition: a paper curtain with the wordmark covers, then lifts away, without scrolling', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
  const t0 = Date.now(); await p.locator('nav[aria-label="Main"]').getByRole('link', { name: 'Automations' }).click();
  await p.locator('.curtain').waitFor({ state: 'visible', timeout: 600 });
  const bg = await p.locator('.curtain').evaluate((e) => getComputedStyle(e).backgroundColor); ok(bg === 'rgb(243, 242, 237)', 'curtain is paper coloured: ' + bg);
  ok((await p.locator('.curtain__word img').count()) === 1, 'wordmark present');
  await p.locator('.curtain').waitFor({ state: 'detached', timeout: 5000 }); const dt = Date.now() - t0; ok(dt >= 950, 'curtain lasted ' + dt + 'ms');
  await p.waitForURL(B + '/automations'); ok((await p.evaluate(() => window.scrollY)) === 0, 'new page starts at the top');
});
await check('home hero has the cropped wordmark at its bottom edge, and the page does not auto-scroll', async () => {
  for (const r of ['/', '/websites', '/automations', '/ai-workshop']) {
    const p = await (await mk()).newPage(); await p.goto(B + r, { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
    ok((await p.evaluate(() => window.scrollY)) === 0, r + ' scrolled on load');
    const m = await p.evaluate(() => { const h = document.querySelector('.hero').getBoundingClientRect(); const w = document.querySelector('.hero__big').getBoundingClientRect(); return { hb: h.bottom, wb: w.bottom, wt: w.top, vh: innerHeight }; });
    ok(m.wb > m.hb + 2, r + ' wordmark is not cropped by the hero edge'); ok(m.wt < m.vh - 40, r + ' wordmark top is on the first screen (' + Math.round(m.wt) + ' of ' + m.vh + ')');
  }
});
await check('home page shows the three products, the CRM message and a demo call to action', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/');
  for (const t of ['Websites & Listings', 'Automations', 'AI Workshop']) ok(await p.locator('#products').getByRole('heading', { name: t }).isVisible(), 'product ' + t);
  ok(await p.getByText(/do not have to replace your CRM/i).isVisible(), 'CRM message'); ok(await p.getByRole('link', { name: 'Request a demo' }).first().isVisible(), 'demo cta');
  ok(await p.locator('.hero__duo img').count() === 2, 'two hero photographs');
  ok((await p.locator('main img').count()) >= 8, 'plenty of photographs: ' + (await p.locator('main img').count()));
});
await check('websites page: prices follow the market toggle and Nigeria shows the new price', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/websites', { waitUntil: 'networkidle' });
  ok(/£1,500/.test(await p.locator('[data-product=website]').innerText()), 'UK price');
  await p.locator('.market-toggle').getByRole('button', { name: 'Nigeria' }).click(); ok(/₦2,500,000/.test(await p.locator('[data-product=website]').innerText()), 'NG price'); ok(/₦600,000/.test(await p.locator('[data-product=brand]').innerText()), 'NG brand price');
  ok((await p.getByText('$').count()) === 0 || !/\$2,000/.test(await p.locator('main').innerText()), 'US price not shown');
  ok(await p.getByText(/not an ongoing social media service/i).isVisible(), 'add-on limit stated');
});
await check('automations page: three ways in, both workflows, channels and the three prices', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/automations', { waitUntil: 'networkidle' });
  ok(await p.getByRole('heading', { name: 'Lead capture and follow-up' }).isVisible(), 'lead'); ok(await p.getByRole('heading', { name: 'Viewing and feedback' }).first().isVisible(), 'viewing');
  ok(await p.getByText('Planned').first().isVisible(), 'WhatsApp planned'); const t = await p.locator('#price').innerText(); ok(/£400/.test(t) && /£699/.test(t), 'UK prices');
  await p.locator('.market-toggle').getByRole('button', { name: 'Nigeria' }).click(); const n = await p.locator('#price').innerText(); ok(/₦799,000/.test(n) && /₦1,200,000/.test(n), 'NG prices');
});
await check('AI Workshop page is clearly planned, lists sixteen modules and states no price', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/ai-workshop'); ok(await p.getByText('Planned, not yet available').first().isVisible(), 'planned chip');
  ok((await p.locator('#curriculum li').count()) === 16, 'sixteen modules'); ok(await p.getByText(/to be announced/i).first().isVisible(), 'price tba');
  ok((await p.getByText(/£\d/).count()) === 0, 'no invented price on the workshop page');
});
await check('about page states the honest position; there is no pricing page', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/about'); ok(await p.getByText(/no client list/i).isVisible(), 'honest status');
  const r = await p.goto(B + '/pricing', { waitUntil: 'load' }); ok(new URL(p.url()).pathname === '/websites', 'pricing redirects: ' + p.url());
});
await check('photographs of Nigeria and the UK are credited, with a credits page', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/image-credits'); ok((await p.locator('.credits tbody tr').count()) >= 10, 'credit rows');
  ok(/CC BY/.test(await p.locator('.credits').innerText()), 'licences listed');
  await p.goto(B + '/'); ok(await p.locator('.shot__cap').filter({ hasText: /Photo:/ }).count() >= 2, 'captions credit authors');
});
await check('demo request form validates, then reports honest not-configured when no adapter is set', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/request-demo'); const form = p.locator('#demo form');
  await form.getByRole('button', { name: 'Request a demo' }).click(); ok(await form.locator('.field__error').count() > 0, 'validation errors');
  await form.locator('input[name=name]').fill('Test Person'); await form.locator('input[name=company]').fill('Test Homes'); await form.locator('input[name=email]').fill('test@example.com'); await form.locator('select[name=market]').selectOption('nigeria'); await form.locator('textarea[name=message]').fill('We would like to see the website demo.'); await form.locator('input[name=privacy]').check(); await p.waitForTimeout(1500);
  await form.getByRole('button', { name: 'Request a demo' }).click(); await p.getByText('Not connected yet').first().waitFor({ timeout: 8000 }); ok(!(await p.getByText('Thank you, we have your request').isVisible().catch(() => false)), 'must not claim success');
});
await check('demo request is delivered to the mock webhook with business type, interest, attribution and secret', async () => {
  const p = await (await mk()).newPage(); await p.goto('http://localhost:3101/?utm_source=test&utm_campaign=qa'); await p.goto('http://localhost:3101/request-demo'); const form = p.locator('#demo form');
  await form.locator('input[name=name]').fill('Ada Okafor'); await form.locator('input[name=company]').fill('Test Estates'); await form.locator('input[name=email]').fill('ada@example.com'); await form.locator('select[name=market]').selectOption('uk');
  await form.locator('select[name=businessType]').selectOption('Property developer'); await form.locator('select[name=interest]').selectOption('Website and listings');
  await form.locator('textarea[name=message]').fill('We want a project website with listings.'); await form.locator('input[name=privacy]').check(); await p.waitForTimeout(1500);
  await form.getByRole('button', { name: 'Request a demo' }).click(); await p.getByText('Thank you, we have your request').waitFor({ timeout: 8000 });
  const last = received[received.length - 1]; ok(last.headers['x-fieldwork-secret'] === 's3cret', 'secret header'); ok(/Test Estates/.test(last.body) && /Property developer/.test(last.body) && /Website and listings/.test(last.body) && /test/.test(last.body), 'payload: ' + last.body.slice(0, 200));
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
