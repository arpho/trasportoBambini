import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCollectionPointPageRoutingModule } from './update-collection-point-routing.module';

import { UpdateCollectionPointPage } from './update-collection-point.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCollectionPointPageRoutingModule
  ],
  //declarations: [UpdateCollectionPointPage]
})
export class UpdateCollectionPointPageModule {}
