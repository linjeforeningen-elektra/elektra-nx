import { registerAs } from '@nestjs/config';

export default registerAs('job', () => ({
  FETCH_URL: process.env.JOB_FETCH_URL,
}));
