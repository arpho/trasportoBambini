import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParentsListPageRoutingModule } from './parents-list-routing.module';

import { ParentsListPage } from './parents-list.page';
import { ItemModule } from 'src/app/modules/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParentsListPageRoutingModule,
    ItemModule
  ],
  declarations: []
})
export class ParentsListPageModule {}
