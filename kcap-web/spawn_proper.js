const { spawn } = require('child_process');
const fs = require('fs');

const out = fs.openSync('./next_logs.txt', 'a');
const err = fs.openSync('./next_err.txt', 'a');

const child = spawn('npm.cmd', ['start'], {
  detached: true,
  stdio: [ 'ignore', out, err ],
  shell: true
});

child.unref();
console.log('Started Next.js in background');