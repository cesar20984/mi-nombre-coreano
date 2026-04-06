import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // CORS check for external software using the API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    const { name, type } = req.query;
    
    if (!name || !type) {
      return res.status(400).json({ error: 'Missing name or type parameter' });
    }

    try {
      const result = await sql`
        SELECT * FROM articles 
        WHERE name = ${name.toLowerCase()} AND type = ${type}
      `;

      if (result.length > 0) {
        return res.status(200).json(result[0]);
      } else {
        return res.status(404).json({ error: 'Article not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    // Check Authorization
    const authHeader = req.headers.authorization;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, type, content } = req.body;

    if (!name || !type || !content) {
      return res.status(400).json({ error: 'Missing name, type, or content' });
    }

    try {
      // Upsert: Create or Update if exists
      const result = await sql`
        INSERT INTO articles (name, type, content, updated_at)
        VALUES (${name.toLowerCase()}, ${type}, ${content}, CURRENT_TIMESTAMP)
        ON CONFLICT (name, type)
        DO UPDATE SET 
          content = EXCLUDED.content,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `;
      
      return res.status(200).json({ success: true, article: result[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
