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
const routes = ['/', '/home', '/individuals', '/build', '/login', '/business/dashboard', '/individuals/dashboard', '/learn', '/learn/first-workflow', '/business', '/business/course', '/business/assessment', '/pricing', '/field-notes', '/field-notes/five-part-brief', '/field-notes/check-ai-answers', '/field-notes/property-ai-tasks', '/field-notes/what-not-to-paste', '/about', '/contact', '/privacy', '/terms', '/cookies', '/accessibility'];

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
  const p = await (await mk()).newPage(); await p.goto(B + '/pricing'); await p.getByRole('link', { name: 'Fieldwork, home' }).click(); await p.waitForURL(B + '/home'); 
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
await check('entry page offers individual or business and routes to each page', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/');
  ok(await p.getByRole('link', { name: /I am an individual/ }).isVisible(), 'individual choice'); ok(await p.getByRole('link', { name: /I am a business/ }).isVisible(), 'business choice');
  await p.getByRole('link', { name: /I am a business/ }).click(); await p.waitForURL(B + '/business');
  await p.goto(B + '/'); await p.getByRole('link', { name: /I am an individual/ }).click(); await p.waitForURL(B + '/individuals');
});
await check('a loading animation runs for about a second between pages', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/home', { waitUntil: 'networkidle' }); const t0 = Date.now();
  await p.locator('.bar .nav').getByRole('link', { name: 'Pricing' }).click();
  await p.locator('.transition').waitFor({ state: 'visible', timeout: 500 });
  ok((await p.locator('.transition__mark .t-ring').count()) === 1, 'animated mark present'); const anim = await p.locator('.t-ring').evaluate((e) => getComputedStyle(e).animationName); ok(anim !== 'none', 'ring is animated: ' + anim);
  await p.waitForURL(B + '/pricing');
  await p.locator('.transition').waitFor({ state: 'detached', timeout: 4000 }); const dt = Date.now() - t0; ok(dt >= 950, 'overlay lasted ' + dt + 'ms');
});
await check('reduced motion skips the loading animation', async () => {
  const p = await (await mk({ reducedMotion: 'reduce' })).newPage(); await p.goto(B + '/home'); await p.locator('.bar .nav').getByRole('link', { name: 'Pricing' }).click(); await p.waitForURL(B + '/pricing'); ok((await p.locator('.transition').count()) === 0, 'no overlay');
});
await check('/business/real-estate redirects to /business, which is the real estate page', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/business/real-estate'); ok(p.url() === B + '/business', 'url ' + p.url()); ok(await p.getByText('Better listings').first().isVisible(), 'real estate hero');
  ok(!(await p.getByText('Staff use AI, with no shared rules').count()), 'old business page content gone');
});
await check('business page sections are in the requested order and include the USA', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/business');
  const heads = await p.locator('main h2').allInnerTexts(); const idx = (re) => heads.findIndex((h) => re.test(h));
  const a = idx(/listing from verified facts/i), b = idx(/Small, measured/i), c = idx(/People decide/i);
  ok(a >= 0 && b > a && c > b, 'order ' + [a, b, c]); 
  const bandPos = await p.evaluate(() => { const n = document.querySelector('section[aria-label="Property types"]'); const s = document.querySelector('#people-title'); return n && s ? (s.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0 : false; }); ok(bandPos, 'photo band after "what stays with people"');
  ok(await p.getByText('US agencies').isVisible(), 'USA card');
});
await check('business pop-up appears after 10 seconds and leads to the course page', async () => {
  const p = await (await mk()).newPage(); await p.clock.install(); await p.goto(B + '/business'); ok((await p.locator('.popup').count()) === 0, 'not at once');
  await p.clock.runFor(10500); await p.locator('.popup').waitFor(); ok(await p.getByRole('dialog').getByText('See what the course looks like').isVisible(), 'copy');
  await p.keyboard.press('Escape'); ok((await p.locator('.popup').count()) === 0, 'Escape closes');
  const q = await (await mk()).newPage(); await q.clock.install(); await q.goto(B + '/business'); await q.clock.runFor(10500); await q.getByRole('link', { name: 'See the course' }).click(); await q.waitForURL(B + '/business/course');
});
await check('individuals pop-up appears after 15 seconds and leads to the exercise', async () => {
  const p = await (await mk()).newPage(); await p.clock.install(); await p.goto(B + '/individuals'); await p.clock.runFor(14000); ok((await p.locator('.popup').count()) === 0, 'not before 15s');
  await p.clock.runFor(1500); await p.locator('.popup').waitFor(); await p.getByRole('link', { name: 'Try the exercise' }).click(); await p.waitForURL(B + '/learn/first-workflow');
});
await check('course page shows the pricing tiers, with a USA view', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/business/course'); const plans = p.locator('.plans');
  ok(await plans.getByText('£25').isVisible(), 'starter £25'); ok(await plans.getByText('£18').isVisible(), 'team £18'); ok(await plans.getByText('£12').isVisible(), 'bundle £12'); ok(await plans.getByText('Quoted').first().isVisible(), 'enterprise quoted');
  ok(await p.getByText('£250 to £500').isVisible(), 'pilot'); ok(await p.getByText('£150').first().isVisible(), 'add-on');
  await p.locator('#business-pricing .market-toggle').getByRole('button', { name: 'Nigeria' }).click(); ok(await plans.getByText('₦30,000').isVisible(), 'NGN starter');
  await p.locator('#business-pricing .market-toggle').getByRole('button', { name: 'USA' }).click(); ok(await plans.getByText('$30').isVisible(), 'USD starter');
});
await check('pricing page shows individuals first (free) then business plans', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/pricing'); const heads = await p.locator('main h2').allInnerTexts(); ok(heads[0].includes('Free first') && /Plans for teams/.test(heads[1]), 'order ' + heads.slice(0, 3));
});
await check('individuals page has the new hero, build CTA, what we do, everyday uses and pricing', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/individuals');
  ok(await p.getByRole('link', { name: 'Build a business' }).first().isVisible(), 'build CTA'); ok(!(await p.getByText('See what is planned').count()), 'old CTA gone');
  ok(await p.getByText('What we do').first().isVisible(), 'what we do'); ok(!(await p.getByText('Real jobs, honestly labelled').count()), 'old heading gone');
  ok((await p.locator('.uses__list li').count()) >= 12, 'more uses'); ok(await p.locator('#pricing .pricing-grid').isVisible(), 'pricing on page'); ok(!(await p.getByText('How an exercise works').count()), 'how it works removed');
  const [a, c] = await Promise.all([p.locator('.uses .shot').boundingBox(), p.locator('.uses__list').boundingBox()]); ok(Math.abs((a.y + a.height / 2) - (c.y + c.height / 2)) < 40, 'photo and list centred together');
});
await check('login: pick business, demo sign-in, business dashboard shows a welcome and the four areas', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/login'); await p.getByRole('button', { name: /Business/ }).click();
  for (const n of ['Google', 'LinkedIn', 'Apple']) ok(await p.getByRole('button', { name: new RegExp('Continue with ' + n) }).isVisible(), n);
  await p.getByRole('button', { name: /Continue with Google/ }).click(); ok(await p.getByText('not connected yet').first().isVisible(), 'honest notice');
  await p.getByLabel(/Your name/).fill('Bob Smith'); await p.getByRole('button', { name: 'Continue in demo mode' }).click(); await p.waitForURL(B + '/business/dashboard');
  ok(await p.getByText('Welcome back, Bob Smith.').isVisible(), 'welcome');
  for (const t of ['Learning library', 'Interactive exercise studio', 'AI learning assistant', 'Workflow library']) ok(await p.getByRole('heading', { name: t }).isVisible(), t);
});
await check('dashboards ask you to log in first', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/business/dashboard'); ok(await p.getByRole('link', { name: 'Log in' }).last().isVisible(), 'gate');
});
await check('build a business: free flow, then login, then workspace with paid areas locked', async () => {
  const p = await (await mk()).newPage(); await p.goto(B + '/build');
  await p.getByRole('button', { name: /Help me find an idea/ }).click(); await p.getByRole('button', { name: 'Choose a type to continue' }).waitFor({ state: 'detached' }).catch(() => {}); await p.getByRole('button', { name: 'Next' }).click();
  await p.getByRole('button', { name: 'Suggest an idea' }).click(); ok((await p.getByLabel('What will you sell?').inputValue()).length > 5, 'idea suggested');
  await p.getByRole('button', { name: 'Refine my idea' }).click(); ok(await p.getByText('Your idea').isVisible(), 'refined');
  for (let i = 0; i < 6; i++) await p.locator('fieldset.assess-q').nth(i).locator('input').nth(2).check();
  await p.getByRole('button', { name: 'Assess my idea' }).click(); ok(await p.getByText('Strong start').isVisible(), 'assessment'); await p.getByRole('button', { name: 'Next' }).click();
  await p.getByLabel('Business name').fill('Test Co'); await p.getByRole('button', { name: 'Logo option monogram-circle' }).click(); await p.getByRole('button', { name: 'Next' }).click();
  await p.getByLabel(/Three benefits/).fill('Fast. Cheap. Clear.'); await p.getByRole('button', { name: 'Next' }).click();
  await p.getByLabel('Headline and one-line promise').check(); await p.getByRole('button', { name: 'Next' }).click();
  await p.getByLabel('Social media').check(); await p.getByRole('button', { name: 'Next' }).click();
  await p.locator('.learn-step').getByRole('button', { name: 'Launch and improve' }).click(); await p.waitForURL(/\/login/); ok(p.url().includes('role=individual'), 'login with role');
  await p.getByLabel(/Your name/).fill('Ada Test'); await p.getByRole('button', { name: 'Continue in demo mode' }).click(); await p.waitForURL(B + '/individuals/dashboard');
  ok(await p.getByText('Welcome back, Ada Test.').isVisible(), 'welcome'); ok(await p.getByRole('heading', { name: 'Test Co' }).isVisible(), 'project name');
  const items = await p.locator('[aria-label="Project checklist"] li').allInnerTexts(); ok(/Business idea[\s\S]*Complete/i.test(items[0]) && /Business model[\s\S]*In progress/i.test(items[1]) && /Launch[\s\S]*In progress/i.test(items[3]), 'checklist ' + items.join('|'));
  ok(await p.getByText('part of the paid builder').count() >= 2, 'documents and ask AI locked');
  await p.getByRole('button', { name: /Preview the paid view/ }).click(); ok(await p.getByRole('button', { name: 'Download' }).first().isVisible(), 'documents unlocked in the paid preview');
  await p.getByRole('link', { name: 'Unlock' }).count();
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
  const p = await (await mk()).newPage(); await p.goto(B + '/pricing'); const t = p.locator('.market-toggle').first().locator('button'); ok((await t.count()) === 2, 'two markets');
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
