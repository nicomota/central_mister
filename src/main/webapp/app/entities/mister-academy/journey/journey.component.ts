import { Component, OnInit } from '@angular/core';
import { UserProgressService } from '../services/user-progress.service';
import { UserProgress } from '../services/user-progress.model';
import { AccountService } from 'app/core/auth/account.service';

/**
 * Componente da Jornada do Contador
 * Grenciar o progresso do usuário na Mister Academy
 *
 * Principais funcionalidades:
 * - Exibe todos os 10 módulos e 30 aulas
 * - Mostra progresso em tempo real
 * - Permite expandir/recolher módulos
 * - Marca aulas como completas/incompletas
 */
@Component({
  selector: 'jhi-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {
  // Controla quais módulos estão expandidos na interface
  // Por padrão, apenas o Módulo 1 começa expandido
  expandedModules: { [key: number]: boolean } = {
    1: true,   // Módulo 1 expandido por padrão
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false
  };

  // Armazena o progresso completo do usuário carregado do JSON
  userProgress: UserProgress | null = null;

  // Estatísticas de progresso exibidas na interface
  overallProgress = 0;        // Percentual total (0-100)
  completedCourses = 0;       // Número de aulas completadas
  totalCourses = 0;           // Total de aulas disponíveis (30)

  // Controle de navegação entre aulas
  currentModuleId = 1;        // ID do módulo atual
  currentCourseId = 1;        // ID da aula atual
  currentVideoUrl = 'https://www.youtube.com/embed/DLaeMsJ3qdg?rel=0&modestbranding=1&fs=1&controls=1&cc_load_policy=1&iv_load_policy=3&enablejsapi=1';

  constructor(
    private userProgressService: UserProgressService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadUserProgress();
    this.loadYouTubeAPI();
  }

  /**
   * Carrega a API do YouTube IFrame
   * Nícolas: Necessário para detectar quando o vídeo termina
   */
  loadYouTubeAPI(): void {
    // Verifica se a API já foi carregada
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Callback quando a API estiver pronta
      (window as any).onYouTubeIframeAPIReady = () => {
        console.log('YouTube IFrame API carregada');
        this.initializePlayer();
      };
    } else {
      this.initializePlayer();
    }
  }

  /**
   * Inicializa o player do YouTube
   * Nícolas: Configura os eventos para detectar fim do vídeo
   */
  initializePlayer(): void {
    setTimeout(() => {
      const iframe = document.querySelector('iframe');
      if (iframe && (window as any).YT) {
        const player = new (window as any).YT.Player(iframe, {
          events: {
            onStateChange: (event: any) => this.onPlayerStateChange(event)
          }
        });
      }
    }, 1000);
  }

  /**
   * Evento disparado quando o estado do player muda
   * Nícolas: Detecta quando o vídeo termina e marca como completado
   */
  onPlayerStateChange(event: any): void {
    // YT.PlayerState.ENDED = 0
    if (event.data === 0) {
      console.log('Vídeo terminou! Marcando como completado...');
      this.markCurrentAsCompleted();
    }
  }

  /**
   * Marca a aula atual como completada automaticamente
   * Nícolas: Chamado quando o vídeo termina
   */
  markCurrentAsCompleted(): void {
    if (!this.isCourseCompleted(this.currentModuleId, this.currentCourseId)) {
      this.userProgressService.markCourseCompleted(this.currentModuleId, this.currentCourseId).subscribe({
        next: progress => {
          this.userProgress = progress;
          this.updateProgressStats();
          console.log('Aula marcada como completada automaticamente!');
        },
        error: error => {
          console.error('Erro ao marcar aula como completada:', error);
        }
      });
    }
  }

  /**
   * Carrega o progresso do usuário
   * Primeiro verifica se já está no cache (carregado no login)
   * Se não estiver, faz a requisição para carregar do servidor
   */
  loadUserProgress(): void {
    // Tenta obter do cache primeiro (já foi carregado no login)
    this.userProgress = this.userProgressService.getCurrentProgress();

    if (this.userProgress) {
      // Se já temos o progresso, apenas atualiza as estatísticas
      this.updateProgressStats();
    } else {
      // Se não estiver no cache, carrega do servidor
      this.accountService.identity().subscribe(account => {
        if (account?.email) {
          this.userProgressService.loadOrCreateProgress(account.email).subscribe({
            next: progress => {
              this.userProgress = progress;
              this.updateProgressStats();
            },
            error: error => {
              console.error('Erro ao carregar progresso:', error);
            }
          });
        }
      });
    }
  }

  /**
   * Atualiza as estatísticas de progresso
   * Calcula o percentual e conta as aulas completadas
   * Usado para atualizar a barra de progresso na interface
   */
  updateProgressStats(): void {
    if (!this.userProgress) return;

    // Calcula o percentual de conclusão (0-100)
    this.overallProgress = this.userProgressService.calculateOverallProgress();

    // Conta o total de aulas
    this.totalCourses = this.userProgress.modulos.reduce(
      (sum, m) => sum + m.cursos.length,
      0
    );

    // Conta quantas aulas foram completadas
    this.completedCourses = this.userProgress.modulos.reduce(
      (sum, m) => sum + m.cursos.filter(c => c.completado).length,
      0
    );
  }

  /**
   * Alterna a expansão de um módulo
   * Permite expandir/recolher as aulas de cada módulo
   */
  toggleModule(moduleNumber: number): void {
    this.expandedModules[moduleNumber] = !this.expandedModules[moduleNumber];
  }

  /**
   * Verifica se um módulo está expandido
   */
  isModuleExpanded(moduleNumber: number): boolean {
    return this.expandedModules[moduleNumber];
  }

  /**
   * Verifica se uma aula está completada
   * Usado para exibir o ícone de check na interface
   */
  isCourseCompleted(moduleId: number, courseId: number): boolean {
    if (!this.userProgress) return false;

    const module = this.userProgress.modulos.find(m => m.id === moduleId);
    if (!module) return false;

    const course = module.cursos.find(c => c.id === courseId);
    return course?.completado ?? false;
  }

  /**
   * Verifica se um módulo está completado
   * Um módulo só é completo quando todas as suas aulas estão completas
   */
  isModuleCompleted(moduleId: number): boolean {
    if (!this.userProgress) return false;

    const module = this.userProgress.modulos.find(m => m.id === moduleId);
    return module?.completado ?? false;
  }

  /**
   * Alterna o status de conclusão de uma aula
   * Marca/desmarca uma aula como completa e atualiza o progresso
   */
  toggleCourseCompletion(moduleId: number, courseId: number): void {
    const isCompleted = this.isCourseCompleted(moduleId, courseId);

    if (isCompleted) {
      // Se já estava completo, marca como incompleto
      this.userProgressService.markCourseIncomplete(moduleId, courseId).subscribe({
        next: progress => {
          this.userProgress = progress;
          this.updateProgressStats();
          console.log('Curso marcado como incompleto');
        },
        error: error => {
          console.error('Erro ao atualizar curso:', error);
        }
      });
    } else {
      // Se estava incompleto, marca como completo
      this.userProgressService.markCourseCompleted(moduleId, courseId).subscribe({
        next: progress => {
          this.userProgress = progress;
          this.updateProgressStats();
          console.log('Curso marcado como completo');
        },
        error: error => {
          console.error('Erro ao atualizar curso:', error);
        }
      });
    }
  }

  /**
   * Navega para a próxima aula
   * Nícolas: Avança para a próxima aula na sequência
   * Se for a última aula do módulo, vai para o primeiro curso do próximo módulo
   */
  nextVideo(): void {
    if (!this.userProgress) return;

    // Encontra o módulo atual
    const currentModule = this.userProgress.modulos.find(m => m.id === this.currentModuleId);
    if (!currentModule) return;

    // Verifica se há próxima aula no módulo atual
    const currentCourseIndex = currentModule.cursos.findIndex(c => c.id === this.currentCourseId);

    if (currentCourseIndex < currentModule.cursos.length - 1) {
      // Há próxima aula no módulo atual
      const nextCourse = currentModule.cursos[currentCourseIndex + 1];
      this.currentCourseId = nextCourse.id;
      this.updateCurrentVideo();
    } else {
      // É a última aula do módulo, tenta ir para o próximo módulo
      const currentModuleIndex = this.userProgress.modulos.findIndex(m => m.id === this.currentModuleId);

      if (currentModuleIndex < this.userProgress.modulos.length - 1) {
        // Vai para o primeiro curso do próximo módulo
        const nextModule = this.userProgress.modulos[currentModuleIndex + 1];
        this.currentModuleId = nextModule.id;
        this.currentCourseId = nextModule.cursos[0].id;
        this.expandedModules[this.currentModuleId] = true; // Expande o novo módulo
        this.updateCurrentVideo();
      } else {
        console.log('Você já está na última aula!');
      }
    }
  }

  /**
   * Navega para a aula anterior
   * Nícolas: Volta para a aula anterior na sequência
   * Se for a primeira aula do módulo, vai para a última aula do módulo anterior
   */
  prevVideo(): void {
    if (!this.userProgress) return;

    // Encontra o módulo atual
    const currentModule = this.userProgress.modulos.find(m => m.id === this.currentModuleId);
    if (!currentModule) return;

    // Verifica se há aula anterior no módulo atual
    const currentCourseIndex = currentModule.cursos.findIndex(c => c.id === this.currentCourseId);

    if (currentCourseIndex > 0) {
      // Há aula anterior no módulo atual
      const prevCourse = currentModule.cursos[currentCourseIndex - 1];
      this.currentCourseId = prevCourse.id;
      this.updateCurrentVideo();
    } else {
      // É a primeira aula do módulo, tenta ir para o módulo anterior
      const currentModuleIndex = this.userProgress.modulos.findIndex(m => m.id === this.currentModuleId);

      if (currentModuleIndex > 0) {
        // Vai para a última aula do módulo anterior
        const prevModule = this.userProgress.modulos[currentModuleIndex - 1];
        this.currentModuleId = prevModule.id;
        this.currentCourseId = prevModule.cursos[prevModule.cursos.length - 1].id;
        this.expandedModules[this.currentModuleId] = true; // Expande o módulo anterior
        this.updateCurrentVideo();
      } else {
        console.log('Você já está na primeira aula!');
      }
    }
  }

  /**
   * Atualiza a URL do vídeo atual
   * Nícolas: Busca a URL da aula atual e atualiza o player
   */
  private updateCurrentVideo(): void {
    if (!this.userProgress) return;

    const currentModule = this.userProgress.modulos.find(m => m.id === this.currentModuleId);
    if (!currentModule) return;

    const currentCourse = currentModule.cursos.find(c => c.id === this.currentCourseId);
    if (!currentCourse) return;

    // Atualiza a URL do vídeo (mantém os parâmetros do YouTube)
    if (currentCourse.url) {
      this.currentVideoUrl = currentCourse.url;
      if (!this.currentVideoUrl.includes('?')) {
        this.currentVideoUrl += '?rel=0&modestbranding=1&fs=1&controls=1&cc_load_policy=1&iv_load_policy=3&enablejsapi=1';
      }

      // Reinicializa o player para o novo vídeo
      setTimeout(() => this.initializePlayer(), 500);
    }

    console.log(`Aula atual: Módulo ${this.currentModuleId} - Aula ${this.currentCourseId}`);
  }

  /**
   * Navega para uma aula específica
   * Nícolas: Permite clicar em uma aula na lista e ir direto para ela
   */
  goToCourse(moduleId: number, courseId: number): void {
    this.currentModuleId = moduleId;
    this.currentCourseId = courseId;
    this.expandedModules[moduleId] = true; // Expande o módulo selecionado
    this.updateCurrentVideo();
  }

  /**
   * Verifica se uma aula é a atual
   * Nícolas: Usado para destacar a aula atual na lista
   */
  isCurrentCourse(moduleId: number, courseId: number): boolean {
    return this.currentModuleId === moduleId && this.currentCourseId === courseId;
  }

  /**
   * Verifica se é possível ir para a próxima aula
   */
  canGoNext(): boolean {
    if (!this.userProgress) return false;

    const currentModuleIndex = this.userProgress.modulos.findIndex(m => m.id === this.currentModuleId);
    const currentModule = this.userProgress.modulos[currentModuleIndex];

    if (!currentModule) return false;

    const currentCourseIndex = currentModule.cursos.findIndex(c => c.id === this.currentCourseId);

    // Verifica se há próxima aula no módulo atual ou se há próximo módulo
    return currentCourseIndex < currentModule.cursos.length - 1 ||
           currentModuleIndex < this.userProgress.modulos.length - 1;
  }

  /**
   * Verifica se é possível ir para a aula anterior
   */
  canGoPrev(): boolean {
    if (!this.userProgress) return false;

    const currentModuleIndex = this.userProgress.modulos.findIndex(m => m.id === this.currentModuleId);
    const currentModule = this.userProgress.modulos[currentModuleIndex];

    if (!currentModule) return false;

    const currentCourseIndex = currentModule.cursos.findIndex(c => c.id === this.currentCourseId);

    // Verifica se há aula anterior no módulo atual ou se há módulo anterior
    return currentCourseIndex > 0 || currentModuleIndex > 0;
  }
}
