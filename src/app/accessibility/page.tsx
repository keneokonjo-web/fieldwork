import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Accessibility statement',
  description: 'How accessible the Fieldwork website is, how it was checked, known limitations and how to report a problem.',
  path: '/accessibility',
});

export default function AccessibilityPage() {
  const email = siteConfig.email.general;
  return (
    <section className="section">
      <div className="container container--narrow legal prose" style={{ maxWidth: 'var(--container-narrow)' }}>
        <p className="eyebrow">Accessibility</p>
        <h1 style={{ fontSize: 'var(--step-4)' }}>Accessibility statement</h1>
        <p>We want everyone to be able to use Fieldwork. We aim to meet WCAG 2.2 level AA. This is a new site and it has not been independently audited.</p>
        <h2>What we have done</h2>
        <ul>
          <li>Semantic headings, landmarks and a “skip to main content” link.</li>
          <li>Keyboard access to every control, visible focus styles, and a mobile menu you can open, close with Escape and move through with Tab.</li>
          <li>Form labels, error messages linked to fields, and an error summary that takes focus.</li>
          <li>Text contrast checked against WCAG AA for the brand palette. Meaning is never carried by colour alone.</li>
          <li>Motion is subtle and switches off when your device asks for reduced motion.</li>
          <li>Light pages with no video, so they work on slow connections and modest phones.</li>
        </ul>
        <h2>How it was checked</h2>
        <p>We ran automated checks with axe-core, tested keyboard navigation and the mobile menu in a real browser, and reviewed layouts at phone, tablet and desktop widths. We have not yet tested with a range of screen readers or with disabled users. The full results are in the project’s QA report.</p>
        <h2>Known limitations</h2>
        <ul>
          <li>The free exercise needs JavaScript. A text version of the method is available in Field Notes.</li>
          <li>Screen reader testing is limited so far.</li>
        </ul>
        <h2>Tell us about a problem</h2>
        <p>{email ? <>Email <a href={`mailto:${email}`}>{email}</a> or </> : null}use the <a href="/contact">contact form</a>. Say what you were trying to do and which device or assistive technology you use. We will take it seriously and tell you what we can do.</p>
      </div>
    </section>
  );
}
