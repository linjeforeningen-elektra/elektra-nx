import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthLocal } from './auth-local.entity';

@ObjectType()
@Entity('password_reset')
export class PasswordReset {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  hash: string;

  @Field(() => Date)
  @Column({ type: 'timestamp with time zone' })
  expires: Date;

  @Field(() => String)
  @Column()
  authLocalId: string;

  @ManyToOne(() => AuthLocal, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authLocalId' })
  authLocal: AuthLocal;
}
