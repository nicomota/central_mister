import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserProgress, Modulo, Curso } from './user-progress.model';

/**
 * Serviço de Gerenciamento de Progresso do Usuário
 * Desenvolvido por Nícolas para controlar o avanço dos alunos na Mister Academy
 *
 * Funcionalidades principais:
 * - Criar arquivo JSON automaticamente no primeiro login
 * - Carregar progresso existente
 * - Salvar atualizações de progresso
 * - Calcular estatísticas de conclusão
 */
@Injectable({
  providedIn: 'root'
})
export class UserProgressService {
  // Cache em memória para evitar múltiplas requisições HTTP
  private progressCache: UserProgress | null = null;

  // Pasta onde os arquivos JSON de progresso são armazenados
  private readonly baseUrl = 'assets/data/user-progress';

  constructor(private http: HttpClient) {}

  /**
   * Carrega ou cria o progresso do usuário
   * Nícolas: Este método é chamado automaticamente após o login
   * Se o usuário for novo, cria um arquivo JSON com todos os módulos
   * Se já existir, apenas carrega o progresso salvo
   *
   * @param email Email do usuário logado
   * @returns Observable com o progresso do usuário
   */
  loadOrCreateProgress(email: string): Observable<UserProgress> {
    // Verifica se já temos o progresso em cache para evitar requisições desnecessárias
    if (this.progressCache && this.progressCache.login === email) {
      return of(this.progressCache);
    }

    // Transforma o email em nome de arquivo válido (substitui @ por _)
    const filename = this.sanitizeEmail(email);
    const url = `${this.baseUrl}/${filename}.json`;

    // Tenta carregar o arquivo JSON do usuário
    return this.http.get<UserProgress>(url).pipe(
      tap(progress => {
        this.progressCache = progress;
        console.log('Progresso carregado:', progress);
      }),
      catchError(error => {
        if (error.status === 404) {
          // Arquivo não existe, criar novo progresso
          console.log('Criando novo progresso para:', email);
          return this.createNewProgress(email);
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Cria um novo progresso com estrutura inicial
   * Nícolas: Método privado chamado quando é o primeiro login do usuário
   * Gera um JSON completo com todos os 10 módulos e 30 aulas
   *
   * @param email Email do usuário
   * @returns Observable com o novo progresso criado
   */
  private createNewProgress(email: string): Observable<UserProgress> {
    const newProgress: UserProgress = {
      login: email,
      modulos: this.getInitialModules()
    };

    this.progressCache = newProgress;

    // Salva o novo progresso no sistema
    return this.saveProgress(newProgress).pipe(
      map(() => newProgress)
    );
  }

  /**
   * Retorna a estrutura inicial dos módulos
   * Nícolas: Aqui eu defini todos os 10 módulos da Mister Academy
   * com suas respectivas aulas. Todos começam com completado: false
   *
   * @returns Array com todos os módulos inicializados
   */
  private getInitialModules(): Modulo[] {
    return [
      {
        id: 1,
        nome_modulo: 'Cadastros Inteligentes',
        completado: false,
        cursos: [
          { id: 1, nome: 'Cadastro de usuários', url: 'https://www.youtube.com/embed/DLaeMsJ3qdg', completado: false },
          { id: 2, nome: 'Cadastro do plano de contas', url: 'https://www.youtube.com/embed/ruoWV0pBm_k', completado: false },
          { id: 3, nome: 'Cadastro de empresas', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completado: false },
          { id: 4, nome: 'Atualização do plano de contas', url: 'https://www.youtube.com/embed/9bZkp7q19f0', completado: false },
          { id: 5, nome: 'Cadastro de mais agências bancárias', url: 'https://www.youtube.com/embed/kJQP7kiw5Fk', completado: false }
        ]
      },
      {
        id: 2,
        nome_modulo: 'Importação de Documentos Simplificada',
        completado: false,
        cursos: [
          { id: 1, nome: 'Tipos de documentos suportados', url: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', completado: false },
          { id: 2, nome: 'Ordem correta para conciliação', url: 'https://www.youtube.com/embed/fJ9rUzIMcZQ', completado: false }
        ]
      },
      {
        id: 3,
        nome_modulo: 'Notas Fiscais',
        completado: false,
        cursos: [
          { id: 1, nome: 'Integração com sistemas de notas', url: 'https://www.youtube.com/embed/ZZ5LpwO-An4', completado: false },
          { id: 2, nome: 'Importação e análise de notas de entrada/saída', url: 'https://www.youtube.com/embed/hT_nvWreIhg', completado: false },
          { id: 3, nome: 'Importação de notas de serviço', url: 'https://www.youtube.com/embed/uelHwf8o7_U', completado: false },
          { id: 4, nome: 'Mister Notas', url: 'https://www.youtube.com/embed/YQHsXMglC9A', completado: false },
          { id: 5, nome: 'Dicas e estatísticas', url: 'https://www.youtube.com/embed/2vjPBrBU-TM', completado: false }
        ]
      },
      {
        id: 4,
        nome_modulo: 'Comprovantes de Pagamentos',
        completado: false,
        cursos: [
          { id: 1, nome: 'Importação de comprovantes em lote', url: 'https://www.youtube.com/embed/Xz5zX8HFdxE', completado: false },
          { id: 2, nome: 'Análise e separação automática de documentos', url: 'https://www.youtube.com/embed/L_jWHffIx5E', completado: false },
          { id: 3, nome: 'Detalhamento de tarifas e encargos', url: 'https://www.youtube.com/embed/videoseries', completado: false }
        ]
      },
      {
        id: 5,
        nome_modulo: 'Extratos Bancários',
        completado: false,
        cursos: [
          { id: 1, nome: 'Importação de extratos', url: 'https://www.youtube.com/embed/CevxZvSJLk8', completado: false },
          { id: 2, nome: 'Análise de débitos e créditos', url: 'https://www.youtube.com/embed/kXYiU_JCYtU', completado: false },
          { id: 3, nome: 'Gestão de saldos', url: 'https://www.youtube.com/embed/yPYZpwSpKmA', completado: false }
        ]
      },
      {
        id: 6,
        nome_modulo: 'Integração Bancária Automática',
        completado: false,
        cursos: [
          { id: 1, nome: 'Configuração de integração bancária', url: 'https://www.youtube.com/embed/Sv6dMFF_yts', completado: false },
          { id: 2, nome: 'Importação automática de dados', url: 'https://www.youtube.com/embed/8UVNT4wvIGY', completado: false },
          { id: 3, nome: 'Gestão de acessos secundários', url: 'https://www.youtube.com/embed/djV11Xbc914', completado: false }
        ]
      },
      {
        id: 7,
        nome_modulo: 'Registros Contábeis',
        completado: false,
        cursos: [
          { id: 1, nome: 'Visualização de lançamentos', url: 'https://www.youtube.com/embed/RgKAFK5djSk', completado: false },
          { id: 2, nome: 'Associação de contas contábeis', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completado: false },
          { id: 3, nome: 'Edição avançada e transferências', url: 'https://www.youtube.com/embed/M7lc1UVf-VE', completado: false }
        ]
      },
      {
        id: 8,
        nome_modulo: 'Regras de Conciliação',
        completado: false,
        cursos: [
          { id: 1, nome: 'Criação e tipos de regras', url: 'https://www.youtube.com/embed/OPf0YbXqDm0', completado: false },
          { id: 2, nome: 'Boas práticas para automação', url: 'https://www.youtube.com/embed/moSFlvxnbgk', completado: false }
        ]
      },
      {
        id: 9,
        nome_modulo: 'Exportação de Dados',
        completado: false,
        cursos: [
          { id: 1, nome: 'Exportação para sistemas contábeis', url: 'https://www.youtube.com/embed/y8Kyi0WNg40', completado: false },
          { id: 2, nome: 'Formatação conforme plano de contas', url: 'https://www.youtube.com/embed/ZbZSe6N_BXs', completado: false }
        ]
      },
      {
        id: 10,
        nome_modulo: 'Importação de Planilhas',
        completado: false,
        cursos: [
          { id: 1, nome: 'Parametrização de planilhas', url: 'https://www.youtube.com/embed/3AtDnEC4zak', completado: false },
          { id: 2, nome: 'Importação de dados customizados', url: 'https://www.youtube.com/embed/60ItHLz5WEA', completado: false }
        ]
      }
    ];
  }

  /**
   * Salva o progresso do usuário
   * Nícolas: Por enquanto apenas mantém no cache
   * TODO: Implementar endpoint no backend para persistir no banco de dados
   *
   * @param progress Objeto com todo o progresso a ser salvo
   * @returns Observable indicando sucesso da operação
   */
  saveProgress(progress: UserProgress): Observable<any> {
    const filename = this.sanitizeEmail(progress.login);
    const url = `${this.baseUrl}/${filename}.json`;

    // Atualiza o cache com o novo progresso
    console.log('Salvando progresso:', progress);
    this.progressCache = progress;

    // Simula salvamento bem-sucedido
    // Em produção, implementar: return this.http.post('/api/user-progress', progress);
    return of({ success: true });
  }

  /**
   * Marca um curso como completado
   * Nícolas: Quando o usuário completa uma aula, este método atualiza o JSON
   * Se todas as aulas do módulo forem completadas, marca o módulo como completo também
   *
   * @param moduleId ID do módulo
   * @param courseId ID do curso/aula
   * @returns Observable com o progresso atualizado
   */
  markCourseCompleted(moduleId: number, courseId: number): Observable<UserProgress> {
    if (!this.progressCache) {
      return throwError(() => new Error('Nenhum progresso carregado'));
    }

    const module = this.progressCache.modulos.find(m => m.id === moduleId);
    if (module) {
      const course = module.cursos.find(c => c.id === courseId);
      if (course) {
        course.completado = true;

        // Verifica se todas as aulas do módulo foram completadas
        const allCoursesCompleted = module.cursos.every(c => c.completado);
        if (allCoursesCompleted) {
          module.completado = true; // Marca o módulo como completo
        }
      }
    }

    return this.saveProgress(this.progressCache).pipe(
      map(() => this.progressCache!)
    );
  }

  /**
   * Marca um curso como não completado
   * Nícolas: Permite ao usuário desmarcar uma aula como completa
   * Automaticamente desmarca o módulo se alguma aula não estiver completa
   *
   * @param moduleId ID do módulo
   * @param courseId ID do curso/aula
   * @returns Observable com o progresso atualizado
   */
  markCourseIncomplete(moduleId: number, courseId: number): Observable<UserProgress> {
    if (!this.progressCache) {
      return throwError(() => new Error('Nenhum progresso carregado'));
    }

    const module = this.progressCache.modulos.find(m => m.id === moduleId);
    if (module) {
      const course = module.cursos.find(c => c.id === courseId);
      if (course) {
        course.completado = false;
        module.completado = false; // Se uma aula não está completa, o módulo também não está
      }
    }

    return this.saveProgress(this.progressCache).pipe(
      map(() => this.progressCache!)
    );
  }

  /**
   * Obtém o progresso atual do cache
   * Nícolas: Método rápido para acessar o progresso sem fazer requisição HTTP
   *
   * @returns Progresso do usuário ou null se não estiver carregado
   */
  getCurrentProgress(): UserProgress | null {
    return this.progressCache;
  }

  /**
   * Calcula o percentual de conclusão total
   * Nícolas: Usado para exibir a barra de progresso na interface
   * Conta quantas das 30 aulas foram completadas
   *
   * @returns Percentual de conclusão (0-100)
   */
  calculateOverallProgress(): number {
    if (!this.progressCache) {
      return 0;
    }

    // Conta o total de aulas em todos os módulos
    const totalCourses = this.progressCache.modulos.reduce((sum, m) => sum + m.cursos.length, 0);

    // Conta quantas aulas foram completadas
    const completedCourses = this.progressCache.modulos.reduce(
      (sum, m) => sum + m.cursos.filter(c => c.completado).length,
      0
    );

    // Retorna o percentual arredondado
    return totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
  }

  /**
   * Sanitiza o email para usar como nome de arquivo
   * Nícolas: Transforma email@exemplo.com em email_exemplo.com
   * Remove caracteres especiais que não são permitidos em nomes de arquivo
   *
   * @param email Email do usuário
   * @returns Nome de arquivo válido
   */
  private sanitizeEmail(email: string): string {
    return email.replace('@', '_').replace(/[^a-zA-Z0-9._-]/g, '');
  }

  /**
   * Limpa o cache (útil para logout)
   * Nícolas: Chamado quando o usuário faz logout para limpar a memória
   */
  clearCache(): void {
    this.progressCache = null;
  }
}
