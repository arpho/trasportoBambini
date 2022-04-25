import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateVehiclePageRoutingModule } from './update-vehicle-routing.module';

import { UpdateVehiclePage } from './update-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateVehiclePageRoutingModule
  ],
  declarations: [UpdateVehiclePage]
})
export class UpdateVehiclePageModule {}
