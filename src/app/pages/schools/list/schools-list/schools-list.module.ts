import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolsListPageRoutingModule } from './schools-list-routing.module';

import { SchoolsListPage } from './schools-list.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';
import { ItemModule } from 'src/app/modules/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolsListPageRoutingModule,
    ItemModule
  ],
  declarations: [SchoolsListPage]
})
export class SchoolsListPageModule {}
