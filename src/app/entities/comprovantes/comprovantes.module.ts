import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { ComprovantesComponent } from './comprovantes.component';
import { BancoDoBrasilComponent } from './banco-do-brasil/banco-do-brasil.component';
import { BradescoComponent } from './bradesco/bradesco.component';
import { CaixaComponent } from './caixa/caixa.component';
import { CredcreaComponent } from './credcrea/credcrea.component';
import { InterComponent } from './inter/inter.component';
import { ItauComponent } from './itau/itau.component';
import { SantanderComponent } from './santander/santander.component';
import { SicoobComponent } from './sicoob/sicoob.component';
import { SicrediComponent } from './sicredi/sicredi.component';
import { UnicredComponent } from './unicred/unicred.component';
import { UploadComprovantesComponent } from './upload-comprovantes/upload-comprovantes.component';

const routes: Routes = [
  { path: '', component: ComprovantesComponent },
  { path: 'banco-do-brasil', component: BancoDoBrasilComponent },
  { path: 'bradesco', component: BradescoComponent },
  { path: 'caixa', component: CaixaComponent },
  { path: 'credcrea', component: CredcreaComponent },
  { path: 'inter', component: InterComponent },
  { path: 'itau', component: ItauComponent },
  { path: 'santander', component: SantanderComponent },
  { path: 'sicoob', component: SicoobComponent },
  { path: 'sicredi', component: SicrediComponent },
  { path: 'unicred', component: UnicredComponent },
  { path: 'upload-comprovantes', component: UploadComprovantesComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ComprovantesComponent,
    BancoDoBrasilComponent,
    BradescoComponent,
    CaixaComponent,
    CredcreaComponent,
    InterComponent,
    ItauComponent,
    SantanderComponent,
    SicoobComponent,
    SicrediComponent,
    UnicredComponent,
    UploadComprovantesComponent,
  ]
})
export class ComprovantesModule {}
