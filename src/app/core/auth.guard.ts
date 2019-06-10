import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../core/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        const userType = JSON.parse(localStorage.getItem('user')).type;
        if (userType === 'protector') {
          this.router.navigate(['/protectora/perfil-protectora']);
        } else if (userType === 'volunteer') {
          this.router.navigate(['/voluntario/perfil-voluntario']);
        }
        return resolve(false);
      }, err => {
        return resolve(true);
      });
    });
  }
}
