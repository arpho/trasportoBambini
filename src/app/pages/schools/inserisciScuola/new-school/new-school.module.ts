import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSchoolPageRoutingModule } from './new-school-routing.module';

import { NewSchoolPage } from './new-school.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSchoolPageRoutingModule,
    DynamicFormModule
  ],
  declarations: [NewSchoolPage]
})
export class NewSchoolPageModule {}
