import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';

/**
 * Módulo compartilhado com componentes, diretivas e pipes comuns
 */
@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    // Adicione aqui os componentes, diretivas e pipes quando necessário
  ],
  exports: [
    SharedLibsModule,
    // Exporte aqui os componentes, diretivas e pipes quando necessário
  ],
})
export class SharedModule {}
