import { AuthUser } from '@elektra-nx/api/auth/utils';
import { Card } from '@elektra-nx/api/card/models';
import { CreateCardAccessDto } from '@elektra-nx/api/shared/dto';
import { AccessResource } from '@elektra-nx/shared/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CardService } from '../services';
import { CardAccessService } from '../services/card-access/card-access.service';

@Injectable()
export class CardAccessAclAdapter {
  constructor(private card: CardService, private cardAccess: CardAccessService) {}

  public async find(auth: AuthUser) {
    const permission = auth.read(null, AccessResource.CARD_ACCESSS);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.cardAccess.find();

    return permission.filter(result);
  }

  public async findOne(auth: AuthUser, id: string) {
    const result = await this.cardAccess.findOne(id);
    const permission = auth.read(result, AccessResource.CARD_ACCESSS);
    if (!permission.granted) throw new ForbiddenException();

    return permission.filter(result);
  }

  public async create(auth: AuthUser, cardId: string, dto: CreateCardAccessDto): Promise<Card> {
    const card = await this.card.findOne(cardId);
    const createPermission = auth.create(card, AccessResource.CARD_ACCESSS);

    if (createPermission.granted) throw new ForbiddenException();

    const result = await this.cardAccess.createCardAccess(card, dto);
    const readPermission = auth.read(result, AccessResource.CARD_ACCESSS);

    return readPermission.filter(result);
  }

  public async findByCardRelation(auth: AuthUser, card: Card) {
    const permission = auth.read({ ownerId: card.ownerId }, AccessResource.CARD_ACCESSS);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.cardAccess.findFromCardRelation(card);

    return permission.filter(result);
  }

  public async renew(auth: AuthUser, cardId: string) {
    const card = await this.card.findOne(cardId);
    const createPermission = auth.create(card, AccessResource.CARD_ACCESSS_RENEWAL);
    if (!createPermission.granted) throw new ForbiddenException();

    const result = await this.cardAccess.renewCardAccess(card);
    // const readPermission = auth.read(result, AccessResource.CARD_ACCESSS);

    // return readPermission.filter(result);
    return result;
  }

  public async getStatus(auth: AuthUser, cardId: string) {
    const card = await this.card.findOne(cardId);
    const permission = auth.read({ ownerId: card.ownerId }, AccessResource.CARD_ACCESSS);
    if (!permission.granted) throw new ForbiddenException();

    return this.cardAccess.getCardActivityStatus(cardId);
  }

  public async removeOne(auth: AuthUser, id: string) {
    const entity = await this.cardAccess.findOne(id);
    const permission = auth.delete(entity, AccessResource.CARD_ACCESSS);
    if (!permission.granted) throw new ForbiddenException();

    return this.cardAccess.removeOne(id);
  }
}
