import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
  private openModalSubject = new Subject<void>();

  openModal$ = this.openModalSubject.asObservable();

  openModal(): void {
    this.openModalSubject.next();
  }
}
