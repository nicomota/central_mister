import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { Login } from 'app/login/login.model';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { LoginModalService } from './login-modal.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { Subscription } from 'rxjs';

/**
 * Navbar do Mister Academy
 *
 * Este componente possui duas formas de login:
 *
 * 1. LOGIN VIA MODAL (ATUAL):
 *    - Os botões de login chamam openLoginModal()
 *    - Um popup aparece sobre a página atual
 *    - Não redireciona para outra tela
 *
 * 2. LOGIN VIA PÁGINA ANTIGA (ALTERNATIVA):
 *    Para usar a página de login antiga, faça estas alterações:
 *
 *    a) No HTML (mister-academy-navbar.component.html):
 *       - Linha ~37: Altere (click)="openLoginModal()" para (click)="navigateToLogin()"
 *       - Linha ~88: Altere (click)="openLoginModal(); toggleMobileMenu()"
 *                    para (click)="navigateToLogin(); toggleMobileMenu()"
 *
 *    b) Neste arquivo TypeScript, adicione o método:
 *       navigateToLogin(): void {
 *         this.router.navigate(['/login']);
 *       }
 *
 *    c) Opcional: Remover o bloco do modal no HTML (linhas ~109-188) para limpar o código
 */
@Component({
  selector: 'app-mister-academy-navbar',
  templateUrl: './mister-academy-navbar.component.html',
  styleUrls: ['./mister-academy-navbar.component.scss']
})
export class MisterAcademyNavbarComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isAuthenticated = false;
  username = '';
  isLoginModalOpen = false;

  // Login form fields
  loginUsername = '';
  loginPassword = '';
  rememberMe = false;
  authenticationError = false;
  isLoggingIn = false;

  private modalSubscription?: Subscription;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private loginService: LoginService,
    private authServerProvider: AuthServerProvider,
    private loginModalService: LoginModalService,
    private stateStorageService: StateStorageService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.isAuthenticated = account !== null;
      this.username = account?.login ?? '';
    });

    // Subscreve ao serviço de modal para abrir quando solicitado
    this.modalSubscription = this.loginModalService.openModal$.subscribe(() => {
      console.log('Navbar recebeu sinal para abrir modal');
      this.openLoginModal();
    });
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openLoginModal(): void {
    console.log('openLoginModal() chamado');
    this.isLoginModalOpen = true;
    this.authenticationError = false;
    this.loginUsername = '';
    this.loginPassword = '';
    this.rememberMe = false;
    console.log('Modal aberto, isLoginModalOpen:', this.isLoginModalOpen);
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
    this.authenticationError = false;
    this.loginUsername = '';
    this.loginPassword = '';
    this.isLoggingIn = false;
  }

  login(): void {
    this.isLoggingIn = true;
    this.authenticationError = false;

    this.loginService
      .login(new Login(this.loginUsername, this.loginPassword, this.rememberMe))
      .subscribe({
        next: () => {
          this.authenticationError = false;
          this.closeLoginModal();

          // Update authentication status
          this.accountService.identity().subscribe(account => {
            this.isAuthenticated = account !== null;
            this.username = account?.login ?? '';
          });

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
        },
        error: () => {
          this.authenticationError = true;
          this.isLoggingIn = false;
        }
      });
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({
      complete: () => {
        this.accountService.authenticate(null);
        this.isAuthenticated = false;
        this.username = '';
        this.router.navigate(['/academy-intro']);
      }
    });
  }
}
