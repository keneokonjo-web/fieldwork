export interface Workflow {
  id: string;
  title: string;
  summary: string;
  aiHelps: string;
  peopleKeep: string;
  practice: string;
  risk: string;
}

/** Real estate workflows used on the real estate page and in the assessment report. */
export const WORKFLOWS: Workflow[] = [
  {
    id: 'listings',
    title: 'Listing preparation and editing',
    summary: 'Turn a sheet of verified facts into a clear first draft, then edit it to the house style.',
    aiHelps: 'Drafting headlines, descriptions and key features from facts someone has confirmed. Tidying tone and structure so listings read consistently across the office.',
    peopleKeep: 'Confirming every fact. Tenure, service charge, measurements and certificates come from documents. A person approves each listing.',
    practice: 'Write a brief for a listing from a fact sheet. Run it. Check every claim against the sheet. Fix what the tool added.',
    risk: 'Drafts that add attractive details that are not true. Misleading descriptions are a regulatory risk.',
  },
  {
    id: 'comms',
    title: 'Enquiries and lead follow-up',
    summary: 'Draft clear, consistent replies to routine enquiries, viewing requests and follow-ups.',
    aiHelps: 'First drafts of replies, viewing confirmations and follow-up messages in the agency’s tone.',
    peopleKeep: 'Facts about availability and price. Anything sensitive or negotiated. Sending.',
    practice: 'Brief a reply from an anonymised enquiry. Compare two tones. Agree the office standard.',
    risk: 'Pasting customer personal data into a tool that has not been approved for it.',
  },
  {
    id: 'feedback',
    title: 'Viewing feedback and vendor or landlord updates',
    summary: 'Turn short notes from several viewings into a clear, balanced update.',
    aiHelps: 'Summarising and structuring feedback into a short update.',
    peopleKeep: 'Judging what matters. Keeping negative feedback honest rather than smoothed away.',
    practice: 'Summarise five anonymised feedback notes. Check nothing was softened or invented.',
    risk: 'Summaries that quietly drop unwelcome feedback.',
  },
  {
    id: 'research',
    title: 'Research and organising information',
    summary: 'Collect, sort and summarise information from sources you have chosen.',
    aiHelps: 'Structuring notes, comparing documents you provide, drafting area summaries from sources you supply.',
    peopleKeep: 'Choosing sources and verifying facts. Nothing is used until checked against the source.',
    practice: 'Summarise two supplied documents into a comparison table. Verify three claims against the originals.',
    risk: 'Unsourced or invented local facts presented as research.',
  },
  {
    id: 'reports',
    title: 'Internal documents and reports',
    summary: 'Draft weekly pipeline notes, meeting summaries and internal updates from rough material.',
    aiHelps: 'Turning rough notes or exported figures into a readable summary.',
    peopleKeep: 'The numbers and the conclusions. Figures are checked against the source system.',
    practice: 'Brief a weekly update from a notes sheet. Run it. Check the figures line by line.',
    risk: 'Figures reworded incorrectly in a confident paragraph.',
  },
  {
    id: 'procedures',
    title: 'Procedures and new-starter guides',
    summary: 'Turn written procedures into checklists, plain-English guides and likely questions.',
    aiHelps: 'Restructuring a procedure into a checklist or quick guide, and drafting likely new-starter questions.',
    peopleKeep: 'Accuracy of the procedure. A person who owns it reviews every output before it is relied on.',
    practice: 'Convert one real procedure into a checklist. Have its owner mark every error.',
    risk: 'A tidy checklist that quietly changes a step.',
  },
  {
    id: 'marketing',
    title: 'Marketing content and social posts',
    summary: 'Adapt the same verified facts into posts and short descriptions.',
    aiHelps: 'Re-shaping verified facts for different channels and lengths.',
    peopleKeep: 'Brand voice, claims and approval. Anything about people or neighbourhoods is avoided.',
    practice: 'Create three channel versions from one fact sheet. Check they say the same true things.',
    risk: 'Channel versions that contradict each other or add claims.',
  },
];

export const NOT_FOR_AI = [
  'Valuations and pricing advice.',
  'Legal, regulatory or safety statements: tenure, lease terms, planning, certificates, tenancy rights.',
  'Language that could steer or discriminate: who a property is “suitable for”, or comments on neighbours and neighbourhoods.',
  'Approving offers, tenancies or transactions.',
];
