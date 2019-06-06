import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  types = [{id: 'volunteer', viewValue: 'Voluntario', checked: true},
            {id: 'protector', viewValue: 'Protectora', checked: false}];

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['', Validators.required],
       type: ['volunteer']
     });
   }

   tryFacebookLogin() {
     this.authService.doFacebookLogin()
     .then(res => {
      this.firebaseService.updateUser(res.user.uid, {
        type: this.registerForm.get('type').value,
        id: res.user.uid});
      this.registerForm.get('type').value === 'protector' ?
       this.router.navigate(['/protectora/perfil-protectora']) :
       this.router.navigate(['/voluntario/perfil-voluntario']);
     }, err => console.log(err)
     );
   }

   tryGoogleLogin() {
     this.authService.doGoogleLogin()
     .then(res => {
      this.firebaseService.updateUser(res.user.uid, {
        type: this.registerForm.get('type').value,
        id: res.user.uid});
      this.registerForm.get('type').value === 'protector' ?
      this.router.navigate(['/protectora/perfil-protectora']) :
      this.router.navigate(['/voluntario/perfil-voluntario']);
     }, err => console.log(err)
     );
   }

   tryRegister(value) {
     this.authService.doRegister(value)
     .then(res => {
       this.errorMessage = '';
       this.successMessage = 'Cuenta creada con éxito';
       this.firebaseService.updateUser(res.user.uid, {
         type: this.registerForm.get('type').value,
         id: res.user.uid});
       this.registerForm.get('type').value === 'protector' ?
       this.router.navigate(['/protectora/perfil-protectora']) :
       this.router.navigate(['/voluntario/perfil-voluntario']);
     }, err => {
       console.log(err);
       this.errorMessage = 'No se ha podido crear la cuenta';
       this.successMessage = '';
     });
   }

}
