import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = null;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    router.events.subscribe((val) => {
    this.user = JSON.parse(localStorage.getItem('user'));
  });
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  goToHome() {
    const type = this.user.type === 'volunteer' ? 'voluntario' : 'protectora';
    this.router.navigate([`${type}/inicio`]);
  }

  logOut() {
    console.log('signout');
    this.authService.doLogout().then(() => {
      this.router.navigate(['']);
      this.user = null;
   });
  }

}
