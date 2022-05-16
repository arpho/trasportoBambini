import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDriverPageRoutingModule } from './update-driver-routing.module';

import { UpdateDriverPage } from './update-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateDriverPageRoutingModule
  ],
  declarations: [UpdateDriverPage]
})
export class UpdateDriverPageModule {}
