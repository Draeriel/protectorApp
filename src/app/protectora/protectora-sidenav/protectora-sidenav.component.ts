import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protectora-sidenav',
  templateUrl: './protectora-sidenav.component.html',
  styleUrls: ['./protectora-sidenav.component.css']
})
export class ProtectoraSidenavComponent implements OnInit {
  userId = '';
  options: FormGroup;

  constructor(fb: FormBuilder,
    public afAuth: AngularFireAuth,
    private router: Router
    ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit() {
    this.userId = this.afAuth.auth.currentUser.uid;
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  navigateTo(path, param?) {
    this.router.navigate([`/${path}/`, param]);
  }
}