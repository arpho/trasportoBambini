import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCustomerPageRoutingModule } from './edit-customer-routing.module';

import { EditCustomerPage } from './edit-customer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCustomerPageRoutingModule
  ],
  //declarations: [EditCustomerPage]
})
export class EditCustomerPageModule {}
