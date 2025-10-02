import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { EdicaoAvancadaComponent } from './edicao-avancada.component';
import { EdicaoAvancadaNfseComponent } from './edicao-avancada-nfse/edicao-avancada-nfse.component';
import { EdicaoAvancadaNfeComponent } from './edicao-avancada-nfe/edicao-avancada-nfe.component';

const routes: Routes = [
  { path: '', component: EdicaoAvancadaComponent },
  { path: 'edicao-avancada-nfse', component: EdicaoAvancadaNfseComponent },
  { path: 'edicao-avancada-nfe', component: EdicaoAvancadaNfeComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    EdicaoAvancadaComponent,
    EdicaoAvancadaNfseComponent,
    EdicaoAvancadaNfeComponent,
  ]
})
export class EdicaoAvancadaModule {}
