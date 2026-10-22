/**
 * Central site configuration. Everything that depends on a confirmed domain, email address or
 * company detail is read from environment variables so nothing is hardcoded across files.
 * See docs/operations/CONFIGURATION.md and .env.example.
 */
const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

const url = clean(process.env.NEXT_PUBLIC_SITE_URL)?.replace(/\/+$/, '');

export const siteConfig = {
  name: 'Fieldwork',
  tagline: 'Websites and workflows for property businesses.',
  strategicLine: 'Practical technology for real estate.',
  description:
    'Fieldwork builds websites with self-managed listings, enquiry and viewing automation, and AI training for estate agencies and property developers in the UK and Nigeria.',
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

export const mainNav = [
  { href: '/websites', label: 'Websites & Listings' },
  { href: '/automations', label: 'Automations' },
  { href: '/ai-workshop', label: 'AI Workshop' },
  { href: '/about', label: 'About' },
] as const;

export const DEMO_PATH = '/request-demo';

export const footerNav = {
  Products: [
    { href: '/websites', label: 'Websites & Listings' },
    { href: '/automations', label: 'Automations' },
    { href: '/ai-workshop', label: 'AI Workshop' },
  ],
  Company: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: DEMO_PATH, label: 'Request a demo' },
    { href: '/image-credits', label: 'Image credits' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy notice' },
    { href: '/terms', label: 'Terms of use' },
    { href: '/cookies', label: 'Cookies' },
    { href: '/accessibility', label: 'Accessibility' },
  ],
} as const;

export function absoluteUrl(path = '/') {
  const base = siteConfig.url ?? 'http://localhost:3000';
  return `${base}${path === '/' ? '' : path}`;
}
