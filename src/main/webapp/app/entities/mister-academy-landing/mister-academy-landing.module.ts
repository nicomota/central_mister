import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisterAcademyLandingRoutingModule } from './mister-academy-landing-routing.module';
import { MisterAcademyLandingComponent } from './mister-academy-landing.component';
import { MisterAcademyNavbarModule } from '../mister-academy-navbar/mister-academy-navbar.module';


@NgModule({
  declarations: [
    MisterAcademyLandingComponent
  ],
  imports: [
    CommonModule,
    MisterAcademyLandingRoutingModule,
    MisterAcademyNavbarModule
  ]
})
export class MisterAcademyLandingModule { }
