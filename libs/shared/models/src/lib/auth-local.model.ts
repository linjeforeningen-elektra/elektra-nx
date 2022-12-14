import { CreateUserModel } from './user.model';

export interface AuthLocalModel {
  id: string;
  confirmed: boolean;
  email: string;
  salt: string;
  hash: string;
}

export interface LoginWithAuthLocalModel {
  email: string;
  password: string;
}

export interface CreateAuthLocalModel {
  email: string;
  password: string;
}

export interface RegisterWithAuthLocalModel {
  user: CreateUserModel;
  auth: CreateAuthLocalModel;
}

export interface ConfirmEmailModel {
  email: string;
  code: string;
}
