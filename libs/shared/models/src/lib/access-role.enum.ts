export enum AccessRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  /** Member */
  MEMBER = 'MEMBER',
  /** Logged in user */
  USER = 'USER',
  /** Anonoymous user */
  ANONYMOUS = 'ANONYMOUS',
}

export const AccessRoleOrder: Record<AccessRole, number> = {
  SUPER_ADMIN: 0,
  ADMIN: 1,
  MEMBER: 2,
  // adding some padding
  USER: 9,
  ANONYMOUS: 10,
};
