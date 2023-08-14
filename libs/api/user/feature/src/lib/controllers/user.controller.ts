import { AuthGuard, AuthUser, GetAuth } from '@elektra-nx/api/auth/utils';
import { UserAclAdapter } from '@elektra-nx/api/user/data-access';
import { UpdateUserDto } from '@elektra-nx/api/shared/dto';
import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private user: UserAclAdapter) {}

  @Get()
  public async find(@GetAuth() auth: AuthUser) {
    return this.user.find(auth, {});
  }

  @Get(':id')
  public async findOne(@GetAuth() auth: AuthUser, @Param('id') userId: string) {
    return this.user.findOne(auth, userId);
    // throw new NotFoundException(`User not found.`);
  }

  @Patch(':id')
  public async updateOne(@GetAuth() auth: AuthUser, @Param('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.user.updateOne(auth, userId, dto);
  }

  @Delete(':id')
  public async removeOne(@GetAuth() auth: AuthUser, @Param('id') userId: string) {
    return this.user.removeOne(auth, userId);
  }
}
