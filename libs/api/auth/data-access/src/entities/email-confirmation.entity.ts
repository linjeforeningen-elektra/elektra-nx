import { CoreEntity } from '@elektra-nx/api/database/utils';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AuthLocal } from './auth-local.entity';

@Entity('email_confirmation')
@ObjectType()
export class EmailConfirmation extends CoreEntity {
  @Column()
  @Field(() => String)
  code: string;

  @Column()
  authLocalId: string;

  @OneToOne(() => AuthLocal)
  @JoinColumn({ name: 'authLocalId' })
  authLocal: AuthLocal;
}
