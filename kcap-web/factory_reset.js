const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Initiating Factory Reset...");
    
    // 1. Wipe all application data (cascading deletes related records)
    await client.query(`TRUNCATE TABLE redemptions, credit_transactions, mission_deliverables, mission_enrollments, missions, timeline_events, shop_items CASCADE;`);
    console.log("Cleared all missions, events, and transactions.");

    // 2. Clear all batches
    await client.query(`TRUNCATE TABLE batches CASCADE;`);
    console.log("Cleared all batches.");

    // 3. Delete all users EXCEPT the main admin account (raj@kreo-tech.com)
    await client.query(`DELETE FROM public.users WHERE email != 'raj@kreo-tech.com';`);
    await client.query(`DELETE FROM auth.users WHERE email != 'raj@kreo-tech.com';`);
    console.log("Deleted all test accounts and Kreon profiles.");

    console.log("Factory Reset Complete! The database is 100% fresh and ready for your friend to sign up.");
  } catch(e) {
    console.error("Error during reset:", e.message);
  } finally {
    await client.end();
  }
}

run();