import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';
import { FirebaseService } from '../services/firebase.service';


@Injectable()
export class VolunteerResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router,
              private firebaseService: FirebaseService
    ) { }

  resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel> {

    const user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
          let type = '';
          this.firebaseService.getUser(res.uid).subscribe( result => {
            console.log(result.type);
            type = result.type;
          });
          setTimeout( () => {
            if (type === 'volunteer') {
              return resolve(user);
            } else {
              this.router.navigate(['/access']);
              return reject(user);
            }
          }, 1000);
      }, err => {
        this.router.navigate(['/access']);
        return reject(err);
      });
    });
  }
}
