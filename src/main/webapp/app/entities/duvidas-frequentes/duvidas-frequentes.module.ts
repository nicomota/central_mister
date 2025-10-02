import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DuvidasFrequentesComponent } from './duvidas-frequentes.component';


const routes: Routes = [
  {
    path: '',
    component: DuvidasFrequentesComponent
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [DuvidasFrequentesComponent]
})
export class DuvidasFrequentesModule {}
