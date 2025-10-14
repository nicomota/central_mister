import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { LoginModalService } from 'app/login-modal/login-modal.service';
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

  private modalSubscription?: Subscription;
  private loginSuccessSubscription?: Subscription;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private authServerProvider: AuthServerProvider,
    private loginModalService: LoginModalService
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

    // Escuta evento de login bem-sucedido
    this.loginSuccessSubscription = new Subscription();
    window.addEventListener('login-success', this.updateAuthStatus.bind(this));
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
    if (this.loginSuccessSubscription) {
      this.loginSuccessSubscription.unsubscribe();
    }
    window.removeEventListener('login-success', this.updateAuthStatus.bind(this));
  }

  updateAuthStatus(): void {
    this.accountService.identity().subscribe(account => {
      this.isAuthenticated = account !== null;
      this.username = account?.login ?? '';
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openLoginModal(): void {
    console.log('openLoginModal() chamado');
    this.isLoginModalOpen = true;
    console.log('Modal aberto, isLoginModalOpen:', this.isLoginModalOpen);
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
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
