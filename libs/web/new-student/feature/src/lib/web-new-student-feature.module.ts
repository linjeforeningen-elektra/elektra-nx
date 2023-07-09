import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebNewStudentComponent } from './web-new-student.comonent';
import { RouterModule } from '@angular/router';
import { WebBlockModule } from '@elektra-nx/web/block/feature';

@NgModule({
  imports: [CommonModule, WebBlockModule, RouterModule.forChild([{ path: '', component: WebNewStudentComponent }])],
  declarations: [WebNewStudentComponent],
})
export class WebNewStudentFeatureModule {}
