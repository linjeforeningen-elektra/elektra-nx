import { AuthUser } from '@elektra-nx/api/auth/utils';
import { AccessResource } from '@elektra-nx/shared/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { BlockRevisionService } from '../services';

@Injectable()
export class BlockRevisionAclAdapter {
  constructor(private blockRevision: BlockRevisionService) {}

  public async findAllBlockRevisions(auth: AuthUser) {
    const permission = auth.read(null, AccessResource.BLOCK_REVISION);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.blockRevision.find();
    return permission.filter(result);
  }

  public async findBlockRevisions(auth: AuthUser, blockId: string) {
    const permission = auth.read(null, AccessResource.BLOCK_REVISION);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.blockRevision.find(blockId);
    return permission.filter(result);
  }

  public async findLatestRevision(auth: AuthUser, blockId: string) {
    const permission = auth.read(null, AccessResource.BLOCK_REVISION);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.blockRevision.findLatestRevision(blockId);
    return result ? permission.filter(result) : null; //TODO: fix this other places
  }

  // public async findOneBlockRevision(auth: AuthUser)
}
