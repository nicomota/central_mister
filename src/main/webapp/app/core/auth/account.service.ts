import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';

import { StateStorageService } from 'app/core/auth/state-storage.service';
import { Account } from 'app/core/auth/account.model';
import { AUTH_URL } from 'app/app.constants';
import { TawkService } from 'app/shared/chat/TawkService';
import { UserProgressService } from 'app/entities/mister-academy/services/user-progress.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account | null>;
  private accountUrl = AUTH_URL + 'api/account';
  constructor(
    private translateService: TranslateService,
    private sessionStorage: SessionStorageService,
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router,
    private tawkService: TawkService,
    private userProgressService: UserProgressService
  ) {}

  save(account: Account): Observable<{}> {
    return this.http.post(this.accountUrl, account);
  }

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => of(null)),
        tap((account: Account | null) => {
          this.authenticate(account);

        // Após recuperar as informações da conta, o idioma será alterado para
        // o idioma preferido do usuário configurado nas configurações da conta
          if (account?.langKey) {
            const langKey = this.sessionStorage.retrieve('locale') ?? account.langKey;
            this.translateService.use(langKey);
          }

          if (account) {
            this.navigateToStoredUrl();
            this.loadChat(account);
            this.loadUserProgress(account);
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.userIdentity?.imageUrl ?? '';
  }

  private fetch(): Observable<Account> {
    return this.http.get<Account>(this.accountUrl);
  }

  private navigateToStoredUrl(): void {
    // previousState pode ser definido no authExpiredInterceptor e no userRouteAccessService
    // se o login for bem-sucedido, vá para previousState armazenado e limpe previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
  private loadChat(account: Account): void {
    this.tawkService.updateTawkUser(account);
    this.tawkService.setChatVisibility(true);
  }

  /**
   * Carrega o progresso do usuário na Mister Academy
   * Este método é chamado automaticamente após o login bem-sucedido
   * Cria um arquivo JSON se for o primeiro login do usuário
   *
   * @param account Dados da conta do usuário logado
   */
  private loadUserProgress(account: Account): void {
    if (account.email) {
      this.userProgressService.loadOrCreateProgress(account.email).subscribe({
        next: progress => {
          console.log('Progresso do usuário carregado/criado com sucesso:', progress);
        },
        error: error => {
          console.error('Erro ao carregar progresso do usuário:', error);
        }
      });
    }
  }
}
