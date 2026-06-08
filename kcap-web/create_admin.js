const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ykvmubrvflqcmjavyxtl:ligmasigma12@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  
  try {
    // Check if user exists in auth.users
    let authRes = await client.query(`SELECT id FROM auth.users WHERE email = 'raj@kreo-tech.com'`);
    let userId;

    if (authRes.rows.length > 0) {
      userId = authRes.rows[0].id;
      console.log('User already exists in auth.users with ID:', userId);
      // Update password and confirm email just in case
      await client.query(`UPDATE auth.users SET encrypted_password = crypt('RajAdmin123!', gen_salt('bf')), email_confirmed_at = now() WHERE id = $1`, [userId]);
    } else {
      authRes = await client.query(`
        INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
        VALUES ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'raj@kreo-tech.com', crypt('RajAdmin123!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Raj"}', now(), now())
        RETURNING id;
      `);
      userId = authRes.rows[0].id;
      console.log('Created auth user with ID:', userId);
    }

    // Insert or update public.users
    const pubRes = await client.query(`SELECT id FROM public.users WHERE email = 'raj@kreo-tech.com'`);
    if (pubRes.rows.length > 0) {
        await client.query(`UPDATE public.users SET role = 'admin', full_name = 'Raj', is_active = true WHERE email = 'raj@kreo-tech.com'`);
    } else {
        await client.query(`
        INSERT INTO public.users (id, email, full_name, role, is_active, joined_at)
        VALUES ($1, 'raj@kreo-tech.com', 'Raj', 'admin', true, now())
        ON CONFLICT (id) DO UPDATE SET role = 'admin', full_name = 'Raj';
        `, [userId]);
    }
    
    console.log('Admin user raj@kreo-tech.com created successfully with password: RajAdmin123!');
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

run();