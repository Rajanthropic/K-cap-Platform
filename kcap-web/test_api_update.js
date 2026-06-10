const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://ykvmubrvflqcmjavyxtl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrdm11YnJ2ZmxxY21qYXZ5eHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODAxOTIsImV4cCI6MjA5NjA1NjE5Mn0.kVOt7yZqaS5IrNwWTuWTnVCrXrfKHlNuTfF5-jvd9go'
);

async function check() {
  const { data, error } = await supabase.from('users').update({
    username: "",
    phone: "",
    college: "Test",
    bio: "",
    hobbies: [],
    instagram_handle: "",
    linkedin_url: "",
    twitter_handle: "",
    youtube_channel: "",
  }).eq('id', 'f75a2183-3a1f-4691-8d59-344c036e911a');
  console.log("Update via API:", data, error);
}

check();