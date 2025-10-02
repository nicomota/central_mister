import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'jhi-mister-academy',
  templateUrl: './mister-academy.component.html',
  styleUrls: ['./mister-academy.component.scss'],
})
export class MisterAcademyComponent implements OnInit, AfterViewInit {
  username = '';

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.username = account.login || 'Usuário';
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeFilters();
    this.updateJourneyButton();
  }

  private initializeFilters(): void {
    const levelFilter = document.getElementById('levelFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');

    if (levelFilter && categoryFilter && statusFilter) {
      levelFilter.addEventListener('change', () => this.filterCourses());
      categoryFilter.addEventListener('change', () => this.filterCourses());
      statusFilter.addEventListener('change', () => this.filterCourses());
    }
  }

  private filterCourses(): void {
    const levelFilter = (document.getElementById('levelFilter') as HTMLSelectElement)?.value;
    const categoryFilter = (document.getElementById('categoryFilter') as HTMLSelectElement)?.value;
    const statusFilter = (document.getElementById('statusFilter') as HTMLSelectElement)?.value;

    const courses = document.querySelectorAll('.course-card');

    courses.forEach(course => {
      const element = course as HTMLElement;
      const level = element.dataset['level'];
      const category = element.dataset['category'];
      const status = element.dataset['status'];

      const levelMatch = levelFilter === 'all' || level === levelFilter;
      const categoryMatch = categoryFilter === 'all' || category === categoryFilter;
      const statusMatch = statusFilter === 'all' || status === statusFilter;

      if (levelMatch && categoryMatch && statusMatch) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  }

  private updateJourneyButton(): void {
    const userProgress = this.getUserProgress();
    const journeyBtn = document.getElementById('journeyBtn');
    const journeyIcon = document.getElementById('journeyIcon');
    const journeyText = document.getElementById('journeyText');

    if (journeyBtn && journeyIcon && journeyText) {
      if (userProgress.hasStarted && userProgress.completedCourses > 0) {
        journeyIcon.className = 'bx bx-play';
        journeyText.textContent = 'Continuar Jornada';
        journeyBtn.setAttribute('title', `Continue de onde parou - ${userProgress.progressPercentage}% concluído`);
      } else {
        journeyIcon.className = 'bx bx-play-circle';
        journeyText.textContent = 'Iniciar Jornada';
        journeyBtn.setAttribute('title', 'Comece sua jornada de aprendizagem no Mister Contador');
      }
    }
  }

  private getUserProgress(): any {
    // TODO: Integrar com sistema real de progresso (API, localStorage, etc.)
    return {
      hasStarted: true,
      completedCourses: 5,
      totalCourses: 12,
      progressPercentage: 45
    };
  }

  logout(): void {
    this.loginService.logout();
  }
}
