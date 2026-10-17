// Assembles deliverables/fieldwork-launch-kit/ from the repository and zips it.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const kit = 'deliverables/fieldwork-launch-kit';
const cp = (src, dest) => { if (!fs.existsSync(src)) return console.warn('missing', src); fs.mkdirSync(path.dirname(path.join(kit, dest)), { recursive: true }); fs.cpSync(src, path.join(kit, dest), { recursive: true }); };

// 01 brand
cp('public/brand/logo', '01-brand/logos'); cp('public/brand/favicon', '01-brand/favicons'); cp('public/brand/social', '01-brand/social');
cp('brand/guidelines', '01-brand/guidelines'); cp('brand/templates', '01-brand/templates'); cp('brand/graphics', '01-brand/graphics');
cp('public/art', '01-brand/dot-terrain'); cp('docs/brand/DESIGN-TOKENS.md', '01-brand/DESIGN-TOKENS.md'); cp('docs/brand/BRAND-STRATEGY.md', '01-brand/BRAND-STRATEGY.md');
cp('docs/website/IMAGE-CREDITS.md', '01-brand/IMAGE-CREDITS.md'); cp('public/images', '01-brand/photography'); cp('src/styles/tokens.css', '01-brand/tokens.css');
// 02 website
cp('docs/website', '02-website/docs'); cp('docs/product', '05-product-and-operations/product'); 
fs.mkdirSync(path.join(kit, '02-website'), { recursive: true });
fs.writeFileSync(path.join(kit, '02-website/README.md'), `# Website\n\nThe source is the repository root (Next.js 16). Run \`npm install\`, \`npm run dev\`, or \`npm run build && npm start\`. Configuration is in \`.env.example\`; deployment steps are in 05-product-and-operations/operations/DEPLOYMENT-AND-CONFIGURATION.md. The site is noindex until you switch indexing on. Nothing has been deployed.\n\nA built copy is not included; build it from the repository.\n`);
// 03 marketing, 04 sales, 05 ops
cp('docs/marketing', '03-consumer-marketing/docs'); cp('docs/sales', '04-corporate-sales/docs'); cp('docs/operations', '05-product-and-operations/operations');
// 06 qa
cp('qa', '06-qa');
// prompts
cp('docs/prompts', '07-reusable-prompts');
cp('docs/FINAL-REPORT.md', 'FINAL-REPORT.md');
fs.writeFileSync(path.join(kit, '00-READ-ME-FIRST.md'), `# Fieldwork launch kit\n\nStart with FINAL-REPORT.md (what is done, tested, prepared but unconnected, and deferred).\n\n- 01-brand: logos, favicons, guidelines PDF, templates, graphics, field art, photography with credits, tokens, brand strategy, research and concepts\n- 02-website: website notes (source is the repository)\n- 03-consumer-marketing: strategy, calendar, video and social kits, emails, pricing assumptions, trackers\n- 04-corporate-sales: capability PDF, one-pager, deck (PPTX), discovery, demo, proposal and SOW templates, outreach, objections, CRM templates\n- 05-product-and-operations: PRD (future platform, not built), architecture, SEO, deployment, domain/DNS/email/social setup, legal review list, launch checklist, limitations\n- 06-qa: test results, screenshots, design review, final QA report\n- 07-reusable-prompts: the reference-led design prompt\n\nNothing has been deployed or purchased. Every price and target is a hypothesis.\n`);
fs.writeFileSync(path.join(kit, 'repository-link.txt'), 'Source repository: keneokonjo-web/fieldwork, branch claude/exciting-maxwell-l5r45m\n');
const zip = 'deliverables/fieldwork-launch-kit.zip';
if (fs.existsSync(zip)) fs.rmSync(zip);
execFileSync('zip', ['-qr', path.resolve(zip), 'fieldwork-launch-kit'], { cwd: 'deliverables' });
console.log('zip', (fs.statSync(zip).size / 1e6).toFixed(1) + ' MB');
