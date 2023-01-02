import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  PRIVATE_KEY: process.env.MAIL_PRIVATE_KEY,
  CLIENT_ID: process.env.MAIL_CLIENT_ID,
  HOST: process.env.MAIL_HOST,
  PORT: parseInt(process.env.MAIL_PORT),
  USER: process.env.MAIL_USER,
  FROM: process.env.MAIL_FROM,
  PREVIEW: process.env.MAIL_PREVIEW === 'true',
}));
