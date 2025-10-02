import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { ConciliaComponent } from './concilia.component';
import { ModuloBasicoComponent } from './modulo-basico/modulo-basico.component';
import { ModuloPremiumComponent } from './modulo-premium/modulo-premium.component';
import { RecebimentoCieloComponent } from './recebimento-cielo/recebimento-cielo.component';
import { RecebimentoRedeComponent } from './recebimento-rede/recebimento-rede.component';
import { RecebimentoStoneComponent } from './recebimento-stone/recebimento-stone.component';

const routes: Routes = [
  { path: '', component: ConciliaComponent },
  { path: 'modulo-basico', component: ModuloBasicoComponent },
  { path: 'modulo-premium', component: ModuloPremiumComponent },
  { path: 'recebimento-cielo', component: RecebimentoCieloComponent },
  { path: 'recebimento-rede', component: RecebimentoRedeComponent },
  { path: 'recebimento-stone', component: RecebimentoStoneComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ConciliaComponent,
    ModuloBasicoComponent,
    ModuloPremiumComponent,
    RecebimentoCieloComponent,
    RecebimentoRedeComponent,
    RecebimentoStoneComponent,
  ]
})
export class ConciliaModule {}
