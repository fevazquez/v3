// Regenerates public/favicon.ico and public/apple-touch-icon.png from public/favicon.svg.
// Run with: npm run icons
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFile, writeFile } from 'node:fs/promises';

const svg = await readFile('public/favicon.svg');
const render = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

// favicon.ico with 16, 32 and 48 px images
await writeFile('public/favicon.ico', await pngToIco(await Promise.all([16, 32, 48].map(render))));

// apple-touch-icon: logo centered on a solid background (iOS doesn't do transparency)
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#1b1b1b' } })
  .composite([{ input: await render(144) }])
  .png()
  .toFile('public/apple-touch-icon.png');

console.log('Icons written to public/');
