/**
 * Business builder logic (free tier). Deliberately simple and deterministic: ideas come from a curated list and the
 * refined statement and opportunity assessment are built from the person's own answers by fixed rules.
 * There is no AI model and no market data behind it, and the pages say so.
 */
export type BizType = 'store' | 'service' | 'digital' | 'software';
export const BUSINESS_TYPES: { id: BizType | 'idea'; label: string; blurb: string }[] = [
  { id: 'store', label: 'Online store', blurb: 'Sell physical products online.' },
  { id: 'service', label: 'Service business', blurb: 'Sell your time or skill to clients.' },
  { id: 'digital', label: 'Digital products', blurb: 'Templates, guides, courses, downloads.' },
  { id: 'software', label: 'Software', blurb: 'An app or tool that solves one problem.' },
  { id: 'idea', label: 'Help me find an idea', blurb: 'We suggest one to start from.' },
];

export interface Idea { type: BizType; idea: string; audience: string; problem: string }
const IDEAS: Idea[] = [
  { type: 'store', idea: 'Reusable, refillable household cleaning products sold by subscription', audience: 'Busy households that want less plastic', problem: 'Cleaning products are bulky, wasteful and easy to run out of' },
  { type: 'store', idea: 'Locally made hair and skin products for natural hair', audience: 'People with natural hair who struggle to find products that suit them', problem: 'Most shelf products are not made for their hair type' },
  { type: 'store', idea: 'Curated office desk and home-working kits', audience: 'New remote workers', problem: 'Buying a comfortable setup piece by piece is confusing and costly' },
  { type: 'store', idea: 'Ready-to-cook regional spice and sauce boxes', audience: 'Students and young professionals who want real flavour without long recipes', problem: 'Authentic ingredients are hard to find and use' },
  { type: 'service', idea: 'Bookkeeping and monthly money check-ins for freelancers', audience: 'Freelancers and sole traders', problem: 'They avoid their accounts until tax time' },
  { type: 'service', idea: 'CV, LinkedIn and interview coaching for early-career job seekers', audience: 'Graduates and career changers', problem: 'They do not know how to present what they have done' },
  { type: 'service', idea: 'Social media management for local restaurants and salons', audience: 'Small local businesses', problem: 'Owners have no time to post consistently' },
  { type: 'service', idea: 'Move-in cleaning and set-up for rental properties', audience: 'Landlords and letting agents', problem: 'Turnaround between tenants is slow and unreliable' },
  { type: 'digital', idea: 'Spreadsheet templates for household and small-business budgeting', audience: 'People who want to track money without learning accounting', problem: 'Existing tools are either too complex or too basic' },
  { type: 'digital', idea: 'A short course on writing clear work emails and updates', audience: 'Non-native English speakers at work', problem: 'They lose confidence when writing to managers and clients' },
  { type: 'digital', idea: 'Printable planners and study guides for exam preparation', audience: 'Secondary school and university students', problem: 'Revision is disorganised and stressful' },
  { type: 'digital', idea: 'Photo-editing presets and templates for small online sellers', audience: 'Sellers on marketplaces and social media', problem: 'Their product photos look inconsistent' },
  { type: 'software', idea: 'A simple booking and reminder tool for one-person service businesses', audience: 'Tutors, barbers, trainers and cleaners', problem: 'Bookings are managed in chat threads and missed' },
  { type: 'software', idea: 'A tool that turns messy meeting notes into a shared action list', audience: 'Small teams', problem: 'Decisions and owners are lost after meetings' },
  { type: 'software', idea: 'A rent-and-repairs tracker for small landlords', audience: 'Landlords with a handful of properties', problem: 'Rent, repairs and documents sit in different places' },
  { type: 'software', idea: 'A low-data price comparison tool for local markets', audience: 'Shoppers on mobile data', problem: 'Prices differ a lot and checking takes time' },
];
export function generateIdea(type: BizType | 'idea' | null, rand: () => number = Math.random): Idea {
  const pool = type && type !== 'idea' ? IDEAS.filter((i) => i.type === type) : IDEAS;
  return pool[Math.floor(rand() * pool.length)] ?? IDEAS[0];
}

