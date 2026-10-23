import type { Region } from '@/lib/region';

/**
 * Which photograph each place on the site shows, by region.
 * United Kingdom and United States visitors see photographs from their own country only.
 * Nigerian visitors see Nigerian photographs mixed with UK ones.
 * A single string is used for every region (photographs that show no country, such as an interior).
 */
type Scene = string | Record<Region, string>;

export const scenes = {
  heroA: { uk: 'uk-london', ng: 'ng-lagos-skyline', us: 'us-skyline' },
  heroB: { uk: 'uk-georgian', ng: 'uk-georgian', us: 'us-brownstone' },
  prodWeb: { uk: 'uk-newbuild', ng: 'ng-lekki', us: 'us-newbuild' },
  prodAuto: { uk: 'uk-agent-sign', ng: 'uk-agent-sign', us: 'us-sign' },
  prodWork: 'work-team-table',
  whoDev: { uk: 'uk-flats', ng: 'ng-ikoyi', us: 'us-condo' },
  whoAgency: { uk: 'uk-terrace', ng: 'uk-terrace', us: 'us-suburb' },
  bandA: { uk: 'uk-suburb', ng: 'ng-abuja', us: 'us-bungalow' },
  bandB: { uk: 'uk-flats', ng: 'uk-flats', us: 'us-apartments' },
  bandC: { uk: 'uk-newbuild', ng: 'ng-estate', us: 'us-newbuild' },
  bandD: { uk: 'uk-georgian', ng: 'ng-ikoyi', us: 'us-brownstone' },
  bandE: { uk: 'uk-terrace', ng: 'uk-suburb', us: 'us-condo' },
  bandF: { uk: 'uk-agent-sign', ng: 'ng-lekki-street', us: 'us-sign' },
  autoA: { uk: 'uk-georgian', ng: 'uk-georgian', us: 'us-brownstone' },
  autoB: { uk: 'uk-london', ng: 'ng-vi-aerial', us: 'us-skyline' },
  autoC: { uk: 'uk-newbuild', ng: 'uk-newbuild', us: 'us-newbuild' },
  interior: 'home-living-premium',
  workshopA: 'work-team-table',
  workshopB: 'work-hands-laptop',
  aboutHero: { uk: 'uk-flats', ng: 'ng-lagos-skyline', us: 'us-apartments' },
} as const satisfies Record<string, Scene>;

export type SceneName = keyof typeof scenes;

export function sceneKey(name: SceneName, region: Region): string {
  const s: Scene = scenes[name];
  return typeof s === 'string' ? s : s[region];
}

/** Every photograph key a region can show (used by tests and the credits page). */
export function keysFor(region: Region): string[] {
  return [...new Set(Object.keys(scenes).map((n) => sceneKey(n as SceneName, region)))];
}
