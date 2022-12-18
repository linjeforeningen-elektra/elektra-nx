import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '@elektra-nx/api/shared/dto';
import { AuthUser } from '@elektra-nx/api/auth/utils';
import { UserService } from '../services';
import { User } from '@elektra-nx/api/user/models';
import { AccessResource } from '@elektra-nx/shared/models';

@Injectable()
export class UserAclAdapter {
  constructor(private user: UserService) {}

  public async find(auth: AuthUser): Promise<User[]> {
    const permission = auth.read(null, AccessResource.USER);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.user.find({});

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
    const result = await this.user.updateOne(user, filteredDto);

    return { ...user, ...result };
  }

  public async removeOne(auth: AuthUser, userId: string): Promise<{ id: string }> {
    const found = await this.findOne(auth, userId);

    const permission = auth.delete(found, AccessResource.USER);
    if (!permission.granted) throw new ForbiddenException();

    return this.user.delete(found);
  }
}