export interface IdeaInput { sells: string; audience: string; problem: string; price: string }
export function refineIdea(i: IdeaInput): { statement: string; prompts: string[]; missing: string[] } {
  const t = (x: string) => x.trim().replace(/\s+/g, ' ');
  const lower = (x: string) => (/^[A-Z][a-z]/.test(x) ? x.charAt(0).toLowerCase() + x.slice(1) : x);
  const strip = (x: string) => x.replace(/[.\s]+$/, '');
  const sells = strip(t(i.sells)), audience = strip(t(i.audience)), problem = strip(t(i.problem)), price = t(i.price);
  const missing = [!sells && 'what you sell', !audience && 'who it is for', !problem && 'the problem it solves'].filter(Boolean) as string[];
  const statement = missing.length ? '' : `The problem: ${lower(problem)}. For ${lower(audience)}, we offer ${lower(sells)}${price ? ` at around ${price}` : ''}.`;
  const prompts = [
    audience ? `Can you name three real people who fit "${audience}"? Talk to them this week.` : 'Pick one specific group of people to start with.',
    problem ? `How do they deal with "${problem}" today, and what does that cost them?` : 'Describe the problem in their words, not yours.',
    price ? `Would ten of them pay ${price}? Ask before you build.` : 'Decide a first price you could test with ten people.',
  ];
  return { statement, prompts, missing };
}

export interface AssessQuestion { id: string; text: string; options: [string, string, string]; weakNote: string }
export const ASSESS_QUESTIONS: AssessQuestion[] = [
  { id: 'customer', text: 'How clearly can you describe your first customer?', options: ['Not yet', 'A general group', 'A specific person or group I can name'], weakNote: 'Write one paragraph describing your first customer: who they are, where they spend time, what they care about.' },
  { id: 'problem', text: 'How real is the problem for them?', options: ['I am not sure it is a problem', 'They mention it sometimes', 'They already spend time or money on it'], weakNote: 'Ask five people how they handle this problem today and what it costs them.' },
  { id: 'reach', text: 'Can you reach your first ten customers?', options: ['I do not know how', 'Maybe through friends or social media', 'Yes, I know where they are'], weakNote: 'List the three places your first ten customers already gather, online or in person.' },
  { id: 'competition', text: 'Do you know what people use instead of you?', options: ['No', 'A little', 'Yes, and I know how I differ'], weakNote: 'Find three alternatives your customers use now and write one line on how you are different.' },
  { id: 'edge', text: 'Do you have a reason to be the one to do this?', options: ['Not really', 'Some interest or experience', 'Real experience, skill or access'], weakNote: 'Write down the experience, skills or access that give you a head start, and the gaps you need to fill.' },
  { id: 'cost', text: 'Can you start with the time and money you have?', options: ['Not sure', 'With some difficulty', 'Yes, a small first version is affordable'], weakNote: 'Cut the first version down to what you can afford to build in four weeks.' },
];
export interface Assessment { score: number; max: number; level: 'Early' | 'Promising' | 'Strong start'; text: string; next: string[] }
export function assessOpportunity(answers: Record<string, number>): Assessment {
  const max = ASSESS_QUESTIONS.length * 2;
  const score = ASSESS_QUESTIONS.reduce((n, q) => n + Math.max(0, Math.min(2, answers[q.id] ?? 0)), 0);
  const level = score >= 10 ? 'Strong start' : score >= 6 ? 'Promising' : 'Early';
  const text = level === 'Strong start'
    ? 'Your answers describe a clear customer, a real problem and a workable start. Test it with real people before you build more.'
    : level === 'Promising'
      ? 'There is something to work with, with a few gaps. Close the gaps below before you spend much.'
      : 'It is early. That is fine. Spend your next week learning from real people, not building.';
  const weakest = [...ASSESS_QUESTIONS].sort((a, b) => (answers[a.id] ?? 0) - (answers[b.id] ?? 0)).slice(0, 3).filter((q) => (answers[q.id] ?? 0) < 2);
  return { score, max, level, text, next: weakest.map((q) => q.weakNote) };
}

