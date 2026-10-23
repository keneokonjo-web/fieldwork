import images from '@/content/images.json';
import { Corners } from '@/components/ui/Corners';
import { pageMetadata } from '@/lib/metadata';
import type { Photo } from '@/lib/images';

export const metadata = pageMetadata({
  title: 'Image credits',
  description: 'Who took the photographs on this site, and the licences they are shared under.',
  path: '/image-credits',
});

type Entry = Photo & { page?: string; file: string };
const list = images as Entry[];
const commons = list.filter((i) => i.artist);
const stock = list.filter((i) => !i.artist);

export default function ImageCreditsPage() {
  return (
    <>
      <section className="page-hero corners" style={{ paddingBottom: 'var(--s-6)' }}>
        <Corners n="07" letters={['I', 'M', 'G']} />
        <div className="container">
          <p className="eyebrow">Image credits</p>
          <h1>Photographs and licences.</h1>
          <p className="lede">The photographs on this site show real places in Nigeria, the United Kingdom and the United States. They are illustrative. None shows a Fieldwork client, project or result.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: 'var(--step-2)' }}>Photographs from Wikimedia Commons</h2>
          <p className="muted">Shared under Creative Commons licences that allow reuse with credit. Images may be cropped and resized. Each link goes to the original file, its author and its licence terms.</p>
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Credits for Wikimedia Commons photographs, scrolls sideways on small screens">
            <table className="table credits">
              <thead><tr><th scope="col">Photograph</th><th scope="col">Author</th><th scope="col">Licence</th><th scope="col">Source</th></tr></thead>
              <tbody>
                {commons.map((i) => (
                  <tr key={i.file}>
                    <th scope="row">{i.place ?? i.subject}</th>
                    <td>{i.artist}</td>
                    <td>{i.licence}</td>
                    <td>{i.source ? <a href={i.source} rel="noopener noreferrer" target="_blank">Original file</a> : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 style={{ fontSize: 'var(--step-2)', marginTop: 'var(--s-8)' }}>Stock photographs from Unsplash</h2>
          <p className="muted">Used under the <a href="https://unsplash.com/license" rel="noopener noreferrer" target="_blank">Unsplash Licence</a>, which allows commercial use without permission or attribution. Photographers are not yet individually recorded here. Where people appear, Unsplash does not provide model releases, so the images are not used to imply endorsement.</p>
          <ul className="ticks">
            {stock.map((i) => <li key={i.file}>{i.subject}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
