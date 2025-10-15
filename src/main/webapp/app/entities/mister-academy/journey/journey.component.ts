import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {
  // Controla quais módulos estão expandidos
  expandedModules: { [key: number]: boolean } = {
    1: true,  // Módulo 1 expandido por padrão
    2: true,  // Módulo 2 expandido por padrão
    3: false,
    4: false
  };

  constructor() {}

  ngOnInit(): void {}

  toggleModule(moduleNumber: number): void {
    this.expandedModules[moduleNumber] = !this.expandedModules[moduleNumber];
  }

  isModuleExpanded(moduleNumber: number): boolean {
    return this.expandedModules[moduleNumber];
  }
}
