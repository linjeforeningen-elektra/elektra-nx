import { UserModel } from '@elektra-nx/shared/models';

export type AccountUserSlice = Pick<UserModel, 'id' | 'name' | 'slug'>;
