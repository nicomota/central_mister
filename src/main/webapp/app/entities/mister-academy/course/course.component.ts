import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  level: string;
  learningPoints: string[];
  lessons: Lesson[];
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseId: string = '';
  course: Course | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;
  currentLesson: Lesson | null = null;
  relatedCourses: Course[] = [];

  // Banco de dados dos cursos
  private courses: Course[] = [
    {
      id: '1',
      title: 'Entendendo o Registro Contábil',
      description: 'O Mister Contador irá realizar o lançamento contábil de forma automática nas contas contábeis de fornecedores, quando identificar o cnpj do beneficiário/fornecedor, nos comprovantes de pagamento, na NF-e de entrada e na conta contábil do fornecedor, no plano de contas.',
      videoUrl: 'https://www.youtube.com/embed/EB4eXJuKxtA',
      duration: '7:00 min',
      level: 'Iniciante',
      learningPoints: [
        'Como o sistema identifica automaticamente fornecedores',
        'Lançamento automático em contas contábeis',
        'Configuração do plano de contas para fornecedores',
        'Identificação de CNPJ em comprovantes'
      ],
      lessons: [
        { id: '1-1', title: 'Introdução ao Registro Contábil', duration: '3:20 min', videoUrl: 'https://www.youtube.com/embed/EB4eXJuKxtA', completed: true },
        { id: '1-2', title: 'Configuração de Fornecedores', duration: '4:15 min', videoUrl: 'https://www.youtube.com/embed/EB4eXJuKxtA', completed: false },
        { id: '1-3', title: 'Lançamentos Automáticos', duration: '5:30 min', videoUrl: 'https://www.youtube.com/embed/EB4eXJuKxtA', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Configuração de uma Nova Empresa',
      description: 'Configure uma nova empresa inicial do sistema.',
      videoUrl: 'https://www.youtube.com/embed/2_aaur_viK8?si=A7qiqF2p8ZdyX2_g',
      duration: '2:32 min',
      level: 'Iniciante',
      learningPoints: [
        'Cadastro inicial de empresa no sistema',
        'Configuração de dados fiscais',
        'Definição de parâmetros contábeis',
        'Integração com sistemas externos'
      ],
      lessons: [
        { id: '2-1', title: 'Cadastro da Empresa', duration: '2:32 min', videoUrl: 'https://www.youtube.com/embed/2_aaur_viK8?si=A7qiqF2p8ZdyX2_g', completed: true },
        { id: '2-2', title: 'Dados Fiscais', duration: '3:45 min', videoUrl: 'https://www.youtube.com/embed/2_aaur_viK8?si=A7qiqF2p8ZdyX2_g', completed: false },
        { id: '2-3', title: 'Parâmetros Contábeis', duration: '4:10 min', videoUrl: 'https://www.youtube.com/embed/2_aaur_viK8?si=A7qiqF2p8ZdyX2_g', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Integrações Bancárias',
      description: 'Conecte suas contas bancárias e automatize a importação de extratos e movimentações.',
      videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3',
      duration: '45 min',
      level: 'Intermediário',
      learningPoints: [
        'Configuração de APIs bancárias',
        'Importação automática de extratos',
        'Conciliação de movimentações',
        'Segurança e autenticação'
      ],
      lessons: [
        { id: '3-1', title: 'Introdução às Integrações', duration: '10 min', videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3', completed: false },
        { id: '3-2', title: 'Configurando APIs', duration: '15 min', videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3', completed: false },
        { id: '3-3', title: 'Importação de Extratos', duration: '20 min', videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3', completed: false }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Scroll para o topo ao entrar na página
    window.scrollTo(0, 0);

    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.loadCourse();
      // Scroll para o topo ao trocar de curso
      window.scrollTo(0, 0);
    });
  }

  private loadCourse(): void {
    this.course = this.courses.find(c => c.id === this.courseId) || null;

    if (this.course) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.videoUrl);
      this.currentLesson = this.course.lessons[0]; // Primeira aula por padrão
      this.loadRelatedCourses();
    } else {
      console.error('Curso não encontrado:', this.courseId);
      this.router.navigate(['/mister-academy']);
    }
  }

  private loadRelatedCourses(): void {
    // Carrega cursos relacionados (excluindo o atual)
    this.relatedCourses = this.courses.filter(c => c.id !== this.courseId).slice(0, 2);
  }

  selectLesson(lesson: Lesson): void {
    this.currentLesson = lesson;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(lesson.videoUrl);
    // Scroll para o topo da página
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Fallback para navegadores que não suportam smooth
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }

  getCourseProgress(): number {
    if (!this.course) return 0;
    const completed = this.course.lessons.filter(l => l.completed).length;
    return Math.round((completed / this.course.lessons.length) * 100);
  }

  getCompletedLessonsCount(): number {
    if (!this.course) return 0;
    return this.course.lessons.filter(l => l.completed).length;
  }

  goBack(): void {
    this.router.navigate(['/mister-academy']);
  }

  goToCourse(courseId: string): void {
    this.router.navigate(['/course', courseId]);
  }
}
