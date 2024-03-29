import { AccessRole } from './access-role.enum';
import { BaseFilterModel } from './base-filter.model';
import { CoreModel } from './core.model';

export interface FindUserFilterModel extends BaseFilterModel<UserModel> {
  name?: string;
  slug?: string;
  roles?: AccessRole[];
  _roles?: AccessRole[];
}

export interface UserModel extends CoreModel {
  name: string;
  slug?: string;
  roles: string[];
  lastSignedIn: Date;
}

export interface CreateUserModel {
  name: string;
  slug?: string;
}

export interface UpdateUserModel {
  name?: string;
  slug?: string;
}

export interface AddManyUserRoleModel {
  role: AccessRole;
  userIds: string[];
}

export type RemoveManyUserRoleModel = AddManyUserRoleModel;

export interface AddOneUserRoleModel {
  role: AccessRole;
}

export type RemoveOneUserRoleModel = AddOneUserRoleModel;
