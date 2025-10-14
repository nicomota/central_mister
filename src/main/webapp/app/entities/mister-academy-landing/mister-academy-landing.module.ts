import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisterAcademyLandingRoutingModule } from './mister-academy-landing-routing.module';
import { MisterAcademyLandingComponent } from './mister-academy-landing.component';


@NgModule({
  declarations: [
    MisterAcademyLandingComponent
  ],
  imports: [
    CommonModule,
    MisterAcademyLandingRoutingModule
  ]
})
export class MisterAcademyLandingModule { }
