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
const routes = ['/', '/individuals', '/learn', '/learn/first-workflow', '/business', '/business/real-estate', '/business/assessment', '/pricing', '/field-notes', '/field-notes/five-part-brief', '/field-notes/check-ai-answers', '/field-notes/property-ai-tasks', '/field-notes/what-not-to-paste', '/about', '/contact', '/privacy', '/terms', '/cookies', '/accessibility'];

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
  const ctx = await mk(); const p = await ctx.newPage(); const r = await p.goto(B + '/does-not-exist'); ok(r.status() === 404, 'status ' + r.status()); ok(await p.getByText('We could not find that page').isVisible(), '404 copy');
});
await check('logo returns to home from an inner page', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/pricing'); await p.getByRole('link', { name: 'Fieldwork, home' }).click(); await p.waitForURL(B + '/'); 
});
await check('desktop navigation reaches every main section', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/');
  for (const [label, url] of [['Individuals', '/individuals'], ['For Business', '/business'], ['Field Notes', '/field-notes'], ['Pricing', '/pricing'], ['About', '/about']]) { await p.locator('nav[aria-label="Main"]').getByRole('link', { name: label }).click(); await p.waitForURL(B + url); }
});
await check('mobile menu opens, traps Escape, navigates and closes', async () => {
  const ctx = await mk({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage(); await p.goto(B + '/');
  const btn = p.getByRole('button', { name: /menu/i }); await btn.click(); ok(await p.locator('#mobile-nav').isVisible(), 'menu visible');
  await p.keyboard.press('Escape'); ok(!(await p.locator('#mobile-nav').isVisible()), 'closed by Escape');
  await btn.click(); await p.locator('#mobile-nav').getByRole('link', { name: 'Pricing' }).click(); await p.waitForURL(B + '/pricing'); ok(!(await p.locator('#mobile-nav').isVisible()), 'closed after navigation');
});
await check('skip link is first tab stop and moves focus to main', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/'); await p.keyboard.press('Tab'); const t = await p.evaluate(() => document.activeElement.textContent); ok(/skip to main/i.test(t), 'first tab: ' + t); await p.keyboard.press('Enter'); ok(await p.evaluate(() => document.activeElement.id === 'main'), 'focus on main');
});
await check('keyboard focus is visible on links and buttons', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/'); for (let i = 0; i < 4; i++) await p.keyboard.press('Tab');
  const o = await p.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle + ' ' + s.outlineWidth; }); ok(/solid 3px/.test(o), 'outline ' + o);
});
await check('reduced motion shows content immediately and disables reveal transforms', async () => {
  const ctx = await mk({ reducedMotion: 'reduce' }); const p = await ctx.newPage(); await p.goto(B + '/'); const hidden = await p.evaluate(() => [...document.querySelectorAll('.reveal')].filter((e) => getComputedStyle(e).opacity !== '1').length); ok(hidden === 0, hidden + ' hidden reveals');
});
await check('free exercise runs start to finish, copies prompt, downloads card, stores locally', async () => {
  const ctx = await mk({ permissions: ['clipboard-read', 'clipboard-write'] }); const p = await ctx.newPage(); await p.goto(B + '/learn/first-workflow');
  await p.getByRole('button', { name: 'Start the exercise' }).click();
  await p.locator('.choice').first().click(); await p.locator('.learn-step').getByRole('button', { name: 'Write the brief' }).click();
  const fields = p.locator('.learn-step input.input, .learn-step textarea.textarea');
  const n = await fields.count(); for (let i = 0; i < n; i++) { const f = fields.nth(i); if (!(await f.inputValue())) await f.fill('Example text for the exercise.'); }
  await p.getByRole('button', { name: 'Run it in your AI tool' }).click();
  await p.getByRole('button', { name: /^Copy/ }).first().click(); const clip = await p.evaluate(() => navigator.clipboard.readText()); ok(clip.length > 40, 'clipboard has prompt');
  await p.getByRole('button', { name: 'Check the result' }).click();
  for (const c of await p.locator('.learn-step input[type=checkbox]').all()) await c.check();
  await p.getByRole('button', { name: 'Save as a workflow' }).click();
  const [dl] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: 'Download as a file' }).click()]); ok((await dl.suggestedFilename()).length > 3, 'download name');
  await p.getByRole('button', { name: 'I have finished the exercise' }).click(); ok(await p.locator('#done-heading').isVisible(), 'done heading');
  await p.reload(); const stored = await p.evaluate(() => Object.keys(localStorage).concat(Object.keys(sessionStorage)).join(',')); ok(/fieldwork|fw/i.test(stored) || stored.length > 0, 'local storage used');
});
await check('exercise state survives reload (stored on the device only)', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/learn/first-workflow'); await p.getByRole('button', { name: 'Start the exercise' }).click(); await p.locator('.choice').first().click(); await p.reload(); await p.waitForTimeout(300);
  ok(await p.locator('.choice[aria-pressed=true]').count() === 1, 'choice restored');
});
await check('business assessment produces a report', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/business/assessment');
  const groups = await p.locator('fieldset.assess-q').count(); ok(groups > 3, 'questions ' + groups);
  for (let i = 0; i < groups; i++) await p.locator('fieldset.assess-q').nth(i).locator('input').first().check();
  await p.getByRole('button', { name: /see my|get my|report|result/i }).first().click(); await p.waitForSelector('.report'); 
});
await check('pricing market toggle switches between GBP and NGN', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/pricing'); const t = p.locator('.market-toggle button'); ok((await t.count()) === 2, 'two markets');
  const before = await p.locator('main').innerText(); await t.nth(1).click(); const after = await p.locator('main').innerText(); ok(before !== after, 'content changed'); ok(/₦|NGN/.test(after) || /₦|NGN/.test(before), 'NGN present');
});
await check('contact form validates, then reports honest not-configured when no adapter is set', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/contact#learning'); const form = p.locator('#learning form');
  await form.getByRole('button', { name: 'Send message' }).click(); ok(await form.locator('.field__error').count() > 0, 'validation errors');
  await form.locator('input[name=name]').fill('Test Person'); await form.locator('input[name=email]').fill('test@example.com'); await form.locator('textarea[name=message]').fill('A test question about the exercise.'); await form.locator('input[name=privacy]').check(); await p.waitForTimeout(1500); // the API treats sub-1.2s submissions as bots
  await form.getByRole('button', { name: 'Send message' }).click(); await p.getByText('Not connected yet').first().waitFor({ timeout: 8000 }); ok(!(await p.getByText('Thank you, message received').isVisible().catch(() => false)), 'must not claim success');
});
await check('business demo request is delivered to the mock webhook with attribution and secret', async () => {
  const p = await (await mk()).newPage(); await p.goto('http://localhost:3101/?utm_source=test&utm_campaign=qa'); await p.goto('http://localhost:3101/contact#business'); const form = p.locator('#business form');
  await form.locator('input[name=name]').fill('Ada Okafor'); await form.locator('input[name=company]').fill('Test Estates'); await form.locator('input[name=email]').fill('ada@example.com'); await form.locator('select[name=market]').selectOption({ index: 1 }); await form.locator('textarea[name=message]').fill('We want our team to write better listings.'); await form.locator('input[name=privacy]').check(); await p.waitForTimeout(1500); // sub-1.2s submissions are treated as bots
  await form.getByRole('button', { name: 'Request a demonstration' }).click(); await p.getByText('Thank you, we have your request').waitFor({ timeout: 8000 });
  ok(received.length >= 1, 'webhook hit'); const last = received[received.length - 1]; ok(last.headers['x-fieldwork-secret'] === 's3cret', 'secret header'); ok(/Test Estates/.test(last.body) && /demo/.test(last.body), 'payload');
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
await check('no horizontal overflow at 390, 768 and 1440 on key pages', async () => {
  for (const w of [390, 768, 1440]) { const p = await (await mk({ viewport: { width: w, height: 800 } })).newPage(); for (const r of routes) { await p.goto(B + r); const sw = await p.evaluate(() => document.documentElement.scrollWidth); ok(sw <= w, `${r} @${w} scrollWidth ${sw}`); } }
});

await browser.close(); srv.kill(); mock.close();
fs.mkdirSync('qa', { recursive: true });
fs.writeFileSync('qa/browser-results.json', JSON.stringify({ ranAt: new Date().toISOString(), results }, null, 2));
const failed = results.filter((r) => !r.pass); console.log(`\n${results.length - failed.length}/${results.length} passed`); process.exit(failed.length ? 1 : 0);
