import { BlockRevision } from '@elektra-nx/api/block/models';
import { CreateBlockRevisionDto } from '@elektra-nx/api/block/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlockRevisionService {
  constructor(@InjectRepository(BlockRevision) private blockRevision: Repository<BlockRevision>) {}

  public find(blockId?: string) {
    return this.blockRevision.findBy({
      ...(blockId ? { blockId } : {}),
    });
  }

  public async findOne(id: string, throws: false): Promise<BlockRevision | undefined>;
  public async findOne(id: string, throws = true): Promise<BlockRevision> {
    const found = await this.blockRevision.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException(`BlockRevision not found.`);
    }

    return found;
  }

  public async findLatestRevision(blockId: string): Promise<BlockRevision | undefined> {
    const { max: version } = await this.getBlockMaxVersion(blockId);
    return this.blockRevision.findOne({
      where: {
        blockId,
        ...(version ? { version } : {}),
      },
    });
  }

  private async getBlockMaxVersion(blockId: string): Promise<{ max: number | null }> {
    return this.blockRevision
      .createQueryBuilder('b')
      .select('MAX(b.version) as max')
      .where({ blockId })
      .getRawOne<{ max: number | null }>();
  }

  public async create(blockId: string, dto: CreateBlockRevisionDto, userId: string) {
    const { max } = await this.getBlockMaxVersion(blockId);
    return this.blockRevision.save({
      ...dto,
      blockId,
      createdById: userId,
      ownerId: userId,
      version: max ? max + 1 : 1, // important to increment
    });
  }
}
