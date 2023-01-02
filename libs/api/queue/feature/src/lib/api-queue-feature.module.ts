import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ApiRedisConfigModule, ApiRedisConfigService } from '@elektra-nx/api/redis/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ApiRedisConfigModule],
      inject: [ApiRedisConfigService],
      useFactory: (conf: ApiRedisConfigService) => ({
        redis: {
          host: conf.HOST,
          port: conf.PORT,
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class ApiQueueModule {}
