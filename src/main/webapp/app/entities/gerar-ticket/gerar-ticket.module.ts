import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';

import { GerarTicketRoutingModule } from './gerar-ticket-routing.module';
import { GerarTicketComponent } from './gerar-ticket.component';


@NgModule({
  declarations: [
    GerarTicketComponent
  ],
  imports: [SharedModule, CommonModule,
    GerarTicketRoutingModule
  ]
})
export class GerarTicketModule { }
