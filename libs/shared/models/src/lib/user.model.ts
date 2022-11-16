import { CoreModel } from './core.model';

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
