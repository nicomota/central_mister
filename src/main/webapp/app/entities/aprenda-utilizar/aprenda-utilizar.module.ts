import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AprendaUtilizarComponent } from './aprenda-utilizar.component';


const routes: Routes = [
  {
    path: '',
    component: AprendaUtilizarComponent
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [AprendaUtilizarComponent]
})
export class AprendaUtilizarModule {}
