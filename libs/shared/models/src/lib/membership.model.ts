import { CoreModel } from './core.model';

export enum Specialisation {
  AUTOMATION = 'Automation',
  ELECTRONICS = 'Elektronics and Sensorsystems',
  POWER = 'Electric Power Engineering',
}

export interface MembershipModel extends CoreModel {
  phone: string;
  address: string;
  postal_code: string;
  memberyear: Date;
  immatriculation?: Date;
  graduation?: Date;
  specialisation?: Specialisation;
  gender?: string;
}

export interface CreateMembershipModel {
  phone: string;
  address: string;
  postal_code: string;
  memberyear: Date;
  immatriculation?: Date;
  graduation?: Date;
  specialisation?: Specialisation;
  gender: string;
}

export interface UpdateMembershipModel {
  phone?: string;
  address?: string;
  postal_code?: string;
  memberyear?: Date;
  immatriculation?: Date;
  graduation?: Date;
  specialisation?: Specialisation;
  gender?: string;
}
