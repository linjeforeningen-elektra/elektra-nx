import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { User } from '@elektra-nx/api/user/models';
import { CardModel } from '@elektra-nx/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('card')
@ObjectType()
export class Card extends CoreEntity implements CardModel {
  @Column()
  @Field(() => String)
  student_number: string;

  @Column()
  @Field(() => String)
  userId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
