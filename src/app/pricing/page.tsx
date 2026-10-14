import { LeadForm } from '@/components/forms/LeadForm';
import { ConsumerPricing } from '@/components/pricing/ConsumerPricing';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { FREE_EXPERIENCE_PATH, siteConfig } from '@/config/site';
import { businessLevels } from '@/content/pricing';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Pricing and availability',
  description: 'What is free, what is planned and how business pilots are priced. Separate UK (GBP) and Nigeria (NGN) pricing. Nothing is on sale yet.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Pricing and availability</p>
          <h1>What is free, what is planned, and what is not on sale yet.</h1>
          <p className="lede">Fieldwork is new. The free exercise is available today. Everything else is described honestly below, with separate pricing for the UK and Nigeria.</p>
        </div>
      </section>

      <section className="section section--deep" aria-labelledby="ind-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">Fieldwork for Individuals</p><h2 id="ind-title">Learning for yourself</h2></div>
          <ConsumerPricing />
          <div className="form-card" style={{ marginTop: 'var(--s-7)', maxWidth: '40rem' }}>
            <h3>Join the early-access list</h3>
            <p className="muted">Tell us where you are and we will email you when the first guided project is ready. Optional, and you can unsubscribe at any time.</p>
            <LeadForm type="newsletter" variant="email" submitLabel="Join early access" interest="early-access-individuals" location="pricing"
              successTitle="You are on the early-access list" successBody="Thank you. We will email you when guided projects are ready." fallbackEmail={siteConfig.email.general} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="biz-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">Fieldwork for Business</p><h2 id="biz-title">Scoped to your business, priced once we understand it.</h2>
            <p>Business pilots are quoted after a short conversation, because the right size depends on your team, your workflows and how much you want delivered live. We would rather propose a fixed price you can understand than publish a number that fits nobody.</p></div>
          <div className="grid grid--3">
            {businessLevels.map((l) => (
              <div className="card" key={l.name}><Chip tone="neutral">{l.status}</Chip><h3>{l.name}</h3><p>{l.text}</p><p className="small muted"><strong>Fits:</strong> {l.fit}</p></div>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <ButtonLink href="/contact?topic=business" track="business_cta_clicked" trackLabel="pricing-business">Request a demonstration or pilot discussion</ButtonLink>
            <ButtonLink href="/business/assessment" variant="secondary" track="business_cta_clicked" trackLabel="pricing-assessment">Take the free assessment first</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="future-title">
        <div className="container split">
          <div>
            <p className="eyebrow">In development</p>
            <h2 id="future-title">An onboarding and knowledge platform for businesses.</h2>
            <p className="lede">Checklists, role-based learning paths and an assistant grounded in your own approved information. It does not exist yet, it is not for sale, and we will not take payment for it. If you would like to hear when there is something to show, leave your email.</p>
          </div>
          <div className="form-card">
            <LeadForm type="newsletter" variant="email" submitLabel="Tell me when there is something to see" interest="onboarding-platform-waitlist" location="pricing-platform"
              successTitle="You are on the list" successBody="Thank you. We will only email you about this platform when there is something real to show." fallbackEmail={siteConfig.email.business} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="try-title">
        <div className="container">
          <h2 id="try-title">Start with the part that is free.</h2>
          <p className="lede">A complete guided exercise. About 15 minutes. No account.</p>
          <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}><ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="pricing-free">Try the free exercise</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
