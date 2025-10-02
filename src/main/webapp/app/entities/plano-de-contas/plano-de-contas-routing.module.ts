import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanoDeContasComponent } from './plano-de-contas.component';

const routes: Routes = [
  {
    path: '',
    component: PlanoDeContasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanoDeContasRoutingModule { }
