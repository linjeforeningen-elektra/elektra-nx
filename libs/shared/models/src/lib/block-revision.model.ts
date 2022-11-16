import { CoreModel } from './core.model';

export enum BlockRevisionType {
  TEXT = 'TEXT',
}

export interface BlockRevisionModel extends CoreModel {
  type: BlockRevisionType;
  content: string;
  version: number;
  blockId: string;
}

export interface CreateBlockRevisionModel {
  content: string;
  type: BlockRevisionType;
}
