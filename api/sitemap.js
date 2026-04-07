import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  try {
    // 1. Fetch all unique articles from database
    const articles = await sql`
      SELECT name, type, updated_at 
      FROM articles 
      ORDER BY updated_at DESC
    `;

    const baseUrl = 'https://koriname.com';
    
    // 2. Build XML string
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Static important routes
    const staticRoutes = ['/dictionary'];
    staticRoutes.forEach(route => {
      xml += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // 3. Dynamic routes from Database
    articles.forEach(art => {
      const lastMod = new Date(art.updated_at).toISOString().split('T')[0];
      const encodedName = encodeURIComponent(art.name.toLowerCase());
      xml += `
  <url>
    <loc>${baseUrl}/${art.type}/${encodedName}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    xml += '\n</urlset>';

    // 4. Send response as XML
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
  } catch (error) {
    console.error('Sitemap error:', error);
    res.status(500).end('Internal Server Error');
  }
}
