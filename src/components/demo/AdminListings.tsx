'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DemoPhoto } from '@/demo/photo';
import { formatPrice, statusLabel, STATUS_OPTIONS } from '@/demo/format';
import { useEnquiries, useProperties } from '@/demo/store';
import type { PropertyStatus } from '@/demo/data';

export function AdminListings() {
  const { all, patch, remove } = useProperties();
  const { list } = useEnquiries();
  const [q, setQ] = useState(''); const [filter, setFilter] = useState('all');
  const rows = useMemo(() => all.filter((p) => {
    if (q && ![p.title, p.address, p.area].join(' ').toLowerCase().includes(q.toLowerCase())) return false;
    if (filter === 'published') return p.published; if (filter === 'draft') return !p.published;
    if (filter === 'closed') return p.status === 'sold' || p.status === 'let';
    return true;
  }), [all, q, filter]);
  const stats = { pub: all.filter((p) => p.published).length, draft: all.filter((p) => !p.published).length, closed: all.filter((p) => p.status === 'sold' || p.status === 'let').length, enq: list.filter((e) => e.status === 'new').length };

  return (
    <>
      <h1>Listings</h1>
      <p className="d-note">Add, edit and publish properties. The public website updates the moment you save.</p>
      <div className="d-tiles">
        <div className="d-tile"><b>{stats.pub}</b><span>Published</span></div><div className="d-tile"><b>{stats.draft}</b><span>Drafts</span></div>
        <div className="d-tile"><b>{stats.closed}</b><span>Sold or let</span></div><div className="d-tile"><b>{stats.enq}</b><span>New viewing requests</span></div>
      </div>
      <div className="d-toolbar">
        <div className="d-actions">
          <input className="d-input" aria-label="Search listings" placeholder="Search listings" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="d-select" aria-label="Filter listings" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All listings</option><option value="published">Published</option><option value="draft">Drafts</option><option value="closed">Sold or let</option></select>
        </div>
        <Link href="/demo/admin/properties/new" className="d-btn">+ Add property</Link>
      </div>
      <div className="d-tablewrap" tabIndex={0} role="region" aria-label="Listings, scrolls sideways on small screens">
        <table className="d-table">
          <thead><tr><th scope="col">Property</th><th scope="col">Price</th><th scope="col">Status</th><th scope="col">Visibility</th><th scope="col">Actions</th></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} data-row={p.id}>
                <th scope="row">
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <DemoPhoto className="d-thumb" src={p.images[0] ?? 'prop-exterior-white'} ratio="4 / 3" sizes="80px" alt="" />
                    <div><span className="d-rowtitle">{p.title}</span><span className="d-rowsub">{p.area} · {p.listing === 'rent' ? 'To let' : 'For sale'} · {p.beds} bed</span></div>
                  </div>
                </th>
                <td>{formatPrice(p)}</td>
                <td>
                  <select className="d-select" style={{ minHeight: '2.3rem', padding: '0.3rem 0.5rem', width: 'auto' }} aria-label={`Status of ${p.title}`} value={p.status} onChange={(e) => patch(p.id, { status: e.target.value as PropertyStatus })}>
                    {STATUS_OPTIONS[p.listing].map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </td>
                <td><span className={`d-pill ${p.published ? 'd-pill--ok' : 'd-pill--mute'}`}>{p.published ? 'Published' : 'Draft'}</span></td>
                <td>
                  <div className="d-actions">
                    <Link className="d-btn d-btn--ghost d-btn--small" href={`/demo/admin/properties/${p.id}`}>Edit</Link>
                    <Link className="d-btn d-btn--ghost d-btn--small" href={`/demo/properties/${p.id}`} target="_blank">Preview</Link>
                    <button type="button" className="d-btn d-btn--ghost d-btn--small" onClick={() => patch(p.id, { published: !p.published })}>{p.published ? 'Unpublish' : 'Publish'}</button>
                    <button type="button" className="d-btn d-btn--danger d-btn--small" onClick={() => { if (window.confirm(`Delete “${p.title}”? This cannot be undone.`)) remove(p.id); }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={5} className="d-note" style={{ textAlign: 'center', padding: '2rem' }}>No listings match.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="d-note" style={{ marginTop: '1rem' }}>Status wording follows the listing type: “{statusLabel('sale', 'sold')}” for sales and “{statusLabel('rent', 'let')}” for lettings.</p>
    </>
  );
}
