const { Client } = require('pg');
const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    const authUsers = await client.query('SELECT * FROM auth.users');
    for (let u of authUsers.rows) {
      console.log("Syncing", u.email);
      try {
        await client.query(`
          INSERT INTO public.users (id, email, full_name, role)
          VALUES ($1, $2, COALESCE($3, split_part($2, '@', 1)), CASE WHEN $2 LIKE '%@kreo-tech.com' THEN 'management'::public.user_role ELSE 'kreon'::public.user_role END)
          ON CONFLICT (id) DO NOTHING;
        `, [u.id, u.email, u.raw_user_meta_data?.full_name]);
        console.log("Success for", u.email);
      } catch (e) {
        console.error("Failed for", u.email, e.message);
      }
    }
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

run();