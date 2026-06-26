const { spawn } = require('child_process');
const fs = require('fs');

const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./err.log', 'a');

const child = spawn('npm.cmd', ['run', 'dev'], {
  detached: true,
  stdio: [ 'ignore', out, err ]
});

child.unref();
console.log('Started Next.js in background');