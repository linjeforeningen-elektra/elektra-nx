import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { User } from '@elektra-nx/api/user/models';
import { AuthLocalModel } from '@elektra-nx/shared/models';

@Entity('auth-local')
@Unique('UQ_auth_local_email', ['email'])
export class AuthLocal extends CoreEntity implements AuthLocalModel {
  @Column()
  email: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  @Column({ default: 'false' })
  confirmed: boolean;

  @Column()
  userId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
