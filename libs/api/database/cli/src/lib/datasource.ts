import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from '@elektra-nx/api/database/feature';
import { DataSource, EntityManager } from 'typeorm';

export async function createDatasource() {
  const module = await NestFactory.create(DatabaseModule);

  const manager = module.get(EntityManager);
  const options = manager.connection.options;

  return new DataSource(options);
}

export default (async () => {
  return createDatasource();
})();
