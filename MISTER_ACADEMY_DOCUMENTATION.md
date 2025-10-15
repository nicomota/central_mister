# Mister Academy - Documentação Completa

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Componentes](#componentes)
4. [Páginas](#páginas)
5. [Estilos e Design System](#estilos-e-design-system)
6. [Rotas](#rotas)
7. [Integração Backend](#integração-backend)
8. [Funcionalidades](#funcionalidades)

---

## 🎯 Visão Geral

O **Mister Academy** é uma plataforma de aprendizado integrada ao sistema Mister Contador, oferecendo:

- **Minicursos** em vídeo sobre funcionalidades do sistema
- **Jornada do Contador** - trilha estruturada de aprendizado
- **Sistema de progresso** com tracking de aulas concluídas
- **Certificação** ao completar todos os módulos
- **Interface moderna** com design neon e glass morphism

### Tecnologias Utilizadas

- **Framework**: Angular 11+
- **Estilização**: SCSS com variáveis CSS
- **Ícones**: BoxIcons, Font Awesome
- **Autenticação**: JWT (integrado com backend existente)
- **Vídeos**: YouTube embed

---

## 📁 Estrutura do Projeto

```
src/main/webapp/app/
├── entities/
│   ├── mister-academy/               # Página principal - Lista de cursos
│   │   ├── mister-academy.component.ts
│   │   ├── mister-academy.component.html
│   │   ├── mister-academy.component.scss
│   │   ├── course/                   # Página de detalhes do curso
│   │   │   ├── course.component.ts
│   │   │   ├── course.component.html
│   │   │   └── course.component.scss
│   │   └── journey/                  # Jornada do Contador
│   │       ├── journey.component.ts
│   │       ├── journey.component.html
│   │       └── journey.component.scss
│   ├── mister-academy-navbar/        # Navbar global do Academy
│   │   ├── mister-academy-navbar.component.ts
│   │   ├── mister-academy-navbar.component.html
│   │   └── mister-academy-navbar.component.scss
│   ├── academy-intro/                # Página inicial/landing
│   │   ├── academy-intro.component.ts
│   │   ├── academy-intro.component.html
│   │   └── academy-intro.component.scss
│   └── login-modal/                  # Modal de login
│       ├── login-modal.component.ts
│       ├── login-modal.component.html
│       └── login-modal.component.scss
└── assets/
    └── img/
        └── terra.mp4                 # Vídeo de background
```

---

## 🧩 Componentes

### 1. MisterAcademyNavbarComponent

**Localização**: `app/entities/mister-academy-navbar/`

**Responsabilidades**:
- Navegação entre páginas do Academy
- Exibir estado de autenticação do usuário
- Modal de login
- Scroll automático ao navegar
- Menu mobile responsivo

**Principais Métodos**:
```typescript
scrollToTop(): void                    // Rola página ao topo
openLoginModal(): void                 // Abre modal de login
closeLoginModal(): void                // Fecha modal de login
logout(): void                         // Faz logout do usuário
toggleMobileMenu(): void               // Abre/fecha menu mobile
updateAuthStatus(): void               // Atualiza estado de autenticação
```

**Links do Menu**:
- Home → `/academy-intro`
- Minicursos → `/mister-academy`
- Jornada do Contador → `/mister-academy/journey`
- Central de Ajuda → `/home`

**Estado**:
```typescript
isAuthenticated: boolean               // Se usuário está logado
username: string                       // Nome do usuário logado
isMobileMenuOpen: boolean              // Estado do menu mobile
isLoginModalOpen: boolean              // Estado do modal de login
```

---

### 2. AcademyIntroComponent

**Localização**: `app/entities/academy-intro/`

**Descrição**: Página inicial/landing do Mister Academy com apresentação da plataforma.

**Características**:
- Hero section com vídeo de fundo
- Cards apresentando os cursos
- Call-to-action para começar a aprender
- Seção de benefícios

---

### 3. MisterAcademyComponent

**Localização**: `app/entities/mister-academy/`

**Descrição**: Página principal com grid de cursos disponíveis.

**Funcionalidades**:
- Lista de cursos em cards
- Filtros por categoria/nível
- Botão "Continuar Curso" para navegar
- Indicador de progresso por curso
- Design responsivo com grid

**Interface Course**:
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  level: string;                       // Iniciante, Intermediário, Avançado
  learningPoints: string[];            // O que vai aprender
  lessons: Lesson[];                   // Aulas do curso
}
```

---

### 4. CourseComponent

**Localização**: `app/entities/mister-academy/course/`

**Descrição**: Página de detalhes e visualização de um curso específico.

**Seções**:
1. **Hero com título do curso**
2. **Barra de progresso** do curso
3. **Player de vídeo** + Playlist lateral
4. **O que você vai aprender** - Lista de tópicos
5. **Sobre o curso** - Descrição detalhada
6. **Cursos relacionados** - Sugestões de próximos cursos
7. **Botões de ação** - Marcar concluído, voltar

**Principais Métodos**:
```typescript
ngOnInit(): void                       // Carrega curso e rola ao topo
loadCourse(): void                     // Busca dados do curso
loadRelatedCourses(): void             // Carrega cursos sugeridos
selectLesson(lesson): void             // Troca de aula na playlist
getCourseProgress(): number            // Calcula % de progresso
getCompletedLessonsCount(): number     // Conta aulas concluídas
goBack(): void                         // Volta para lista de cursos
goToCourse(id): void                   // Navega para outro curso
```

**Interface Lesson**:
```typescript
interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;                  // Se foi concluída pelo usuário
}
```

**Layout**:
- Grid 2 colunas: Vídeo (maior) + Playlist (350px)
- Responsivo: Em mobile, playlist vai abaixo do vídeo
- Playlist sticky (fica fixa ao rolar)

---

### 5. JourneyComponent

**Localização**: `app/entities/mister-academy/journey/`

**Descrição**: Jornada do Contador - trilha estruturada de aprendizado com módulos e aulas.

**Estrutura**:
- 4 Módulos principais
- 3 Aulas por módulo (12 aulas no total)
- Sistema de dropdown para expandir/recolher módulos
- Progresso geral da trilha
- Certificação ao completar tudo

**Principais Métodos**:
```typescript
ngOnInit(): void                       // Inicializa componente
toggleModule(moduleNumber): void       // Expande/recolhe módulo
isModuleExpanded(moduleNumber): boolean // Verifica se módulo está aberto
```

**Estados de Módulos/Aulas**:
- `completed` - Concluído (verde)
- `current` - Atual (azul, com play)
- `locked` - Bloqueado (cinza, com cadeado)

**Estado dos Módulos** (expandedModules):
```typescript
expandedModules: { [key: number]: boolean } = {
  1: true,   // Módulo 1 expandido
  2: true,   // Módulo 2 expandido
  3: false,  // Módulo 3 recolhido
  4: false   // Módulo 4 recolhido
};
```

**Estrutura de Módulos**:
```
Módulo 1: Fundamentos
  ├─ Aula 1.1: Navegação Básica
  ├─ Aula 1.2: Interface do Sistema
  └─ Aula 1.3: Primeiros Passos

Módulo 2: Configuração
  ├─ Aula 2.1: Registro Contábil
  ├─ Aula 2.2: Nova Empresa (ATUAL)
  └─ Aula 2.3: Plano de Contas

Módulo 3: Integrações
  ├─ Aula 3.1: APIs e Webhooks
  ├─ Aula 3.2: Sincronização
  └─ Aula 3.3: Notas Fiscais

Módulo 4: Avançado
  ├─ Aula 4.1: Relatórios
  ├─ Aula 4.2: Automação
  └─ Aula 4.3: Otimização
```

**Seções da Página**:
1. Hero com vídeo de fundo
2. Progresso geral da trilha (% concluído)
3. Player de vídeo + Progresso lateral (módulos/aulas)
4. Introdução da aula atual
5. Seção de certificação

---

### 6. LoginModalComponent

**Localização**: `app/entities/login-modal/`

**Descrição**: Modal de login que aparece sobre a página atual.

**Funcionalidades**:
- Login com username/password
- Checkbox "Lembrar-me"
- Toggle para mostrar/ocultar senha
- Validação de formulário
- Mensagens de erro
- Integração com JWT

**Serviço**: `LoginModalService`
```typescript
// Para abrir o modal de qualquer componente:
this.loginModalService.open();
```

---

## 🎨 Estilos e Design System

### Paleta de Cores

```scss
// Cores Neon
$cyan: #00d9ff;
$green: #00ff88;
$blue: #0066ff;
$purple: #7c3aed;
$orange: #ffaa00;

// Backgrounds
$dark-bg-1: #0a0a0f;
$dark-bg-2: #000814;
$dark-bg-3: #000c18;

// Textos
$white: #ffffff;
$text-light: #e0e0e0;
$text-muted: #b0b0b0;
$text-dark: #808080;
$text-disabled: #6b7280;
```

### Gradientes

```scss
// Background principal
background: linear-gradient(180deg, #0a0a0f 0%, #000814 50%, #000c18 100%);

// Cards glass morphism
background: linear-gradient(145deg, rgba(13, 17, 23, 0.6) 0%, rgba(22, 27, 34, 0.6) 100%);
backdrop-filter: blur(10px);

// Botões primários
background: linear-gradient(135deg, #00ff88 0%, #00d9ff 100%);

// Progress bar
background: linear-gradient(90deg, #00ff88, #00d9ff, #0066ff);

// Título hero
background: linear-gradient(135deg, #ffffff 0%, #00d9ff 50%, #0066ff 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Efeitos

**Glass Morphism**:
```scss
.glass-card {
  background: linear-gradient(145deg, rgba(13, 17, 23, 0.6) 0%, rgba(22, 27, 34, 0.6) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 217, 255, 0.15);
  border-radius: 12px;
}
```

**Glow Animation**:
```scss
@keyframes glow {
  from { filter: drop-shadow(0 0 5px rgba(0, 217, 255, 0.5)); }
  to { filter: drop-shadow(0 0 20px rgba(0, 217, 255, 0.8)); }
}
```

**Hover Effects**:
```scss
.card:hover {
  border-color: rgba(0, 217, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 217, 255, 0.08);
  transform: translateY(-2px);
}
```

### Tipografia

```scss
// Font Stack
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
             "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;

// Tamanhos
$font-hero: 2.5rem;
$font-title: 1.5rem;
$font-subtitle: 1.25rem;
$font-body: 1rem;
$font-small: 0.9rem;
```

### Responsividade

```scss
// Breakpoints
$breakpoint-tablet: 1024px;
$breakpoint-mobile: 768px;
$breakpoint-small: 480px;

@media (max-width: 1024px) {
  // Layout para tablet
}

@media (max-width: 768px) {
  // Layout para mobile
  .main-content-grid {
    grid-template-columns: 1fr;  // Coluna única
  }
}
```

---

## 🛣️ Rotas

### Configuração de Rotas

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'academy-intro',
    component: AcademyIntroComponent
  },
  {
    path: 'mister-academy',
    component: MisterAcademyComponent,
    canActivate: [UserRouteAccessService]  // Requer login
  },
  {
    path: 'mister-academy/journey',
    component: JourneyComponent,
    canActivate: [UserRouteAccessService]  // Requer login
  },
  {
    path: 'course/:id',
    component: CourseComponent,
    canActivate: [UserRouteAccessService]  // Requer login
  }
];
```

### Navegação Programática

```typescript
// Navegar para lista de cursos
this.router.navigate(['/mister-academy']);

// Navegar para curso específico
this.router.navigate(['/course', courseId]);

// Navegar para jornada
this.router.navigate(['/mister-academy/journey']);

// Voltar para página anterior
this.router.navigate(['/mister-academy']);
```

---

## 🔌 Integração Backend

### APIs Necessárias

#### 1. Cursos

**GET /api/courses**
```json
Response: [
  {
    "id": "1",
    "title": "Entendendo o Registro Contábil",
    "description": "...",
    "videoUrl": "https://www.youtube.com/embed/...",
    "duration": "7:00 min",
    "level": "Iniciante",
    "learningPoints": ["ponto 1", "ponto 2"],
    "lessons": [...]
  }
]
```

**GET /api/courses/{id}**
```json
Response: {
  "id": "1",
  "title": "...",
  "description": "...",
  "videoUrl": "...",
  "duration": "...",
  "level": "...",
  "learningPoints": [...],
  "lessons": [
    {
      "id": "1-1",
      "title": "Introdução",
      "duration": "3:20 min",
      "videoUrl": "https://...",
      "completed": false
    }
  ]
}
```

#### 2. Progresso do Usuário

**GET /api/users/{userId}/progress**
```json
Response: {
  "userId": "123",
  "coursesProgress": [
    {
      "courseId": "1",
      "completedLessons": ["1-1", "1-2"],
      "progressPercentage": 66
    }
  ]
}
```

**POST /api/lessons/{lessonId}/complete**
```json
Request: {
  "userId": "123",
  "lessonId": "1-1",
  "completedAt": "2025-01-15T10:30:00Z"
}

Response: {
  "success": true,
  "newProgress": 33
}
```

#### 3. Jornada do Contador

**GET /api/journey/modules**
```json
Response: [
  {
    "id": 1,
    "title": "Módulo 1: Fundamentos",
    "status": "completed",
    "lessons": [
      {
        "id": "1-1",
        "title": "Aula 1.1: Navegação Básica",
        "duration": "3:20 min",
        "videoUrl": "...",
        "completed": true
      }
    ]
  }
]
```

**GET /api/journey/progress/{userId}**
```json
Response: {
  "totalModules": 4,
  "completedModules": 1,
  "totalLessons": 12,
  "completedLessons": 5,
  "progressPercentage": 41,
  "currentLesson": {
    "moduleId": 2,
    "lessonId": "2-2"
  }
}
```

#### 4. Certificação

**GET /api/certificates/{userId}**
```json
Response: {
  "hasCertificate": false,
  "requirements": {
    "totalModules": 4,
    "completedModules": 1,
    "remainingModules": 3
  }
}
```

**POST /api/certificates/generate**
```json
Request: {
  "userId": "123",
  "courseType": "journey"
}

Response: {
  "certificateId": "cert-123",
  "downloadUrl": "/api/certificates/cert-123/download",
  "issuedAt": "2025-01-15T10:30:00Z"
}
```

### Estrutura de Dados Backend

#### Modelo Course
```java
@Entity
public class Course {
    @Id
    private String id;
    private String title;
    private String description;
    private String videoUrl;
    private String duration;
    private String level;

    @ElementCollection
    private List<String> learningPoints;

    @OneToMany(mappedBy = "course")
    private List<Lesson> lessons;
}
```

#### Modelo Lesson
```java
@Entity
public class Lesson {
    @Id
    private String id;
    private String title;
    private String duration;
    private String videoUrl;

    @ManyToOne
    private Course course;
}
```

#### Modelo UserProgress
```java
@Entity
public class UserProgress {
    @Id
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Lesson lesson;

    private LocalDateTime completedAt;
    private Boolean completed;
}
```

### Serviço Angular para API

Criar: `src/main/webapp/app/services/academy.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // Cursos
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  // Progresso
  getUserProgress(userId: string): Observable<UserProgress> {
    return this.http.get<UserProgress>(`${this.apiUrl}/users/${userId}/progress`);
  }

  completeLesson(lessonId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/lessons/${lessonId}/complete`, { userId });
  }

  // Jornada
  getJourneyModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/journey/modules`);
  }

  getJourneyProgress(userId: string): Observable<JourneyProgress> {
    return this.http.get<JourneyProgress>(`${this.apiUrl}/journey/progress/${userId}`);
  }

  // Certificado
  getCertificate(userId: string): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.apiUrl}/certificates/${userId}`);
  }

  generateCertificate(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/certificates/generate`, { userId });
  }
}
```

### Atualizar Componentes para Usar Serviço

**Exemplo: course.component.ts**

```typescript
// ANTES (dados mockados)
private courses: Course[] = [
  { id: '1', title: '...', ... }
];

// DEPOIS (dados da API)
constructor(
  private academyService: AcademyService,
  // ... outros serviços
) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.courseId = params['id'];
    this.loadCourse();
  });
}

