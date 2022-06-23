import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClerksPageRoutingModule } from './clerks-routing.module';

import { ClerksPage } from './clerks.page';
import { ItemModule } from 'src/app/modules/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClerksPageRoutingModule,
    ItemModule
  ],
  declarations: []
})
export class ClerksPageModule {}
