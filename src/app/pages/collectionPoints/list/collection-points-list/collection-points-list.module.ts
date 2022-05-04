import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionPointsListPageRoutingModule } from './collection-points-list-routing.module';

import { CollectionPointsListPage } from './collection-points-list.page';
import { ItemModule } from 'src/app/modules/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionPointsListPageRoutingModule,
    ItemModule
  ],
  declarations: [CollectionPointsListPage]
})
export class CollectionPointsListPageModule {}
