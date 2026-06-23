const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Setting up auto-confirm email trigger...");
    
    const triggerSQL = `
      -- Function to auto confirm email
      CREATE OR REPLACE FUNCTION public.auto_confirm_email()
      RETURNS trigger AS $$
      BEGIN
        NEW.email_confirmed_at = now();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- Drop trigger if exists
      DROP TRIGGER IF EXISTS auto_confirm_email_trigger ON auth.users;

      -- Create trigger on auth.users BEFORE INSERT
      CREATE TRIGGER auto_confirm_email_trigger
        BEFORE INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.auto_confirm_email();
    `;
    
    await client.query(triggerSQL);
    
    // Also confirm any existing users that are unconfirmed
    await client.query(`UPDATE auth.users SET email_confirmed_at = now() WHERE email_confirmed_at IS NULL;`);
    
    console.log("Auto-confirm trigger created and existing users confirmed successfully!");
  } catch(e) {
    console.error("Setup error:", e);
  } finally {
    await client.end();
  }
}

run();