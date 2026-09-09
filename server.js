/**
 * AO UNIVERSE // Railway Native Backend Service
 * Native subscription engine & Sanctuary database integration
 */

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// 1. Enable CORS specifically for your owned domains
app.use(cors({
  origin: ['https://anomartsy.xyz', 'https://anomarsty.lol']
}));

app.use(express.json());

// 2. Connect to Railway PostgreSQL via DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// 3. Auto-initialize the Sanctuary subscribers table
async function initDatabase() {
  const tableQuery = `
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      status VARCHAR(50) DEFAULT 'active',
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(tableQuery);
    console.log('⚡ Sanctuary DB: Subscribers table initialized successfully.');
  } catch (err) {
    console.error('❌ Sanctuary DB Error:', err);
  }
}
initDatabase();

// 4. Native Email Subscription Route
app.post('/api/subscribers', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }

  try {
    const cleanEmail = email.trim().toLowerCase();
    
    // Insert email, ignoring duplicates gracefully
    const insertQuery = `
      INSERT INTO subscribers (email)
      VALUES ($1)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, subscribed_at;
    `;
    
    const result = await pool.query(insertQuery, [cleanEmail]);

    if (result.rowCount === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'Already subscribed to direct transmissions.' 
      });
    }

    console.log(`✨ New subscriber registered: ${cleanEmail}`);
    return res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed to AO Transmissions!' 
    });

  } catch (err) {
    console.error('❌ Subscription Processing Error:', err);
    return res.status(500).json({ error: 'Sanctuary database write failed.' });
  }
});

// 5. Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Railway Backend Service active on port ${PORT}`);
});
