import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./entities/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'academy-intro',
    loadChildren: () => import('./entities/mister-academy-landing/mister-academy-landing.module').then(m => m.MisterAcademyLandingModule)
  },
  {
    path: 'mister-academy',
    loadChildren: () => import('./entities/mister-academy/mister-academy.module').then(m => m.MisterAcademyModule)
  },
  {
    path: 'aprenda-utilizar',
    loadChildren: () => import('./entities/aprenda-utilizar/aprenda-utilizar.module').then(m => m.AprendaUtilizarModule)
  },
  {
    path: 'duvidas-frequentes',
    loadChildren: () => import('./entities/duvidas-frequentes/duvidas-frequentes.module').then(m => m.DuvidasFrequentesModule)
  },
  {
    path: 'plano-de-contas',
    loadChildren: () => import('./entities/plano-de-contas/plano-de-contas.module').then(m => m.PlanoDeContasModule)
  },
  {
    path: 'cadastros',
    loadChildren: () => import('./entities/cadastros/cadastros.module').then(m => m.CadastrosModule)
  },
  {
    path: 'integracoes-bancarias',
    loadChildren: () => import('./entities/integracoes-bancarias/integracoes-bancarias.module').then(m => m.IntegracoesBancariasModule)
  },
  {
    path: 'notas-fiscais',
    loadChildren: () => import('./entities/notas-fiscais/notas-fiscais.module').then(m => m.NotasFiscaisModule)
  },
  {
    path: 'comprovantes',
    loadChildren: () => import('./entities/comprovantes/comprovantes.module').then(m => m.ComprovantesModule)
  },
  {
    path: 'extratos',
    loadChildren: () => import('./entities/extratos/extratos.module').then(m => m.ExtratosModule)
  },
  {
    path: 'planilhas',
    loadChildren: () => import('./entities/planilhas/planilhas.module').then(m => m.PlanilhasModule)
  },
  {
    path: 'concilia',
    loadChildren: () => import('./entities/concilia/concilia.module').then(m => m.ConciliaModule)
  },
  {
    path: 'regras',
    loadChildren: () => import('./entities/regras/regras.module').then(m => m.RegrasModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./entities/registro/registro.module').then(m => m.RegistroModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./entities/ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'exportacao',
    loadChildren: () => import('./entities/exportacao/exportacao.module').then(m => m.ExportacaoModule)
  },
  {
    path: 'edicao-avancada',
    loadChildren: () => import('./entities/edicao-avancada/edicao-avancada.module').then(m => m.EdicaoAvancadaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
