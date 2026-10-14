// Renders the documents that are sent to people as PDFs into the launch kit.
import { execFileSync } from 'node:child_process';
const jobs = [
  ['docs/sales/CAPABILITY-STATEMENT.md', '04-corporate-sales/pdf/Fieldwork-capability-statement.pdf', 'Capability statement'],
  ['docs/sales/REAL-ESTATE-ONE-PAGER.md', '04-corporate-sales/pdf/Fieldwork-real-estate-one-pager.pdf', 'Real estate one-pager'],
  ['docs/sales/PILOT-PROPOSAL-TEMPLATE.md', '04-corporate-sales/pdf/Pilot-proposal-template.pdf', 'Pilot proposal template'],
  ['docs/sales/DISCOVERY-CALL-GUIDE.md', '04-corporate-sales/pdf/Discovery-call-guide.pdf', 'Discovery call guide'],
  ['docs/sales/OBJECTION-HANDLING.md', '04-corporate-sales/pdf/Objection-handling.pdf', 'Objection handling'],
  ['docs/sales/OUTREACH-KIT.md', '04-corporate-sales/pdf/Outreach-kit.pdf', 'Outreach kit'],
  ['docs/marketing/CONSUMER-MARKETING-STRATEGY.md', '03-consumer-marketing/pdf/Consumer-marketing-strategy.pdf', 'Consumer marketing strategy'],
  ['docs/marketing/CONTENT-CALENDAR-30-DAY.md', '03-consumer-marketing/pdf/Content-calendar-30-day.pdf', '30-day content calendar'],
  ['docs/marketing/VIDEO-PRODUCTION-KIT.md', '03-consumer-marketing/pdf/Video-production-kit.pdf', 'Video production kit'],
  ['docs/product/PRD-ONBOARDING-PLATFORM.md', '05-product-and-operations/pdf/PRD-onboarding-platform.pdf', 'PRD: onboarding platform (not built)'],
  ['docs/operations/LAUNCH-CHECKLIST.md', '05-product-and-operations/pdf/Launch-checklist.pdf', 'Launch checklist'],
  ['docs/brand/BRAND-STRATEGY.md', '01-brand/pdf/Brand-strategy.pdf', 'Brand strategy'],
];
for (const [src, out, title] of jobs) execFileSync('node', ['scripts/docs/md-to-pdf.mjs', src, `deliverables/fieldwork-launch-kit/${out}`, '--title', title], { stdio: 'inherit' });
