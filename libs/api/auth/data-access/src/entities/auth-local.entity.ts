import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { User } from '@elektra-nx/api/user/models';
import { AuthLocalModel } from '@elektra-nx/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('auth-local')
@Unique('UQ_auth_local_email', ['email'])
export class AuthLocal extends CoreEntity implements AuthLocalModel {
  @Field(() => String)
  @Column()
  email: string;

  @Column()
  @Field(() => String)
  salt: string;

  @Column()
  @Field(() => String)
  hash: string;

  @Column({ default: 'false' })
  @Field(() => Boolean)
  confirmed: boolean;

  @Column()
  @Field(() => String)
  userId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
