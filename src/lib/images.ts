import images from '@/content/images.json';

export type Photo = { file: string; alt: string; subject: string; width: number; height: number; group: string };
const byKey = new Map<string, Photo>(
  (images as Photo[]).map((i) => [i.file.replace(/^\/images\//, '').replace(/\.jpg$/, ''), i]),
);

/** Look up a curated stock photograph by its file key (e.g. "work-team-table"). Throws on a typo so a bad key fails the build. */
export function photo(key: string): Photo {
  const p = byKey.get(key);
  if (!p) throw new Error(`Unknown photograph "${key}"`);
  return p;
}
