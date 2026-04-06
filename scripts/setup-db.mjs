import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function setup() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    console.log('Connecting to Neon database...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(name, type)
      );
    `;
    
    console.log('Table "articles" created or already exists.');
    
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setup();
