import { AccessRole } from './access-role.enum';
import { BaseFilterModel } from './base-filter.model';
import { CoreModel } from './core.model';

export interface FindUserFilterModel extends BaseFilterModel<UserModel> {
  name?: string;
  slug?: string;
  roles?: AccessRole[];
}

export interface UserModel extends CoreModel {
  name: string;
  slug?: string;
  roles: string[];
}

export interface CreateUserModel {
  name: string;
  slug?: string;
}

export interface UpdateUserModel {
  name?: string;
  slug?: string;
}
