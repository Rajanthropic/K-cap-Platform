const { Client } = require('pg');
const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    const res = await client.query('UPDATE auth.users SET email_confirmed_at = now() WHERE email_confirmed_at IS NULL RETURNING email');
    console.log("Confirmed these stuck users:", res.rows);
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

run();