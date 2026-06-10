const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ykvmubrvflqcmjavyxtl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrdm11YnJ2ZmxxY21qYXZ5eHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODAxOTIsImV4cCI6MjA5NjA1NjE5Mn0.kVOt7yZqaS5IrNwWTuWTnVCrXrfKHlNuTfF5-jvd9go'
);

async function testUpdate() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'iamraj718@gmail.com',
    password: 'password' // I don't know the password...
  });
  console.log(data, error);
}

testUpdate();