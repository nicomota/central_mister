import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  level: string;
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

  // Banco de dados dos cursos
  private courses: Course[] = [
    {
      id: '1',
      title: 'Entendendo o Registro Contábil',
      description: 'O Mister Contador irá realizar o lançamento contábil de forma automática nas contas contábeis de fornecedores, quando identificar o cnpj do beneficiário/fornecedor, nos comprovantes de pagamento, na NF-e de entrada e na conta contábil do fornecedor, no plano de contas.',
      videoUrl: 'https://www.youtube.com/embed/EB4eXJuKxtA',
      duration: '7:00 min',
      level: 'Iniciante'
    },
    {
      id: '2',
      title: 'Configuração de uma Nova Empresa',
      description: 'Configure uma nova empresa inicial do sistema.',
      videoUrl: 'https://www.youtube.com/embed/2_aaur_viK8?si=A7qiqF2p8ZdyX2_g',
      duration: '2:32 min',
      level: 'Iniciante'
    },
    {
      id: '3',
      title: 'Integrações Bancárias',
      description: 'Conecte suas contas bancárias e automatize a importação de extratos e movimentações.',
      videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3',
      duration: '45 min',
      level: 'Intermediário'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.loadCourse();
    });
  }

  private loadCourse(): void {
    this.course = this.courses.find(c => c.id === this.courseId) || null;

    if (this.course) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.course.videoUrl);
    } else {
      console.error('Curso não encontrado:', this.courseId);
      this.router.navigate(['/mister-academy']);
    }
  }

  goBack(): void {
    this.router.navigate(['/mister-academy']);
  }
}
