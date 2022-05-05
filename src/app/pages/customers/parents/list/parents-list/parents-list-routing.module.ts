import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentsListPage } from './parents-list.page';

const routes: Routes = [
  {
    path: '',
    component: ParentsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentsListPageRoutingModule {}
