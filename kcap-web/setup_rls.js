const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Setting up RLS policies for users table...");
    
    // Enable RLS on users table
    await client.query(`ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;`);
    
    // Drop existing policies if any
    await client.query(`DROP POLICY IF EXISTS "Users can view all users" ON public.users;`);
    await client.query(`DROP POLICY IF EXISTS "Users can update own profile" ON public.users;`);
    
    // Create policies
    // Allow anyone authenticated to read user profiles (so they can see leaderboards, etc)
    await client.query(`
      CREATE POLICY "Users can view all users" 
      ON public.users FOR SELECT 
      USING (auth.role() = 'authenticated');
    `);
    
    // Allow users to update their own row
    await client.query(`
      CREATE POLICY "Users can update own profile" 
      ON public.users FOR UPDATE 
      USING (auth.uid() = id);
    `);

    console.log("RLS policies created successfully!");
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

run();