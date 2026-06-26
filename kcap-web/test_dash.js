const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/dashboard',
  method: 'GET',
  headers: {
    // Need a valid session cookie, but let's see what happens without one
    // It should 307 redirect
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});
req.end();