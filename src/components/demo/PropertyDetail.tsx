'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Late } from '@/components/demo/Late';
import { EnquiryForm } from '@/components/demo/EnquiryForms';
import { PropertyCard } from '@/components/demo/PropertyCard';
import { DemoPhoto } from '@/demo/photo';
import { formatPrice, statusLabel } from '@/demo/format';
import { useProperties } from '@/demo/store';

export function PropertyDetail({ id }: { id: string }) {
  const { all, published } = useProperties();
  const p = all.find((x) => x.id === id);
  const [i, setI] = useState(0);
  const [tab, setTab] = useState<'enquiry' | 'viewing'>('viewing');
  if (!p) {
    return <Late><div className="d-wrap d-pagehead"><h1>We could not find that property.</h1><p className="d-lede">It may have been removed. <Link className="d-link" href="/demo/properties">Browse all properties</Link></p></div></Late>;
  }
  const imgs = p.images.length ? p.images : ['prop-exterior-white'];
  const idx = Math.min(i, imgs.length - 1);
  const similar = published.filter((x) => x.id !== p.id && x.listing === p.listing && x.status === 'available').slice(0, 3);
  const closed = p.status === 'sold' || p.status === 'let';
  const paragraphs = p.description.split(/\n\n+/).filter(Boolean);
  return (
    <div className="d-wrap" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <nav className="d-crumb" aria-label="Breadcrumb"><Link href="/demo">Home</Link> / <Link href={`/demo/properties?listing=${p.listing}`}>{p.listing === 'rent' ? 'To let' : 'For sale'}</Link> / {p.title}</nav>
      {!p.published && <p className="d-preview" role="status"><b>Draft preview.</b> This listing is not visible to the public until it is published in the listing system. <Link className="d-link" href={`/demo/admin/properties/${p.id}`}>Edit listing</Link></p>}
      <div className="d-gallery">
        <div className="d-gallery__main">
          <DemoPhoto src={imgs[idx]} ratio="16 / 9" priority sizes="100vw" alt={`${p.title}, photograph ${idx + 1} of ${imgs.length}`} />
          {imgs.length > 1 && <div className="d-gallery__nav"><button type="button" aria-label="Previous photograph" onClick={() => setI((idx - 1 + imgs.length) % imgs.length)}>←</button><button type="button" aria-label="Next photograph" onClick={() => setI((idx + 1) % imgs.length)}>→</button></div>}
        </div>
        {imgs.length > 1 && (
          <div className="d-gallery__thumbs">
            {imgs.map((src, n) => <button key={src + n} type="button" aria-pressed={n === idx} aria-label={`Show photograph ${n + 1}`} onClick={() => setI(n)}><DemoPhoto src={src} ratio="3 / 2" sizes="20vw" alt="" /></button>)}
          </div>
        )}
      </div>

      <div className="d-prop">
        <div>
          <span className="d-eyebrow">{p.propertyType} · {p.area}{p.status !== 'available' ? ` · ${statusLabel(p.listing, p.status)}` : ''}</span>
          <h1 style={{ fontSize: 'clamp(2rem, 1.3rem + 3vw, 3.6rem)' }}>{p.title}</h1>
          {p.headline && <p className="d-lede">{p.headline}</p>}
          <p className="d-prop__price">{formatPrice(p)}</p>
          <p className="d-note" style={{ margin: 0 }}>{p.address}, {p.area} {p.postcode}</p>
          <ul className="d-facts" aria-label="Key facts">
            <li><b>{p.beds}</b><span>Bedrooms</span></li><li><b>{p.baths}</b><span>Bathrooms</span></li><li><b>{p.receptions}</b><span>Receptions</span></li><li><b>{p.sqft.toLocaleString('en-GB')}</b><span>Sq ft</span></li>
          </ul>
          {paragraphs.map((t, n) => <p key={n} style={{ fontSize: '1.1rem' }}>{t}</p>)}
          {p.features.length > 0 && (<><h3 style={{ marginTop: '2.5rem' }}>Features</h3><ul className="d-feat">{p.features.map((f) => <li key={f}>{f}</li>)}</ul></>)}
          <h3 style={{ marginTop: '2.5rem' }}>Details</h3>
          <dl className="d-kv"><div><dt>Property type</dt><dd>{p.propertyType}</dd></div><div><dt>{p.listing === 'rent' ? 'Terms' : 'Tenure'}</dt><dd>{p.tenure}</dd></div><div><dt>Energy rating</dt><dd>{p.epc}</dd></div><div><dt>Size</dt><dd>{p.sqft.toLocaleString('en-GB')} sq ft</dd></div></dl>
          <h3 style={{ marginTop: '2.5rem' }}>Location</h3>
          <div className="d-map" role="img" aria-label={`Map placeholder for ${p.area}`}><span>{p.address}, {p.area}<br />Map shown on the live website</span></div>
        </div>
        <aside className="d-side" aria-label="Enquire about this property">
          {closed ? (
            <><h3>This property is {statusLabel(p.listing, p.status).toLowerCase()}.</h3><p>See similar homes, or tell us what you are looking for.</p><Link href={`/demo/properties?listing=${p.listing}`} className="d-btn" style={{ width: '100%' }}>Browse properties</Link></>
          ) : (
            <>
              <div className="d-tabs" role="tablist" aria-label="Contact options">
                <button role="tab" type="button" aria-selected={tab === 'viewing'} onClick={() => setTab('viewing')}>Book a viewing</button>
                <button role="tab" type="button" aria-selected={tab === 'enquiry'} onClick={() => setTab('enquiry')}>Enquire</button>
              </div>
              <EnquiryForm key={tab} kind={tab} propertyId={p.id} propertyTitle={p.title} />
            </>
          )}
        </aside>
      </div>

      {similar.length > 0 && (
        <section style={{ marginTop: '5rem' }} aria-labelledby="similar-title">
          <div className="d-sechead"><h2 id="similar-title" style={{ fontSize: '2rem' }}>You might also like</h2></div>
          <div className="d-grid">{similar.map((s) => <PropertyCard key={s.id} p={s} />)}</div>
        </section>
      )}
    </div>
  );
}
