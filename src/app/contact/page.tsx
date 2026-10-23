import { Corners } from '@/components/ui/Corners';
import { LeadForm } from '@/components/forms/LeadForm';
import { RegionPlate } from '@/components/ui/RegionPlate';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Talk to Fieldwork about a website, an automation or the AI Workshop. For estate agencies and property developers.',
  path: '/contact',
});

const next = [
  ['We read your message.', 'A real person replies by email, usually within a few working days.'],
  ['We agree what you want to look at.', 'The website and listings, an automation, or both.'],
  ['You see it working.', 'On a short call, with the demo open.'],
];

export default function RequestDemoPage() {
  const { business, general } = siteConfig.email;
  const email = business ?? general;
  return (
    <>
      <section className="page-hero corners" style={{ paddingBottom: 'var(--s-6)' }}>
        <Corners n="06" letters={['D', 'E', 'M']} />
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Talk to us.</h1>
          <p className="lede">Tell us about your business and what you would like to improve. We reply by email.</p>
        </div>
      </section>
      <section className="section section--wash" style={{ paddingTop: 'var(--s-7)' }}>
        <div className="container contact-grid">
          <div className="form-card" id="demo">
            <h2 style={{ fontSize: 'var(--step-3)' }}>Your details</h2>
            <LeadForm type="demo_request" variant="business" submitLabel="Send message" location="contact" offerMarketingOptIn
              messageLabel="What would you like to improve?" messageHint="One or two sentences is plenty. Please do not include personal details of clients."
              successTitle="Thank you, we have your request" successBody="We will reply to the email address you gave, within a few working days, to arrange a short conversation." fallbackEmail={email} />
            {email && <p className="small muted" style={{ marginTop: 'var(--s-4)' }}>Or email <a href={`mailto:${email}`}>{email}</a>.</p>}
          </div>
          <div>
            <p className="eyebrow">What happens next</p>
            <ol className="steplist">{next.map(([t, d], i) => <li key={t}><span>0{i + 1}</span><span><b>{t}</b><br />{d}</span></li>)}</ol>
            <RegionPlate slot="bandA" ratio="3 / 2" className="mt" />
          </div>
        </div>
      </section>
    </>
  );
}
