import { ForbiddenException, Injectable } from '@nestjs/common';
import { AddOneUserRoleDto, RemoveOneUserRoleDto, UpdateUserDto } from '@elektra-nx/api/shared/dto';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { UserService } from '../services';
import { User } from '@elektra-nx/api/user/models';
import { AccessResource, AccessRoleOrder } from '@elektra-nx/shared/models';
import { FindUsersFilterDto } from '@elektra-nx/api/user/utils';

@Injectable()
export class UserAclAdapter {
  constructor(private user: UserService) {}

  public async find(auth: AuthUser, filter: FindUsersFilterDto): Promise<User[]> {
    const permission = auth.read(null, AccessResource.USER);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.user.find(filter);

    return permission.filter(result);
  }

  public async findOne(auth: AuthUser, userId: string, throws = false): Promise<User> {
    const entity = await this.user.findOne(userId, throws);
    const permission = auth.read(entity, AccessResource.USER);
    if (!permission.granted) throw new ForbiddenException();

    return permission.filter(entity);
  }

  public async updateOne(auth: AuthUser, userId: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(auth, userId);
    const permission = auth.update(user, AccessResource.USER);
    if (!permission.granted) throw new ForbiddenException();

    const filteredDto: UpdateUserDto = permission.filter(dto);

    // if (filteredDto.roles?.includes(AccessRole.SUPER_ADMIN)) {
    //   throw new ForbiddenException(`There can be only one SUPER_ADMIN.`);
    // }

    const result = await this.user.updateOne(user, filteredDto);

    return { ...user, ...result };
  }

  public async removeOne(auth: AuthUser, userId: string): Promise<{ id: string }> {
    const found = await this.findOne(auth, userId);

    const permission = auth.delete(found, AccessResource.USER);
    if (!permission.granted) throw new ForbiddenException();

    return this.user.delete(found);
  }

  public async addOneRole(auth: AuthUser, userId: string, dto: AddOneUserRoleDto) {
    const found = await this.findOne(auth, userId, true);
    const { role } = dto;

    const permission = auth.update(found, AccessResource.USER_ROLE);
    if (!permission.granted) throw new ForbiddenException();

    // highest role of user. Only allowed to add roles below one self, if at all
    const highest = Math.min(...auth.roles.map((r) => AccessRoleOrder[r])) + 1;
    const target = AccessRoleOrder[role];

    if (target < highest) throw new ForbiddenException('Need higher role.');

    return this.user.addOneRole(found, role);
  }

  public async removeOneRole(auth: AuthUser, userId: string, dto: RemoveOneUserRoleDto) {
    const found = await this.findOne(auth, userId, true);
    const { role } = dto;

    const permission = auth.update(found, AccessResource.USER_ROLE);
    if (!permission.granted) throw new ForbiddenException();

    // highest role of user. Only allowed to add roles below one self, if at all
    const highest = Math.min(...auth.roles.map((r) => AccessRoleOrder[r])) + 1;
    const target = AccessRoleOrder[role];

    if (target < highest) throw new ForbiddenException('Need higher role.');

    return this.user.removeOneRole(found, role);
  }
}
