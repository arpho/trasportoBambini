import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCollectionPointPage } from './update-collection-point.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCollectionPointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCollectionPointPageRoutingModule {}
