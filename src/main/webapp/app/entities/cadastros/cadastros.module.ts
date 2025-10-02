import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { CadastrosComponent } from './cadastros.component';
import { AgenciaComponent } from './agencia/agencia.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: CadastrosComponent },
  { path: 'agencia', component: AgenciaComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    CadastrosComponent,
    AgenciaComponent,
    EmpresasComponent,
    UsuariosComponent,
  ]
})
export class CadastrosModule {}
