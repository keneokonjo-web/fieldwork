// Curates the chosen stock photographs into public/images with semantic names, web-sized, EXIF stripped, plus a credits file.
// Source: Unsplash (free for commercial use under the Unsplash Licence, no permission or attribution required).
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const src = path.resolve(import.meta.dirname, '../../assets/imagery/candidates');
const out = path.resolve(import.meta.dirname, '../../public/images');
fs.mkdirSync(out, { recursive: true });

// [semantic name, unsplash cdn id, subject, alt text, group]
export const IMAGES = [
  ['home-plants-living', 'photo-1502672260266-1c1ef2d93688', 'Living room with shelves and plants', 'A bright living room with a sofa, shelves of books and hanging plants', 'home'],
  ['home-living-light', 'photo-1560448204-e02f11c3d0e2', 'Open-plan living room', 'An open-plan living room with large windows and two armchairs', 'home'],
  ['home-living-premium', 'photo-1600607687939-ce8a6c25118c', 'Modern living space', 'A modern living room with a wood-panelled wall and a long grey sofa', 'home'],
  ['home-living-gallery', 'photo-1600210492486-724fe5c67fb0', 'Living room with gallery wall', 'A living room with a gallery wall, leather sofa and tall windows', 'home'],
  ['home-kitchen-white', 'photo-1484154218962-a197022b5858', 'White kitchen', 'A white kitchen with stainless appliances and two bar stools', 'home'],
  ['home-kitchen-detail', 'photo-1556911220-bff31c812dba', 'Kitchen worktop', 'A kitchen worktop with a hob, lemons and fresh herbs', 'home'],
  ['home-apartment-bright', 'photo-1522708323590-d24dbb6b0267', 'Apartment interior', 'A bright apartment with a red armchair, tall windows and a dining table', 'home'],
  ['home-keys-model', 'photo-1560518883-ce09059eeffa', 'House model and keys', 'A small model house with a set of keys on a wooden table', 'property'],
  ['prop-exterior-white', 'photo-1523217582562-09d0def993a6', 'White modern house', 'A white modernist house with a lawn and pine tree', 'property'],
  ['prop-exterior-day', 'photo-1600047509807-ba8f99d2cdde', 'Modern house in daylight', 'A modern house with a timber and render facade and a lawn', 'property'],
  ['prop-exterior-timber-dusk', 'photo-1568605114967-8130f3a36994', 'Timber house at dusk', 'A timber house with warm lit windows at dusk', 'property'],
  ['prop-exterior-black-dusk', 'photo-1600585154340-be6161a56a0c', 'Modern house at dusk', 'A dark-clad modern house with a glowing open-plan interior at dusk', 'property'],
  ['prop-villa-pool', 'photo-1613977257363-707ba9348227', 'Villa with pool', 'A white contemporary villa with a swimming pool', 'property'],
  ['prop-modernist', 'photo-1600566753190-17f0baa2a6c3', 'Contemporary house', 'A contemporary house with timber cladding and a glazed entrance', 'property'],
  ['prop-block', 'photo-1545324418-cc1a3fa10c00', 'Apartment block', 'A dark brick apartment block against a blue sky', 'property'],
  ['city-lagos-aerial', 'photo-1618828665011-0abd973f7bb8', 'Lagos aerial', 'An aerial view of Lagos with a main road, buildings and the lagoon', 'city'],
  ['city-london-bridge', 'photo-1533929736458-ca588d08c8be', 'Tower Bridge, London', 'Tower Bridge over the River Thames in London', 'city'],
  ['city-london-bigben', 'photo-1529655683826-aba9b3e77383', 'Westminster at dusk', 'The Elizabeth Tower and Houses of Parliament at dusk', 'city'],
  ['work-hands-laptop', 'photo-1454165804606-c3d57bc86b40', 'Hands, notes and laptop', 'Two people working over a notepad and laptops, one holding a pencil', 'work'],
  ['work-hands-writing', 'photo-1517048676732-d65bc937f952', 'Writing at a table', 'People taking notes at a long wooden table', 'work'],
  ['work-pair-laptop', 'photo-1531482615713-2afd69097998', 'Colleagues at a laptop', 'Two colleagues looking at a laptop screen together in an office', 'work'],
  ['work-team-table', 'photo-1521737604893-d14cc237f11d', 'Team around a table', 'A small team working with laptops around a table', 'work'],
  ['work-studio-office', 'photo-1497366811353-6870744d04b2', 'Open office with long table', 'A bright open office with a long table and large windows', 'work'],
  ['work-desk-pair', 'photo-1551434678-e076c223a692', 'Colleagues at desks', 'Two colleagues working at laptops in a bright office', 'work'],
  ['work-whiteboard', 'photo-1552664730-d307ca884978', 'Planning at a whiteboard', 'A team planning with sticky notes on a whiteboard', 'work'],
  ['work-resume-clipboard', 'photo-1586281380349-632531db7ed4', 'Resume on a clipboard', 'A clipboard with a blank resume beside a laptop', 'recruitment'],
  ['portrait-woman-red', 'photo-1531123897727-8f129e1688ce', 'Portrait', 'A close portrait of a woman against a red wall', 'people'],
  ['work-meeting-room', 'photo-1542744173-8e7e53415bb0', 'Presentation in a meeting room', 'A team in a meeting room watching a presentation', 'work'],
  ['work-library-team', 'photo-1523240795612-9a054b0db644', 'Colleagues learning together', 'Colleagues gathered around a laptop in a library', 'work'],
];

const credits = [];
for (const [name, id, subject, alt, group] of IMAGES) {
  const from = path.join(src, `${id}.jpg`);
  if (!fs.existsSync(from)) { console.log('missing', id); continue; }
  const m = await sharp(from).metadata();
  const w = Math.min(m.width, 2000);
  await sharp(from).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(out, `${name}.jpg`));
  const info = await sharp(path.join(out, `${name}.jpg`)).metadata();
  credits.push({ file: `/images/${name}.jpg`, subject, alt, group, width: info.width, height: info.height, source: 'Unsplash', licence: 'Unsplash Licence (free for commercial use, no permission or attribution required)', unsplashCdnId: id, photographer: 'Not retrievable in the build environment: see docs/website/IMAGE-CREDITS.md' });
}
fs.writeFileSync(path.resolve(import.meta.dirname, '../../src/content/images.json'), JSON.stringify(credits, null, 2));
console.log('curated', credits.length, 'images; total', (credits.reduce((s, c) => s + fs.statSync(path.join(out, path.basename(c.file))).size, 0) / 1e6).toFixed(1), 'MB');
