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
  const cookie = `sb-ykvmubrvflqcmjavyxtl-auth-token=${encodeURIComponent(JSON.stringify(session))}`;

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/dashboard',
    method: 'GET',
    headers: {
      'Cookie': cookie
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      // Find the error message in the Next.js error HTML
      const match = body.match(/<title>([^<]+)<\/title>/);
      console.log("Title:", match ? match[1] : "No title");
      
      // Look for the specific error text
      const h1Match = body.match(/<h1[^>]*>([^<]+)<\/h1>/);
      console.log("H1:", h1Match ? h1Match[1] : "No H1");
      
      const h2Match = body.match(/<h2[^>]*>([^<]+)<\/h2>/);
      console.log("H2:", h2Match ? h2Match[1] : "No H2");
    });
  });
  req.end();
}

testDashboard();