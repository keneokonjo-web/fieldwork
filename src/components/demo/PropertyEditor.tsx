'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AREAS, LIBRARY, PROPERTY_TYPES, type ListingType, type Property, type PropertyStatus } from '@/demo/data';
import { DemoPhoto } from '@/demo/photo';
import { slugify, STATUS_OPTIONS } from '@/demo/format';
import { useProperties } from '@/demo/store';

const BLANK: Property = { id: '', title: '', headline: '', listing: 'sale', status: 'available', published: false, featured: false, propertyType: 'House', price: 0, beds: 3, baths: 2, receptions: 1, sqft: 1200, address: '', area: 'Islington', postcode: '', description: '', features: [], tenure: 'Freehold', epc: 'C', images: [], added: '' };

/** Shrinks an uploaded photograph so it fits comfortably in browser storage. */
async function shrink(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1400 / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas'); c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
  c.getContext('2d')?.drawImage(bmp, 0, 0, c.width, c.height);
  let q = 0.8; let url = c.toDataURL('image/jpeg', q);
  while (url.length > 600_000 && q > 0.4) { q -= 0.1; url = c.toDataURL('image/jpeg', q); }
  return url;
}

function Missing() {
  // The saved listings load from browser storage just after the page appears, so wait a moment before saying a listing is missing.
  const [late, setLate] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLate(true), 700); return () => clearTimeout(t); }, []);
  return late ? <><h1>Listing not found</h1><p><Link className="d-link" href="/demo/admin">Back to listings</Link></p></> : <p className="d-note">Loading…</p>;
}

export function PropertyEditor({ id }: { id: string }) {
  const { all } = useProperties();
  const existing = id === 'new' ? undefined : all.find((p) => p.id === id);
  if (id !== 'new' && !existing) return <Missing />;
  return <EditorForm key={existing?.id ?? 'new'} existing={existing} />;
}

