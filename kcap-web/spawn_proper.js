const { spawn } = require('child_process');
const fs = require('fs');

const out = fs.openSync('./start_logs.txt', 'a');
const err = fs.openSync('./start_err.txt', 'a');

const child = spawn('npm.cmd', ['start'], {
  detached: true,
  stdio: [ 'ignore', out, err ],
  shell: true
});

child.unref();
console.log('Started Next.js in background');