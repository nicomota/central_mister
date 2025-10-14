import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MisterAcademyComponent } from './mister-academy.component';
import { JourneyComponent } from './journey/journey.component';
import { AuthGuard } from 'app/core/auth/auth.guard';
import { CourseComponent } from './course/course.component';
import { MisterAcademyNavbarModule } from '../mister-academy-navbar/mister-academy-navbar.module';

const routes: Routes = [
  {
    path: '',
    component: MisterAcademyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'journey',
    component: JourneyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'curso/:id',
    component: CourseComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), MisterAcademyNavbarModule],
  declarations: [MisterAcademyComponent, JourneyComponent, CourseComponent]
})
export class MisterAcademyModule {}
