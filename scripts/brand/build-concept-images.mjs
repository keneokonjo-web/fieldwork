// Copies and resizes the photographs used by the demo-website concept pages into public/concepts/img.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const keys = ['prop-villa-pool', 'prop-exterior-white', 'prop-exterior-timber-dusk', 'prop-exterior-black-dusk', 'prop-modernist', 'prop-exterior-day', 'prop-block', 'home-living-premium', 'home-living-light', 'home-living-gallery', 'home-plants-living', 'home-kitchen-white', 'home-kitchen-detail', 'home-apartment-bright', 'home-keys-model', 'uk-georgian', 'uk-london', 'uk-flats', 'uk-terrace', 'uk-newbuild', 'uk-suburb', 'us-brownstone', 'us-condo', 'us-suburb', 'city-london-bigben', 'city-london-bridge', 'city-new-york', 'work-hands-writing'];
for (const k of keys) {
  const src = path.join(root, 'public/images', k + '.jpg'); const out = path.join(root, 'public/concepts/img', k + '.jpg');
  if (!fs.existsSync(src)) { console.log('missing', k); continue; }
  await sharp(src).resize({ width: 1800, withoutEnlargement: true }).jpeg({ quality: 76, mozjpeg: true }).toFile(out);
}
console.log(fs.readdirSync(path.join(root, 'public/concepts/img')).length, 'images');
