import { AuthUser } from '@elektra-nx/api/auth/utils';
import { CreateBlockDto, UpdateBlockDto } from '@elektra-nx/api/block/utils';
import { AccessResource } from '@elektra-nx/shared/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { BlockService } from '../services';

@Injectable()
export class BlockAclAdapter {
  constructor(private block: BlockService) {}

  public async findBlocks(auth: AuthUser) {
    const permission = auth.read(null, AccessResource.BLOCK_LIST);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.block.find();
    return permission.filter(result);
  }

  public async findOneBlock(auth: AuthUser, idOrSlug: string) {
    const entity = await this.block.findOne(idOrSlug);
    const permission = auth.read(entity, AccessResource.BLOCK);
    if (!permission.granted) throw new ForbiddenException();

    return permission.filter(entity);
  }

  public async createBlock(auth: AuthUser, body: CreateBlockDto) {
    const createPermission = auth.create(null, AccessResource.BLOCK);
    if (!createPermission.granted) throw new ForbiddenException();

    const filteredDto: CreateBlockDto = createPermission.filter(body);
    const entity = await this.block.create(filteredDto, auth.id);
    const readPermission = auth.read(entity, AccessResource.BLOCK);

    return readPermission.filter(entity);
  }

  public async updateBlock(auth: AuthUser, blockId: string, body: UpdateBlockDto) {
    const entity = await this.block.findOne(blockId);
    const permission = auth.update(entity, AccessResource.BLOCK);
    if (!permission.granted) throw new ForbiddenException();

    const filteredDto: UpdateBlockDto = permission.filter(body);
    const result = await this.block.update(blockId, filteredDto);
    const readPermission = auth.read(result, AccessResource.BLOCK);

    return readPermission.filter(result);
  }

  public async deleteBlock(auth: AuthUser, idOrSlug: string) {
    const entity = await this.block.findOne(idOrSlug);
    const permission = auth.delete(entity, AccessResource.BLOCK);
    if (!permission.granted) throw new ForbiddenException();

    return this.block.delete(entity.id);
  }
}
