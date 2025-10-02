import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DuvidasFrequentesComponent } from './duvidas-frequentes.component';
import { DUVIDAS_FREQUENTES_ROUTE } from './duvidas-frequentes.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([DUVIDAS_FREQUENTES_ROUTE])],
  declarations: [DuvidasFrequentesComponent],
})
export class DuvidasFrequentesModule {}
