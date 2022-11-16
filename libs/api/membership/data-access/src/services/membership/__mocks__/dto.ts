import { CreateMembershipDto, CreateUserDto } from '@elektra-nx/api/shared/dto';

export const UserDto: CreateUserDto = {
  name: 'Name 1',
  slug: 'slug-1',
};

export const MembershipDto: CreateMembershipDto = {
  address: 'Address 1',
  immatriculation: new Date(),
  memberyear: new Date(),
  phone: '12345678',
  graduation: new Date(),
};
