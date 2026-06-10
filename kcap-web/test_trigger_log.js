const { Client } = require('pg');
const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS trigger_logs (
        msg text,
        created_at timestamp default now()
      );
      
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS trigger AS $$
      BEGIN
        INSERT INTO public.users (id, email, full_name, role)
        VALUES (
          NEW.id,
          NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
          CASE WHEN NEW.email LIKE '%@kreo-tech.com' THEN 'management'::public.user_role ELSE 'kreon'::public.user_role END
        )
        ON CONFLICT (id) DO NOTHING;
        
        RETURN NEW;
      EXCEPTION WHEN OTHERS THEN
        INSERT INTO trigger_logs (msg) VALUES (SQLERRM);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `);
    
    // Trigger it
    await client.query(`
        INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
        VALUES ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'testlog@example.com', crypt('testpass', gen_salt('bf')), now(), '{"provider":"email"}', '{"full_name":"Test"}', now(), now())
    `);
    
    const logs = await client.query('SELECT * FROM trigger_logs');
    console.log("Logs:", logs.rows);
    
    await client.query(`DELETE FROM auth.users WHERE email = 'testlog@example.com'`);
    await client.query(`DROP TABLE trigger_logs;`);
    
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

run();