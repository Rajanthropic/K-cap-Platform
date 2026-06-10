const { Client } = require('pg');
const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    const id = 'f75a2183-3a1f-4691-8d59-344c036e911a';
    await client.query(`
      SET SESSION ROLE authenticated;
      SET request.jwt.claims TO '{"sub": "f75a2183-3a1f-4691-8d59-344c036e911a", "role": "authenticated"}';
    `);
    const res = await client.query(`
      UPDATE public.users SET college = 'Test College' WHERE id = $1 RETURNING *;
    `, [id]);
    console.log("Update result:", res.rows);
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

run();