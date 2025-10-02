import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { PlanilhasComponent } from './planilhas.component';
import { UploadPlanilhaComponent } from './upload-planilha/upload-planilha.component';

const routes: Routes = [
  { path: '', component: PlanilhasComponent },
  { path: 'upload-planilha', component: UploadPlanilhaComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    PlanilhasComponent,
    UploadPlanilhaComponent,
  ]
})
export class PlanilhasModule {}
