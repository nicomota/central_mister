import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MisterAcademyComponent } from './mister-academy.component';
import { MISTER_ACADEMY_ROUTE } from './mister-academy.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([MISTER_ACADEMY_ROUTE])],
  declarations: [MisterAcademyComponent],
})
export class MisterAcademyModule {}
