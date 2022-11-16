// import { NestFactory } from '@nestjs/core';
// import { DatabaseProviderModule } from '@elektra-nx/database/provider';
// import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';
// import { writeFileSync } from 'node:fs';
// import { join } from 'node:path';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { writeFile } from 'node:fs/promises';
// import { DatabaseConfigService } from '@elektra-nx/config';

// async function buildDatasource() {
//   const app = await NestFactory.create(DatabaseProviderModule);
//   const em = app.get(EntityManager);

//   const conf = app.get(DatabaseConfigService);
//   console.log(conf);

//   const options = em.connection.options;

//   const path = join(__dirname, '../../../../', 'ormconfig.json');
//   await writeFile(path, JSON.stringify(options));

//   process.exit(0);
// }

// export default buildDatasource();
