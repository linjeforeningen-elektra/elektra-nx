import { AuthUser } from '@elektra-nx/api/auth/utils';
import { CardEntity } from '@elektra-nx/api/card/models';
import { UserEntity } from '@elektra-nx/api/user/models';
import { CreateCardDto, UpdateCardDto } from '@elektra-nx/api/shared/dto';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CardService } from '../services';
import { AccessResource } from '@elektra-nx/shared/models';

@Injectable()
export class CardAclAdapter {
  constructor(private card: CardService) {}

  public async create(auth: AuthUser, userId: string, dto: CreateCardDto) {
    const createPermission = auth.create({ ownerId: auth.id }, AccessResource.CARD);
    if (!createPermission.granted) throw new NotFoundException();

    const filteredDto: CreateCardDto = createPermission.filter(dto);
    const result = await this.card.create(userId, filteredDto);

    const readPermission = auth.read(result, AccessResource.CARD);
    return readPermission.filter(result);
  }

  public async find(auth: AuthUser) {
    const permission = auth.read(null, AccessResource.CARD);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.card.find();
    return permission.filter(result);
  }

  public async findOne(auth: AuthUser, id: string) {
    const entity = await this.card.findOne(id);
    const permission = auth.read(entity, AccessResource.CARD);
    if (!permission.granted) throw new ForbiddenException();

    return permission.filter(entity);
  }

  public async updateOne(auth: AuthUser, id: string, dto: UpdateCardDto) {
    const entity = await this.card.findOne(id);
    const updatePermission = auth.update(entity, AccessResource.CARD);
    if (!updatePermission.granted) throw new ForbiddenException();

    const filteredDto: UpdateCardDto = updatePermission.filter(dto);
    const result = await this.card.updateOne(entity, filteredDto);

    const readPermission = auth.read(entity, AccessResource.CARD);

    return readPermission.filter(result);
  }

  public async deleteOne(auth: AuthUser, id: string) {
    const entity = await this.card.findOne(id);
    const permission = auth.delete(entity, AccessResource.CARD);
    if (!permission.granted) throw new ForbiddenException();

    return this.card.deleteOne(entity);
  }

  public async findFromUserRelation(auth: AuthUser, user: UserEntity, throws = false): Promise<CardEntity> {
    const entity = await this.card.findOneFromUserRelation(user, throws);
    const permission = auth.read({ ownerId: user.id }, AccessResource.CARD);
    if (!permission.granted) throw new ForbiddenException();

    return entity ? permission.filter(entity) : null;
  }
}
