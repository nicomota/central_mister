import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { TicketComponent } from './ticket.component';
import { GerarTicketComponent } from './gerar-ticket/gerar-ticket.component';
import { ResponderTicketComponent } from './responder-ticket/responder-ticket.component';
import { FinalizarTicketComponent } from './finalizar-ticket/finalizar-ticket.component';

const routes: Routes = [
  { path: '', component: TicketComponent },
  { path: 'gerar-ticket', component: GerarTicketComponent },
  { path: 'responder-ticket', component: ResponderTicketComponent },
  { path: 'finalizar-ticket', component: FinalizarTicketComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    TicketComponent,
    GerarTicketComponent,
    ResponderTicketComponent,
    FinalizarTicketComponent,
  ]
})
export class TicketModule {}
