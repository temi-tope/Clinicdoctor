import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReexamPage } from './reexam.page';

const routes: Routes = [
  {
    path: '',
    component: ReexamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReexamPageRoutingModule {}
