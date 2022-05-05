import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateParentPage } from './update-parent.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateParentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateParentPageRoutingModule {}
