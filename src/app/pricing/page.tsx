import { Corners } from '@/components/ui/Corners';
import { LeadForm } from '@/components/forms/LeadForm';
import { ConsumerPricing } from '@/components/pricing/ConsumerPricing';
import { ButtonLink, TextLink } from '@/components/ui/ButtonLink';
import { FREE_EXPERIENCE_PATH, siteConfig } from '@/config/site';
import { BusinessPricing } from '@/components/pricing/BusinessPricing';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Pricing and availability',
  description: 'Free for individuals; priced plans for businesses. Separate pricing for the UK, Nigeria and the USA. Payments are not open yet.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <section className="page-hero corners">
        <Corners n="08" letters={['P', 'R', 'C']} />
        <div className="container">
          <p className="eyebrow">Pricing and availability</p>
          <h1>Free for individuals. Priced for business.</h1>
          <p className="lede">Separate prices for the UK, Nigeria and the USA.</p>
        </div>
      </section>

      <section className="section section--wash" aria-labelledby="ind-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">Fieldwork for Individuals</p><h2 id="ind-title">Free first. Paid later.</h2></div>
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
          <div className="section__head"><p className="eyebrow">Fieldwork for Business</p><h2 id="biz-title">Plans for teams.</h2>
            <p>Smaller teams pay per employee. Larger ones are quoted. <TextLink href="/business/course">See what the course looks like</TextLink></p></div>
          <BusinessPricing />
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <ButtonLink href="/contact?topic=business" track="business_cta_clicked" trackLabel="pricing-demo">Request a demonstration</ButtonLink>
            <ButtonLink href="/business/assessment" variant="secondary" track="business_cta_clicked" trackLabel="pricing-assessment">Take the free assessment first</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="future-title">
        <div className="container split">
          <div>
            <p className="eyebrow">In development</p>
            <h2 id="future-title">An onboarding platform for businesses.</h2>
            <p className="lede">Not built. Not for sale. We will not take payment for it. Leave your email to hear when there is something to show.</p>
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
          <p className="lede">About 15 minutes. No account.</p>
          <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}><ButtonLink href={FREE_EXPERIENCE_PATH} track="consumer_cta_clicked" trackLabel="pricing-free">Try the free exercise</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
