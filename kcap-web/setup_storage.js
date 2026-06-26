const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    console.log("Creating storage bucket avatars...");
    
    await client.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('avatars', 'avatars', true)
      ON CONFLICT (id) DO NOTHING;
    `);
    
    // Create permissive policy for avatars
    await client.query(`
      CREATE POLICY "Avatar images are publicly accessible." 
      ON storage.objects FOR SELECT 
      USING (bucket_id = 'avatars');
    `);
    
    await client.query(`
      CREATE POLICY "Anyone can upload an avatar." 
      ON storage.objects FOR INSERT 
      WITH CHECK (bucket_id = 'avatars');
    `);
    
    console.log("Bucket created successfully.");
  } catch(e) {
    console.error("Setup error:", e.message);
  } finally {
    await client.end();
  }
}

run();