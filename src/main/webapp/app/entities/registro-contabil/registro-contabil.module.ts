import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';

import { RegistroContabilRoutingModule } from './registro-contabil-routing.module';
import { RegistroContabilComponent } from './registro-contabil.component';


@NgModule({
  declarations: [
    RegistroContabilComponent
  ],
  imports: [SharedModule, CommonModule,
    RegistroContabilRoutingModule
  ]
})
export class RegistroContabilModule { }
