import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  JWT_EXPIRY: process.env.AUTH_JWT_EXPIRY,
  JWT_SECRET: process.env.AUTH_JWT_SECRET,
  BCRYPT_ROUNDS: parseInt(process.env.AUTH_BCRYPT_ROUNDS, 10),
  EMAIL_CONFIRMATION_EXPIRATION: process.env.AUTH_EMAIL_CONFIRMATION_EXPIRATION,
}));
