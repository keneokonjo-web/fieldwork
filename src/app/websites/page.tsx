import { PriceInline, PriceTable } from '@/components/pricing/PriceTable';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Chip } from '@/components/ui/Chip';
import { Corners } from '@/components/ui/Corners';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { DEMO_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Websites and Listings',
  description: 'A professional real-estate website with a listing system your team manages itself. For estate agencies and property developers in the UK and Nigeria.',
  path: '/websites',
});

const included = [
  ['Homepage', 'Company introduction, property discovery, featured properties or developments, and clear ways to enquire.'],
  ['Company profile', 'About the company, services, areas covered and credentials you approve.'],
  ['Property portfolio', 'Browse and filter listings, with a detail page and photo gallery for each property.'],
  ['Contact and enquiries', 'Contact details and enquiry forms, routed to the right person if you add an automation.'],
  ['Every screen size', 'Designed for mobile, tablet and desktop, with images prepared to load quickly.'],
  ['Technical basics', 'Page titles and descriptions, sitemap, accessible design, basic security and form validation. Analytics if you ask for it.'],
  ['Handover', 'Admin logins, written instructions, a record of the services involved and how to take ownership.'],
];

const admin = [
  'Sign in securely',
  'Add and edit properties',
  'Upload, remove and reorder photos',
  'Save drafts and preview',
  'Publish and unpublish',
  'Mark sold, let or reserved',
  'Enter price, location, features and type',
  'Delete listings',
];

const rows = [
  ['14 Marlow Court', 'Flat · 2 bed', 'Published', 'available'],
  ['Parkview Residences, Unit 6', 'Apartment · 3 bed', 'Reserved', 'planned'],
  ['9 Alder Row', 'House · 4 bed', 'Draft', 'neutral'],
  ['Harbour Point, Unit 11', 'Apartment · 1 bed', 'Sold', 'neutral'],
] as const;

const brandItems = [
  'Brand guideline document',
  'Logo usage guidance and brand assets (existing logo, or a scoped refinement)',
  'Brand colours and typography',
  'Social profile guidance',
  'Editable templates: property spotlight, new listing, company introduction, educational content, market insight',
  'Example captions and content structures, with suggested content themes',
  'Reusable AI prompts, and guidance so your team can keep producing on-brand content itself',
];