private loadCourse(): void {
  this.academyService.getCourseById(this.courseId).subscribe(
    course => {
      this.course = course;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(course.videoUrl);
      this.currentLesson = course.lessons[0];
      this.loadRelatedCourses();
    },
    error => {
      console.error('Erro ao carregar curso:', error);
      this.router.navigate(['/mister-academy']);
    }
  );
}

completeLesson(lessonId: string): void {
  const userId = this.accountService.getUserId(); // Pegar ID do usuário logado

  this.academyService.completeLesson(lessonId, userId).subscribe(
    response => {
      // Atualizar UI
      const lesson = this.course.lessons.find(l => l.id === lessonId);
      if (lesson) {
        lesson.completed = true;
      }
      // Recalcular progresso
      this.getCourseProgress();
    },
    error => {
      console.error('Erro ao marcar aula como concluída:', error);
    }
  );
}
```

---

## ⚙️ Funcionalidades

### 1. Sistema de Progresso

**Cálculo de Progresso**:
```typescript
getCourseProgress(): number {
  if (!this.course) return 0;
  const completed = this.course.lessons.filter(l => l.completed).length;
  return Math.round((completed / this.course.lessons.length) * 100);
}
```

**Barra Visual**:
```html
<div class="progress-bar">
  <div class="progress-fill" [style.width.%]="getCourseProgress()"></div>
