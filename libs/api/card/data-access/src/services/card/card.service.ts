import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from '@elektra-nx/api/shared/dto';
import { CardAccess, Card } from '@elektra-nx/api/card/models';
import { User } from '@elektra-nx/api/user/models';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepo: Repository<Card>,
    @InjectRepository(CardAccess) private cardAccessRepo: Repository<CardAccess>,
  ) {}

  public async find() {
    return this.cardRepo.find();
  }

  public async findOne(id: string, throws?: boolean): Promise<Card | undefined>;
  public async findOne(id: string, throws = true): Promise<Card> {
    const found = await this.cardRepo.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException(`Card not found.`);
    }

    return found;
  }

  public async updateOne(card: Card, dto: UpdateCardDto): Promise<Card> {
    return this.cardRepo.save({ ...card, ...dto });
  }

  public async create(userId: string, dto: CreateCardDto): Promise<Card> {
    return this.cardRepo.save({ ...dto, userId, ownerId: userId });
  }

  public async deleteOne(card: Card) {
    const id = card.id;
    await this.cardRepo.remove(card);
    return { id };
  }

  public async findOneFromUserRelation(user: User, throws = true): Promise<Card | undefined> {
    const found = await this.cardRepo.findOneBy({ userId: user.id });

    if (!found && throws) {
      throw new NotFoundException(`Card not found.`);
    }

    return found;
  }
}
