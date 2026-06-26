const http = require('http');

http.get('http://localhost:3000/dashboard', (res) => {
  console.log(`Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response length:', data.length));
}).on('error', err => console.log('Error:', err.message));