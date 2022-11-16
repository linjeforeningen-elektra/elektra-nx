import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { UserEntity } from '@elektra-nx/api/user/models';
import { AuthLocalModel } from '@elektra-nx/shared/models';

@Entity('auth-local')
@Unique('UQ_auth_local_email', ['email'])
export class AuthLocalEntity extends CoreEntity implements AuthLocalModel {
  @Column()
  email: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  @Column()
  userId: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
