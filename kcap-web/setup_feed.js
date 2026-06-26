const { Client } = require('pg');
const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Creating community_posts table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.community_posts (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        author_id uuid REFERENCES public.users(id),
        content text NOT NULL,
        likes integer DEFAULT 0,
        created_at timestamptz DEFAULT now()
      );

      ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Anyone can view posts" ON public.community_posts;
      CREATE POLICY "Anyone can view posts" ON public.community_posts FOR SELECT USING (auth.role() = 'authenticated');

      DROP POLICY IF EXISTS "Users can insert their own posts" ON public.community_posts;
      CREATE POLICY "Users can insert their own posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
      
      DROP POLICY IF EXISTS "Anyone can update likes" ON public.community_posts;
      CREATE POLICY "Anyone can update likes" ON public.community_posts FOR UPDATE USING (auth.role() = 'authenticated');
    `);
    console.log("Success!");
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

run();