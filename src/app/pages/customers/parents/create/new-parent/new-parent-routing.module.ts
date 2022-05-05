import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewParentPage } from './new-parent.page';

const routes: Routes = [
  {
    path: '',
    component: NewParentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewParentPageRoutingModule {}
