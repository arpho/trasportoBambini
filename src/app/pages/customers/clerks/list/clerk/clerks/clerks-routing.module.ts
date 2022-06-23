import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClerksPage } from './clerks.page';

const routes: Routes = [
  {
    path: '',
    component: ClerksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClerksPageRoutingModule {}
