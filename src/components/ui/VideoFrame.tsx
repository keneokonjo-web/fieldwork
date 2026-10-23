import fs from 'node:fs';
import path from 'node:path';

const FILE = '/media/automation-walkthrough.mp4';
const POSTER = '/media/automation-walkthrough-poster.jpg';
const exists = (p: string) => fs.existsSync(path.join(process.cwd(), 'public', p));

/**
 * The automation walkthrough. Drop the finished video at public/media/automation-walkthrough.mp4
 * (and, optionally, a poster image at public/media/automation-walkthrough-poster.jpg) and it plays here, with controls.
 */
export function VideoFrame({ title }: { title: string }) {
  if (exists(FILE)) {
    return (
      <div className="video">
        <video controls preload="metadata" playsInline poster={exists(POSTER) ? POSTER : undefined} aria-label={title}>
          <source src={FILE} type="video/mp4" />
        </video>
      </div>
    );
  }
  return (
    <div className="video video--empty" role="img" aria-label={`${title}. The video will appear here.`}>
      <span className="video__play" aria-hidden="true"><i /></span>
      <span className="video__label">{title}</span>
    </div>
  );
}
