const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function runSeed() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected. Running seed data...');
    const sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await client.query(sql);
    console.log('Seed data inserted successfully!');
  } catch (err) {
    console.error('Error seeding data:', err.message);
  } finally {
    await client.end();
  }
}

runSeed();
