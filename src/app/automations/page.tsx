import Image from 'next/image';
import { ContactStrip } from '@/components/pricing/ContactStrip';
import { PriceTable } from '@/components/pricing/PriceTable';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { RegionPlate } from '@/components/ui/RegionPlate';
import { Reveal } from '@/components/ui/Reveal';
import { HeroVideo } from '@/components/ui/HeroVideo';
import { DEMO_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Automations',
  description: 'Fixed-price lead capture, follow-up, viewing and feedback automation for estate agencies and property developers. Works beside your CRM.',
  path: '/automations',
});

const chapters = ['Enquiry arrives', 'Instant automated reply', 'Agent notified', 'Viewing confirmed', 'Feedback collected'];

const leadSteps = [
  'An enquiry arrives from a form, or is entered by your team.',
  'The details are checked and recorded.',
  'The lead goes to your CRM where compatible, or to a simpler agreed place such as a spreadsheet.',
  'The person receives an approved acknowledgement.',
  'The responsible agent is notified or assigned, by the rules you agree.',
  'A follow-up reminder is created, or an approved reminder sequence is sent.',
  'Your team sees and manages the lead where you already work.',
];

const viewSteps = [
  'A buyer or tenant requests a viewing.',
  'The property and preferred time are recorded.',
  'The agent reviews and confirms the appointment.',
  'Only then is the person told it is confirmed.',
  'A reminder goes out before the viewing.',
  'A short feedback form goes out after it.',
  'The feedback reaches the responsible agent.',
  'The agent can be prompted to follow up.',
];

const captured = ['Name and contact details', 'The property or development of interest', 'Buying, renting or another stated interest', 'Budget and preferred area, only if the person chooses to give them', 'Consent and privacy notice wording'];

const install = [
  ['We set it up on your accounts', 'The workflow, forms and message wording are built on accounts you own, with your branding and your approved wording.'],
  ['Choose where leads land', 'Connect it to your CRM where it has a compatible connection, or keep it simple: a Google Sheet your team can open, filter and share.'],
  ['Choose how people get in', 'Your team types details into one simple form, or your website enquiry form starts the workflow on its own.'],
  ['We test it with sample enquiries', 'Every message, reminder and hand-off is checked end to end before it goes live.'],
  ['Handover', 'You receive the logins, written instructions and a list of the services involved. Your team runs it from there.'],
];

