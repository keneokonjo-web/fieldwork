import { ButtonLink } from '@/components/ui/ButtonLink';
import { Plate } from '@/components/ui/Plate';
import { FREE_EXPERIENCE_PATH } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About Fieldwork',
  description: 'Fieldwork is a new practical AI learning company. Learn by doing, put knowledge to work. What we believe, how we work and what is and is not available yet.',
  path: '/about',
});

const beliefs = [
  ['Learning is something you do.', 'You learn a tool by using it on a job that matters to you, then looking honestly at what happened.'],
  ['Checking is part of the skill.', 'Fluent is not the same as correct. We teach people to test results, not just produce them.'],
  ['Be honest about status.', 'Fieldwork is new. We say what exists, what is planned and what we have not tested.'],
  ['Work with what people have.', 'Free tools, mobile connections, local prices and local examples, in both the UK and Nigeria.'],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero--wide">
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">About</p>
            <h1>Learn by doing. <em>Put knowledge to work.</em></h1>
            <p className="lede">Fieldwork is a practical AI learning company. It is named after a way of learning: go out, try things on real material, and write down what happened.</p>
          </div>
          <Plate photo="work-library-team" ratio="4 / 3" priority label={<><b>Plate 01. Fieldwork</b>Stock photograph, illustrative.</>} />
        </div>
      </section>
      <section className="section section--stone">
        <div className="container container--narrow prose" style={{ maxWidth: 'var(--container-narrow)' }}>
          <h2 style={{ marginTop: 0 }}>Where we are</h2>
          <p>Fieldwork is new. We are not going to invent a founding story, a team of experts or a list of clients. What exists today is a free guided exercise, a set of Field Notes guides and a way of training business teams that we are testing with real estate.</p>
          <p>We would rather you judge us on whether the exercise is useful than on a history we do not have.</p>
          <h2>What we do</h2>
          <p>For individuals, we build guided practice around real tasks. For businesses, starting with real estate, we train staff on the work they already do, and we are planning an onboarding platform that does not yet exist.</p>
          <h2>The method</h2>
          <p>Every exercise uses four moves: brief, run, check, keep. Write a clear brief, run it in the tool you already use, check the result against your source, and keep what worked as a reusable workflow.</p>
        </div>
      </section>
      <section className="section" aria-labelledby="beliefs-title">
        <div className="container">
          <div className="section__head"><p className="eyebrow">What we believe</p><h2 id="beliefs-title">Four working principles.</h2></div>
          <div className="grid grid--2">
            {beliefs.map(([t, d], i) => <div className="card" key={t}><p className="index">0{i + 1}</p><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>
      <section className="section section--ink">
        <div className="container split">
          <div><p className="eyebrow">Independent</p><h2>No tool vendor writes our advice.</h2><p className="lede">We are not sponsored by any AI company. When we compare tools in Field Notes, we will say exactly what was tested, when and by whom.</p></div>
          <div className="btn-row"><ButtonLink href={FREE_EXPERIENCE_PATH} variant="light" track="consumer_cta_clicked" trackLabel="about">Try the free exercise</ButtonLink><ButtonLink href="/contact" variant="outline-light">Get in touch</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
