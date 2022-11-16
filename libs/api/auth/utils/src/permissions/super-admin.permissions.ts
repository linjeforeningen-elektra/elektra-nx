import { AccessResource, AccessRole } from '@elektra-nx/shared/models';
import { IAccessInfo } from 'nest-access-control';

export const SuperAdminPermissions: IAccessInfo[] = Object.values(AccessResource).flatMap((resource) => [
  { role: AccessRole.SUPER_ADMIN, resource, action: 'create:own', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'create:any', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'read:any', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'update:own', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'update:any', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'delete:own', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'delete:any', attributes: ['*'] },
]);
