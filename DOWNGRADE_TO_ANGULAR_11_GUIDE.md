# Guia: Downgrade para Angular 11.2.7

## ⚠️ IMPORTANTE: Leia antes de começar

O projeto está atualmente em **Angular 15.2.0** e você quer usar **Angular 11.2.7**.

### Por que fazer downgrade?
- Compatibilidade com sistema legado
- Dependências do backend requerem Angular 11
- Ambiente de produção usa Angular 11

---

## 📋 Checklist de Compatibilidade

### ✅ O que funciona sem problemas:
- [x] Toda a estrutura de componentes
- [x] Templates HTML
- [x] SCSS/CSS
- [x] Rotas básicas
- [x] Services
- [x] Diretivas básicas

### ⚠️ O que precisa ajuste:
- [ ] `package.json` - Versões de dependências
- [ ] `tsconfig.json` - TypeScript 4.9 → 4.0
- [ ] Algumas sintaxes RxJS
- [ ] Imports de `@angular/common/http`

### ❌ O que NÃO funciona:
- Standalone Components (não existe no Angular 11)
- Typed Forms (foi adicionado no Angular 14)
- `inject()` function (adicionado no Angular 14)

---

## 🔧 Passo a Passo

### 1. Backup do Projeto

```bash
# Faça backup do package.json atual
cp package.json package.json.backup

# Faça backup do node_modules (opcional)
# Ou simplesmente delete e reinstale depois
rm -rf node_modules
```

### 2. Atualizar package.json

Use o `package-angular-11.json` fornecido abaixo.

### 3. Limpar Cache e Reinstalar

```bash
# Limpar cache do npm
npm cache clean --force

# Remover node_modules e package-lock
rm -rf node_modules package-lock.json

# Instalar dependências
npm install
```

### 4. Ajustar tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2020",
    "lib": ["es2018", "dom"],
    "strict": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 5. Verificar e Ajustar Código

#### RxJS - Imports

Angular 11 usa RxJS 6, então alguns imports podem mudar:

**Angular 15 (atual):**
```typescript
import { filter } from 'rxjs/operators';
```

**Angular 11 (compatível):**
```typescript
import { filter } from 'rxjs/operators';  // Mesma coisa, ok!
```

#### HttpClient

**Angular 15:**
```typescript
import { HttpClient } from '@angular/common/http';
```

**Angular 11:**
```typescript
import { HttpClient } from '@angular/common/http';  // Mesma coisa, ok!
```

### 6. Testar o Projeto

```bash
# Iniciar servidor de desenvolvimento
npm start

# Build de produção
npm run build
```

---

## 📦 package.json para Angular 11.2.7

```json
{
  "name": "central-de-ajuda",
  "version": "1.0.0",
  "description": "Central de Ajuda - Mister Contador",
  "engines": {
    "node": "14.x || 16.x",
    "npm": ">=6.0.0"
  },
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~11.2.7",
    "@angular/common": "~11.2.7",
    "@angular/compiler": "~11.2.7",
    "@angular/core": "~11.2.7",
    "@angular/forms": "~11.2.7",
    "@angular/platform-browser": "~11.2.7",
    "@angular/platform-browser-dynamic": "~11.2.7",
    "@angular/router": "~11.2.7",
    "@fortawesome/angular-fontawesome": "^0.8.2",
    "@fortawesome/fontawesome-svg-core": "^1.2.35",
    "@fortawesome/free-solid-svg-icons": "^5.15.3",
    "@ng-bootstrap/ng-bootstrap": "^9.1.0",
    "@ngx-translate/core": "^13.0.0",
    "@ngx-translate/http-loader": "^6.0.0",
    "@popperjs/core": "^2.9.2",
    "bootstrap": "^4.6.0",
    "boxicons": "^2.1.4",
    "chart.js": "^2.9.4",
    "ng2-charts": "^2.4.3",
    "ngx-infinite-scroll": "^10.0.1",
    "ngx-spinner": "^11.0.2",
    "ngx-webstorage": "^7.0.1",
    "rxjs": "~6.6.7",
    "tslib": "^2.0.0",
    "zone.js": "~0.11.4"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.1102.6",
    "@angular/cli": "~11.2.6",
    "@angular/compiler-cli": "~11.2.7",
    "@types/node": "^14.14.37",
    "typescript": "~4.0.7"
  }
}
```

---

## ⚠️ Mudanças Críticas nas Dependências

### Bootstrap
- **Angular 15**: Bootstrap 5.3.0
- **Angular 11**: Bootstrap 4.6.0

**Impacto**: Algumas classes CSS mudaram entre Bootstrap 4 e 5.

**Soluções**:
1. **Opção 1** (Recomendada): Manter Bootstrap 4 e ajustar classes no HTML
2. **Opção 2**: Forçar Bootstrap 5 no Angular 11 (pode dar conflitos)

