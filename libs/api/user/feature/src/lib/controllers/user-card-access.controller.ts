import { UserAclAdapter } from '@elektra-nx/api/user/data-access';
import { CardAclAdapter, CardAccessAclAdapter } from '@elektra-nx/api/card/data-access';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthUser, GetAuth } from '@elektra-nx/api/auth/utils';
import { CreateCardAccessDto } from '@elektra-nx/api/shared/dto';
// import { CreateCardDto, UpdateCardDto } from '@elektra-nx/shared/models';

@Controller('user/:userId/card/access')
export class UserCardAccesssController {
  constructor(private user: UserAclAdapter, private card: CardAclAdapter, private cardAccess: CardAccessAclAdapter) {}

  // @Post()
  // public async createUserCard(@GetAuth() auth: AuthUser, @Param('userId') userId: string, @Body() dto: CreateCardDto) {
  //   return this.card.create(auth, userId, dto);
  // }

  @Get()
  public async getUserCardAccess(@GetAuth() auth: AuthUser, @Param('userId') userId: string) {
    const user = await this.user.findOne(auth, userId);
    const card = await this.card.findFromUserRelation(auth, user);
    return this.cardAccess.findByCardRelation(auth, card);
  }

  @Get('status')
  public async getUserCardAccessStatus(@GetAuth() auth: AuthUser, @Param('userId') userId: string) {
    const user = await this.user.findOne(auth, userId);
    const card = await this.card.findFromUserRelation(auth, user);
    return this.cardAccess.getStatus(auth, card.id);
  }

  @Post('renew')
  public async renewUserCardAccess(@GetAuth() auth: AuthUser, @Param('userId') userId: string) {
    const user = await this.user.findOne(auth, userId);
    const card = await this.card.findFromUserRelation(auth, user);
    return this.cardAccess.renew(auth, card.id);
  }

  @Post()
  public async createUserCardAccess(
    @GetAuth() auth: AuthUser,
    @Param('userId') userId: string,
    @Body() dto: CreateCardAccessDto,
  ) {
    const user = await this.user.findOne(auth, userId);
    const card = await this.card.findFromUserRelation(auth, user);
    return this.cardAccess.create(auth, card.id, dto);
  }

  // @Patch()
  // public async updateUserCard(@GetAuth() auth: AuthUser, @Param('userId') userId: string, @Body() dto: UpdateCardDto) {
  //   const card = await this.getUserCard(auth, userId);
  //   return this.card.updateOne(auth, card.id, dto);
  // }
}
