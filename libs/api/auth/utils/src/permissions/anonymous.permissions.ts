/* eslint-disable */
import { AccessResource, AccessRole } from '@elektra-nx/shared/models';
import { IAccessInfo } from 'nest-access-control';
// import { AccessResource } from '../interfaces/access-resource.enum';

export const AnonymousPermissions: IAccessInfo[] = [
  // User
  // { role: AccessRole.ANONYMOUS, resource: AccessResource.USER, action: 'read:own', attributes: ['*'] },
  // { role: AccessRole.DEFAULT, resource: AccessResource.USER, action: 'read:any', attributes: ['*'] },
  // { role: AccessRole.ANONYMOUS, resource: AccessResource.USER, action: 'update:own', attributes: ['name', 'slug'] },
  // Membership
  // { role: AccessRole.USER, resource: AccessResource.MEMBERSHIP, action: 'create:own', attributes: ['*'] },
  // { role: AccessRole.USER, resource: AccessResource.MEMBERSHIP, action: 'read:own', attributes: ['*'] },
  // { role: AccessRole.USER, resource: AccessResource.MEMBERSHIP, action: 'update:own', attributes: ['*', '!confirmed', '!ownerId'] },
  // { role: AccessRole.USER, resource: AccessResource.MEMBERSHIP, action: 'read:any', attributes: ['*', '!phone', '!address'] },
  // { role: AccessRole.USER, resource: AccessResource.MEMBERSHIP, action: 'delete:own', attributes: ['*', '!confirmed'] },
  // Card
  // // { role: AccessRole.USER, resource: AccessResource.CARD, action: 'create:own', attributes: ['*'] },
  // { role: AccessRole.USER, resource: AccessResource.CARD, action: 'read:own', attributes: ['*'] },
  // { role: AccessRole.USER, resource: AccessResource.CARD, action: 'delete:own', attributes: ['*'] },
  // { role: AccessRole.USER, resource: AccessResource.CARD, action: 'create:own', attributes: ['*'] },
  // { role: AccessRole.USER, resource: AccessResource.CARD, action: 'read:own', attributes: ['*'] },
  // { role: AccessRole.USER, resource: AccessResource.CARD, action: 'delete:own', attributes: ['*'] },
  // { role: AccessRole.USER, resource: AccessResource.CARD_ACTIVITY, action: 'read:own', attributes: ['*'] },
  // { role: AccessRole.USER, resource: AccessResource.CARD_ACTIVITY_RENEWAL, action: 'create:own', attributes: ['*'] },
  // Block
  { role: AccessRole.ANONYMOUS, resource: AccessResource.BLOCK, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.ANONYMOUS, resource: AccessResource.BLOCK, action: 'read:any', attributes: ['*'] },
  // BlockRevision
  { role: AccessRole.ANONYMOUS, resource: AccessResource.BLOCK_REVISION, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.ANONYMOUS, resource: AccessResource.BLOCK_REVISION, action: 'read:any', attributes: ['*'] },
];
