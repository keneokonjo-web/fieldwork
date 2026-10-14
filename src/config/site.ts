/**
 * Central site configuration. Everything that depends on a confirmed domain, email address or
 * company detail is read from environment variables so nothing is hardcoded across files.
 * See docs/operations/CONFIGURATION.md and .env.example.
 */
const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

const url = clean(process.env.NEXT_PUBLIC_SITE_URL)?.replace(/\/+$/, '');

export const siteConfig = {
  name: 'Fieldwork',
  tagline: 'Practise AI on real work.',
  strategicLine: 'Learn by doing. Put knowledge to work.',
  description:
    'Fieldwork teaches practical AI through real tasks. Try a free guided exercise, then practise on your own work. Training for real estate teams.',
  locale: 'en-GB',
  /** Confirmed production origin, e.g. https://example.com. Empty until the domain is chosen. */
  url,
  /** The site stays noindex and robots-disallowed until this is explicitly switched on AND a URL is set. */
  allowIndexing: clean(process.env.NEXT_PUBLIC_ALLOW_INDEXING) === 'true' && Boolean(url),
  email: {
    general: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL_GENERAL),
    business: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL_BUSINESS),
    privacy: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL_PRIVACY),
  },
  legal: {
    entityName: clean(process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME),
    registeredAddress: clean(process.env.NEXT_PUBLIC_LEGAL_ADDRESS),
    registrationNumber: clean(process.env.NEXT_PUBLIC_COMPANY_NUMBER),
    lastReviewed: clean(process.env.NEXT_PUBLIC_LEGAL_LAST_REVIEWED),
  },
  analytics: {
    plausibleDomain: clean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
    plausibleSrc: clean(process.env.NEXT_PUBLIC_PLAUSIBLE_SRC) ?? 'https://plausible.io/js/script.js',
  },
  social: {
    tiktok: clean(process.env.NEXT_PUBLIC_SOCIAL_TIKTOK),
    linkedin: clean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
    instagram: clean(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
    youtube: clean(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE),
  },
} as const;

export const FREE_EXPERIENCE_PATH = '/learn/first-workflow';

export const mainNav = [
  { href: '/individuals', label: 'Individuals' },
  { href: '/business', label: 'For Business' },
  { href: '/field-notes', label: 'Field Notes' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
] as const;

export const footerNav = {
  Learn: [
    { href: FREE_EXPERIENCE_PATH, label: 'Free exercise' },
    { href: '/individuals', label: 'For individuals' },
    { href: '/field-notes', label: 'Field Notes' },
    { href: '/pricing', label: 'Pricing' },
  ],
  Business: [
    { href: '/business', label: 'For Business' },
    { href: '/business/real-estate', label: 'Real estate' },
    { href: '/business/assessment', label: 'Workflow assessment' },
    { href: '/contact?topic=business', label: 'Request a demonstration' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/accessibility', label: 'Accessibility' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy notice' },
    { href: '/terms', label: 'Terms of use' },
    { href: '/cookies', label: 'Cookies' },
  ],
} as const;

export function absoluteUrl(path = '/') {
  const base = siteConfig.url ?? 'http://localhost:3000';
  return `${base}${path === '/' ? '' : path}`;
}
