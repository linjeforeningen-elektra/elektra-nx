import { AccessResource, AccessRole } from '@elektra-nx/shared/models';
import { IAccessInfo } from 'nest-access-control';

export const AdminPermissions: IAccessInfo[] = [
  { role: AccessRole.ADMIN, resource: AccessResource.BLOCK, action: 'create:own', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource: AccessResource.BLOCK, action: 'create:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource: AccessResource.BLOCK_REVISION, action: 'create:own', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource: AccessResource.BLOCK_REVISION, action: 'create:any', attributes: ['*'] },
];
