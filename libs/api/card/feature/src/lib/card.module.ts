import {
  CardAccessAclAdapter,
  CardAccessResolver,
  CardAccessService,
  CardAclAdapter,
  CardResolver,
  CardService,
} from '@elektra-nx/api/card/data-access';
import { CardAccessEntity, CardEntity } from '@elektra-nx/api/card/models';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, CardAccessEntity])],
  providers: [CardService, CardAccessService, CardAclAdapter, CardAccessAclAdapter, CardResolver, CardAccessResolver],
  exports: [CardService, CardAccessService, CardAclAdapter, CardAccessAclAdapter, CardResolver, CardAccessResolver],
})
export class CardModule {}
