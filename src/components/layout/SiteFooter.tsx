import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { footerNav, siteConfig } from '@/config/site';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = Object.entries(siteConfig.social).filter(([, v]) => v) as [string, string][];
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo variant="dark" />
            <p className="footer-statement">{siteConfig.tagline}</p>
            <p className="small" style={{ marginTop: 'var(--s-4)', maxWidth: '30rem', color: 'color-mix(in srgb, var(--paper) 78%, transparent)' }}>
              Fieldwork is new. The free exercise is live. Paid products and the business onboarding platform are planned, and we say so wherever they appear.
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
          <span>Written in British English. Prices shown separately for the UK and Nigeria.</span>
          {socials.length > 0 && (
            <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
              {socials.map(([k, v]) => (
                <li key={k} style={{ margin: 0 }}><a href={v} rel="noopener noreferrer" target="_blank" style={{ textTransform: 'capitalize' }}>{k}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
