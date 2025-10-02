import { Injectable } from '@angular/core';
import { Account } from 'app/core/auth/account.model';

/**
 * Serviço para integração com Tawk.to (chat de suporte)
 */
@Injectable({ providedIn: 'root' })
export class TawkService {
  private chatVisibility = false;

  constructor() {}

  /**
   * Atualiza as informações do usuário no chat
   */
  updateTawkUser(account: Account): void {
    if (typeof (window as any).Tawk_API !== 'undefined') {
      (window as any).Tawk_API.setAttributes({
        name: `${account.firstName} ${account.lastName}`,
        email: account.email,
        login: account.login,
      });
    }
  }

  /**
   * Define a visibilidade do chat
   */
  setChatVisibility(visible: boolean): void {
    this.chatVisibility = visible;
    if (typeof (window as any).Tawk_API !== 'undefined') {
      if (visible) {
        (window as any).Tawk_API.showWidget();
      } else {
        (window as any).Tawk_API.hideWidget();
      }
    }
  }

  /**
   * Faz logout do chat
   */
  logout(): void {
    this.setChatVisibility(false);
    // Limpa as informações do usuário no Tawk
    if (typeof (window as any).Tawk_API !== 'undefined') {
      (window as any).Tawk_API.setAttributes({
        name: '',
        email: '',
        login: '',
      });
    }
  }
}
