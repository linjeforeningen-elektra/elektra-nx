import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { UserEntity } from '@elektra-nx/api/user/models';
import { CardModel } from '@elektra-nx/shared/models';

@Entity('card')
export class CardEntity extends CoreEntity implements CardModel {
  @Column()
  student_number: string;

  @Column()
  userId: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
