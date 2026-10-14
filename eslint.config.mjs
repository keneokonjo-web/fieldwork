import next from 'eslint-config-next';
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const config = [
  ...(Array.isArray(next) ? next : [next]),
  ...coreWebVitals,
  ...typescript,
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'deliverables/**', 'qa/**', 'scripts/**', 'next-env.d.ts'] },
];
export default config;
