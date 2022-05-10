import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCustomerPage } from './edit-customer.page';

const routes: Routes = [
  {
    path: '',
    component: EditCustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCustomerPageRoutingModule {}
