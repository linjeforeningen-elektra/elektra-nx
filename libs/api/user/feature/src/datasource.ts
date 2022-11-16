import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();
import 'reflect-metadata';

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  // entities: ['libs/database/core/src/**/*.entity.ts'],
});

export default datasource;
