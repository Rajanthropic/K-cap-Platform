const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Removing demo data...");
    await client.query(`TRUNCATE TABLE redemptions, credit_transactions, mission_deliverables, mission_enrollments, missions, timeline_events, shop_items CASCADE;`);
    
    // Delete all users except kreo-tech ones
    await client.query(`DELETE FROM public.users WHERE email NOT LIKE '%@kreo-tech.com';`);
    await client.query(`DELETE FROM auth.users WHERE email NOT LIKE '%@kreo-tech.com';`);
    
    // Clear batches just in case
    await client.query(`TRUNCATE TABLE batches CASCADE;`);
    console.log("Demo data removed successfully.");
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

run();