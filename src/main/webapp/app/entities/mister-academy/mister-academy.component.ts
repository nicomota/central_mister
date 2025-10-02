import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-mister-academy',
  templateUrl: './mister-academy.component.html',
  styleUrls: ['./mister-academy.component.scss']
})
export class MisterAcademyComponent implements OnInit {
  username = 'Usuário';

  constructor(
    private loginService: LoginService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe({
      next: account => {
        console.log('Account data:', account);
        if (account) {
          this.username = account.email || account.login || 'Usuário';
          console.log('Username set to:', this.username);
        } else {
          console.log('No account found - user not authenticated');
          this.username = 'Visitante';
        }
      },
      error: err => {
        console.error('Error fetching account:', err);
        this.username = 'Visitante';
      }
    });
  }

  logout(): void {
    this.loginService.logout();
  }
}
