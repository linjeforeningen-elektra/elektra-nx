import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block.component';
import { BlockService } from '@elektra-nx/web/block/data-access';

@NgModule({
  imports: [CommonModule],
  declarations: [BlockComponent],
  providers: [BlockService],
  exports: [BlockComponent],
})
export class WebBlockModule {}
