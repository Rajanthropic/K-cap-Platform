const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const fetch = require('node-fetch');

const supabase = createClient(
  'https://ykvmubrvflqcmjavyxtl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrdm11YnJ2ZmxxY21qYXZ5eHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODAxOTIsImV4cCI6MjA5NjA1NjE5Mn0.kVOt7yZqaS5IrNwWTuWTnVCrXrfKHlNuTfF5-jvd9go'
);

async function test() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'hemanth@kreo-tech.com',
    password: 'Password123!' // or try the other one
  });
  
  if (error) {
    console.log("Auth error:", error.message);
  }
}
test();