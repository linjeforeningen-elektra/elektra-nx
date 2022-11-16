import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BlockQuery } from '../../graphql/block.query';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  constructor(private apollo: Apollo) {}

  public loadBlock(blockId: string) {
    return this.apollo.watchQuery({
      query: BlockQuery,
      variables: { blockId },
      useInitialLoading: true,
    }).valueChanges;
  }
}
