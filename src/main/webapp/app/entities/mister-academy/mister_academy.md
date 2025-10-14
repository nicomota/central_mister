# 📚 Mister Academy - Documentação

## Visão Geral

O **Mister Academy** é a plataforma de educação do Mister Contador, criada para capacitar profissionais e empresários em contabilidade, gestão financeira e tecnologias aplicadas ao Mister Contador.

## 🗂️ Estrutura do Módulo

O módulo Mister Academy é composto por três componentes principais:

```
mister-academy/
├── mister-academy-navbar/       # Navbar fixo com login/logout
├── mister-academy-landing/      # Página inicial (intro)
└── mister-academy/              # Página de cursos e jornada
```

---

## 📄 Componentes

### 1. Mister Academy Navbar
**Localização:** `src/main/webapp/app/entities/mister-academy-navbar/`

Navbar fixo presente em todas as páginas do Academy com:
- Logo animado do Mister Academy
- Links de navegação (Home, Meu Aprendizado, Jornada do Contador)
- Sistema de login/logout
- Menu mobile responsivo

#### Funcionalidades de Login

O componente possui **duas formas de login**:

##### ✅ Login via Modal (Configuração Atual)
- Popup aparece sobre a página atual
- Não redireciona para outra tela
- Experiência fluida sem reload

##### 🔄 Como Alternar para Página de Login Antiga

Se você precisar voltar a usar a página de login tradicional:

**Passo 1:** No arquivo `mister-academy-navbar.component.html`:
```html
<!-- Linha ~37 - Botão Desktop -->
<button class="btn-login" (click)="navigateToLogin()">

<!-- Linha ~90 - Botão Mobile -->
<button class="btn-login mobile" (click)="navigateToLogin(); toggleMobileMenu()">
```

**Passo 2:** No arquivo `mister-academy-navbar.component.ts`, adicione:
```typescript
navigateToLogin(): void {
  this.router.navigate(['/login']);
}
```

**Passo 3 (Opcional):** Remova o bloco do modal no HTML (linhas ~112-191)

---

### 2. Mister Academy Landing
**Localização:** `src/main/webapp/app/entities/mister-academy-landing/`

Página inicial de apresentação do Mister Academy com:
- Hero section com vídeo de fundo (astronauta)
- Seção "O que é o Mister Academy?"
- Grid de features (6 cards)
- Estatísticas (Usuários, Cursos, Horas, Satisfação)
- Categorias de conhecimento
- Call-to-action final

**Rota:** `/academy-intro`

#### Vídeo de Fundo
O vídeo `astronauta_veo.mp4` está em `.gitignore` por ser maior que 100MB.
- **Localização:** `src/assets/img/astronauta_veo.mp4`
- **Formato:** MP4
- **Autoplay:** Sim (muted e loop)

---

### 3. Mister Academy (Cursos)
**Localização:** `src/main/webapp/app/entities/mister-academy/`

Página principal com lista de cursos disponíveis:
- Hero section com vídeo
- Card destacado da "Jornada do Contador"
- Estatísticas do usuário
- Filtros (Nível, Categoria, Status)
- Grid de cursos com vídeos embedded do YouTube
- Link para certificados

**Rota:** `/mister-academy`

#### Sub-rotas

- `/mister-academy/journey` - Jornada do Contador (trilha completa)
- `/mister-academy/curso/:id` - Página individual de curso

---

## 🎨 Design System

### Paleta de Cores

```scss
// Cores Principais
$primary-cyan: #00d9ff;
$primary-blue: #0066ff;
$background-dark: #0a0a0f;
$background-darker: #000814;
$text-white: #ffffff;
$text-gray: #b0b0b0;
$error-red: #ff4444;

// Gradientes
background: linear-gradient(135deg, #00d9ff 0%, #0066ff 100%);
background: linear-gradient(180deg, #0a0a0f 0%, #000814 50%, #000c18 100%);
```

### Tipografia

```scss
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
             "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
```

### Animações

- **fadeIn**: Entrada suave (0.3s)
- **slideUp**: Deslizar de baixo para cima (0.3s)
- **float**: Flutuação contínua (3s infinite)
- **glow**: Efeito de brilho pulsante (2s infinite)
- **shake**: Tremor (usado em erros - 0.5s)

---

## 🔐 Autenticação

### Fluxo de Login (Modal)

