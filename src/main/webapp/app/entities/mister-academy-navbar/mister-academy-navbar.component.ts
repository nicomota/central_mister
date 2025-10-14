import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'app-mister-academy-navbar',
  templateUrl: './mister-academy-navbar.component.html',
  styleUrls: ['./mister-academy-navbar.component.scss']
})
export class MisterAcademyNavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  isAuthenticated = false;
  username = '';

  constructor(
    private router: Router,
    private accountService: AccountService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.isAuthenticated = account !== null;
      this.username = account?.login ?? '';
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/academy-intro']);
  }
}
