import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSharedUiIsVisibleDirective } from './web-shared-ui-is-visible.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [WebSharedUiIsVisibleDirective],
  exports: [WebSharedUiIsVisibleDirective],
})
export class WebSharedUiIsVisibleModule {}
