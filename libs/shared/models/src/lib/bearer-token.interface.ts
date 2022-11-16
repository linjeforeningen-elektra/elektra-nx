import { AccessRole } from './access-role.enum';

export interface BearerTokenPayload {
  id: string;
  roles: AccessRole[];
  email: string;
  exp: number;
}
