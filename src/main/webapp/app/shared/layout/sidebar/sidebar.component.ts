import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  currentRoute = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
