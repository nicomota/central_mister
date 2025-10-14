import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mister-academy-landing',
  templateUrl: './mister-academy-landing.component.html',
  styleUrls: ['./mister-academy-landing.component.scss']
})
export class MisterAcademyLandingComponent {

  constructor(private router: Router) {}

  navigateToCourses(): void {
    this.router.navigate(['/mister-academy']);
  }
}
