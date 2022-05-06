import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateVehiclePageRoutingModule } from './update-vehicle-routing.module';

import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateVehiclePageRoutingModule,
    DynamicFormModule
  ],
  //declarations: [UpdateVehiclePageModule]
})
export class UpdateVehiclePageModule {}
