// WCAG contrast calculator used to verify the palette in docs/brand/DESIGN-TOKENS.md
import { palette as P } from './palette.mjs';
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
if (process.argv[1].endsWith('contrast.mjs')) {
  const pairs = [['ink', 'paper'], ['cobalt', 'paper'], ['paper', 'cobalt'], ['grey', 'paper'], ['grey', 'wash'], ['ink', 'wash'], ['cobalt', 'wash'], ['paper', 'ink'], ['cobaltLight', 'ink'], ['cobaltPale', 'cobalt'], ['paper', 'grey'], ['hair', 'paper'], ['success', 'paper'], ['warning', 'paper'], ['error', 'paper']];
  for (const [f, b] of pairs) console.log(f.padEnd(12), 'on', b.padEnd(8), ratio(P[f], P[b]).toFixed(2));
}
