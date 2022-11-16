import { CoreModel } from './core.model';

export interface BlockRevisionModel extends CoreModel {
  content: string;
  version: number;
  blockId: string;
}

export interface CreateBlockRevisionModel {
  content: string;
}
