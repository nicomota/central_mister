import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PageWrapperComponent } from './layout/page-wrapper/page-wrapper.component';

/**
 * Módulo compartilhado com componentes, diretivas e pipes comuns
 */
@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    SidebarComponent,
    PageWrapperComponent,
  ],
  exports: [
    SharedLibsModule,
    SidebarComponent,
    PageWrapperComponent,
  ],
})
export class SharedModule {}
