import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionPointsListPage } from './collection-points-list.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionPointsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionPointsListPageRoutingModule {}
