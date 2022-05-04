import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCollectionPointPage } from './create-collection-point.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCollectionPointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCollectionPointPageRoutingModule {}
