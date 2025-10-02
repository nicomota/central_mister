import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';

import { ConciliaCartaoRoutingModule } from './concilia-cartao-routing.module';
import { ConciliaCartaoComponent } from './concilia-cartao.component';


@NgModule({
  declarations: [
    ConciliaCartaoComponent
  ],
  imports: [SharedModule, CommonModule,
    ConciliaCartaoRoutingModule
  ]
})
export class ConciliaCartaoModule { }
