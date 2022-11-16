import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CardEntity } from './card.entity';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { CardAccessModel } from '@elektra-nx/shared/models';

@Entity('access')
export class CardAccessEntity extends CoreEntity implements CardAccessModel {
  @Column()
  expiration: Date;

  @Column({ default: 'false' })
  sent: boolean;

  @Column()
  cardId: string;

  @ManyToOne(() => CardEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'cardId' })
  card: CardEntity;
}
