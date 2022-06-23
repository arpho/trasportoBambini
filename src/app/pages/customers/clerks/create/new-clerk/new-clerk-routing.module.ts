import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClerkPage } from './new-clerk.page';

const routes: Routes = [
  {
    path: '',
    component: NewClerkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClerkPageRoutingModule {}
