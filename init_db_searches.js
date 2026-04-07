import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function init() {
  await sql`
    CREATE TABLE IF NOT EXISTS searches (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      count INTEGER DEFAULT 1,
      processed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(name, type)
    )
  `;
  console.log("Table 'searches' created successfully");
}

init().catch(console.error);
