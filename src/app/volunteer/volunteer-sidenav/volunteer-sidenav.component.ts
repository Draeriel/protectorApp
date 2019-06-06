import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-volunteer-sidenav",
  templateUrl: "./volunteer-sidenav.component.html",
  styleUrls: ["./volunteer-sidenav.component.css"]
})
export class VolunteerSidenavComponent implements OnInit {
  constructor(
    fb: FormBuilder,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }
  userId = '';
  options: FormGroup;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );

  ngOnInit() {
    this.userId = this.afAuth.auth.currentUser.uid;
  }
}
