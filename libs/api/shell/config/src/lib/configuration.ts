import { registerAs } from '@nestjs/config';
export default registerAs('shell', () => ({
  ENV: process.env.SHELL_ENV,
}));
