import { LegalReviewBox } from '@/components/ui/LegalReviewBox';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Terms of use (draft)',
  description: 'The terms that apply to using the Fieldwork website, the free exercise and Field Notes. Draft pending legal review.',
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
        <p>This website offers a free learning exercise, written guides (Field Notes), information about Fieldwork’s planned and available services, and ways to contact us. Paid products are not on sale at the time of writing.</p>
        <h2>Information, not advice</h2>
        <p>Content here is general information for learning. It is not legal, financial, medical, regulatory or professional advice. Rules on data protection, property descriptions and consumer protection differ between countries and change. Take advice for your own situation.</p>
        <h2>AI tools are your responsibility</h2>
        <p>The free exercise asks you to use a third-party AI tool of your choice. Fieldwork does not control those tools, does not endorse a particular one, and is not responsible for what they produce or how they use what you give them. You are responsible for checking any AI-generated output before you use it, and for not entering information you are not allowed or willing to share.</p>
        <h2>Using the site</h2>
        <p>Use the site lawfully and do not try to disrupt it, probe it for weaknesses or send spam through its forms. We may change or remove content at any time.</p>
        <h2>Our content</h2>
        <p>The Fieldwork name, logo, text and graphics belong to their owner. You may use the workflow cards and prompts you create for your own work. Please do not republish our guides or exercise as your own.</p>
        <h2>Availability and liability</h2>
        <p>We aim to keep the site working but do not guarantee it will always be available or error-free. Nothing in these terms limits liability that cannot lawfully be limited. <em>Limitation wording, governing law and jurisdiction need to be added after legal review and once the operating entity is confirmed.</em></p>
        <h2>Contact</h2>
        <p>Use the <a href="/contact">contact page</a> for questions about these terms.</p>
      </div>
    </section>
  );
}
