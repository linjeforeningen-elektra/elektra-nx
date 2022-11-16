import { Block } from '@elektra-nx/api/block/models';
import { CreateBlockDto, UpdateBlockDto } from '@elektra-nx/api/block/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';

@Injectable()
export class BlockService {
  constructor(@InjectRepository(Block) private block: Repository<Block>) {}

  public async create(dto: CreateBlockDto, ownerId: string) {
    return this.block.save({ ...dto, ownerId });
  }

  public async find() {
    return this.block.find();
  }

  public async findOne(idOrSlug: string): Promise<Block> {
    let found: Block;
    if (isUUID(idOrSlug)) {
      found = await this.block.findOneBy({ id: idOrSlug });
    } else {
      found = await this.block.findOneBy({ slug: idOrSlug });
    }

    if (!found) {
      throw new NotFoundException(`Block not found.`);
    }

    return found;
  }

  public async update(blockId: string, dto: UpdateBlockDto) {
    const block = await this.findOne(blockId);
    return this.block.save({ ...block, ...dto });
  }

  public async delete(blockId: string): Promise<{ id: string }> {
    const block = await this.findOne(blockId);
    const id = block.id;
    await this.block.remove(block);
    return { id };
  }
}
