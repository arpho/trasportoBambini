import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClerksPageRoutingModule } from './clerks-routing.module';

import { ClerksPage } from './clerks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClerksPageRoutingModule
  ],
  declarations: [ClerksPage]
})
export class ClerksPageModule {}
