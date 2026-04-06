/**
 * Sitemap generator — runs automatically after `vite build`.
 * 
 * Reads static routes from src/routes.js and generates a
 * standards-compliant sitemap.xml in the dist/ folder.
 * 
 * To add a new page to the sitemap, simply add it to src/routes.js.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Note: Ensure the build script handles Node ES modules correctly.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the static routes directly 
import { staticRoutes as routes } from '../src/routes.js';

if (routes.length === 0) {
  console.error('❌ No routes found in src/routes.js');
  process.exit(1);
}

const SITE_URL = 'https://koriname.com';
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outPath = resolve(__dirname, '../dist/sitemap.xml');
writeFileSync(outPath, sitemap, 'utf-8');
console.log(`✅ Sitemap generated with ${routes.length} URLs → dist/sitemap.xml`);
