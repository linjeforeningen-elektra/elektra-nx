// import { AuthLocalEntity } from '@elektra-nx/api/auth/data-access';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { AccessRole, UserModel } from '@elektra-nx/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Unique } from 'typeorm';

@Entity('user')
@Unique('UQ_user_slug', ['slug'])
@ObjectType()
export class User extends CoreEntity implements UserModel {
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  slug?: string;

  @Column()
  @Field(() => String)
  name: string;

  @Field(() => [String])
  @Column({ type: 'enum', enum: AccessRole, array: true, enumName: 'AccessRole', default: [] })
  roles: AccessRole[];
}
