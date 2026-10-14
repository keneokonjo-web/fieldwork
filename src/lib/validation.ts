/** Lead form validation. Used on the client for early feedback and on the server as the source of truth. */

export const LEAD_TYPES = ['newsletter', 'business_enquiry', 'demo_request', 'assessment_report', 'contact'] as const;
export type LeadType = (typeof LEAD_TYPES)[number];
export const MARKETS = ['uk', 'nigeria', 'other'] as const;
export type Market = (typeof MARKETS)[number];

export const PRIVACY_NOTICE_VERSION = 'draft-0.1';

export interface Attribution {
  utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_content?: string; utm_term?: string;
  referrer?: string; landing_path?: string; source_page?: string;
}

export interface LeadInput {
  type: LeadType;
  email: string;
  name?: string;
  company?: string;
  role?: string;
  market?: Market;
  teamSize?: string;
  message?: string;
  interest?: string;
  context?: string;
  privacyAcknowledged: boolean;
  marketingOptIn?: boolean;
  attribution?: Attribution;
  /** Honeypot. Must be empty. */
  website?: string;
  /** ms epoch when the form was first rendered. */
  startedAt?: number;
}

export type FieldErrors = Partial<Record<keyof LeadInput | 'form', string>>;
export type ValidationResult = { ok: true; data: LeadInput } | { ok: false; errors: FieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const str = (v: unknown, max: number): string | undefined => {
  if (typeof v !== 'string') return undefined;
  const t = v.replace(CONTROL_RE, '').trim();
  return t ? t.slice(0, max) : undefined;
};

export const NEEDS_BUSINESS_FIELDS: LeadType[] = ['business_enquiry', 'demo_request'];

export function validateLead(raw: unknown): ValidationResult {
  const errors: FieldErrors = {};
  if (!raw || typeof raw !== 'object') return { ok: false, errors: { form: 'Invalid submission.' } };
  const r = raw as Record<string, unknown>;

  const type = LEAD_TYPES.find((t) => t === r.type);
  if (!type) return { ok: false, errors: { form: 'Unknown form type.' } };

  const email = str(r.email, 254)?.toLowerCase();
  if (!email) errors.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter an email address in the format name@example.com.';

  const name = str(r.name, 120);
  const company = str(r.company, 160);
  const role = str(r.role, 120);
  const message = str(r.message, 4000);
  const teamSize = str(r.teamSize, 40);
  const interest = str(r.interest, 80);
  const context = str(r.context, 6000);
  const market = MARKETS.find((m) => m === r.market);

  if (NEEDS_BUSINESS_FIELDS.includes(type)) {
    if (!name) errors.name = 'Enter your name.';
    if (!company) errors.company = 'Enter your company name.';
    if (!message || message.length < 10) errors.message = 'Tell us briefly what you want to achieve (at least a sentence).';
    if (!market) errors.market = 'Choose where your business is based.';
  }
  if (type === 'contact') {
    if (!name) errors.name = 'Enter your name.';
    if (!message || message.length < 10) errors.message = 'Write a short message (at least a sentence).';
  }
  if (r.privacyAcknowledged !== true) {
    errors.privacyAcknowledged =
      type === 'newsletter' || type === 'assessment_report'
        ? 'Tick the box to confirm you agree to us emailing you.'
        : 'Tick the box to confirm you have read the privacy notice.';
  }
  if (Object.keys(errors).length) return { ok: false, errors };

  const a = (r.attribution && typeof r.attribution === 'object' ? r.attribution : {}) as Record<string, unknown>;
  const attribution: Attribution = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'referrer', 'landing_path', 'source_page'] as const) {
    const v = str(a[k], 300);
    if (v) attribution[k] = v;
  }

  return {
    ok: true,
    data: {
      type, email: email as string, name, company, role, market, teamSize, message, interest, context,
      privacyAcknowledged: true,
      marketingOptIn: r.marketingOptIn === true,
      attribution,
      website: str(r.website, 100),
      startedAt: typeof r.startedAt === 'number' ? r.startedAt : undefined,
    },
  };
}
