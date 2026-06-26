const http = require('http');

http.get('http://localhost:3000/login', (res) => {
  console.log(`Login Status: ${res.statusCode}`);
}).on('error', err => console.log('Error:', err.message));

http.get('http://localhost:3000/register', (res) => {
  console.log(`Register Status: ${res.statusCode}`);
}).on('error', err => console.log('Error:', err.message));

http.get('http://localhost:3000/setup', (res) => {
  console.log(`Setup Status: ${res.statusCode}`);
}).on('error', err => console.log('Error:', err.message));