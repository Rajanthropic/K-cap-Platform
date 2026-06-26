const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Fixing auto-confirm email trigger...");
    
    const triggerSQL = `
      CREATE OR REPLACE FUNCTION public.auto_confirm_email()
      RETURNS trigger AS $$
      BEGIN
        NEW.email_confirmed_at = now();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;
    
    await client.query(triggerSQL);
    console.log("Auto-confirm trigger fixed!");
  } catch(e) {
    console.error("Setup error:", e);
  } finally {
    await client.end();
  }
}

run();