**Classes que mudaram**:
```
Bootstrap 4 → Bootstrap 5
ml-3       → ms-3
mr-3       → me-3
pl-3       → ps-3
pr-3       → pe-3
float-left → float-start
float-right → float-end
```

### NgBootstrap
- **Angular 15**: @ng-bootstrap/ng-bootstrap ^12.0.0
- **Angular 11**: @ng-bootstrap/ng-bootstrap ^9.1.0

### Chart.js
- **Angular 15**: Chart.js 4.5.0
- **Angular 11**: Chart.js 2.9.4

**Impacto**: API do Chart.js mudou significativamente.

### RxJS
- **Angular 15**: RxJS 7.8.0
- **Angular 11**: RxJS 6.6.7

**Impacto**: Pequenas diferenças na API.

---

## 🔍 Verificações Pós-Downgrade

### 1. Compilação

```bash
npm run build
```

**Erros esperados**: Nenhum (se seguiu os passos)

### 2. Warnings

```bash
npm start
```

**Warnings aceitáveis**:
- Deprecated packages (normal)
- Peer dependency warnings (geralmente ok)

**Warnings problemáticos**:
- Type errors
- Module not found
- Version conflicts

### 3. Funcionalidades

Teste cada página:
- [ ] `/academy-intro` - Página inicial
- [ ] `/mister-academy` - Lista de cursos
- [ ] `/course/:id` - Detalhes do curso
- [ ] `/mister-academy/journey` - Jornada do contador
- [ ] Login/Logout
- [ ] Navegação entre páginas
- [ ] Responsividade mobile

---

## 🐛 Problemas Comuns e Soluções

### Erro: "Cannot find module '@angular/core'"

**Solução**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: TypeScript version mismatch

**Solução**:
```bash
npm install typescript@~4.0.7 --save-dev
```

### Erro: Peer dependency warnings

**Solução**: Geralmente não é crítico. Se quiser resolver:
```bash
npm install --legacy-peer-deps
```

### Erro: Bootstrap classes não funcionam

**Solução**: Verifique se está usando classes do Bootstrap 4, não 5.

### Erro: RxJS operators não encontrados

**Solução**:
```typescript
// Certifique-se de importar de 'rxjs/operators'
import { map, filter, switchMap } from 'rxjs/operators';
```

---

## 📝 Código que Precisa Ajuste

### 1. Typed Forms (Angular 14+)

**Angular 15:**
```typescript
loginForm = this.fb.group<{
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}>({
  username: [null, Validators.required],
  password: [null, Validators.required]
});
```

**Angular 11:**
```typescript
loginForm = this.fb.group({
  username: [null, Validators.required],
  password: [null, Validators.required]
});
```

### 2. inject() Function (Angular 14+)

**Angular 15:**
```typescript
private router = inject(Router);
```

**Angular 11:**
```typescript
constructor(private router: Router) {}
```

### 3. Standalone Components (Angular 14+)

**Angular 15:**
```typescript
@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [CommonModule]
})
```

**Angular 11:**
```typescript
@Component({
  selector: 'app-foo'
})
// E adicionar ao module
@NgModule({
  declarations: [FooComponent],
  imports: [CommonModule]
})
```

---

## ✅ Código que NÃO Precisa Ajuste

O Mister Academy que desenvolvemos usa apenas funcionalidades compatíveis com Angular 11:

- ✅ `@Component` decorator normal
- ✅ `constructor` injection
- ✅ Templates HTML com `*ngIf`, `*ngFor`
- ✅ Two-way binding `[(ngModel)]`
- ✅ Event binding `(click)="method()"`
- ✅ Property binding `[property]="value"`
- ✅ RxJS operators (`map`, `filter`, `switchMap`)
- ✅ HttpClient
- ✅ Router
- ✅ Forms (reactive e template-driven)
- ✅ SCSS/CSS

**Conclusão**: O código do Mister Academy já está compatível com Angular 11! 🎉

---

## 🚀 Comandos Finais

```bash
# 1. Backup
cp package.json package.json.angular15.backup

# 2. Substituir package.json pelo versão Angular 11

# 3. Limpar
rm -rf node_modules package-lock.json

# 4. Instalar
npm install

# 5. Testar
npm start

# 6. Build
npm run build
```

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique a versão do Node (14.x ou 16.x)
2. Limpe o cache: `npm cache clean --force`
3. Reinstale: `rm -rf node_modules && npm install`
4. Verifique erros de compilação no terminal

---

## 🎯 Resumo

| Item | Angular 15 | Angular 11 |
|------|-----------|-----------|
| Node | 16.4.2 | 14.x ou 16.x |
| TypeScript | 4.9 | 4.0 |
| RxJS | 7.8 | 6.6 |
| Bootstrap | 5.3 | 4.6 |
| Chart.js | 4.5 | 2.9 |

**Tempo estimado**: 30-60 minutos

**Dificuldade**: Média (requer conhecimento de npm/node)

---

**Última atualização**: Janeiro 2025
