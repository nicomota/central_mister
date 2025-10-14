import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MisterAcademyNavbarComponent } from './mister-academy-navbar.component';
import { LoginModalModule } from 'app/login-modal/login-modal.module';

@NgModule({
  declarations: [
    MisterAcademyNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginModalModule
  ],
  exports: [
    MisterAcademyNavbarComponent
  ]
})
export class MisterAcademyNavbarModule { }
