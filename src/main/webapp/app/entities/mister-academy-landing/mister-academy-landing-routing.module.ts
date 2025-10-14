import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisterAcademyLandingComponent } from './mister-academy-landing.component';

const routes: Routes = [
  {
    path: '',
    component: MisterAcademyLandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisterAcademyLandingRoutingModule { }
