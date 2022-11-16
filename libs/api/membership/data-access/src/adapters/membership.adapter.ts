import { AuthUser } from '@elektra-nx/api/auth/utils';
import { MembershipEntity } from '@elektra-nx/api/membership/models';
import { UserEntity } from '@elektra-nx/api/user/models';
import { CreateMembershipDto, UpdateMembershipDto } from '@elektra-nx/api/shared/dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { MembershipService } from '../services';
import { AccessResource } from '@elektra-nx/shared/models';

@Injectable()
export class MembershipAclAdapter {
  constructor(private membership: MembershipService) {}

  public async find(auth: AuthUser) {
    const permission = auth.read(null, AccessResource.MEMBERSHIP);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.membership.find({});

    return permission.filter(result);
  }

  public async findOne(auth: AuthUser, id: string) {
    const entity = await this.membership.findOne(id);
    const permission = auth.read(entity, AccessResource.MEMBERSHIP);

    if (!permission.granted) throw new ForbiddenException();

    return permission.filter(entity);
  }

  public async updateOne(auth: AuthUser, id: string, dto: UpdateMembershipDto): Promise<MembershipEntity> {
    const membership = await this.membership.findOne(id);
    const permission = auth.update(membership, AccessResource.MEMBERSHIP);
    if (!permission.granted) throw new ForbiddenException();

    const filteredDto: UpdateMembershipDto = permission.filter(dto);
    const result = await this.membership.updateOne(membership, filteredDto);

    return { ...membership, ...result };
  }

  public async create(auth: AuthUser, userId: string, dto: CreateMembershipDto): Promise<MembershipEntity> {
    const permission = auth.create({ ownerId: userId }, AccessResource.MEMBERSHIP);
    if (!permission.granted) throw new ForbiddenException();

    const filteredDto: CreateMembershipDto = permission.filter(dto);
    const result = await this.membership.create(userId, filteredDto);

    return permission.filter(result);
  }

  public async deleteOne(auth: AuthUser, id: string) {
    const membership = await this.membership.findOne(id);
    const permission = auth.delete(membership, AccessResource.MEMBERSHIP);
    if (!permission.granted) throw new ForbiddenException();

    return this.membership.delete(membership.id);
  }

  public async findOneFromUserRelation(auth: AuthUser, user: UserEntity, throws = true): Promise<MembershipEntity> {
    const entity = await this.membership.findOneFromUserRelation(user, throws);
    const permission = auth.read({ ownerId: user.id }, AccessResource.MEMBERSHIP);

    if (!permission.granted) throw new ForbiddenException();

    return entity ? permission.filter(entity) : null;
  }
}
