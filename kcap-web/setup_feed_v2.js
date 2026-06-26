const { Client } = require('pg');
const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Updating community feed schema...");
    
    // 1. Add media_url to community_posts
    await client.query(`
      ALTER TABLE public.community_posts ADD COLUMN IF NOT EXISTS media_url text;
    `);
    console.log("Added media_url to community_posts");

    // 2. Create community_comments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.community_comments (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        post_id uuid REFERENCES public.community_posts(id) ON DELETE CASCADE,
        author_id uuid REFERENCES public.users(id),
        content text NOT NULL,
        created_at timestamptz DEFAULT now()
      );
    `);
    console.log("Created community_comments table");

    // 3. Set up RLS for comments
    await client.query(`ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;`);
    
    await client.query(`DROP POLICY IF EXISTS "Anyone can view comments" ON public.community_comments;`);
    await client.query(`CREATE POLICY "Anyone can view comments" ON public.community_comments FOR SELECT USING (auth.role() = 'authenticated');`);
    
    await client.query(`DROP POLICY IF EXISTS "Users can insert their own comments" ON public.community_comments;`);
    await client.query(`CREATE POLICY "Users can insert their own comments" ON public.community_comments FOR INSERT WITH CHECK (auth.uid() = author_id);`);

    // 4. Create storage bucket for feed media
    await client.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('feed_media', 'feed_media', true)
      ON CONFLICT (id) DO NOTHING;
    `);

    // 5. Storage policies for feed_media
    await client.query(`
      DROP POLICY IF EXISTS "Feed media is publicly accessible." ON storage.objects;
      CREATE POLICY "Feed media is publicly accessible." 
      ON storage.objects FOR SELECT 
      USING (bucket_id = 'feed_media');
    `);
    
    await client.query(`
      DROP POLICY IF EXISTS "Anyone can upload feed media." ON storage.objects;
      CREATE POLICY "Anyone can upload feed media." 
      ON storage.objects FOR INSERT 
      WITH CHECK (bucket_id = 'feed_media');
    `);

    console.log("Schema update complete!");
  } catch(e) {
    console.error("Setup error:", e.message);
  } finally {
    await client.end();
  }
}

run();