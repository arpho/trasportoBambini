import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSchoolPage } from './new-school.page';

const routes: Routes = [
  {
    path: '',
    component: NewSchoolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSchoolPageRoutingModule {}
