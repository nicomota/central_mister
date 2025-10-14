import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginModalService } from 'app/login-modal/login-modal.service';

@Component({
  selector: 'app-mister-academy-landing',
  templateUrl: './mister-academy-landing.component.html',
  styleUrls: ['./mister-academy-landing.component.scss']
})
export class MisterAcademyLandingComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginModalService: LoginModalService
  ) {}

  ngOnInit(): void {
    // Verifica query params para saber se deve abrir o modal
    this.route.queryParams.subscribe(params => {
      console.log('Query params:', params);

      if (params['openLogin'] === 'true') {
        console.log('Deve abrir modal de login');

        // Aguarda um pouco para garantir que a navbar foi carregada
        setTimeout(() => {
          console.log('Abrindo modal...');
          this.loginModalService.openModal();

          // Remove o query param da URL sem recarregar a página
          this.router.navigate([], {
            queryParams: {},
            replaceUrl: true
          });
        }, 1000);
      }
    });
  }

  navigateToCourses(): void {
    this.router.navigate(['/mister-academy']);
  }
}
