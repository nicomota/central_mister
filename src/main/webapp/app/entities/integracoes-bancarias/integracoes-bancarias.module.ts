import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { IntegracoesBancariasComponent } from './integracoes-bancarias.component';
import { IntegraComponent } from './integra/integra.component';
import { IntegraBbComponent } from './integra-bb/integra-bb.component';
import { Inter01Component } from './inter-01/inter-01.component';
import { Inter02Component } from './inter-02/inter-02.component';

const routes: Routes = [
  { path: '', component: IntegracoesBancariasComponent },
  { path: 'integra', component: IntegraComponent },
  { path: 'integra-bb', component: IntegraBbComponent },
  { path: 'inter-01', component: Inter01Component },
  { path: 'inter-02', component: Inter02Component },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    IntegracoesBancariasComponent,
    IntegraComponent,
    IntegraBbComponent,
    Inter01Component,
    Inter02Component,
  ]
})
export class IntegracoesBancariasModule {}
