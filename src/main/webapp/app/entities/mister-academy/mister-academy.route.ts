import { Route } from '@angular/router';
import { MisterAcademyComponent } from './mister-academy.component';
import { AuthGuard } from 'app/core/auth/auth.guard';

export const MISTER_ACADEMY_ROUTE: Route = {
  path: '',
  component: MisterAcademyComponent,
  canActivate: [AuthGuard],
};
