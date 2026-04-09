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
        const result = await sql`SELECT * FROM articles ORDER BY updated_at DESC`;
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    // Public dictionary fetch
    if (req.query.dictionary === 'true') {
      try {
        const result = await sql`SELECT name, title FROM articles WHERE type = 'meaning' ORDER BY title ASC`;
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

        // Get all unique names to check, plus their space-version counterparts
        const allNames = [];
        entries.forEach(e => {
          allNames.push(e.name);
          allNames.push(e.name.replace(/-/g, ' '));
        });
        const uniqueNames = [...new Set(allNames)];
        
        // Build a query checking all names
        const result = await sql`
          SELECT name, type FROM articles 
          WHERE name = ANY(${uniqueNames})
        `;
        
        // Build lookup: name -> [types], including variations
        const dbLookup = {};
        result.forEach(r => {
          const lowerName = r.name.toLowerCase();
          const spaceName = lowerName.replace(/-/g, ' ');
          const hyphenName = lowerName.replace(/\s+/g, '-');
          
          [lowerName, spaceName, hyphenName].forEach(k => {
            if (!dbLookup[k]) dbLookup[k] = [];
            dbLookup[k].push(r.type);
          });
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
      const nameWithSpaces = name.replace(/-/g, ' ');
      const result = await sql`
        SELECT * FROM articles 
        WHERE (name = ${name.toLowerCase()} OR name = ${nameWithSpaces.toLowerCase()}) AND type = ${type}
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

    // Title is the original name with accents/cases
    const originalTitle = name;
    // Normalize: lowercase and remove accents for the slug URL
    const slugName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    try {
      // Upsert: Create or Update if exists
      let result;
      try {
        result = await sql`
          INSERT INTO articles (name, title, type, content, updated_at)
          VALUES (${slugName}, ${originalTitle}, ${type}, ${content}, CURRENT_TIMESTAMP)
          ON CONFLICT (name, type)
          DO UPDATE SET 
            title = EXCLUDED.title,
            content = EXCLUDED.content,
            updated_at = CURRENT_TIMESTAMP
          RETURNING *
        `;
      } catch (dbError) {
        console.error('Title column may be missing, falling back:', dbError.message);
        result = await sql`
          INSERT INTO articles (name, type, content, updated_at)
          VALUES (${slugName}, ${type}, ${content}, CURRENT_TIMESTAMP)
          ON CONFLICT (name, type)
          DO UPDATE SET 
            content = EXCLUDED.content,
            updated_at = CURRENT_TIMESTAMP
          RETURNING *
        `;
      }
      
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
