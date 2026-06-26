const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ykvmubrvflqcmjavyxtl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrdm11YnJ2ZmxxY21qYXZ5eHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODAxOTIsImV4cCI6MjA5NjA1NjE5Mn0.kVOt7yZqaS5IrNwWTuWTnVCrXrfKHlNuTfF5-jvd9go'
);

async function testPost() {
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'test3@kreo-tech.com',
    password: 'Password123!'
  });
  
  if (authErr) {
    console.error("Auth Error:", authErr);
    return;
  }
  
  const userId = authData.user.id;
  
  const { error } = await supabase.from("community_posts").insert({
    author_id: userId,
    content: "Testing post insertion via API",
  });
  
  console.log("Insert result:", error ? error.message : "Success!");
}

testPost();