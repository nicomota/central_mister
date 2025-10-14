import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { Login } from 'app/login/login.model';
import { StateStorageService } from 'app/core/auth/state-storage.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  // Login form fields
  loginUsername = '';
  loginPassword = '';
  rememberMe = false;
  authenticationError = false;
  isLoggingIn = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private loginService: LoginService,
    private stateStorageService: StateStorageService
  ) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  close(): void {
    this.isOpen = false;
    this.authenticationError = false;
    this.loginUsername = '';
    this.loginPassword = '';
    this.isLoggingIn = false;
    this.closeModal.emit();
  }

  login(): void {
    this.isLoggingIn = true;
    this.authenticationError = false;

    this.loginService
      .login(new Login(this.loginUsername, this.loginPassword, this.rememberMe))
      .subscribe({
        next: () => {
          this.authenticationError = false;
          this.close();

          // Redireciona para a página que o usuário estava tentando acessar
          const previousUrl = this.stateStorageService.getUrl();

          if (previousUrl && previousUrl.includes('/mister-academy')) {
            // Limpa a URL salva
            this.stateStorageService.clearUrl();
            // Redireciona para a página original
            this.router.navigateByUrl(previousUrl);
          } else if (this.router.url === '/academy-intro') {
            // Se não há URL salva e está na landing, vai para cursos
            this.router.navigate(['/mister-academy']);
          }

          // Emite evento para atualizar navbar
          window.dispatchEvent(new Event('login-success'));
        },
        error: () => {
          this.authenticationError = true;
          this.isLoggingIn = false;
        }
      });
  }
}
