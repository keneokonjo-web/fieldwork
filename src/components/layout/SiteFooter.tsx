import Link from 'next/link';
import { footerNav, siteConfig } from '@/config/site';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = Object.entries(siteConfig.social).filter(([, v]) => v) as [string, string][];
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="footer-statement">{siteConfig.tagline}</p>
            <p className="small muted" style={{ marginTop: 'var(--s-4)', maxWidth: '28rem' }}>
              Fieldwork is new. We have no client results to show yet. Product demonstrations are being built, and anything not yet available is marked that way.
            </p>
          </div>
          <div className="footer-cols">
            {Object.entries(footerNav).map(([title, links]) => (
              <nav key={title} aria-label={title}>
                <h2>{title}</h2>
                <ul>
                  {links.map((l) => (
                    <li key={l.href + l.label}><Link href={l.href}>{l.label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Fieldwork. {siteConfig.legal.entityName ? siteConfig.legal.entityName : ''}</span>
          <span>British English. UK and Nigeria priced separately.</span>
          {socials.length > 0 && (
            <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
              {socials.map(([k, v]) => (
                <li key={k} style={{ margin: 0 }}><a href={v} rel="noopener noreferrer" target="_blank" style={{ textTransform: 'capitalize' }}>{k}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="footer-giant" src="/brand/logo/fieldwork-wordmark-light.svg" alt="" width={607} height={138} aria-hidden="true" />
    </footer>
  );
}
