'use client';
import { useSearchParams } from 'next/navigation';
import { EnquiryForm } from '@/components/demo/EnquiryForms';
import { BRAND } from '@/demo/data';

export function ContactPanel() {
  const topic = useSearchParams().get('topic') ?? undefined;
  const valuation = topic === 'valuation';
  return (
    <>
      <div className="d-pagehead"><div className="d-wrap"><span className="d-eyebrow">Contact</span><h1>{valuation ? 'Book a free valuation.' : 'Get in touch.'}</h1><p className="d-lede">{valuation ? 'Tell us a little about your home and we will arrange a visit.' : 'Call, email or send us a message and we will reply within one working day.'}</p></div></div>
      <section className="d-wrap d-split" style={{ paddingBottom: '5rem', alignItems: 'start' }}>
        <div className="d-side" style={{ position: 'static' }}><EnquiryForm kind="enquiry" topic={valuation ? 'valuation' : undefined} /></div>
        <div>
          <h3>Visit</h3><p>{BRAND.address}<br />Monday to Friday 9am to 6pm, Saturday 10am to 4pm</p>
          <h3>Call</h3><p><a className="d-link" href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a></p>
          <h3>Email</h3><p><a className="d-link" href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
          <div className="d-map" role="img" aria-label="Map placeholder"><span>{BRAND.address}<br />Map shown on the live website</span></div>
        </div>
      </section>
    </>
  );
}
