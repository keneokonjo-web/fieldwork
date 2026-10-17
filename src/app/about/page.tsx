import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Corners } from '@/components/ui/Corners';
import { FREE_EXPERIENCE_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About',
  description: 'Fieldwork is a new practical AI learning company. What we believe, how we work, and what is and is not available yet.',
  path: '/about',
});

const beliefs = [
  ['Learning is something you do.', 'Use the tool on a job that matters, then look honestly at what happened.'],
  ['Checking is part of the skill.', 'Fluent is not the same as correct.'],
  ['Be honest about status.', 'We say what exists, what is planned, what is untested.'],
  ['Work with what people have.', 'Free tools, mobile connections, local prices and examples, in the UK and Nigeria.'],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero--wide corners">
        <Corners n="05" letters={['A', 'B', 'T']} />
        <Image className="page-hero__dots" src="/art/terrain-21-fade-right-cobalt-clear.svg" alt="" width={900} height={700} unoptimized aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>Learn by doing. Put knowledge to work.</h1>
          <p className="lede">Fieldwork is named after a way of learning: go out, try things on real material, write down what happened.</p>
        </div>
      </section>
      <section className="section" aria-labelledby="where-title">
        <div className="container">
          <div className="ppr">
            <div className="r"><h2 id="where-title" className="k" style={{ fontSize: '0.75rem' }}>(01) Where we are</h2><p>Fieldwork is new. There is no founding story, expert team or client list to show. There is a free exercise, four Field Notes, and a training method we are testing with real estate. Judge us on whether the exercise is useful.</p></div>
            <div className="r"><h2 className="k" style={{ fontSize: '0.75rem' }}>(02) What we do</h2><p>Guided practice for individuals. Staff training for businesses, real estate first. An onboarding platform is planned and does not exist yet.</p></div>
            <div className="r"><h2 className="k" style={{ fontSize: '0.75rem' }}>(03) The method</h2><p className="res-line">Brief, run, check, keep.</p></div>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="beliefs-title">
        <div className="container">
          <p className="eyebrow">What we believe</p>
          <h2 id="beliefs-title" className="visually-hidden">Four working principles</h2>
          <ol className="index-list" style={{ listStyle: 'none', padding: 0 }}>
            {beliefs.map(([t, d], i) => <li key={t}><span className="bn" style={{ fontSize: '1.9rem' }}>0{i + 1}</span><h3>{t}</h3><p>{d}</p><span /></li>)}
          </ol>
        </div>
      </section>
      <section className="section section--ink">
        <div className="container split">
          <div><p className="eyebrow">Independent</p><h2>No tool vendor writes our advice.</h2></div>
          <div className="btn-row"><ButtonLink href={FREE_EXPERIENCE_PATH} variant="light" track="consumer_cta_clicked" trackLabel="about">Try the free exercise</ButtonLink><ButtonLink href="/contact" variant="outline-light">Get in touch</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
