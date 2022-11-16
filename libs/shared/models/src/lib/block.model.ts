import { CoreModel } from './core.model';

export interface BlockModel extends CoreModel {
  slug?: string;
}

export interface CreateBlockModel {
  slug: string;
}

export interface UpdateBlockModel {
  slug?: string;
}