</div>
```

### 2. Playlist de Aulas

**Seleção de Aula**:
```typescript
selectLesson(lesson: Lesson): void {
  this.currentLesson = lesson;
  this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(lesson.videoUrl);
  // Scroll para o topo
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
}
```

**Indicadores Visuais**:
- ✓ Verde - Aula concluída
- ▶ Azul - Aula atual
- 🔒 Cinza - Aula bloqueada

### 3. Dropdown de Módulos (Jornada)

**Toggle de Módulos**:
```typescript
expandedModules: { [key: number]: boolean } = {
  1: true,
  2: true,
  3: false,
  4: false
};

toggleModule(moduleNumber: number): void {
  this.expandedModules[moduleNumber] = !this.expandedModules[moduleNumber];
}
```

**Animação CSS**:
```scss
.lessons-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  opacity: 0;
}

.lessons-container.expanded {
  max-height: 500px;
  opacity: 1;
}
```

### 4. Scroll Automático

**Ao Navegar**:
```typescript
// No navbar component
this.routerSubscription = this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe(() => {
    window.scrollTo(0, 0);
  });
```

**Ao Trocar de Aula**:
```typescript
selectLesson(lesson: Lesson): void {
  // ... código de troca de aula

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 100);
}
```

### 5. Autenticação e Guarda de Rotas

**Route Guard**:
```typescript
{
  path: 'mister-academy',
  component: MisterAcademyComponent,
  canActivate: [UserRouteAccessService]
}
```

**Estado de Autenticação no Navbar**:
```typescript
ngOnInit(): void {
  this.accountService.identity().subscribe(account => {
    this.isAuthenticated = account !== null;
    this.username = account?.login ?? '';
  });
}
```

### 6. Cursos Relacionados

**Carregar Sugestões**:
```typescript
private loadRelatedCourses(): void {
  // Carrega cursos relacionados (excluindo o atual)
  this.relatedCourses = this.courses
    .filter(c => c.id !== this.courseId)
    .slice(0, 2);
}
```

**Navegação**:
```typescript
goToCourse(courseId: string): void {
  this.router.navigate(['/course', courseId]);
}
```

### 7. Responsividade

**Grid Adaptativo**:
```scss
// Desktop: Vídeo + Playlist lado a lado
.main-content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

