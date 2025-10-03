import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  currentRoute = '';
  isCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    // Recupera o estado do sidebar do localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      this.isCollapsed = savedState === 'true';
    }
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    // Salva o estado no localStorage
    localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
  }
}
