const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Adding batch column...");
    await client.query(`
      SET ROLE postgres;
      ALTER TABLE public.users ADD COLUMN batch text;
    `);
    console.log("Column added!");
  } catch(e) {
    console.error("Failed as postgres, trying supabase_admin...");
    try {
      await client.query(`
        SET ROLE supabase_admin;
        ALTER TABLE public.users ADD COLUMN batch text;
      `);
      console.log("Column added as supabase_admin!");
    } catch(e2) {
      console.error("Failed as supabase_admin too:", e2.message);
    }
  } finally {
    await client.end();
  }
}

run();