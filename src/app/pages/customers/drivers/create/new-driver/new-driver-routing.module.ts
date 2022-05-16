import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDriverPage } from './new-driver.page';

const routes: Routes = [
  {
    path: '',
    component: NewDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDriverPageRoutingModule {}
