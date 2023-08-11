import { CardAccess, Card } from '@elektra-nx/api/card/models';
import { CreateCardAccessDto, UpdateCardAccessDto } from '@elektra-nx/api/shared/dto';
import { CardAccessStatus } from '@elektra-nx/shared/models';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const ONE_MONTH = 1000 * 3600 * 24 * 30;

@Injectable()
export class CardAccessService {
  constructor(@InjectRepository(CardAccess) private readonly cardAccessRepo: Repository<CardAccess>) {}

  private get NOW(): Date {
    return new Date();
  }

  public async findFromCardRelation(card: Card) {
    return this.cardAccessRepo.findBy({ cardId: card.id });
  }

  public async find() {
    return this.cardAccessRepo.find();
  }

  public async updateOne(id: string, dto: UpdateCardAccessDto) {
    const cardaccess = await this.findOne(id);
    return this.cardAccessRepo.save({ ...cardaccess, ...dto });
  }

  public async removeOne(id: string) {
    const access = await this.findOne(id);
    const _id = access.id;
    await this.cardAccessRepo.remove(access);
    return { id: _id };
  }

  public async createCardAccess(card: Card, dto: CreateCardAccessDto) {
    return this.cardAccessRepo.save({ ...dto, card });
  }

  public async renewCardAccess(card: Card): Promise<CardAccessStatus> {
    // validate whether access can be created
    const status = await this.getCardActivityStatus(card.id);
    if (status === CardAccessStatus.ACTIVE_WAITING || status === CardAccessStatus.EXPIRED_WAITING) {
      throw new ForbiddenException('You already have pending access.');
    }
    if (status === CardAccessStatus.ACTIVE) {
      throw new ForbiddenException('You can only renew 30 days before expiry.');
    }

    const expiration = this.getNextExpiry();
    const ownerId = card.ownerId;
    const cardId = card.id;

    await this.cardAccessRepo.save({ cardId, ownerId, expiration });

    return this.getCardActivityStatus(card.id);
  }

  public async findOne(id: string, throws?: boolean): Promise<CardAccess | undefined>;
  public async findOne(id: string, throws = true): Promise<CardAccess> {
    const found = await this.cardAccessRepo.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException(`Card Access not found.`);
    }

    return found;
  }

  // i want to die
  public getNextExpiry(): Date {
    const Y = this.NOW.getUTCFullYear();
    const AUTUMN_NEXT = new Date(Y + 1, 7, 15, 12, 0, 0);

    return AUTUMN_NEXT;
  }

  // public getNextExpiry(): Date {
  //   const Y = this.NOW.getUTCFullYear();
  //   const AUTUMN = new Date(Y, 7, 15, 12, 0, 0);
  // const AUTUMN_NEXT = new Date(Y + 1, 7, 15, 12, 0, 0);
  //   const SPRING = new Date(Y, 0, 15, 12, 0, 0);
  //   const SPRING_NEXT = new Date(Y + 1, 0, 15, 12, 0, 0);

  //   const diff_aug = AUTUMN.getTime() - this.NOW.getTime();
  //   const diff_jan = SPRING.getTime() - this.NOW.getTime();
  //   const diff_jan_next = SPRING_NEXT.getTime() - this.NOW.getTime();

  //   if (diff_aug > 0) {
  //     if (diff_jan > 0) {
  //       // zone 1
  //       return AUTUMN;
  //     }
  //     // zone 2
  //     if (diff_aug <= ONE_MONTH) {
  //       return SPRING_NEXT;
  //     }
  //     return AUTUMN;
  //   } else {
  //     // zone 3
  //     if (diff_jan_next <= ONE_MONTH) {
  //       return AUTUMN_NEXT;
  //     }
  //     return SPRING_NEXT;
  //   }
  // }

  public async getCardActivityStatus(cardId: string) {
    const found = await this.cardAccessRepo.findBy({ cardId });

    //NONE
    if (found.length < 1) return CardAccessStatus.NONE;
    //WAITING
    if (found.find((a) => a.sent == false)) {
      return found.some((a) => a.sent == true && a.expiration > this.NOW)
        ? CardAccessStatus.ACTIVE_WAITING
        : CardAccessStatus.EXPIRED_WAITING;
    }
    //ACTIVE
    if (found.some((a) => a.sent == true && this.NOW < a.expiration)) {
      return found.some(
        (a) => a.sent == true && this.NOW > new Date(a.expiration.getTime() - ONE_MONTH) && this.NOW < a.expiration,
      )
        ? CardAccessStatus.RENEWABLE
        : CardAccessStatus.ACTIVE;
    }

    return CardAccessStatus.EXPIRED;
  }
}
