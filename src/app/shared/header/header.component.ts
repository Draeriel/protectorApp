import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  logOut() {
    console.log('signout');
    this.authService.doLogout().then(() => {
      this.router.navigate(['']);
   });
  }

}
