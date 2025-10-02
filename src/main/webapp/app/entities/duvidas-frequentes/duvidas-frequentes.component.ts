import { Component } from '@angular/core';

@Component({
  selector: 'jhi-duvidas-frequentes',
  templateUrl: './duvidas-frequentes.component.html',
  styleUrls: ['./duvidas-frequentes.component.scss']
})
export class DuvidasFrequentesComponent {
  activePanel: string | null = 'collapseOne'; // painel inicial aberto

  togglePanel(panelId: string): void {
    this.activePanel = this.activePanel === panelId ? null : panelId;
  }
}
