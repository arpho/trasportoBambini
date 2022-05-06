import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCollectionPointPageRoutingModule } from './create-collection-point-routing.module';

import { CreateCollectionPointPage } from './create-collection-point.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCollectionPointPageRoutingModule,
    DynamicFormModule
  ],
  //declarations: [CreateCollectionPointPage]
})
export class CreateCollectionPointPageModule {}
