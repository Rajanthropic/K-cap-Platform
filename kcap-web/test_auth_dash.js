const { createClient } = require('@supabase/supabase-js');
const http = require('http');

const supabase = createClient(
  'https://ykvmubrvflqcmjavyxtl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrdm11YnJ2ZmxxY21qYXZ5eHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODAxOTIsImV4cCI6MjA5NjA1NjE5Mn0.kVOt7yZqaS5IrNwWTuWTnVCrXrfKHlNuTfF5-jvd9go'
);

async function testDashboard() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'raj@kreo-tech.com',
    password: 'RajAdmin123!'
  });

  const session = data.session;
  const chunkedCookie = `sb-ykvmubrvflqcmjavyxtl-auth-token.0=${encodeURIComponent(JSON.stringify(session))}`;

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/dashboard',
    method: 'GET',
    headers: {
      'Cookie': chunkedCookie
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      if (res.statusCode !== 200) {
        console.log('BODY:', body);
      } else {
        console.log('SUCCESS!');
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Request problem: ${e.message}`);
  });
  req.end();
}

testDashboard();