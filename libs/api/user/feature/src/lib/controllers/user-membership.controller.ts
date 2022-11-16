import { UserAclAdapter } from '@elektra-nx/api/user/data-access';
import { MembershipAclAdapter } from '@elektra-nx/api/membership/data-access';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthUser, GetAuth } from '@elektra-nx/api/auth/utils';
import { CreateMembershipDto, UpdateMembershipDto } from '@elektra-nx/api/shared/dto';

@Controller('user/:userId/membership')
export class UserMembershipController {
  constructor(private user: UserAclAdapter, private membership: MembershipAclAdapter) {}

  @Get()
  public async getUserMembership(@GetAuth() auth: AuthUser, @Param('userId') userId: string) {
    const user = await this.user.findOne(auth, userId);
    return this.membership.findOneFromUserRelation(auth, user);
  }

  @Patch()
  public async updateUserMembership(
    @GetAuth() auth: AuthUser,
    @Param('userId') userId: string,
    @Body() dto: UpdateMembershipDto,
  ) {
    const user = await this.user.findOne(auth, userId);
    const membership = await this.membership.findOneFromUserRelation(auth, user);
    return this.membership.updateOne(auth, membership.id, dto);
  }

  @Post()
  public async createUserMembership(
    @GetAuth() auth: AuthUser,
    @Param('userId') userId: string,
    @Body() dto: CreateMembershipDto,
  ) {
    return this.membership.create(auth, userId, dto);
  }
}
