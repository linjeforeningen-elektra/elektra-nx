import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
  HOST: process.env.DATABASE_HOST,
  PORT: parseInt(process.env.DATABASE_PORT, 10),
  USERNAME: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE: process.env.DATABASE_DATABASE,
  SYNC: JSON.parse(process.env.DATABASE_SYNC),
}));
