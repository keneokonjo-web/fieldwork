'use client';
import Link from 'next/link';
import { CONTACT_EMAIL, regionContact } from '@/content/contact';
import { CONTACT_PATH } from '@/config/site';
import { useRegion } from '@/lib/region';

/** Register interest, email, and (where we have one) the regional phone or WhatsApp number. Sits under every price. */
export function ContactStrip({ tone = 'paper' }: { tone?: 'paper' | 'ink' }) {
  const { region } = useRegion();
  const line = regionContact[region];
  return (
    <div className={`contact-strip contact-strip--${tone}`} aria-label="Get in touch about pricing">
      <p className="contact-strip__title">Interested? Get in touch.</p>
      <div className="contact-strip__row">
        <Link href={CONTACT_PATH} className={`btn ${tone === 'ink' ? 'btn--light' : 'btn--cobalt'}`} data-track="demo_request_clicked" data-track-label="price-register-interest">Register interest</Link>
        <a className="contact-strip__link" href={`mailto:${CONTACT_EMAIL}`}><span>Email</span>{CONTACT_EMAIL}</a>
        {line && (
          <a className="contact-strip__link" href={line.href} {...(line.kind === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            <span>{line.label}</span>{line.display}
          </a>
        )}
      </div>
    </div>
  );
}
