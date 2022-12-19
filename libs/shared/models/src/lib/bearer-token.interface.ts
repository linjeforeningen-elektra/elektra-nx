import { AccessRole } from './access-role.enum';

export interface JwtPayload {
  id: string;
  roles: AccessRole[];
  email: string;
  exp: number;
}
