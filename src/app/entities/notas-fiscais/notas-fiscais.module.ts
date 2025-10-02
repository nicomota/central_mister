import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { NotasFiscaisComponent } from './notas-fiscais.component';
import { SiegComponent } from './sieg/sieg.component';
import { UploadNfeComponent } from './upload-nfe/upload-nfe.component';
import { UploadNfseComponent } from './upload-nfse/upload-nfse.component';

const routes: Routes = [
  { path: '', component: NotasFiscaisComponent },
  { path: 'sieg', component: SiegComponent },
  { path: 'upload-nfe', component: UploadNfeComponent },
  { path: 'upload-nfse', component: UploadNfseComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    NotasFiscaisComponent,
    SiegComponent,
    UploadNfeComponent,
    UploadNfseComponent,
  ]
})
export class NotasFiscaisModule {}
