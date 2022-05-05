import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewParentPageRoutingModule } from './new-parent-routing.module';

import { NewParentPage } from './new-parent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewParentPageRoutingModule
  ],
  declarations: [NewParentPage]
})
export class NewParentPageModule {}
