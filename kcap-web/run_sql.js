const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const sql = fs.readFileSync(path.join(__dirname, 'supabase_schema.sql'), 'utf8');
    
    await client.query(sql);
    console.log('Successfully executed schema!');
  } catch (err) {
    console.error('Error executing schema', err.stack);
  } finally {
    await client.end();
  }
}

run();
