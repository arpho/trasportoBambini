import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlottaPageRoutingModule } from './flotta-routing.module';

import { FlottaPage } from './flotta.page';
import { ItemModule } from 'src/app/modules/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlottaPageRoutingModule,
    ItemModule
  ],
  declarations: [FlottaPage]
})
export class FlottaPageModule {}
