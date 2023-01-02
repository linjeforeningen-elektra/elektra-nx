import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  PORT: parseInt(process.env.REDIS_PORT),
  HOST: process.env.REDIS_HOST,
}));