function EditorForm({ existing }: { existing?: Property }) {
  const router = useRouter();
  const { save, remove } = useProperties();
  const [f, setF] = useState<Property>(() => existing ?? BLANK);
  const [featuresText, setFeaturesText] = useState(() => (existing?.features ?? []).join('\n'));
  const [errors, setErrors] = useState<string[]>([]);
  const [saved, setSaved] = useState('');
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const set = <K extends keyof Property>(k: K, v: Property[K]) => setF((p) => ({ ...p, [k]: v }));

  const move = (i: number, d: -1 | 1) => setF((p) => { const a = [...p.images]; const j = i + d; if (j < 0 || j >= a.length) return p; [a[i], a[j]] = [a[j], a[i]]; return { ...p, images: a }; });
  const addKey = (key: string) => setF((p) => (p.images.includes(key) ? p : { ...p, images: [...p.images, key] }));
  const removeImg = (i: number) => setF((p) => ({ ...p, images: p.images.filter((_, n) => n !== i) }));
  const onFiles = async (files: FileList | null) => {
    if (!files) return; setBusy(true);
    try { for (const file of Array.from(files).slice(0, 4)) { if (!file.type.startsWith('image/')) continue; const url = await shrink(file); setF((p) => ({ ...p, images: [...p.images, url] })); } } catch { setErrors(['That image could not be read. Try a JPEG or PNG.']); }
    setBusy(false); if (fileRef.current) fileRef.current.value = '';
  };
  const changeListing = (l: ListingType) => setF((p) => ({ ...p, listing: l, status: 'available', tenure: l === 'rent' ? 'Unfurnished' : 'Freehold' }));

  const commit = (publish: boolean | null, then: 'list' | 'preview') => {
    const problems: string[] = [];
    if (f.title.trim().length < 3) problems.push('Give the property a title.');
    if (!(f.price > 0)) problems.push('Enter a price.');
    if (!f.address.trim()) problems.push('Enter the address.');
    if (f.description.trim().length < 20) problems.push('Write a description of at least a sentence or two.');
    if (!f.images.length) problems.push('Add at least one photograph.');
    setErrors(problems); if (problems.length) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const pid = f.id || `${slugify(f.title)}-${Date.now().toString(36).slice(-4)}`;
    const next: Property = { ...f, id: pid, title: f.title.trim(), features: featuresText.split('\n').map((s) => s.trim()).filter(Boolean), published: publish === null ? f.published : publish, added: f.added || new Date().toISOString() };
    save(next); setF(next); setSaved(next.published ? 'Saved and published. It is live on the website.' : 'Saved as a draft. It is not visible on the website.');
    if (then === 'preview') window.open(`/demo/properties/${pid}`, '_blank'); else router.push('/demo/admin');
  };

  const num = (k: 'price' | 'beds' | 'baths' | 'receptions' | 'sqft') => (e: React.ChangeEvent<HTMLInputElement>) => set(k, Math.max(0, Number(e.target.value) || 0));
  return (
    <>
      <p className="d-note" style={{ margin: 0 }}><Link className="d-link" href="/demo/admin">← Listings</Link></p>
      <h1>{existing ? 'Edit listing' : 'Add a property'}</h1>
      {errors.length > 0 && <div role="alert" className="d-panel" style={{ borderColor: 'var(--d-bad)' }}><b>Please fix the following:</b><ul style={{ marginTop: '0.5rem' }}>{errors.map((e) => <li key={e} className="d-error">{e}</li>)}</ul></div>}
      {saved && <p role="status" className="d-ok" style={{ marginBottom: '1rem' }}>{saved}</p>}
      <div className="d-editor">
        <div>
          <section className="d-panel" aria-labelledby="e-basic">
            <h2 id="e-basic">The property</h2>
            <div className="d-field"><label htmlFor="e-title">Title</label><input className="d-input" id="e-title" value={f.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. 14 Marlow Court" /></div>
            <div className="d-field"><label htmlFor="e-head">Headline (optional)</label><input className="d-input" id="e-head" value={f.headline} onChange={(e) => set('headline', e.target.value)} placeholder="A short line under the title" /></div>
            <div className="d-row2">
              <div className="d-field"><label htmlFor="e-listing">For</label><select className="d-select" id="e-listing" value={f.listing} onChange={(e) => changeListing(e.target.value as ListingType)}><option value="sale">Sale</option><option value="rent">Rent</option></select></div>
              <div className="d-field"><label htmlFor="e-price">Price {f.listing === 'rent' ? '(£ per month)' : '(£)'}</label><input className="d-input" id="e-price" inputMode="numeric" value={f.price || ''} onChange={num('price')} /></div>
            </div>
            <div className="d-row2">
              <div className="d-field"><label htmlFor="e-type">Type</label><select className="d-select" id="e-type" value={f.propertyType} onChange={(e) => set('propertyType', e.target.value)}>{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
              <div className="d-field"><label htmlFor="e-status">Status</label><select className="d-select" id="e-status" value={f.status} onChange={(e) => set('status', e.target.value as PropertyStatus)}>{STATUS_OPTIONS[f.listing].map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
            </div>
            <div className="d-row2">
              <div className="d-field"><label htmlFor="e-beds">Bedrooms</label><input className="d-input" id="e-beds" inputMode="numeric" value={f.beds} onChange={num('beds')} /></div>
              <div className="d-field"><label htmlFor="e-baths">Bathrooms</label><input className="d-input" id="e-baths" inputMode="numeric" value={f.baths} onChange={num('baths')} /></div>
              <div className="d-field"><label htmlFor="e-rec">Receptions</label><input className="d-input" id="e-rec" inputMode="numeric" value={f.receptions} onChange={num('receptions')} /></div>
              <div className="d-field"><label htmlFor="e-sqft">Size (sq ft)</label><input className="d-input" id="e-sqft" inputMode="numeric" value={f.sqft} onChange={num('sqft')} /></div>
            </div>
          </section>

          <section className="d-panel" aria-labelledby="e-loc">
            <h2 id="e-loc">Location</h2>
            <div className="d-field"><label htmlFor="e-addr">Address</label><input className="d-input" id="e-addr" value={f.address} onChange={(e) => set('address', e.target.value)} /></div>
            <div className="d-row2">
              <div className="d-field"><label htmlFor="e-area">Area</label><input className="d-input" id="e-area" list="e-areas" value={f.area} onChange={(e) => set('area', e.target.value)} /><datalist id="e-areas">{AREAS.map((a) => <option key={a} value={a} />)}</datalist></div>
              <div className="d-field"><label htmlFor="e-pc">Postcode</label><input className="d-input" id="e-pc" value={f.postcode} onChange={(e) => set('postcode', e.target.value.toUpperCase())} /></div>
            </div>
            <div className="d-row2">
              <div className="d-field"><label htmlFor="e-tenure">{f.listing === 'rent' ? 'Terms' : 'Tenure'}</label><input className="d-input" id="e-tenure" value={f.tenure} onChange={(e) => set('tenure', e.target.value)} /></div>
              <div className="d-field"><label htmlFor="e-epc">Energy rating</label><select className="d-select" id="e-epc" value={f.epc} onChange={(e) => set('epc', e.target.value)}>{['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((x) => <option key={x}>{x}</option>)}</select></div>
            </div>
          </section>

          <section className="d-panel" aria-labelledby="e-desc">
            <h2 id="e-desc">Description and features</h2>
            <div className="d-field"><label htmlFor="e-d">Description (leave a blank line between paragraphs)</label><textarea className="d-textarea" id="e-d" style={{ minHeight: '12rem' }} value={f.description} onChange={(e) => set('description', e.target.value)} /></div>
            <div className="d-field"><label htmlFor="e-f">Features (one per line)</label><textarea className="d-textarea" id="e-f" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder={'Walled garden\nUnderfloor heating'} /></div>
          </section>

          <section className="d-panel" aria-labelledby="e-img">
            <h2 id="e-img">Photographs</h2>
            <p className="d-note">The first photograph is the cover. Reorder with the arrows. Uploaded images stay in this browser only.</p>
            <ul className="d-imglist" aria-label="Photographs on this listing">
              {f.images.map((src, i) => (
                <li key={src.slice(0, 40) + i} className="d-imgrow">
                  <DemoPhoto src={src} ratio="4 / 3" sizes="80px" alt="" />
                  <span>{i === 0 ? <b>Cover photograph</b> : `Photograph ${i + 1}`}<br /><small>{src.startsWith('data:') ? 'Uploaded' : LIBRARY.find((l) => l.key === src)?.label ?? src}</small></span>
                  <span className="d-actions">
                    <button type="button" className="d-btn d-btn--ghost d-btn--small" aria-label={`Move photograph ${i + 1} up`} disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
                    <button type="button" className="d-btn d-btn--ghost d-btn--small" aria-label={`Move photograph ${i + 1} down`} disabled={i === f.images.length - 1} onClick={() => move(i, 1)}>↓</button>
                    <button type="button" className="d-btn d-btn--danger d-btn--small" aria-label={`Remove photograph ${i + 1}`} onClick={() => removeImg(i)}>Remove</button>
                  </span>
                </li>
              ))}
              {!f.images.length && <li className="d-note">No photographs yet.</li>}
            </ul>
            <div className="d-field" style={{ marginTop: '1rem' }}><label htmlFor="e-up">Upload photographs</label><input ref={fileRef} id="e-up" className="d-input" type="file" accept="image/*" multiple onChange={(e) => onFiles(e.target.files)} />{busy && <p className="d-note">Processing…</p>}</div>
            <p className="d-label" style={{ margin: '1.2rem 0 0.5rem' }}>Or choose from the library</p>
            <div className="d-libgrid">
              {LIBRARY.map((l) => <button key={l.key} type="button" onClick={() => addKey(l.key)} aria-label={`Add ${l.label}`} title={l.label}><DemoPhoto src={l.key} ratio="4 / 3" sizes="120px" alt="" /></button>)}
            </div>
          </section>
        </div>

        <aside className="d-sticky" aria-label="Publish">
          <section className="d-panel">
            <h2>Publish</h2>
            <p className="d-note" style={{ marginTop: 0 }}>Status: <b>{f.published ? 'Published' : 'Draft'}</b>{existing ? '' : ' (new)'}</p>
            <label className="d-check"><input type="checkbox" checked={f.featured} onChange={(e) => set('featured', e.target.checked)} />Feature on the home page</label>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <button type="button" className="d-btn" onClick={() => commit(true, 'list')}>{f.published ? 'Save changes' : 'Publish'}</button>
              <button type="button" className="d-btn d-btn--ghost" onClick={() => commit(false, 'list')}>Save as draft</button>
              <button type="button" className="d-btn d-btn--ghost" onClick={() => commit(null, 'preview')}>Save and preview</button>
              {existing && <button type="button" className="d-btn d-btn--danger" onClick={() => { if (window.confirm(`Delete “${existing.title}”?`)) { remove(existing.id); router.push('/demo/admin'); } }}>Delete listing</button>}
            </div>
          </section>
          <p className="d-note">Changing the status to sold, let or reserved updates the badge on the website straight away.</p>
        </aside>
      </div>
    </>
  );
}