1. Usuário clica em "Login"
2. Modal aparece com animação
3. Usuário preenche credenciais
4. Ao submeter:
   - Loading state ativado
   - Chamada ao `LoginService`
   - Se sucesso: modal fecha, navbar atualiza
   - Se erro: mensagem de erro com animação shake

### Fluxo de Logout

1. Usuário clica em "Sair"
2. `AuthServerProvider.logout()` é chamado
3. Token é removido
4. Estado de autenticação limpo
5. Redireciona para `/academy-intro`
6. **Sem reload da página**

---

## 📱 Responsividade

### Breakpoints

```scss
// Desktop
@media (max-width: 1024px) { }

// Tablet
@media (max-width: 768px) { }

// Mobile
@media (max-width: 480px) { }
```

### Comportamentos Mobile

- Navbar: Menu hamburguer
- Hero: Tamanhos de fonte reduzidos
- Grids: Coluna única em mobile
- Stats: 2 colunas em tablet, 1 coluna em mobile

---

## 🚀 Rotas e Navegação

### Configuração de Rotas

```typescript
// app-routing.module.ts
{
  path: 'academy-intro',
  loadChildren: () => import('./entities/mister-academy-landing/...')
},
{
  path: 'mister-academy',
  loadChildren: () => import('./entities/mister-academy/...')
}
```

### Proteção de Rotas

As rotas do Academy usam `AuthGuard`:
```typescript
{
  path: '',
  component: MisterAcademyComponent,
  canActivate: [AuthGuard]
}
```

---

## 📦 Dependências

### Módulos Angular

- `CommonModule`
- `RouterModule`
- `FormsModule` (para ngModel no modal de login)
- `SharedModule`

### Bibliotecas Externas

- **Font Awesome** (ícones)
- **YouTube Embed** (vídeos dos cursos)

---

## 🎥 Conteúdo de Mídia

### Vídeos

1. **Hero Background**
   - Arquivo: `astronauta_veo.mp4`
   - Uso: Background animado das hero sections
   - Configuração: autoplay, muted, loop, playsinline

2. **Cursos (YouTube)**
   - Embedded via iframes
   - Exemplo: `https://www.youtube.com/embed/EB4eXJuKxtA`

---

## 🛠️ Manutenção e Atualizações

### Adicionar Novo Curso

1. Edite `mister-academy.component.html`
2. Adicione novo `.course-card` no grid
3. Configure atributos:
   - `data-level`: iniciante | intermediario | avancado
   - `data-category`: basico | configuracao | integracao | avancado
   - `data-status`: not-started | in-progress | completed

### Atualizar Estatísticas

Edite os números em:
- `mister-academy-landing.component.html` (linhas 97-111)
- `mister-academy.component.html` (linhas 43-57)

### Modificar Cores/Tema

Todos os estilos estão nos arquivos `.scss` de cada componente:
- `mister-academy-navbar.component.scss`
- `mister-academy-landing.component.scss`
- `mister-academy.component.scss`

---

## 🐛 Troubleshooting

### Vídeo não carrega
- Verifique se o arquivo está em `src/assets/img/astronauta_veo.mp4`
- Confirme que o arquivo não está no `.gitignore` em produção
- Considere usar um serviço de CDN para vídeos grandes

### Modal não abre
- Verifique se `FormsModule` está importado no módulo
- Confirme que os métodos `openLoginModal()` estão sendo chamados
- Verifique console do navegador para erros

### Logout redireciona para página antiga
- Confirme que o método `logout()` usa `authServerProvider.logout()`
- Verifique se não há `window.location.reload()` no código

---

## 📞 Suporte

Para dúvidas ou sugestões sobre o Mister Academy, entre em contato com:
- **Desenvolvedor:** Nícolas da Mota Monteiro dos Santos
- **LinkedIn:** [linkedin.com/in/nicomota](https://www.linkedin.com/in/nicomota/)

---

## 📝 Changelog

### Versão 1.0 (2025)
- ✨ Landing page com hero animado
- ✨ Sistema de login via modal
- ✨ Navbar responsivo
- ✨ Grid de cursos com filtros
- ✨ Jornada do Contador
- ✨ Integração com YouTube
- 🎨 Design futurista com gradientes
- 📱 Totalmente responsivo

---

**© 2025 Nícolas da Mota Monteiro dos Santos**
