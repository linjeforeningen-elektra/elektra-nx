import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { UserEntity } from '@elektra-nx/api/user/models';
import { MembershipModel, Specialisation } from '@elektra-nx/shared/models';

@Entity('membership')
export class MembershipEntity extends CoreEntity implements MembershipModel {
  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  postal_code: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  immatriculation: Date;

  @Column()
  memberyear: Date;

  @Column({ nullable: true })
  graduation?: Date;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ type: 'enum', enum: Specialisation, enumName: 'Specialization', nullable: true })
  specialisation?: Specialisation;

  @Column()
  userId: string;

  @OneToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
