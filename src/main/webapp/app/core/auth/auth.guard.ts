import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AccountService } from './account.service';
import { StateStorageService } from './state-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private stateStorageService: StateStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        if (account) {
          return true;
        }
        console.log('Not authenticated, redirecting to login');
        // Salva a URL que o usuário estava tentando acessar
        this.stateStorageService.storeUrl(state.url);
        this.router.navigate(['/login']);
        return false;
      }),
      catchError(() => {
        console.log('Error checking authentication, redirecting to login');
        this.stateStorageService.storeUrl(state.url);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
