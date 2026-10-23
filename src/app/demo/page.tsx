import Link from 'next/link';
import { DemoPreview } from '@/components/ui/DemoPreview';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Corners } from '@/components/ui/Corners';
import { CONTACT_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Demo',
  description: 'A demonstration property website with a working listing system, using fictional properties.',
  path: '/demo',
});

export default function DemoPage() {
  return (
    <>
      <section className="page-hero corners" style={{ paddingBottom: 'var(--s-6)' }}>
        <Corners n="06" letters={['D', 'E', 'M']} />
        <div className="container">
          <p className="eyebrow">Demo</p>
          <h1>The demo.</h1>
          <p className="lede">A property website with a working listing system, using fictional properties. Browse it as a visitor, then sign in to the admin screen and publish a listing yourself.</p>
        </div>
      </section>
      <section className="section section--wash" style={{ paddingTop: 'var(--s-7)' }}>
        <div className="container">
          <div className="demo-stage">
            <div className="demo-stage__frame">
              <DemoPreview label="Demo opening soon" className="demoprev--static" />
            </div>
            <div>
              <p className="eyebrow">Opening soon</p>
              <h2 style={{ fontSize: 'var(--step-3)' }}>The live demo is being finished.</h2>
              <p>Leave your details and we will tell you the day it opens, or talk to us now about what you want built.</p>
              <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
                <ButtonLink href={CONTACT_PATH} variant="cobalt" track="demo_request_clicked" trackLabel="demo-contact">Talk to us</ButtonLink>
                <ButtonLink href="/websites" variant="secondary">Websites &amp; Listings</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="brand" aria-labelledby="brand-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Brand and Social Starter Pack</p>
            <h2 id="brand-title">Examples of the pack.</h2>
            <p className="lede">Brand guidelines, editable social templates and reusable prompts, shown here as they are finished.</p>
          </div>
          <p><Link href="/websites#price">Back to the pack and its price</Link></p>
        </div>
      </section>
    </>
  );
}
