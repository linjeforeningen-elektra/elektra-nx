import { BlockModel, BlockRevisionModel } from '@elektra-nx/shared/models';
import { gql } from 'apollo-angular';

type BlockWithLatestVersion = BlockModel & {
  latest: BlockRevisionModel | null;
};

export interface BlockQueryVariables {
  slug: string;
}

export interface BlockQueryResult {
  readonly block: BlockWithLatestVersion;
}

export const BlockQuery = gql<BlockQueryResult, BlockQueryVariables>``;
