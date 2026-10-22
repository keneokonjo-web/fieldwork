import { LegalReviewBox } from '@/components/ui/LegalReviewBox';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Terms of use (draft)',
  description: 'The terms that apply to using the Fieldwork website. Draft pending legal review.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container container--narrow legal prose" style={{ maxWidth: 'var(--container-narrow)' }}>
        <p className="eyebrow">Legal</p>
        <h1 style={{ fontSize: 'var(--step-4)' }}>Terms of use</h1>
        <LegalReviewBox doc="document" />
        <h2>What this site is</h2>
        <p>This website gives information about Fieldwork’s products and services for property businesses, and ways to ask for a demonstration. Products are not on sale through this website. Each purchase is agreed separately, in writing, with a defined scope.</p>
        <h2>Information, not advice</h2>
        <p>Content here is general information for learning. It is not legal, financial, medical, regulatory or professional advice. Rules on data protection, property descriptions and consumer protection differ between countries and change. Take advice for your own situation.</p>
        <h2>Prices and scope</h2>
        <p>Prices shown on this site are fixed initial offers for an agreed scope. They are not a contract. Anything outside the agreed scope is quoted separately, and third-party costs such as hosting and messaging are paid by you directly to those providers.</p>
        <h2>Using the site</h2>
        <p>Use the site lawfully and do not try to disrupt it, probe it for weaknesses or send spam through its forms. We may change or remove content at any time.</p>
        <h2>Our content</h2>
        <p>The Fieldwork name, logo, text and graphics belong to their owner. Please do not republish our text or designs as your own.</p>
        <h2>Availability and liability</h2>
        <p>We aim to keep the site working but do not guarantee it will always be available or error-free. Nothing in these terms limits liability that cannot lawfully be limited. <em>Limitation wording, governing law and jurisdiction need to be added after legal review and once the operating entity is confirmed.</em></p>
        <h2>Contact</h2>
        <p>Use the <a href="/request-demo">request a demo page</a> for questions about these terms.</p>
      </div>
    </section>
  );
}
