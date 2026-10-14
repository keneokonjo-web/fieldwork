import { siteConfig } from '@/config/site';

export function LegalReviewBox({ doc }: { doc: string }) {
  const { entityName, lastReviewed } = siteConfig.legal;
  return (
    <div className="alert alert--warning review-box" role="note">
      <h2 style={{ fontSize: 'var(--step-0)', margin: 0, fontFamily: 'var(--font-sans)', letterSpacing: 0 }}>Draft: not yet legally reviewed</h2>
      <p>
        This {doc} describes what the site actually does today. It was drafted without legal review and must be reviewed by a qualified adviser before launch.
        {entityName ? ` Operator: ${entityName}.` : ' The legal entity operating Fieldwork has not been confirmed yet, so no company details are shown.'}
        {lastReviewed ? ` Last legal review: ${lastReviewed}.` : ' It has not been reviewed.'}
      </p>
    </div>
  );
}
