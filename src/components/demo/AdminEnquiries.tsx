'use client';
import Link from 'next/link';
import { useEnquiries } from '@/demo/store';

export function AdminEnquiries() {
  const { list, confirm, remove } = useEnquiries();
  return (
    <>
      <h1>Enquiries</h1>
      <p className="d-note">Enquiries and viewing requests from the website arrive here. A viewing is only confirmed to the visitor once an agent approves it. With Fieldwork’s <Link className="d-link" href="/automations">automations</Link>, acknowledgements, reminders and feedback requests are sent for you.</p>
      {!list.length ? (
        <p className="d-empty" style={{ marginTop: '1.5rem' }}>Nothing yet. Open a property on the <Link className="d-link" href="/demo/properties?listing=sale">public site</Link> and request a viewing to see it appear here.</p>
      ) : (
        <div className="d-tablewrap" tabIndex={0} role="region" aria-label="Enquiries, scrolls sideways on small screens" style={{ marginTop: '1.5rem' }}>
          <table className="d-table">
            <thead><tr><th scope="col">Received</th><th scope="col">From</th><th scope="col">About</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col">Actions</th></tr></thead>
            <tbody>
              {list.map((e) => (
                <tr key={e.id}>
                  <td>{new Date(e.at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                  <th scope="row"><span className="d-rowtitle">{e.name}</span><span className="d-rowsub">{e.email}{e.phone ? ` · ${e.phone}` : ''}</span></th>
                  <td>{e.propertyTitle ?? 'General enquiry'}{e.preferredTime && <span className="d-rowsub">Wants {e.preferredTime}</span>}{e.message && <span className="d-rowsub">“{e.message.slice(0, 80)}”</span>}</td>
                  <td>{e.kind === 'viewing' ? 'Viewing request' : 'Enquiry'}</td>
                  <td><span className={`d-pill ${e.status === 'confirmed' ? 'd-pill--ok' : e.status === 'new' ? 'd-pill--warn' : 'd-pill--mute'}`}>{e.status === 'new' ? 'Needs confirming' : e.status === 'confirmed' ? 'Confirmed' : 'Acknowledged'}</span></td>
                  <td><div className="d-actions">{e.kind === 'viewing' && e.status === 'new' && <button type="button" className="d-btn d-btn--small" onClick={() => confirm(e.id)}>Confirm viewing</button>}<button type="button" className="d-btn d-btn--danger d-btn--small" onClick={() => remove(e.id)}>Remove</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
