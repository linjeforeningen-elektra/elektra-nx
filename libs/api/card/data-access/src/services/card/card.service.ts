import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from '@elektra-nx/api/shared/dto';
import { CardAccessEntity, CardEntity } from '@elektra-nx/api/card/models';
import { UserEntity } from '@elektra-nx/api/user/models';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity) private cardRepo: Repository<CardEntity>,
    @InjectRepository(CardAccessEntity) private cardAccessRepo: Repository<CardAccessEntity>,
  ) {}

  public async find() {
    return this.cardRepo.find();
  }

  public async findOne(id: string, throws?: boolean): Promise<CardEntity | undefined>;
  public async findOne(id: string, throws = true): Promise<CardEntity> {
    const found = await this.cardRepo.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException(`Card not found.`);
    }

    return found;
  }

  public async updateOne(card: CardEntity, dto: UpdateCardDto): Promise<CardEntity> {
    return this.cardRepo.save({ ...card, ...dto });
  }

  public async create(userId: string, dto: CreateCardDto): Promise<CardEntity> {
    return this.cardRepo.save({ ...dto, userId, ownerId: userId });
  }

  public async deleteOne(card: CardEntity) {
    const id = card.id;
    await this.cardRepo.remove(card);
    return { id };
  }

  public async findOneFromUserRelation(user: UserEntity, throws = true): Promise<CardEntity | undefined> {
    const found = await this.cardRepo.findOneBy({ userId: user.id });

    if (!found && throws) {
      throw new NotFoundException(`Card not found.`);
    }

    return found;
  }
}
