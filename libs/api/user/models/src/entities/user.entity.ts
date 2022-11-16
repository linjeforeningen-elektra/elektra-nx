// import { AuthLocalEntity } from '@elektra-nx/api/auth/data-access';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { AccessRole, UserModel } from '@elektra-nx/shared/models';
import { Column, Entity, Unique } from 'typeorm';

// import { CardEntity } from '@elektra-nx/api/card/models';
// import { MembershipEntity } from '@elektra-nx/api/membership/models';

@Entity('user')
@Unique('UQ_user_slug', ['slug'])
export class UserEntity extends CoreEntity implements UserModel {
  @Column({ nullable: true })
  slug?: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: AccessRole, array: true, enumName: 'AccessRole', default: [] })
  roles: AccessRole[];
}
