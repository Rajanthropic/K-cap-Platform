const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://ykvmubrvflqcmjavyxtl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrdm11YnJ2ZmxxY21qYXZ5eHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODAxOTIsImV4cCI6MjA5NjA1NjE5Mn0.kVOt7yZqaS5IrNwWTuWTnVCrXrfKHlNuTfF5-jvd9go'
);

async function testFull() {
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'raj@kreo-tech.com',
    password: 'RajAdmin123!'
  });
  
  if (authErr) {
    console.error("Auth Error:", authErr);
    return;
  }
  
  const userId = authData.user.id;
  console.log("Logged in user:", userId);
  
  const { data, error } = await supabase
      .from('users')
      .update({
        college: "API Test College",
      })
      .eq('id', userId)
      .select();
      
  console.log("Update result:", data, error);
}

testFull();