export default function WebsitesPage() {
  return (
    <>
      <section className="hero hero--page corners" aria-labelledby="hero-title">
        <Corners n="02" letters={['W', 'E', 'B']} />
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">Websites &amp; Listings</p>
            <h1 id="hero-title">A website you manage yourself.</h1>
            <p className="lede">A professional real-estate website with a built-in listing system. Add, edit and publish properties without calling us.</p>
            <p className="hero__price"><span className="index">Digital Presence Package</span><span className="price"><PriceInline id="website" /></span></p>
            <div className="btn-row" style={{ marginTop: 'var(--s-5)' }}>
              <ButtonLink href={DEMO_PATH} variant="cobalt" track="demo_request_clicked" trackLabel="websites-hero">Request a demo</ButtonLink>
              <ButtonLink href="#price" variant="secondary">See the price</ButtonLink>
            </div>
          </div>
          <Plate photo="ng-lagos-skyline" ratio="4 / 3" priority sizes="(min-width: 62rem) 40vw, 100vw" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero__big" src="/brand/logo/fieldwork-wordmark-light.svg" alt="" width={607} height={138} aria-hidden="true" />
      </section>

      <section className="section" aria-labelledby="included-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What is included</p>
            <h2 id="included-title">One package: website and listings together.</h2>
            <p>The website and the listing system are a single deliverable, not two products.</p>
          </div>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {included.map(([t, d], i) => (
              <li key={t}><span className="bn" style={{ fontSize: '1.6rem' }}>0{i + 1}</span><h3>{t}</h3><p>{d}</p><span /></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--wash" aria-labelledby="admin-title">
        <div className="container split">
          <div>
            <p className="eyebrow">The listing system</p>
            <h2 id="admin-title">Your team runs the listings.</h2>
            <p className="lede">A simple administrator screen for non-technical staff. When a listing is published or edited, the public website updates by itself.</p>
            <ul className="ticks ticks--large" style={{ marginTop: 'var(--s-5)' }}>
              {admin.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <p className="small muted" style={{ marginTop: 'var(--s-4)' }}>Search and filters cover area, property type, price range and sale or rental status. More advanced search is scoped per project.</p>
          </div>
          <Reveal>
            <div className="mock" role="img" aria-label="Illustration of the listing administrator screen with four fictional properties and their statuses.">
              <div className="mock__bar"><span>Listings</span><span className="mock__btn">+ Add property</span></div>
              <div className="mock__tabs"><b>All (4)</b><span>Published</span><span>Drafts</span><span>Sold</span></div>
              {rows.map(([name, kind, status, tone]) => (
                <div className="mock__row" key={name}>
                  <span className="mock__thumb" />
                  <span><b>{name}</b><small>{kind}</small></span>
                  <Chip tone={tone as 'available' | 'planned' | 'neutral'}>{status}</Chip>
                </div>
              ))}
            </div>
            <p className="shot__cap"><b>Illustration</b><span>Fictional properties. A live demonstration is being built.</span></p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="two-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Two set-ups, one foundation</p>
            <h2 id="two-title">For agencies and for developers.</h2>
            <p>Both use the same system. The difference is the wording and one extra level for developments.</p>
          </div>
          <div className="who">
            <Reveal className="who__col">
              <Plate photo="uk-terrace" ratio="3 / 2" />
              <h3>Estate agency set-up</h3>
              <ul className="ticks">
                <li>Individual properties for sale or to let.</li>
                <li>Statuses: available, let, sold, reserved.</li>
                <li>Search by area, type, price and status.</li>
              </ul>
            </Reveal>
            <Reveal className="who__col" delay={90}>
              <Plate photo="ng-lekki" ratio="3 / 2" />
              <h3>Developer set-up</h3>
              <ul className="ticks">
                <li>A landing page for each development, with photos and approved descriptions.</li>
                <li>Homes or units inside it, with available, reserved and sold.</li>
                <li>Enquiry forms linked to the development.</li>
              </ul>
            </Reveal>
          </div>
          <p className="small muted" style={{ marginTop: 'var(--s-5)' }}>Advanced unit availability, property feeds, interactive maps and links to external inventory systems are quoted separately.</p>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="brand-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Optional add-on</p>
            <h2 id="brand-title">Brand and Social Starter Pack.</h2>
            <p className="lede">A one-off pack of editable assets and guidance, so your brand looks the same on the website and on social media. It is not an ongoing social media service.</p>
            <div className="prices prices--ink" style={{ marginTop: 'var(--s-5)' }}>
              <p className="index">Starter Pack</p>
              <p className="price"><PriceInline id="brand" /></p>
              <p className="small">Defined quantities of templates and a set number of revisions. No unlimited designs and no ongoing posting.</p>
            </div>
          </div>
          <div>
            <ul className="ticks ticks--large">
              {brandItems.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <p className="small" style={{ marginTop: 'var(--s-4)', opacity: 0.8 }}>Delivered in formats you can actually edit, with instructions.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="handover-title">
        <div className="container split">
          <Reveal><Plate photo="ng-abuja" ratio="4 / 3" /></Reveal>
          <div>
            <p className="eyebrow">Handover and limits</p>
            <h2 id="handover-title">Yours when it is finished.</h2>
            <ul className="ticks">
              <li>Administrator credentials, and instructions for adding, editing and removing listings.</li>
              <li>Domain and hosting access or transfer, with ownership terms set in the contract.</li>
              <li>A record of the third-party services involved and how to manage them.</li>
              <li>You pay your own hosting and subscriptions. Ongoing maintenance is not assumed to be included.</li>
              <li>Defined support for faults and handover questions. It is not unlimited support.</li>
              <li>Anything outside the agreed scope is quoted separately.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--wash" id="price" aria-labelledby="price-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Price</p>
            <h2 id="price-title">One price for the build.</h2>
          </div>
          <PriceTable ids={['website', 'brand']} lines={{ website: 'Website and listing system, together.', brand: 'Optional add-on, bought with the website.' }} />
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <ButtonLink href={DEMO_PATH} variant="cobalt" track="demo_request_clicked" trackLabel="websites-price">Request a demo</ButtonLink>
            <ButtonLink href="/automations" variant="secondary">Add automations</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
