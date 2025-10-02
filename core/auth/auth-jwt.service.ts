import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Login } from 'app/login/login.model';
import { AUTH_URL } from 'app/app.constants';

type JwtToken = {
  id_token: string;
  tenant_uuid: string;
  sistema: string;
  integracao_banco: boolean;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  private authenticateUrl = AUTH_URL + 'api/authenticate';

  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    const tokenInLocalStorage: string | null = this.$localStorage.retrieve('authenticationToken');
    const tokenInSessionStorage: string | null = this.$sessionStorage.retrieve('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  getTenant(): string {
    const localTenat: string | null = this.$localStorage.retrieve('tenant_uuid');
    const sessionTenat: string | null = this.$sessionStorage.retrieve('tenant_uuid');
    return localTenat ?? sessionTenat ?? '';
  }

  getSistema(): string {
    const sistema: string | null = this.$localStorage.retrieve('sistema') ?? this.$sessionStorage.retrieve('sistema');
    return sistema ?? '';
  }

  getIntegracaoBanco(): boolean {
    const integracaoBanco: boolean | null =
      this.$localStorage.retrieve('integracao_banco') ?? this.$sessionStorage.retrieve('integracao_banco');
    return integracaoBanco ?? false;
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(this.authenticateUrl, credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      this.$localStorage.clear('tenant_uuid');
      this.$sessionStorage.clear('tenant_uuid');
      this.$localStorage.clear('sistema');
      this.$sessionStorage.clear('sistema');
      this.$localStorage.clear('integracao_banco');
      this.$sessionStorage.clear('integracao_banco');
      this.$localStorage.clear('contador');
      this.$sessionStorage.clear('contador');
      this.$localStorage.clear('periodo');
      this.$sessionStorage.clear('periodo');
      this.$localStorage.clear('parceiro');
      this.$sessionStorage.clear('parceiro');
      this.$sessionStorage.clear('previousUrl');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    const tenantUuid = response.tenant_uuid;
    const sistema = response.sistema;
    const integracaoBanco = response.integracao_banco;

    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
      this.$localStorage.store('tenant_uuid', tenantUuid);
      this.$localStorage.store('sistema', sistema);
      this.$localStorage.store('integracao_banco', integracaoBanco);
      this.$sessionStorage.clear('authenticationToken');
      this.$sessionStorage.clear('tenant_uuid');
      this.$sessionStorage.clear('sistema');
      this.$sessionStorage.clear('integracao_banco');
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
      this.$sessionStorage.store('tenant_uuid', tenantUuid);
      this.$sessionStorage.store('sistema', sistema);
      this.$sessionStorage.store('integracao_banco', integracaoBanco);
      this.$localStorage.clear('authenticationToken');
      this.$localStorage.clear('tenant_uuid');
      this.$localStorage.clear('sistema');
      this.$localStorage.clear('integracao_banco');
    }
  }
}
