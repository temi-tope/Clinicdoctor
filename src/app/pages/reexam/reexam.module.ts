import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReexamPageRoutingModule } from './reexam-routing.module';

import { ReexamPage } from './reexam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReexamPageRoutingModule
  ],
  declarations: [ReexamPage]
})
export class ReexamPageModule {}
