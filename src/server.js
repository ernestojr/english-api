import '@babel/polyfill';
import { resolve } from 'path';
import { config } from 'dotenv';

import Application from './app';

config({ path: resolve(__dirname, '../.env') });

async function main() {
  const app = new Application();
  await app.start();
}

main();
