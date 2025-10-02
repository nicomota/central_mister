import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MisterAcademyComponent } from './mister-academy.component';
import { JourneyComponent } from './journey/journey.component';

const routes: Routes = [
  {
    path: '',
    component: MisterAcademyComponent
  },
  {
    path: 'journey',
    component: JourneyComponent
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [MisterAcademyComponent, JourneyComponent]
})
export class MisterAcademyModule {}
