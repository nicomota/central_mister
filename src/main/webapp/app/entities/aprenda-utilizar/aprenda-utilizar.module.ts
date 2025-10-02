import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AprendaUtilizarComponent } from './aprenda-utilizar.component';
import { APRENDA_UTILIZAR_ROUTE } from './aprenda-utilizar.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([APRENDA_UTILIZAR_ROUTE])],
  declarations: [AprendaUtilizarComponent],
})
export class AprendaUtilizarModule {}
