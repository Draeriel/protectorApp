import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/protectora/perfil-protectora']);
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/protectora/perfil-protectora']);
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/protectora/perfil-protectora']);
    }, err => {
      console.log(err);
      this.errorMessage = 'No se ha podido iniciar sesión.';
    });
  }
}
