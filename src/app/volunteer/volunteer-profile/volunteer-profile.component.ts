import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Volunteer } from '../../core/user.model';


@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.css']
})
export class VolunteerProfileComponent implements OnInit {
  userId = '';
  user: Volunteer;
  userForm: FormGroup;
  helpingMethods = ['Busco adoptar un animal',
                    'Quiero ayudar trabajando en una protectora',
                    'Quiero ayudar económicamente a una protectora',
                    'Tengo coche y puedo ayudar transportando animales',
                    'Tengo una jaula y la ofrezco para ayudar a capturar',
                    'Me ofrezco como casa de acogida',
                    'Otros'
                    ];
  constructor(private formBuilder: FormBuilder,
              private firebaseService: FirebaseService,
              public afAuth: AngularFireAuth) {
    this.createForm();
  }

  ngOnInit() {
    this.userId = this.afAuth.auth.currentUser.uid;
    this.firebaseService.getUser(this.userId).subscribe( user => {
      this.user = user;
      this.updateForm();
    });
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: [['']],

      country: [''],
      province: [''],
      location: [''],
      address: [''],

      contactEmail: [''],
      contactPhone: [''],

      helpingMethods: [['']],

      type: ['volunteer']
    });
  }

  updateForm() {
    this.userForm.patchValue({
      name: this.user.name,
      surname: this.user.surname,

      country: this.user.country,
      province: this.user.province,
      location: this.user.location,
      address: this.user.address,

      contactEmail: this.user.contactEmail,
      contactPhone: this.user.contactPhone,
      helpingMethods: this.user.helpingMethods
    });
  }

  updateProtectoraProfile() {
    this.firebaseService.updateUser(this.userId, this.userForm.value);
  }
}
