import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApolloQueryResult } from '@apollo/client/core';
import { BlockQueryResult, BlockService } from '@elektra-nx/web/block/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'elektra-nx-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  constructor(private block: BlockService, private sanitizer: DomSanitizer) {}

  @Input() id: string;

  query$?: Observable<ApolloQueryResult<BlockQueryResult>>;

  public sanitize(input: any) {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }

  ngOnInit(): void {
    if (this.id) {
      this.query$ = this.block.loadBlock(this.id);
    }
  }
}
