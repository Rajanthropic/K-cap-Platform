const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Setting up auto-confirm email trigger for both confirmed_at columns...");
    
    const triggerSQL = `
      CREATE OR REPLACE FUNCTION public.auto_confirm_email()
      RETURNS trigger AS $$
      BEGIN
        NEW.email_confirmed_at = now();
        NEW.confirmed_at = now();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;
    
    await client.query(triggerSQL);
    
    // Also confirm any existing users
    await client.query(`UPDATE auth.users SET confirmed_at = now() WHERE confirmed_at IS NULL;`);
    
    console.log("Updated trigger and confirmed all users.");
  } catch(e) {
    console.error("Setup error:", e);
  } finally {
    await client.end();
  }
}

run();