import { UserAclAdapter } from '@elektra-nx/api/user/data-access';
import { CardAclAdapter } from '@elektra-nx/api/card/data-access';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthUser, GetAuth } from '@elektra-nx/api/auth/utils';
import { CreateCardDto, UpdateCardDto } from '@elektra-nx/api/shared/dto';

@Controller('user/:userId/card')
export class UserCardController {
  constructor(private user: UserAclAdapter, private card: CardAclAdapter) {}

  @Post()
  public async createUserCard(@GetAuth() auth: AuthUser, @Param('userId') userId: string, @Body() dto: CreateCardDto) {
    return this.card.create(auth, userId, dto);
  }

  @Get()
  public async getUserCard(@GetAuth() auth: AuthUser, @Param('userId') userId: string) {
    const user = await this.user.findOne(auth, userId);
    return this.card.findFromUserRelation(auth, user);
  }

  @Patch()
  public async updateUserCard(@GetAuth() auth: AuthUser, @Param('userId') userId: string, @Body() dto: UpdateCardDto) {
    const card = await this.getUserCard(auth, userId);
    return this.card.updateOne(auth, card.id, dto);
  }

  @Delete()
  public async removeUserCard(@GetAuth() auth: AuthUser, @Param('userId') userId) {
    const card = await this.getUserCard(auth, userId);
    return this.card.deleteOne(auth, card.id);
  }
}
