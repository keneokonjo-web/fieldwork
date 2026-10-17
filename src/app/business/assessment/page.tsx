import { Corners } from '@/components/ui/Corners';
import { Assessment } from '@/components/assessment/Assessment';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Real estate AI workflow assessment',
  description: 'A free five-minute assessment that suggests which workflows to practise first, what is holding your team back and how to start. Results appear on screen, with no sign-up required.',
  path: '/business/assessment',
});

export default function AssessmentPage() {
  return (
    <>
      <section className="page-hero corners">
        <Corners n="09" letters={['A', 'S', 'S']} />
        <div className="container">
          <p className="eyebrow">Free assessment · Real estate</p>
          <h1>Where would AI practice help first?</h1>
          <p className="lede">Eight questions, about five minutes. Report on screen. No email needed.</p>
        </div>
      </section>
      <section className="section section--wash" style={{ paddingTop: 'var(--s-7)' }}>
        <div className="container container--narrow"><div className="form-card"><Assessment /></div></div>
      </section>
    </>
  );
}