export default function AutomationsPage() {
  return (
    <>
      <section className="vhero" aria-labelledby="hero-title">
        <Image className="vhero__dots vhero__dots--a" src="/art/terrain-6-circle-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" priority />
        <Image className="vhero__dots vhero__dots--b" src="/art/terrain-21-fade-right-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container">
          <div className="vhero__head">
            <div>
              <p className="eyebrow">Automations</p>
              <h1 id="hero-title">Lead capture &amp; viewings</h1>
            </div>
            <p className="vhero__desc">Every enquiry recorded, acknowledged and routed. Every viewing confirmed, reminded and followed up.</p>
          </div>
          <HeroVideo title="Watch how the automations work" />
          <p className="vhero__note">Illustrative walkthrough with voice-over, about 80 seconds, with fictional people and properties.</p>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="chapters-title">
        <div className="container">
          <h2 id="chapters-title" className="visually-hidden">What the walkthrough shows</h2>
          <ol className="chapters" aria-label="What the walkthrough shows">
            {chapters.map((c, i) => <li key={c}><span>0{i + 1}</span>{c}</li>)}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="lead-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Automation one</p>
            <h2 id="lead-title">Lead capture and follow-up.</h2>
            <p className="lede">Every enquiry is recorded, acknowledged, routed and followed up, so none is forgotten.</p>
            <h3 style={{ marginTop: 'var(--s-6)', fontSize: 'var(--step-1)' }}>What the form can capture</h3>
            <ul className="ticks">{captured.map((c) => <li key={c}>{c}</li>)}</ul>
            <p className="small muted">We collect only what is necessary for your stated purpose.</p>
          </div>
          <Reveal>
            <ol className="steplist">{leadSteps.map((s, i) => <li key={s}><span>0{i + 1}</span>{s}</li>)}</ol>
          </Reveal>
        </div>
      </section>

      <section className="section section--wash" aria-labelledby="view-title">
        <div className="container split split--reverse">
          <div>
            <p className="eyebrow">Automation two</p>
            <h2 id="view-title">Viewing and feedback.</h2>
            <p className="lede">Viewing requests are confirmed by your agent, reminded, and followed by a feedback request.</p>
            <p style={{ marginTop: 'var(--s-4)' }}>The agent approves an appointment before the person is told it is confirmed. Your team still schedules viewings and responds to feedback.</p>
          </div>
          <Reveal>
            <ol className="steplist">{viewSteps.map((s, i) => <li key={s}><span>0{i + 1}</span>{s}</li>)}</ol>
          </Reveal>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="channels-title">
        <div className="container">
          <p className="eyebrow">Channels</p>
          <h2 id="channels-title">How the messages are sent.</h2>
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Message channels, scrolls sideways on small screens">
            <table className="table table--ink">
              <thead><tr><th scope="col">Channel</th><th scope="col">Status</th><th scope="col">What to know</th></tr></thead>
              <tbody>
                <tr><th scope="row">Email</th><td><Chip tone="available">Standard</Chip></td><td>Sent from your own address or domain. Your email provider’s costs, if any, are yours.</td></tr>
                <tr><th scope="row">SMS</th><td><Chip tone="neutral">Optional</Chip></td><td>Sent through your own account with a messaging provider. You pay per message. Some countries require a registered sender name, which we will check for your provider.</td></tr>
                <tr><th scope="row">WhatsApp</th><td><Chip tone="neutral">On approval</Chip></td><td>Through an approved WhatsApp integration, once your account, access and message templates are confirmed.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="small" style={{ marginTop: 'var(--s-4)', opacity: 0.8 }}>Messages go only to people who gave their details for this purpose, and every message includes a way to opt out. The workflows never state property availability, pricing, legal or investment claims that have not been verified.</p>
        </div>
      </section>

      <section className="section" aria-label="Photographs">
        <div className="container">
          <div className="band">
            <RegionPlate slot="autoA" ratio="3 / 2" />
            <RegionPlate slot="autoB" ratio="3 / 2" />
            <RegionPlate slot="autoC" ratio="3 / 2" />
          </div>
        </div>
      </section>

      <section className="section section--wash" id="price" aria-labelledby="price-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Price</p>
            <h2 id="price-title">Pricing</h2>
          </div>
          <PriceTable ids={['lead', 'viewing', 'both']} lines={{ lead: 'Fixed-price installation.', viewing: 'Fixed-price installation.', both: 'Reuses shared components. The website is separate.' }} />
          <ContactStrip />
          <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
            <ButtonLink href={DEMO_PATH} variant="secondary" track="demo_request_clicked" trackLabel="automations-price">View demo</ButtonLink>
            <ButtonLink href="/websites" variant="secondary">Websites and listings</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section--dots" aria-labelledby="install-title">
        <Image className="section__dots" src="/art/terrain-6-circle-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Installation</p>
            <h2 id="install-title">How it is installed.</h2>
            <p>It connects to the tools you already use, and does not replace them.</p>
          </div>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {install.map(([t, d], i) => (
              <li key={t}><span className="bn" style={{ fontSize: '1.6rem' }}>0{i + 1}</span><h3>{t}</h3><p>{d}</p><span /></li>
            ))}
          </ol>
          <p className="small muted" style={{ marginTop: 'var(--s-5)' }}>Quoted separately: more complex CRM connections, more than one website or lead source, advanced lead scoring, custom integrations, portal feeds and live calendar sync.</p>
        </div>
      </section>
    </>
  );
}
