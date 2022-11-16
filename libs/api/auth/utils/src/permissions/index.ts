import { RolesBuilder } from 'nest-access-control';

import { AdminPermissions } from './admin.permission';
import { UserPermissions } from './user.permissions';
import { AnonymousPermissions } from './anonymous.permissions';
import { AccessRole } from '@elektra-nx/shared/models';
import { SuperAdminPermissions } from './super-admin.permissions';

const builder = new RolesBuilder([
  ...SuperAdminPermissions,
  ...AdminPermissions,
  ...UserPermissions,
  ...AnonymousPermissions,
]);

// initalise all roles
const roles = Object.values(AccessRole);
builder.grant(roles);

export { builder };
