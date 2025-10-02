import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { RegistroComponent } from './registro.component';
import { AssociacaoContaContabilComponent } from './associacao-conta-contabil/associacao-conta-contabil.component';
import { EntendendoRegistroComponent } from './entendendo-registro/entendendo-registro.component';
import { TransferenciasBancariasComponent } from './transferencias-bancarias/transferencias-bancarias.component';

const routes: Routes = [
  { path: '', component: RegistroComponent },
  { path: 'associacao-conta-contabil', component: AssociacaoContaContabilComponent },
  { path: 'entendendo-registro', component: EntendendoRegistroComponent },
  { path: 'transferencias-bancarias', component: TransferenciasBancariasComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    RegistroComponent,
    AssociacaoContaContabilComponent,
    EntendendoRegistroComponent,
    TransferenciasBancariasComponent,
  ]
})
export class RegistroModule {}
