import fs from 'node:fs/promises';
import path from 'node:path';
import { PRIVACY_NOTICE_VERSION, type LeadInput } from './validation';

/**
 * Lead delivery adapters. Server-only. Nothing is sent anywhere unless the matching environment
 * variables are set. See docs/operations/CONFIGURATION.md for exact setup and the data-flow description.
 *
 *   LEAD_WEBHOOK_URL (+ LEAD_WEBHOOK_SECRET)   POST the lead as JSON to Zapier / Make / n8n / Apps Script / your CRM
 *   RESEND_API_KEY + LEAD_NOTIFY_EMAIL + LEAD_FROM_EMAIL   Email a notification to the founder via Resend
 *   LEAD_DEV_FILE=true                          Append to .data/leads.jsonl (local development only)
 */

export type DeliveryResult = { ok: true; via: string[] } | { ok: false; reason: 'not_configured' | 'delivery_failed' };

export interface LeadRecord {
  id: string;
  receivedAt: string;
  type: LeadInput['type'];
  email: string;
  name?: string;
  company?: string;
  role?: string;
  market?: string;
  teamSize?: string;
  message?: string;
  interest?: string;
  context?: string;
  consent: { privacyNoticeVersion: string; privacyAcknowledged: true; marketingOptIn: boolean; at: string };
  attribution: NonNullable<LeadInput['attribution']>;
  /** Suggested CRM fields (see docs/marketing/CRM-FIELDS.md) */
  crm: { lifecycleStage: 'subscriber' | 'lead'; leadSource: string; audience: 'individual' | 'business' };
}

export function toRecord(input: LeadInput, now = new Date()): LeadRecord {
  const iso = now.toISOString();
  const business = true;
  return {
    id: `${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: iso,
    type: input.type,
    email: input.email,
    name: input.name,
    company: input.company,
    role: input.role,
    market: input.market,
    teamSize: input.teamSize,
    message: input.message,
    interest: input.interest,
    context: input.context,
    consent: { privacyNoticeVersion: PRIVACY_NOTICE_VERSION, privacyAcknowledged: true, marketingOptIn: Boolean(input.marketingOptIn) , at: iso },
    attribution: input.attribution ?? {},
    crm: {
      lifecycleStage: 'lead',
      leadSource: input.attribution?.utm_source || (input.attribution?.referrer ? 'referral' : 'direct'),
      audience: business ? 'business' : 'individual',
    },
  };
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);

async function viaWebhook(rec: LeadRecord) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (process.env.LEAD_WEBHOOK_SECRET) headers['x-fieldwork-secret'] = process.env.LEAD_WEBHOOK_SECRET;
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(rec), signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
  return 'webhook';
}

async function viaResend(rec: LeadRecord) {
  const { RESEND_API_KEY: key, LEAD_NOTIFY_EMAIL: to, LEAD_FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) return null;
  const rows = Object.entries({ type: rec.type, email: rec.email, name: rec.name, company: rec.company, role: rec.role, market: rec.market, teamSize: rec.teamSize, interest: rec.interest, message: rec.message, context: rec.context, source: rec.attribution.utm_source, medium: rec.attribution.utm_medium, campaign: rec.attribution.utm_campaign, page: rec.attribution.source_page })
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555"><b>${esc(k)}</b></td><td style="padding:4px 0">${esc(String(v)).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: rec.email, subject: `Fieldwork: ${rec.type.replace('_', ' ')} from ${rec.name || rec.email}`, html: `<table>${rows}</table>` }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
  return 'resend';
}

async function viaDevFile(rec: LeadRecord) {
  if (process.env.LEAD_DEV_FILE !== 'true' || process.env.NODE_ENV === 'production') return null;
  const dir = path.join(process.cwd(), '.data');
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(path.join(dir, 'leads.jsonl'), JSON.stringify(rec) + '\n');
  return 'dev-file';
}

export async function deliverLead(input: LeadInput): Promise<DeliveryResult> {
  const rec = toRecord(input);
  const adapters = [viaWebhook, viaResend, viaDevFile];
  const via: string[] = [];
  let configured = false;
  let failed = false;
  for (const a of adapters) {
    try {
      const r = await a(rec);
      if (r) { configured = true; via.push(r); }
    } catch (e) {
      configured = true; failed = true;
      console.error('[lead] delivery adapter failed:', e instanceof Error ? e.message : 'unknown');
    }
  }
  if (!configured) return { ok: false, reason: 'not_configured' };
  if (failed && via.length === 0) return { ok: false, reason: 'delivery_failed' };
  return { ok: true, via };
}
