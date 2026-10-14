import { LegalReviewBox } from '@/components/ui/LegalReviewBox';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';
import { PRIVACY_NOTICE_VERSION } from '@/lib/validation';

export const metadata = pageMetadata({
  title: 'Privacy notice (draft)',
  description: 'What personal information Fieldwork collects through its website forms, what stays on your device, who processes it and your rights in the UK and Nigeria.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const email = siteConfig.email.privacy ?? siteConfig.email.general;
  return (
    <section className="section">
      <div className="container container--narrow legal prose" style={{ maxWidth: 'var(--container-narrow)' }}>
        <p className="eyebrow">Legal</p>
        <h1 style={{ fontSize: 'var(--step-4)' }}>Privacy notice</h1>
        <p className="muted">Version {PRIVACY_NOTICE_VERSION}</p>
        <LegalReviewBox doc="notice" />

        <h2>Who is responsible</h2>
        <p>{siteConfig.legal.entityName ? <>This website is operated by {siteConfig.legal.entityName}.</> : <>The business operating this website has not been confirmed yet. Operator and registered details will appear here before the site is launched.</>}{' '}
          {email ? <>To ask about your information, email <a href={`mailto:${email}`}>{email}</a>.</> : <>A privacy contact address will be published here before launch. Until then, use the contact forms on this site.</>}</p>

        <h2>What stays on your device</h2>
        <p>The free exercise, the assessment and the pricing market switch work in your browser. What you type into them is stored only in your browser (in local storage) so you can continue later. It is not sent to us. Fieldwork does not send your entries to any AI model. You can clear your exercise entries from the last step of the exercise, or by clearing site data in your browser.</p>
        <table className="table" style={{ minWidth: 0 }}>
          <caption>Browser storage used by this site</caption>
          <thead><tr><th scope="col">Key</th><th scope="col">Purpose</th><th scope="col">Lifetime</th></tr></thead>
          <tbody>
            <tr><th scope="row">fw-learn-v1</th><td>Saves your progress and entries in the free exercise</td><td>Until you clear it</td></tr>
            <tr><th scope="row">fw-market</th><td>Remembers UK or Nigeria on the pricing page</td><td>Until you clear it</td></tr>
            <tr><th scope="row">fw-consent</th><td>Remembers your analytics choice</td><td>Until you clear it</td></tr>
            <tr><th scope="row">fw-attribution</th><td>Remembers which campaign link brought you here, only used if you later submit a form</td><td>This browser tab session</td></tr>
          </tbody>
        </table>

        <h2>What we collect when you submit a form</h2>
        <p>If you submit a form, we receive what you type (such as your name, email address, company, role, location, team size and message) and the page you were on. If you arrived through a campaign link we also receive its source, medium and campaign names, and the website you came from. We record that you agreed, the version of this notice and the time. We ask only for what we need.</p>

        <h2>Why we use it, and our lawful basis</h2>
        <ul>
          <li><strong>To reply to your enquiry or request.</strong> Basis: taking steps at your request, or our legitimate interest in responding to enquiries.</li>
          <li><strong>To email you about new exercises and products if you opt in.</strong> Basis: your consent, which you can withdraw at any time.</li>
          <li><strong>To understand which pages and campaigns are useful.</strong> Basis: your consent, if analytics is switched on (see Cookies and storage).</li>
        </ul>
        <p className="small muted">Lawful bases need confirming by a qualified adviser for each country where we operate.</p>

        <h2>Who processes it</h2>
        <p>We use service providers to run the site and handle submissions. These are configured by the operator before launch and this section will name them. At the time of writing the site is designed to work with: a hosting provider (Vercel); a form delivery destination chosen by the operator (such as an email notification service or a customer relationship tool); and, if enabled, a privacy-focused analytics provider. We do not sell personal data and we do not use advertising trackers.</p>
        <p className="small muted">International transfers: some providers process data outside the UK and Nigeria. Safeguards must be confirmed once providers are chosen.</p>

        <h2>How long we keep it</h2>
        <p>Proposed: enquiries for up to 24 months after the last contact; email list details until you unsubscribe; consent records for as long as we hold the related contact. <em>These periods need to be confirmed.</em></p>

        <h2>Your rights</h2>
        <p>In the UK, under the UK GDPR, you can ask to access, correct or delete your information, restrict or object to its use, ask for a copy in a portable form, and withdraw consent. You can complain to the Information Commissioner’s Office. In Nigeria, under the Nigeria Data Protection Act 2023, you have similar rights and can complain to the Nigeria Data Protection Commission. To use any right, contact us using the details above.</p>

        <h2>Children</h2>
        <p>This site is not aimed at children under 16, and we do not knowingly collect their information.</p>

        <h2>Changes</h2>
        <p>If this notice changes in a way that matters, we will update the version number above.</p>
      </div>
    </section>
  );
}
