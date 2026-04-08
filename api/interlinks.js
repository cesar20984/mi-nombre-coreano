import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Authentication check block
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    try {
      // Fetch all articles
      const articles = await sql`SELECT name, type, content FROM articles`;

      // Build a fast lookup for existing articles: key -> boolean
      const existingDB = new Set();
      articles.forEach(art => {
        existingDB.add(`${art.type}:${art.name.toLowerCase()}`);
        existingDB.add(`null:${art.name.toLowerCase()}`); // fallback without type
      });

      const mentionsCounts = {};

      const tagRegex = /\[\[([^\]]+)\]\]/g;

      // Extract and count matches from all content
      articles.forEach(art => {
        if (!art.content) return;
        
        // Track unique matches PER article if you only want to count "number of articles mentioning it" once per article
        // The user said "cantidad de veces que aparece ese nombre en articulos". We will count absolute appearances.
        let match;
        while ((match = tagRegex.exec(art.content)) !== null) {
          const inner = match[1];
          const colonIdx = inner.indexOf(':');
          
          let mentionType = null;
          let mentionName = inner;

          if (colonIdx > -1) {
            mentionType = inner.substring(0, colonIdx);
            mentionName = inner.substring(colonIdx + 1);
          }
          
          const rawSlug = mentionName.trim().toLowerCase();

          // Reject names with 2 or more hyphens (usually transliteration artifacts)
          if ((rawSlug.match(/-/g) || []).length >= 2) continue;
          
          // Formulate a unique display key
          const key = mentionType ? `${mentionType}:${rawSlug}` : rawSlug;

          if (!mentionsCounts[key]) {
            mentionsCounts[key] = {
              name: rawSlug,
              type: mentionType,
              count: 0
            };
          }
          mentionsCounts[key].count += 1;
        }
      });

      // Convert to array and format existing status
      const responseList = Object.values(mentionsCounts).map(item => {
        const spaceName = item.name.replace(/-/g, ' ').toLowerCase();
        const hyphenName = item.name.replace(/\s+/g, '-').toLowerCase();
        
        // Find existing match in articles
        const match = articles.find(a => {
          const aName = a.name.toLowerCase();
          return aName === spaceName || aName === hyphenName || aName === item.name.toLowerCase();
        });

        return {
          ...item,
          exists: !!match,
          existingType: match ? match.type : null
        };
      });

      // Sort by count descending
      responseList.sort((a, b) => b.count - a.count);

      return res.status(200).json(responseList);
    } catch (e) {
      console.error('Error computing interlinks:', e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
