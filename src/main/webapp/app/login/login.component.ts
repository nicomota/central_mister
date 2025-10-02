import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { VERSION } from 'app/app.constants';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;
  version = '';
  authenticationError = false;
  message = '';
  showPassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private stateStorageService: StateStorageService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : 'v.' + VERSION;
    }
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    // if already authenticated then navigate to home page
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  login(): void {
    console.log('Login form values:', this.loginForm.value);
    console.log('Form valid:', this.loginForm.valid);

    if (!this.loginForm.valid) {
      console.error('Form is invalid');
      return;
    }

    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          // Redireciona para a URL salva ou para mister-academy
          const redirect = this.stateStorageService.getUrl();
          if (redirect) {
            this.stateStorageService.clearUrl();
            this.router.navigateByUrl(redirect);
          } else {
            this.router.navigate(['/mister-academy']);
          }
        },
        (err: HttpErrorResponse) => {
          console.error('Login error:', err);
          console.error('Error status:', err.status);
          console.error('Error message:', err.message);
          console.error('Error error:', err.error);

          let key = err.error?.errorKey || 'error.http.500';
          if (err.status === 401) {
            key = 'login.messages.error.authentication';
          }
          if (err.status === 504) {
            key = 'login.messages.error.notresponse';
          }
          if (err.status === 0) {
            key = 'error.server.not.reachable';
          }
          this.message = this.translateService.instant(key);

          this.authenticationError = true;
        }
      );
  }
}
