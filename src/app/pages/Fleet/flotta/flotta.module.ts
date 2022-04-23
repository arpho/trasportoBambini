import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlottaPageRoutingModule } from './flotta-routing.module';

import { FlottaPage } from './flotta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlottaPageRoutingModule
  ],
  declarations: [FlottaPage]
})
export class FlottaPageModule {}
