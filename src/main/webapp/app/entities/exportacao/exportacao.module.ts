import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { ExportacaoComponent } from './exportacao.component';
import { BaixaNfeDominioComponent } from './baixa-nfe-dominio/baixa-nfe-dominio.component';
import { ExportacaoAlterdataComponent } from './exportacao-alterdata/exportacao-alterdata.component';
import { ExportacaoCalimaComponent } from './exportacao-calima/exportacao-calima.component';
import { ExportacaoContabitComponent } from './exportacao-contabit/exportacao-contabit.component';
import { ExportacaoContmaticComponent } from './exportacao-contmatic/exportacao-contmatic.component';
import { ExportacaoDominioComponent } from './exportacao-dominio/exportacao-dominio.component';
import { ExportacaoFortesComponent } from './exportacao-fortes/exportacao-fortes.component';
import { ExportacaoIobComponent } from './exportacao-iob/exportacao-iob.component';
import { ExportacaoMastermaqComponent } from './exportacao-mastermaq/exportacao-mastermaq.component';
import { ExportacaoNetspeedComponent } from './exportacao-netspeed/exportacao-netspeed.component';
import { ExportacaoProsoftComponent } from './exportacao-prosoft/exportacao-prosoft.component';
import { ExportacaoQuestorComponent } from './exportacao-questor/exportacao-questor.component';
import { ExportacaoQuestorCloudComponent } from './exportacao-questor-cloud/exportacao-questor-cloud.component';
import { ExportacaoSciUnicoComponent } from './exportacao-sci-unico/exportacao-sci-unico.component';
import { ExportacaoSciVisualComponent } from './exportacao-sci-visual/exportacao-sci-visual.component';
import { ExportacaoTronComponent } from './exportacao-tron/exportacao-tron.component';

const routes: Routes = [
  { path: '', component: ExportacaoComponent },
  { path: 'baixa-nfe-dominio', component: BaixaNfeDominioComponent },
  { path: 'exportacao-alterdata', component: ExportacaoAlterdataComponent },
  { path: 'exportacao-calima', component: ExportacaoCalimaComponent },
  { path: 'exportacao-contabit', component: ExportacaoContabitComponent },
  { path: 'exportacao-contmatic', component: ExportacaoContmaticComponent },
  { path: 'exportacao-dominio', component: ExportacaoDominioComponent },
  { path: 'exportacao-fortes', component: ExportacaoFortesComponent },
  { path: 'exportacao-iob', component: ExportacaoIobComponent },
  { path: 'exportacao-mastermaq', component: ExportacaoMastermaqComponent },
  { path: 'exportacao-netspeed', component: ExportacaoNetspeedComponent },
  { path: 'exportacao-prosoft', component: ExportacaoProsoftComponent },
  { path: 'exportacao-questor', component: ExportacaoQuestorComponent },
  { path: 'exportacao-questor-cloud', component: ExportacaoQuestorCloudComponent },
  { path: 'exportacao-sci-unico', component: ExportacaoSciUnicoComponent },
  { path: 'exportacao-sci-visual', component: ExportacaoSciVisualComponent },
  { path: 'exportacao-tron', component: ExportacaoTronComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ExportacaoComponent,
    BaixaNfeDominioComponent,
    ExportacaoAlterdataComponent,
    ExportacaoCalimaComponent,
    ExportacaoContabitComponent,
    ExportacaoContmaticComponent,
    ExportacaoDominioComponent,
    ExportacaoFortesComponent,
    ExportacaoIobComponent,
    ExportacaoMastermaqComponent,
    ExportacaoNetspeedComponent,
    ExportacaoProsoftComponent,
    ExportacaoQuestorComponent,
    ExportacaoQuestorCloudComponent,
    ExportacaoSciUnicoComponent,
    ExportacaoSciVisualComponent,
    ExportacaoTronComponent,
  ]
})
export class ExportacaoModule {}
