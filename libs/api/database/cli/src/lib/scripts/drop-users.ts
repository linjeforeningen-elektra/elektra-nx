import { AuthLocalEntity } from '@elektra-nx/api/auth/data-access';
import { CardAccessEntity, CardEntity } from '@elektra-nx/api/card/models';
import { DatabaseModule } from '@elektra-nx/api/database/feature';
import { MembershipEntity } from '@elektra-nx/api/membership/models';
import { User } from '@elektra-nx/api/user/models';
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
// import data from './v1.json';
const data = [];

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, AuthLocalEntity, MembershipEntity, CardEntity, CardAccessEntity]),
  ],
})
class DropUsersModule {}

export default (async () => {
  const app = await NestFactory.create(DropUsersModule);

  const em = app.get(EntityManager);

  const i = -1;
  for (const user of data) {
    // console.log(++i);
    await em.insert(User, user as Partial<User>);

    if (user.card) {
      await em.insert(CardEntity, user.card as unknown as Partial<CardEntity>);
      if (user.card.activity && Array.isArray(user.card.activity)) {
        await em.insert(CardAccessEntity, user.card.activity as unknown as Partial<CardAccessEntity>[]);
      }
    }

    if (user.membership) await em.insert(MembershipEntity, user.membership as unknown as Partial<MembershipEntity>);
    await em.insert(AuthLocalEntity, user.authLocal as unknown as Partial<AuthLocalEntity>);
  }
  // const q = await em.query('SELECT * FROM "user"');
  // await em.save(data);

  // console.log('Users: ', q);
  // console.log(em.connection.options.entities);

  process.exit();
})();
