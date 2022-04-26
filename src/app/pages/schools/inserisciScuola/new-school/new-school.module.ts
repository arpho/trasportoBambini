import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSchoolPageRoutingModule } from './new-school-routing.module';

import { NewSchoolPage } from './new-school.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSchoolPageRoutingModule
  ],
  declarations: [NewSchoolPage]
})
export class NewSchoolPageModule {}