// Mobile: Vídeo em cima, Playlist embaixo
@media (max-width: 1024px) {
  .main-content-grid {
    grid-template-columns: 1fr;
  }
}
```

**Menu Mobile**:
```typescript
toggleMobileMenu(): void {
  this.isMobileMenuOpen = !this.isMobileMenuOpen;
}
```

---

## 📝 Checklist de Integração Backend

### Fase 1: Preparação
- [ ] Criar modelos no backend (Course, Lesson, UserProgress)
- [ ] Criar controllers REST
- [ ] Implementar endpoints de API
- [ ] Configurar CORS se necessário
- [ ] Testar endpoints com Postman/Insomnia

### Fase 2: Frontend
- [ ] Criar `AcademyService` no Angular
- [ ] Remover dados mockados dos componentes
- [ ] Implementar chamadas HTTP
- [ ] Adicionar loading states
- [ ] Adicionar error handling
- [ ] Testar fluxo completo

### Fase 3: Funcionalidades
- [ ] Integrar sistema de progresso
- [ ] Implementar "Marcar como Concluído"
- [ ] Salvar progresso no backend
- [ ] Sincronizar progresso entre páginas
- [ ] Implementar certificação

### Fase 4: Testes e Deploy
- [ ] Testes unitários (backend)
- [ ] Testes de integração
- [ ] Testes E2E (frontend)
- [ ] Deploy em ambiente de staging
- [ ] Validação com usuários
- [ ] Deploy em produção

---

## 🐛 Problemas Conhecidos e Soluções

### 1. Vídeo não carrega
**Problema**: YouTube bloqueia embed em algumas regiões
**Solução**: Verificar se o vídeo permite embedding, usar `DomSanitizer`

### 2. Scroll não funciona
**Problema**: Navegação na mesma rota não dispara evento
**Solução**: Adicionar `(click)="scrollToTop()"` nos links

### 3. Progress bar não atualiza
**Problema**: Dados não são reativos
**Solução**: Usar métodos ao invés de filtros diretos no template

### 4. Modal não fecha ao fazer login
**Problema**: Estado não é atualizado
**Solução**: Emitir evento após login bem-sucedido

---

## 🚀 Próximos Passos

### Curto Prazo
1. Integrar com backend real
2. Implementar sistema de certificação completo
3. Adicionar testes automatizados
4. Melhorar acessibilidade (ARIA labels)

### Médio Prazo
1. Sistema de comentários/dúvidas nas aulas
2. Fórum de discussão
3. Gamificação (badges, pontos)
4. Download de materiais complementares

### Longo Prazo
1. Live streaming de aulas ao vivo
2. Mentoria 1-on-1
3. App mobile (PWA ou nativo)
4. Integração com sistemas externos

---

## 📞 Contato e Suporte

**Desenvolvedor**: Nícolas da Mota Monteiro dos Santos
**LinkedIn**: https://www.linkedin.com/in/nicomota/
**Ano**: 2025

---

## 📄 Licença

© 2025 Mister Contador - Todos os direitos reservados

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0
