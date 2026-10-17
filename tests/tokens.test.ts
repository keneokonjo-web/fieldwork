import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { palette } from '../scripts/brand/palette.mjs';

describe('design tokens', () => {
  const css = fs.readFileSync(path.join(__dirname, '../src/styles/tokens.css'), 'utf8');
  const map: Record<string, string> = {
    paper: '--paper', wash: '--wash', ink: '--ink', cobalt: '--cobalt', cobaltLight: '--cobalt-light', cobaltPale: '--cobalt-pale',
    grey: '--grey', hair: '--hair', success: '--success', warning: '--warning', error: '--error',
  };
  for (const [key, cssVar] of Object.entries(map)) {
    it(`${cssVar} matches palette.${key}`, () => {
      const m = css.match(new RegExp(`${cssVar}:\\s*(#[0-9A-Fa-f]{6})`));
      expect(m?.[1].toUpperCase()).toBe((palette as Record<string, string>)[key].toUpperCase());
    });
  }
});
