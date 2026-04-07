import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = neon(process.env.DATABASE_URL);

  // Authentication check helper
  const isAuth = () => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    const token = authHeader.split(' ')[1];
    return token === process.env.ADMIN_PASSWORD;
  };

  // POST: Log a new search from the frontend
  if (req.method === 'POST') {
    try {
      const { name, type } = req.body;
      if (!name || !type) {
        return res.status(400).json({ error: 'Missing name or type' });
      }

      await sql`
        INSERT INTO searches (name, type, count, updated_at)
        VALUES (${name.toLowerCase().trim()}, ${type}, 1, CURRENT_TIMESTAMP)
        ON CONFLICT (name, type)
        DO UPDATE SET 
          count = searches.count + 1,
          updated_at = CURRENT_TIMESTAMP
      `;
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error('Error logging search:', e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Admin routes below: Require Authentication
  if (!isAuth()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // GET: Fetch all searches
  if (req.method === 'GET') {
    try {
      const results = await sql`
        SELECT * FROM searches
        ORDER BY updated_at DESC
        LIMIT 500
      `;
      return res.status(200).json(results);
    } catch (e) {
      console.error('Error fetching searches:', e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // PATCH: Update processed flag
  if (req.method === 'PATCH') {
    try {
      const { id, processed } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing id' });

      await sql`
        UPDATE searches
        SET processed = ${processed}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
      `;
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error('Error updating search:', e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // DELETE: Remove a search log
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing id' });

      await sql`DELETE FROM searches WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error('Error deleting search:', e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // PUT: Safely trigger webhook from backend to bypass CORS
  if (req.method === 'PUT') {
    try {
      const { name, type } = req.body;
      const n8nRes = await fetch('https://n8n-n8n.b92vmw.easypanel.host/webhook/koriname-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type })
      });

      if (!n8nRes.ok) {
        throw new Error('N8N responded with error');
      }

      return res.status(200).json({ success: true });
    } catch (e) {
      console.error('Webhook error:', e);
      return res.status(500).json({ error: 'Failed to hit webhook' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
