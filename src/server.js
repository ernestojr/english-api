import '@babel/polyfill';

import Application from './app';

async function main() {
  const app = new Application();
  await app.start();
}

main();
