import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDriverPageRoutingModule } from './new-driver-routing.module';

import { NewDriverPage } from './new-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDriverPageRoutingModule
  ],
  declarations: [NewDriverPage]
})
export class NewDriverPageModule {}
