import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolsListPageRoutingModule } from './schools-list-routing.module';

import { SchoolsListPage } from './schools-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolsListPageRoutingModule
  ],
  declarations: [SchoolsListPage]
})
export class SchoolsListPageModule {}
