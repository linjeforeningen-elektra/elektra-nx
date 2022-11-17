import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebBlockModule } from '@elektra-nx/web/block/feature';
import { ContactComponent } from './contact.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, WebBlockModule, RouterModule.forChild([{ path: '', component: ContactComponent }])],
  declarations: [ContactComponent],
})
export class ContactModule {}
