import * as dotenv from 'dotenv';
import invariant from 'tiny-invariant';

dotenv.config();

invariant(process.env.PORT, 'PORT is missing from environment variable');

const config = {
  port: process.env.PORT,
  cors: process.env.CORS_WHITELIST || '*'
};

export default config;