export const PALETTES = [
  { id: 'ink-cobalt', name: 'Ink and cobalt', bg: '#F3F2ED', ink: '#121212', accent: '#2340FF' },
  { id: 'forest', name: 'Forest', bg: '#F2F4EE', ink: '#16301F', accent: '#2F6B3A' },
  { id: 'terracotta', name: 'Terracotta', bg: '#F6F0E9', ink: '#2B1A14', accent: '#B4472A' },
  { id: 'plum', name: 'Plum', bg: '#F4F0F5', ink: '#24102B', accent: '#7A2E8E' },
  { id: 'ocean', name: 'Ocean', bg: '#EEF3F6', ink: '#0F2433', accent: '#0F6B9A' },
  { id: 'sun', name: 'Sun', bg: '#FBF6E6', ink: '#2B2410', accent: '#9A6A00' },
];
export const LOGO_PRESETS = ['monogram-circle', 'monogram-square', 'ring', 'bars', 'stack', 'corner', 'dots', 'slash'] as const;
export type LogoId = (typeof LOGO_PRESETS)[number];
/** Simple preset marks built from the business initial. Returns an SVG string (no external input except the first letter). */
export function logoSvg(id: LogoId, name: string, p: { bg: string; ink: string; accent: string }): string {
  const L = (name.trim().charAt(0) || 'F').toUpperCase().replace(/[^A-Z0-9]/g, 'F');
  const text = (x: number, y: number, size: number, fill: string) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${size}" fill="${fill}">${L}</text>`;
  const bgRect = `<rect width="100" height="100" fill="${p.bg}"/>`;
  const shapes: Record<LogoId, string> = {
    'monogram-circle': `<circle cx="50" cy="50" r="34" fill="${p.accent}"/>${text(50, 64, 42, p.bg)}`,
    'monogram-square': `<rect x="18" y="18" width="64" height="64" fill="${p.ink}"/>${text(50, 66, 44, p.bg)}`,
    ring: `<circle cx="50" cy="50" r="30" fill="none" stroke="${p.ink}" stroke-width="7"/><circle cx="50" cy="50" r="9" fill="${p.accent}"/>`,
    bars: `<rect x="22" y="56" width="14" height="24" fill="${p.ink}"/><rect x="43" y="40" width="14" height="40" fill="${p.ink}"/><rect x="64" y="22" width="14" height="58" fill="${p.accent}"/>`,
    stack: `<rect x="20" y="22" width="60" height="14" fill="${p.ink}"/><rect x="20" y="43" width="60" height="14" fill="${p.accent}"/><rect x="20" y="64" width="60" height="14" fill="${p.ink}"/>`,
    corner: `<path d="M20 20h60v60" fill="none" stroke="${p.ink}" stroke-width="8"/>${text(46, 62, 34, p.accent)}`,
    dots: [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => `<circle cx="${28 + c * 22}" cy="${28 + r * 22}" r="${r === c ? 8 : 5}" fill="${r === c ? p.accent : p.ink}"/>`)).join(''),
    slash: `<path d="M30 78L62 22" stroke="${p.accent}" stroke-width="12"/><path d="M52 78L84 22" stroke="${p.ink}" stroke-width="12"/>`,
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Logo option">${bgRect}${shapes[id]}</svg>`;
}

export const WEBSITE_SECTIONS = ['Headline and one-line promise', 'What you offer', 'Who it is for', 'How it works', 'Prices', 'About you', 'Questions answered', 'Contact or buy button'];
export const SALES_CHANNELS = ['Friends and family', 'Social media', 'WhatsApp groups', 'Local community or events', 'Marketplaces', 'Search (website)', 'Partnerships'];
export const OPS_ITEMS = ['A way to take payment', 'A simple way to deliver or fulfil', 'A place to keep customer details safely', 'A basic record of income and costs', 'A way to answer questions', 'Terms and a refund approach'];

