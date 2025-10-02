import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { RegrasComponent } from './regras.component';
import { CriacaoRegrasComponent } from './criacao-regras/criacao-regras.component';

const routes: Routes = [
  { path: '', component: RegrasComponent },
  { path: 'criacao-regras', component: CriacaoRegrasComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    RegrasComponent,
    CriacaoRegrasComponent,
  ]
})
export class RegrasModule {}
