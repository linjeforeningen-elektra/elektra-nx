import { UserAclAdapter, UserResolver, UserService } from '@elektra-nx/api/user/data-access';
import { UserEntity } from '@elektra-nx/api/user/models';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCardAccesssController, UserCardController, UserController, UserMembershipController } from './controllers';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserAclAdapter, UserResolver],
  exports: [UserService, UserAclAdapter, TypeOrmModule],
  controllers: [UserController, UserMembershipController, UserCardController, UserCardAccesssController],
})
export class UserModule {}
