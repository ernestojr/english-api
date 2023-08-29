import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') });

export default {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/express-test',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '24h',
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  COOKIE_EXPIRATION_TIME: process.env.COOKIE_EXPIRATION_TIME ? parseInt(process.env.COOKIE_EXPIRATION_TIME, 10) : 60 * 1440 * 1000, // 60 * 24 * 1000 = 1 day
  ACCESS_TOKEN_IN_COOKIE: process.env.ACCESS_TOKEN_IN_COOKIE ? process.env.ACCESS_TOKEN_IN_COOKIE === 'true' : true,
};
