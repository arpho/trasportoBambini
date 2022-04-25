import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateVehiclePage } from './update-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateVehiclePageRoutingModule {}
