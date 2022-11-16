import { MembershipModel } from '@elektra-nx/shared/models';

export type AccountMembershipSlice = Omit<MembershipModel, 'createdAt' | 'updatedAt' | 'ownerId'>;
