import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCustomerPageRoutingModule } from './edit-customer-routing.module';

import { EditCustomerPage } from './edit-customer.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCustomerPageRoutingModule,
    DynamicFormModule
  ],
  //declarations: [EditCustomerPage]
})
export class EditCustomerPageModule {}
