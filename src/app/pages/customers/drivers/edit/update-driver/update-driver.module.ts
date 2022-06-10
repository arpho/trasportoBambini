import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDriverPageRoutingModule } from './update-driver-routing.module';

import { UpdateDriverPage } from './update-driver.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateDriverPageRoutingModule,
    DynamicFormModule
  ],
  declarations: [UpdateDriverPage]
})
export class UpdateDriverPageModule {}