export interface BuilderState {
  type: BizType | 'idea' | null;
  idea: IdeaInput;
  refined: string;
  answers: Record<string, number>;
  assessed: boolean;
  brand: { name: string; logo: LogoId | 'custom' | null; customLogo: string; palette: string };
  product: { features: string; firstVersion: string };
  website: { sections: string[] };
  sales: { channels: string[]; ops: string[] };
  launched: boolean;
}
export const EMPTY_BUILDER: BuilderState = {
  type: null, idea: { sells: '', audience: '', problem: '', price: '' }, refined: '', answers: {}, assessed: false,
  brand: { name: '', logo: null, customLogo: '', palette: 'ink-cobalt' }, product: { features: '', firstVersion: '' }, website: { sections: [] }, sales: { channels: [], ops: [] }, launched: false,
};
export function reviveBuilder(p: unknown): BuilderState {
  const o = (p ?? {}) as Partial<BuilderState>;
  return { ...EMPTY_BUILDER, ...o, idea: { ...EMPTY_BUILDER.idea, ...(o.idea ?? {}) }, brand: { ...EMPTY_BUILDER.brand, ...(o.brand ?? {}) }, product: { ...EMPTY_BUILDER.product, ...(o.product ?? {}) }, website: { sections: o.website?.sections ?? [] }, sales: { channels: o.sales?.channels ?? [], ops: o.sales?.ops ?? [] }, answers: o.answers ?? {} };
}

export type Status = 'complete' | 'in-progress' | 'not-started';
export interface CheckItem { id: string; label: string; status: Status; locked?: boolean }
/** Workspace checklist derived from what the person has done in the free builder. */
export function checklist(b: BuilderState): CheckItem[] {
  const idea: Status = b.refined && b.assessed ? 'complete' : b.refined || b.idea.sells ? 'in-progress' : 'not-started';
  const model: Status = b.product.features || b.product.firstVersion ? 'in-progress' : 'not-started';
  const brand: Status = b.brand.name && b.brand.logo ? (b.website.sections.length ? 'in-progress' : 'in-progress') : 'not-started';
  const launch: Status = b.launched && b.sales.channels.length ? 'in-progress' : 'not-started';
  return [
    { id: 'idea', label: 'Business idea', status: idea },
    { id: 'model', label: 'Business model', status: model },
    { id: 'brand', label: 'Brand and website', status: brand },
    { id: 'launch', label: 'Launch', status: launch },
  ];
}

export interface BuilderDoc { id: string; name: string; filename: string; text: string }
/** Plain-text documents generated from what the person entered. Real output, built from their own answers. */
export function builderDocs(b: BuilderState): BuilderDoc[] {
  const list = (a: string[]) => (a.length ? a.map((x) => `- ${x}`).join('\n') : '- (none chosen yet)');
  const name = b.brand.name || 'Your business';
  const pal = PALETTES.find((p) => p.id === b.brand.palette);
  const a = assessOpportunity(b.answers);
  return [
    { id: 'idea', name: 'Business idea', filename: 'business-idea.txt', text: `${name}\n\nIdea statement\n${b.refined || '(not written yet)'}\n\nWhat you sell: ${b.idea.sells}\nWho it is for: ${b.idea.audience}\nProblem: ${b.idea.problem}\nFirst price to test: ${b.idea.price}\n\nOpportunity snapshot (self-reported): ${a.level}, ${a.score} of ${a.max}\n${a.next.map((n) => `- ${n}`).join('\n')}\n` },
    { id: 'model', name: 'Product and first version', filename: 'product.txt', text: `${name}: product\n\nBenefits\n${b.product.features || '(not written yet)'}\n\nFirst version\n${b.product.firstVersion || '(not written yet)'}\n` },
    { id: 'brand', name: 'Brand sheet', filename: 'brand.txt', text: `${name}: brand\n\nLogo: ${b.brand.logo === 'custom' ? 'your own upload' : b.brand.logo ?? '(not chosen)'}\nPalette: ${pal ? `${pal.name} (${pal.bg}, ${pal.ink}, ${pal.accent})` : '(not chosen)'}\n\nWebsite sections\n${list(b.website.sections)}\n` },
    { id: 'launch', name: 'Sales and operations checklist', filename: 'launch.txt', text: `${name}: sales and operations\n\nWhere the first customers come from\n${list(b.sales.channels)}\n\nOperations to have in place\n${list(b.sales.ops)}\n` },
  ];
}
