import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSchoolPageRoutingModule } from './update-school-routing.module';

import { UpdateSchoolPage } from './update-school.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSchoolPageRoutingModule
  ],
  declarations: [UpdateSchoolPage]
})
export class UpdateSchoolPageModule {}
