import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSchoolPageRoutingModule } from './update-school-routing.module';

import { UpdateSchoolPage } from './update-school.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSchoolPageRoutingModule,
    DynamicFormModule
  ],
  // declarations: [UpdateSchoolPage]
})
export class UpdateSchoolPageModule {}
