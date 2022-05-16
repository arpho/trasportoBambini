import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDriverPage } from './update-driver.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDriverPageRoutingModule {}
