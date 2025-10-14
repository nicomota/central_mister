import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MisterAcademyNavbarComponent } from './mister-academy-navbar.component';

@NgModule({
  declarations: [
    MisterAcademyNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MisterAcademyNavbarComponent
  ]
})
export class MisterAcademyNavbarModule { }
