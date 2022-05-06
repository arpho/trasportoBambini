import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateStudentPageRoutingModule } from './update-student-routing.module';

import { UpdateStudentPage } from './update-student.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateStudentPageRoutingModule,
    DynamicFormModule
  ],
  //declarations: [UpdateStudentPage]
})
export class UpdateStudentPageModule {}
