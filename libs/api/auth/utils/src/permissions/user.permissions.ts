/* eslint-disable */
import { AccessResource, AccessRole } from '@elektra-nx/shared/models';
import { IAccessInfo } from 'nest-access-control';

export const UserPermissions: IAccessInfo[] = [
  // User
  { role: AccessRole.USER, resource: AccessResource.USER, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.USER, action: 'update:own', attributes: ['*', '!id', '!roles'] },
  { role: AccessRole.USER, resource: AccessResource.USER, action: 'delete:own', attributes: ['*'] },

  // Membership
  { role: AccessRole.USER, resource: AccessResource.MEMBERSHIP, action: 'create:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.MEMBERSHIP, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.MEMBERSHIP, action: 'update:own', attributes: ['*', '!confirmed'] },
  { role: AccessRole.USER, resource: AccessResource.MEMBERSHIP, action: 'delete:own', attributes: ['*', '!confirmed'] },

  // Card
  { role: AccessRole.USER, resource: AccessResource.CARD, action: 'create:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.CARD, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.CARD, action: 'delete:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.CARD, action: 'update:own', attributes: ['*'] },

  // Card Access
  { role: AccessRole.USER, resource: AccessResource.CARD_ACCESSS, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.CARD_ACCESSS_RENEWAL, action: 'create:own', attributes: ['*'] },
];
