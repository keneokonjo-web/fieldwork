import { LeadForm } from '@/components/forms/LeadForm';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Ask a question about learning with Fieldwork, or request a demonstration or pilot discussion for your business.',
  path: '/contact',
});

export default function ContactPage() {
  const { general, business } = siteConfig.email;
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 'var(--s-6)' }}>
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Get in <em>touch.</em></h1>
          <p className="lede">Two routes, so your message reaches the right place. We reply by email.</p>
        </div>
      </section>
      <section className="section section--stone" style={{ paddingTop: 'var(--s-7)' }}>
        <div className="container contact-grid">
          <div className="form-card" id="business">
            <h2 style={{ fontSize: 'var(--step-3)' }}>For businesses</h2>
            <p className="muted">Request a demonstration or talk about a pilot for your team. Real estate first.</p>
            <LeadForm type="demo_request" variant="business" submitLabel="Request a demonstration" location="contact-business" interest="demo" offerMarketingOptIn
              messageLabel="What would you like your team to do better?" messageHint="One or two sentences is plenty. Please do not include personal details of clients."
              successTitle="Thank you, we have your request" successBody="We will reply to the email address you gave, within a few working days, to arrange a short conversation." fallbackEmail={business} />
            {business && <p className="small muted" style={{ marginTop: 'var(--s-4)' }}>Or email <a href={`mailto:${business}`}>{business}</a>.</p>}
          </div>
          <div className="form-card" id="learning">
            <h2 style={{ fontSize: 'var(--step-3)' }}>Questions about learning</h2>
            <p className="muted">A question about the free exercise, Field Notes or what is planned for individuals.</p>
            <LeadForm type="contact" variant="contact" submitLabel="Send message" location="contact-general" interest="question"
              messageLabel="Your message" successTitle="Thank you, message received" successBody="We will reply to the email address you gave. This is a small team, so please allow a few working days." fallbackEmail={general} />
            {general && <p className="small muted" style={{ marginTop: 'var(--s-4)' }}>Or email <a href={`mailto:${general}`}>{general}</a>.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
