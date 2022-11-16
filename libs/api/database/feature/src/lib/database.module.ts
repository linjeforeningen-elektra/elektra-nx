import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';

import { DatabaseConfigModule, DatabaseConfigService } from '@elektra-nx/api/database/config';
import { ApiShellConfigModule, ApiShellConfigService } from '@elektra-nx/api/shell/config';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule, ApiShellConfigModule],
      inject: [DatabaseConfigService, ApiShellConfigService],
      useFactory: (dbconf: DatabaseConfigService, apiconf: ApiShellConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        // entities: ['libs/**/*.entity.ts'],
        entities: [apiconf.ENV == 'CLI' ? 'libs/**/*.entity.ts' : ''],
        synchronize: dbconf.SYNC,
        migrationsTableName: 'migrations',
        migrationsRun: apiconf.ENV === 'production',
        // migrations: ['libs/api/database/cli/src/lib/migrations/*.ts'],
        migrations: [
          apiconf.ENV == 'CLI'
            ? 'libs/api/database/cli/src/lib/migrations/*.ts'
            : join(__dirname, '**/migrations/*.js'),
        ],
        username: dbconf.USERNAME,
        password: dbconf.PASSWORD,
        database: dbconf.DATABASE,
        host: dbconf.HOST,
        port: dbconf.PORT,
      }),
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
