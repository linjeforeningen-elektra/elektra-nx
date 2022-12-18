import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Card } from './card.entity';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { CardAccessModel } from '@elektra-nx/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('access')
@ObjectType()
export class CardAccess extends CoreEntity implements CardAccessModel {
  @Field(() => Date)
  @Column()
  expiration: Date;

  @Column({ default: 'false' })
  @Field(() => Boolean)
  sent: boolean;

  @Column()
  cardId: string;

  @ManyToOne(() => Card, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'cardId' })
  card: Card;
}
