import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClerkPageRoutingModule } from './new-clerk-routing.module';

import { NewClerkPage } from './new-clerk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewClerkPageRoutingModule
  ],
  declarations: [NewClerkPage]
})
export class NewClerkPageModule {}
