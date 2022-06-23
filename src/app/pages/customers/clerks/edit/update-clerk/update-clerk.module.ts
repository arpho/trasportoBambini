import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateClerkPageRoutingModule } from './update-clerk-routing.module';

import { UpdateClerkPage } from './update-clerk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateClerkPageRoutingModule
  ],
  declarations: []
})
export class UpdateClerkPageModule {}
