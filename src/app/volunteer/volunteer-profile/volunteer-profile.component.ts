import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Volunteer } from '../../core/user.model';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.css']
})
export class VolunteerProfileComponent implements OnInit {
  userId = '';
  user: Volunteer;
  userForm: FormGroup;
  helpingMethods = [
    'Busco adoptar un animal',
    'Quiero ayudar trabajando en una protectora',
    'Quiero ayudar económicamente a una protectora',
    'Tengo coche y puedo ayudar transportando animales',
    'Tengo una jaula y la ofrezco para ayudar a capturar',
    'Me ofrezco como casa de acogida',
    'Otros'
  ];
  file = '';
  filePath = '';
  profileImage = '';
  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.userId = this.afAuth.auth.currentUser.uid;
    this.firebaseService.getUser(this.userId).subscribe(user => {
      this.user = user;
      this.updateForm();

      this.storage.storage
        .ref(`images/${this.userId}/profile-${this.userId}`)
        .getDownloadURL()
        .then(img => {
          console.log(img);
          this.profileImage = img;
        }).catch( () => {
          this.storage.storage
        .ref(`images/`)
        .child(`default-${this.user.type}.jpg`)
        .getDownloadURL()
        .then(img => {
          this.profileImage = img;
        });
        });
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
    this.setAvatar();
    this.firebaseService.updateUser(this.userId, this.userForm.value);
  }

  setAvatar() {
    if (this.file) {
      this.filePath = `images/${this.userId}/profile-${this.userId}`;
      this.storage.upload(this.filePath, this.file).then( () => {this.file = '';
                                                                 this.filePath = ''; });
    }
  }

  uploadFile(event) {
    this.file = event.target.files[0];
  }
}
