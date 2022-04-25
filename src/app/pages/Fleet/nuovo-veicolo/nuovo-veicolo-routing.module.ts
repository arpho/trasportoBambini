import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuovoVeicoloPage } from './nuovo-veicolo.page';

const routes: Routes = [
  {
    path: '',
    component: NuovoVeicoloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovoVeicoloPageRoutingModule {}
