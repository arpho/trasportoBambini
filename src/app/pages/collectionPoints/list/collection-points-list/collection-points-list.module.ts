import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionPointsListPageRoutingModule } from './collection-points-list-routing.module';

import { CollectionPointsListPage } from './collection-points-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionPointsListPageRoutingModule
  ],
  declarations: [CollectionPointsListPage]
})
export class CollectionPointsListPageModule {}
