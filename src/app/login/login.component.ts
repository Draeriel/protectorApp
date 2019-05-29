import { Component } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { Router, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.scss"]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = "";

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin().then(res => {
      const user = this.firebaseService.getUser(res.user.uid);
      user["type"] === "protector"
        ? this.router.navigate(["/protectora/perfil-protectora"])
        : this.router.navigate(["/voluntario"]);
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(res => {
      const user = this.firebaseService.getUser(res.user.uid);
      user["type"] === "protector"
        ? this.router.navigate(["/protectora/perfil-protectora"])
        : this.router.navigate(["/voluntario"]);
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value).then(
      res => {
        const user = this.firebaseService.getUser(res.user.uid);
        user["type"] === "protector"
          ? this.router.navigate(["/protectora/perfil-protectora"])
          : this.router.navigate(["/voluntario"]);
      },
      err => {
        console.log(err);
        this.errorMessage = "No se ha podido iniciar sesión.";
      }
    );
  }
}
