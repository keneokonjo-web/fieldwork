import { BusinessBuilder } from '@/components/build/BusinessBuilder';
import { Corners } from '@/components/ui/Corners';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Build a business',
  description: 'Choose a type of business or get an idea, then build it step by step: idea, design, product, website, sales and launch. Free to start.',
  path: '/build',
});

export default function BuildPage() {
  return (
    <>
      <section className="page-hero corners" style={{ paddingBottom: 'var(--s-6)' }}>
        <Corners n="14" letters={['B', 'U', 'I']} />
        <div className="container">
          <p className="eyebrow">Individuals · Build a business</p>
          <h1 style={{ fontSize: 'var(--step-5)' }}>Build a business.</h1>
          <p className="lede">Six steps from idea to launch. Free to start. Your answers stay in this browser.</p>
        </div>
      </section>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container"><BusinessBuilder /></div>
        <noscript><div className="container"><p className="alert alert--warning">The builder needs JavaScript to run.</p></div></noscript>
      </section>
    </>
  );
}
