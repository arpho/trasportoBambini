import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlottaPage } from './flotta.page';

const routes: Routes = [
  {
    path: '',
    component: FlottaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlottaPageRoutingModule {}
