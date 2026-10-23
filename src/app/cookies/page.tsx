import { ConsentSettings } from '@/components/ui/ConsentSettings';
import { LegalReviewBox } from '@/components/ui/LegalReviewBox';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Cookies and browser storage',
  description: 'What Fieldwork stores in your browser, whether analytics is running, and how to change your choice.',
  path: '/cookies',
});

export default function CookiesPage() {
  return (
    <section className="section">
      <div className="container container--narrow legal prose" style={{ maxWidth: 'var(--container-narrow)' }}>
        <p className="eyebrow">Legal</p>
        <h1 style={{ fontSize: 'var(--step-4)' }}>Cookies and browser storage</h1>
        <LegalReviewBox doc="page" />
        <h2>Cookies</h2>
        <p>This site sets one small first-party cookie, <code>fw-landed</code>, for the length of your visit. It only notes that your visit has started, so the address opens the right first page. It is strictly necessary for the site to work as designed and holds no personal data. The site also uses your browser’s local storage and session storage for the purposes listed in the <a href="/privacy">privacy notice</a>: remembering your region and your cookie choice.</p>
        <p>A pop-up asks for your choice about analytics. “Accept all” allows privacy-focused analytics if the site operator has switched it on. “Only necessary” keeps the site to the essentials above. Either way the pop-up does not appear again unless you clear your browser data or change your choice below.</p>
        <h2>Analytics</h2>
        <p>Analytics is off unless the site operator has configured it and you agree. If it is on, we use a privacy-focused tool that does not use advertising trackers, and events never contain your name, email address or what you type. The script is not loaded until you say yes.</p>
        <h2>Your choice</h2>
        <ConsentSettings />
        <h2>Advertising</h2>
        <p>There are no advertising or social media tracking pixels on this site.</p>
      </div>
    </section>
  );
}
