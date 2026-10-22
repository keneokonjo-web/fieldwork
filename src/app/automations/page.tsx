import { PriceTable } from '@/components/pricing/PriceTable';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { DEMO_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Automations',
  description: 'Fixed-price lead capture, follow-up, viewing and feedback automation for estate agencies and property developers. Works beside your CRM.',
  path: '/automations',
});

const ways = [
  ['A simple entry form', 'Your team types a client’s details into one screen. The workflow does the rest.'],
  ['Your website enquiry form', 'Enquiries from the Fieldwork website, or another website you already have, start the workflow automatically.'],
  ['Your CRM or a spreadsheet', 'Pushing entries in from a CRM or Google Sheet is possible for a defined set-up, and is quoted where it needs extra work.'],
];

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

export default function AutomationsPage() {
  return (
    <>
      <section className="hero hero--page corners" aria-labelledby="hero-title">
        <Corners n="03" letters={['A', 'U', 'T']} />
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">Automations</p>
            <h1 id="hero-title">Enquiries answered. Viewings confirmed.</h1>
            <p className="lede">Two fixed-price workflows for property businesses. Use them with our website or on their own. They improve one part of your process and do not replace your CRM.</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href={DEMO_PATH} variant="cobalt" track="demo_request_clicked" trackLabel="automations-hero">Request a demo</ButtonLink>
              <ButtonLink href="#price" variant="secondary">See the prices</ButtonLink>
            </div>
          </div>
          <Plate photo="uk-agent-sign" ratio="4 / 3" priority sizes="(min-width: 62rem) 40vw, 100vw" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero__big" src="/brand/logo/fieldwork-wordmark-light.svg" alt="" width={607} height={138} aria-hidden="true" />
      </section>

      <section className="section" aria-labelledby="ways-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Three ways in</p>
            <h2 id="ways-title">Start the workflow however you work today.</h2>
            <p>We keep only a simple log of who was contacted and what was sent, so reminders can go out. It is not a CRM, and you can export it.</p>
          </div>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {ways.map(([t, d], i) => (
              <li key={t}><span className="bn" style={{ fontSize: '1.6rem' }}>0{i + 1}</span><h3>{t}</h3><p>{d}</p><span /></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--wash" aria-labelledby="lead-title">
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

      <section className="section" aria-labelledby="view-title">
        <div className="container split split--reverse">
          <div>
            <p className="eyebrow">Automation two</p>
            <h2 id="view-title">Viewing and feedback.</h2>
            <p className="lede">Viewing requests are confirmed by your agent, reminded, and followed by a feedback request.</p>
            <p style={{ marginTop: 'var(--s-4)' }}>It starts as request and confirm: the agent approves an appointment before the person is told it is confirmed. Live calendar synchronisation is not part of the standard package.</p>
            <p className="small muted">Your team still schedules viewings and responds to feedback. Fieldwork does not do that for you.</p>
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
                <tr><th scope="row">WhatsApp</th><td><Chip tone="planned">Planned</Chip></td><td>Only through an approved integration, after your account, access and message templates are confirmed. We will not promise it before then.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="small" style={{ marginTop: 'var(--s-4)', opacity: 0.8 }}>Messages are sent only to people who gave their details for this purpose, and every message includes a way to opt out. The workflows never state property availability, pricing, legal or investment claims that have not been verified.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="scope-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Scope</p>
            <h2 id="scope-title">What one installation includes.</h2>
            <ul className="ticks ticks--large">
              <li>One agreed lead source.</li>
              <li>One agreed destination.</li>
              <li>A defined acknowledgement sequence.</li>
              <li>A defined follow-up workflow.</li>
              <li>Written handover, and you own and run the result.</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Quoted separately</p>
            <ul className="ticks">
              <li>More complex CRM integrations.</li>
              <li>More than one website or lead source.</li>
              <li>Advanced lead scoring or branching logic.</li>
              <li>Custom integrations.</li>
              <li>Portal feeds and live calendar sync.</li>
            </ul>
            <Plate photo="home-living-premium" ratio="3 / 2" className="mt" />
          </div>
        </div>
      </section>

      <section className="section section--wash" id="price" aria-labelledby="price-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Price</p>
            <h2 id="price-title">Buy one, or both together.</h2>
          </div>
          <PriceTable ids={['lead', 'viewing', 'both']} lines={{ lead: 'Fixed-price installation.', viewing: 'Fixed-price installation.', both: 'Reuses shared components. The website is not included.' }} />
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <ButtonLink href={DEMO_PATH} variant="cobalt" track="demo_request_clicked" trackLabel="automations-price">Request a demo</ButtonLink>
            <ButtonLink href="/websites" variant="secondary">Websites and listings</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
