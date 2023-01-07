import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthLocal } from './auth-local.entity';

@Entity('email_confirmation')
@ObjectType()
export class EmailConfirmation {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  code: string;

  @Column({ type: 'timestamp with time zone' })
  expiration: Date;

  @Column()
  authLocalId: string;

  @OneToOne(() => AuthLocal, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authLocalId' })
  authLocal: AuthLocal;
}
