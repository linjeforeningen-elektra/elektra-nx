import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';

const routes: Routes = [{ path: '', component: HomeViewComponent }];

@NgModule({
  declarations: [HomeViewComponent],
  imports: [RouterModule.forChild(routes)],
})
export class HomeModule {}
