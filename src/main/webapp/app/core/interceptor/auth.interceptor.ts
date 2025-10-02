import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.localStorage.retrieve('authenticationToken') ?? this.sessionStorage.retrieve('authenticationToken');
    const tenant = this.localStorage.retrieve('tenant_uuid') ?? this.sessionStorage.retrieve('tenant_uuid');
    const _sistema = this.localStorage.retrieve('sistema') ?? this.sessionStorage.retrieve('sistema');
    const integracaoBanco = this.localStorage.retrieve('integracao_banco') ?? this.sessionStorage.retrieve('integracao_banco');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'tenant-uuid': tenant,
      sistema: _sistema,
      integracao_banco: String(integracaoBanco),
    });
    if (token) {
      request = request.clone({ headers });
    }
    return next.handle(request);
  }
}
