import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuovoVeicoloPageRoutingModule } from './nuovo-veicolo-routing.module';

import { NuovoVeicoloPage } from './nuovo-veicolo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuovoVeicoloPageRoutingModule
  ],
  declarations: [NuovoVeicoloPage]
})
export class NuovoVeicoloPageModule {}
