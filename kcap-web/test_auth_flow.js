const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://ykvmubrvflqcmjavyxtl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrdm11YnJ2ZmxxY21qYXZ5eHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODAxOTIsImV4cCI6MjA5NjA1NjE5Mn0.kVOt7yZqaS5IrNwWTuWTnVCrXrfKHlNuTfF5-jvd9go'
);

async function testFlow() {
  console.log("Signing up test3@kreo-tech.com...");
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: 'test3@kreo-tech.com',
    password: 'Password123!'
  });
  console.log("Sign up error:", signUpError?.message);

  console.log("Waiting 2 seconds...");
  await new Promise(r => setTimeout(r, 2000));

  console.log("Trying to log in...");
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: 'test3@kreo-tech.com',
    password: 'Password123!'
  });
  
  if (loginError) {
    console.log("Login blocked:", loginError.message);
  } else {
    console.log("Login successful!");
  }
}
testFlow();