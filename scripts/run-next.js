const { spawn } = require('child_process');

const command = process.argv[2];
const args = process.argv.slice(3);
const major = Number(process.versions.node.split('.')[0]);
const isSupportedNode = major >= 16 && major < 19;

const child = isSupportedNode
  ? spawn('node', ['./node_modules/next/dist/bin/next', command, ...args], {
      stdio: 'inherit',
    })
  : spawn(
      'npx',
      [
        '-p',
        'node@18',
        'node',
        './node_modules/next/dist/bin/next',
        command,
        ...args,
      ],
      {
        stdio: 'inherit',
      }
    );

if (!isSupportedNode) {
  console.warn(
    `Running Next.js with Node 18 because ${process.version} is unsupported by this Next.js 12 project.`
  );
}

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code || 0);
});

child.on('error', error => {
  console.error(error.message);
  process.exit(1);
});
