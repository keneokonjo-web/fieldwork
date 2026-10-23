import Link from 'next/link';
import { DEMO_PATH } from '@/config/site';

/** A clickable preview of the demonstration website. The live demo opens from here. */
export function DemoPreview({ label = 'View demo', className = '' }: { label?: string; className?: string }) {
  return (
    <Link href={DEMO_PATH} className={`demoprev ${className}`.trim()} aria-label={`${label}: open the demonstration website`} data-track="demo_request_clicked" data-track-label="demo-preview">
      <span className="demoprev__bar" aria-hidden="true"><i /><i /><i /><b>yourcompany.com</b></span>
      <span className="demoprev__page" aria-hidden="true">
        <span className="demoprev__nav"><b /><s /><s /><s /></span>
        <span className="demoprev__hero"><span className="demoprev__h" /><span className="demoprev__h demoprev__h--s" /><span className="demoprev__btn" /></span>
        <span className="demoprev__cards"><span /><span /><span /></span>
      </span>
      <span className="demoprev__cta"><span>{label}<i aria-hidden="true">→</i></span></span>
    </Link>
  );
}
