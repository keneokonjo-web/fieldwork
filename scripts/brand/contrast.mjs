// WCAG contrast calculator used to verify the palette in docs/brand/DESIGN-TOKENS.md
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
if (process.argv[1].endsWith('contrast.mjs')) {
  const colours = { paper: '#F6F0E4', paperDeep: '#ECE2CE', ink: '#211B18', inkSoft: '#4F443D', burgundy: '#6B1D2B', terracotta: '#B0431F', terracottaBright: '#D1582F', saffron: '#E8A33D', moss: '#456440', blush: '#EFC9B8', white: '#FFFFFF', line: '#D2C5AB' };
  const pairs = [['ink','paper'],['inkSoft','paper'],['inkSoft','paperDeep'],['burgundy','paper'],['terracotta','paper'],['terracotta','paperDeep'],['moss','paper'],['paper','burgundy'],['paper','ink'],['saffron','ink'],['saffron','burgundy'],['paper','terracotta'],['paper','moss'],['ink','saffron'],['ink','blush'],['terracottaBright','ink'],['blush','burgundy'],['burgundy','blush'],['ink','terracottaBright'],['line','paper']];
  for (const [f, b] of pairs) console.log(f.padEnd(18), 'on', b.padEnd(12), ratio(colours[f], colours[b]).toFixed(2));
}
