import type { Region } from '@/lib/region';

/** Public contact details, by region. The email address is the same everywhere. */
export const CONTACT_EMAIL = 'fieldwork@waykongroup.com';

export interface ContactLine { kind: 'phone' | 'whatsapp'; label: string; display: string; href: string }

export const regionContact: Record<Region, ContactLine | null> = {
  uk: { kind: 'phone', label: 'Call', display: '+44 7508 533692', href: 'tel:+447508533692' },
  ng: { kind: 'whatsapp', label: 'WhatsApp', display: '+234 704 716 7280', href: 'https://wa.me/2347047167280' },
  us: null,
};
