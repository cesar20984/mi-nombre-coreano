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

  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const isAuth = authHeader && authHeader === `Bearer ${adminPassword}`;

  if (req.method === 'GET') {
    const { name, type, list } = req.query;
    
    // Auth required for list
    if (list === 'true') {
      if (!isAuth) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const result = await sql`SELECT id, name, type, created_at, updated_at FROM articles ORDER BY updated_at DESC`;
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    // Batch existence check: /api/articles?check=type1:name1|name2|type2:name3
    // Entries separated by |. With colon = specific category. Without = any category.
    if (req.query.check) {
      try {
        const entries = req.query.check.split('|').map(p => {
          const colonIdx = p.indexOf(':');
          if (colonIdx > -1) {
            return { type: p.substring(0, colonIdx), name: p.substring(colonIdx + 1).toLowerCase(), key: p.toLowerCase() };
          }
          return { type: null, name: p.toLowerCase(), key: p.toLowerCase() };
        }).filter(p => p.name);
        
        if (entries.length === 0) return res.status(200).json({});

        // Get all unique names to check
        const allNames = [...new Set(entries.map(e => e.name))];
        
        const result = await sql`
          SELECT name, type FROM articles 
          WHERE name IN (${sql(allNames)})
        `;
        
        // Build lookup: name -> [types]
        const dbLookup = {};
        result.forEach(r => {
          const lowerName = r.name.toLowerCase();
          if (!dbLookup[lowerName]) dbLookup[lowerName] = [];
          dbLookup[lowerName].push(r.type);
        });
        
        // Build response
        const existsMap = {};
        entries.forEach(e => {
          if (e.type) {
            // Specific category requested
            if (dbLookup[e.name] && dbLookup[e.name].includes(e.type)) {
              existsMap[e.key] = e.type;
            }
          } else {
            // No category — return first match
            if (dbLookup[e.name] && dbLookup[e.name].length > 0) {
              existsMap[e.key] = dbLookup[e.name][0];
            }
          }
        });
        
        return res.status(200).json(existsMap);
      } catch (error) {
        console.error('Check error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

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
    if (!isAuth) {
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

  if (req.method === 'DELETE') {
    if (!isAuth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    try {
      await sql`DELETE FROM articles WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
