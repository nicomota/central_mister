import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

/**
 * Pipe para sanitizar URLs e conteúdo HTML
 * Nícolas: Necessário para usar URLs do YouTube no iframe
 */
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.sanitize(1, value) || this.sanitizer.sanitize(1, '');
      case 'style':
        return this.sanitizer.sanitize(2, value) || this.sanitizer.sanitize(2, '');
      case 'script':
        return this.sanitizer.sanitize(3, value) || this.sanitizer.sanitize(3, '');
      case 'url':
        return this.sanitizer.sanitize(4, value) || this.sanitizer.sanitize(4, '');
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
