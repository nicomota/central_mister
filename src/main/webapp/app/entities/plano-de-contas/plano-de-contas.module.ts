import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlanoDeContasComponent } from './plano-de-contas.component';
import { SharedModule } from 'app/shared/shared.module';
import { DominioComponent } from './dominio/dominio.component';
import { FortesComponent } from './fortes/fortes.component';
import { AlterdataComponent } from './alterdata/alterdata.component';
import { QuestorComponent } from './questor/questor.component';
import { SciVisualComponent } from './sci-visual/sci-visual.component';
import { SciUnicoComponent } from './sci-unico/sci-unico.component';
import { IobComponent } from './iob/iob.component';
import { ContmaticComponent } from './contmatic/contmatic.component';
import { CalimaComponent } from './calima/calima.component';
import { AthenasComponent } from './athenas/athenas.component';
import { NetspeedComponent } from './netspeed/netspeed.component';
import { MastermaqComponent } from './mastermaq/mastermaq.component';
import { JbComponent } from './jb/jb.component';
import { TronComponent } from './tron/tron.component';
import { ContabitComponent } from './contabit/contabit.component';
import { ProsoftComponent } from './prosoft/prosoft.component';

const routes: Routes = [
  {
    path: '',
    component: PlanoDeContasComponent
  },
  {
    path: 'dominio',
    component: DominioComponent
  },
  {
    path: 'fortes',
    component: FortesComponent
  },
  {
    path: 'alterdata',
    component: AlterdataComponent
  },
  {
    path: 'questor',
    component: QuestorComponent
  },
  {
    path: 'sci-visual',
    component: SciVisualComponent
  },
  {
    path: 'sci-unico',
    component: SciUnicoComponent
  },
  {
    path: 'iob',
    component: IobComponent
  },
  {
    path: 'contmatic',
    component: ContmaticComponent
  },
  {
    path: 'calima',
    component: CalimaComponent
  },
  {
    path: 'athenas',
    component: AthenasComponent
  },
  {
    path: 'netspeed',
    component: NetspeedComponent
  },
  {
    path: 'mastermaq',
    component: MastermaqComponent
  },
  {
    path: 'jb',
    component: JbComponent
  },
  {
    path: 'tron',
    component: TronComponent
  },
  {
    path: 'contabit',
    component: ContabitComponent
  },
  {
    path: 'prosoft',
    component: ProsoftComponent
  }
];

@NgModule({
  declarations: [
    PlanoDeContasComponent,
    DominioComponent,
    FortesComponent,
    AlterdataComponent,
    QuestorComponent,
    SciVisualComponent,
    SciUnicoComponent,
    IobComponent,
    ContmaticComponent,
    CalimaComponent,
    AthenasComponent,
    NetspeedComponent,
    MastermaqComponent,
    JbComponent,
    TronComponent,
    ContabitComponent,
    ProsoftComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PlanoDeContasModule { }
