import 'core-js/stable';

import Application from './app';

async function main() {
  const app = new Application();
  await app.start();
}

main();
