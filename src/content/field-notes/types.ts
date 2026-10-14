export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'prompt'; title: string; text: string }
  | { t: 'note'; title: string; text: string }
  | { t: 'table'; caption: string; head: string[]; rows: string[][] };

export interface Article {
  slug: string;
  title: string;
  description: string;
  audience: string;
  category: 'Method' | 'Checking' | 'Real estate' | 'Safety';
  published: string;
  updated?: string;
  readingMinutes: number;
  /** Honest statement of how this note was produced */
  basis: string;
  related?: string[];
  blocks: Block[];
}
