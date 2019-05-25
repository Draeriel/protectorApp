import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../core/user.model';
import { AngularFireStorage } from "@angular/fire/storage";


@Component({
  selector: 'app-protectora-profile',
  templateUrl: './protectora-profile.component.html',
  styleUrls: ['./protectora-profile.component.css']
})
export class ProtectoraProfileComponent implements OnInit {
  userId = '';
  user: User;
  userForm: FormGroup;
  ambits = ['Perros', 'Gatos', 'Roedores', 'Fauna silvestre', 'Animales marinos', 'Reptiles', 'Aves', 'Otros'];
  file = '';
  filePath = '';
  profileImage = '';
  constructor(private formBuilder: FormBuilder,
              private firebaseService: FirebaseService,
              public afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    ) {
    this.createForm();
  }

  ngOnInit() {
    this.userId = this.afAuth.auth.currentUser.uid;
    this.firebaseService.getUser(this.userId).subscribe( user => {
      this.user = user;
      this.updateForm();
    });
    this.storage.storage.ref(`images/${this.userId}/profile-${this.userId}`).getDownloadURL().then( img => {
      console.log(img);
      this.profileImage = img;
        });
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      protectoraName: ['', Validators.required],
      protectoraAmbit: [['']],
      volunteerAmount: [''],

      country: [''],
      province: [''],
      location: [''],
      address: [''],

      responsableName: [''],
      contactEmail: [''],
      contactPhone: [''],
      web: [''],
      contactTime: [''],
      visitTime: [''],

      type: ['protector']
    });
  }

  updateForm() {
    this.userForm.patchValue({
      protectoraName: this.user.protectoraName,
      protectoraAmbit: this.user.protectoraAmbit,
      volunteerAmount: this.user.volunteerAmount,

      country: this.user.country,
      province: this.user.province,
      location: this.user.location,
      address: this.user.address,

      responsableName: this.user.responsableName,
      contactEmail: this.user.contactEmail,
      contactPhone: this.user.contactPhone,
      web: this.user.web,
      contactTime: this.user.contactTime,
      visitTime: this.user.visitTime
    });
  }

  updateProtectoraProfile() {
    this.setAvatar();
    this.firebaseService.updateUser(this.userId, this.userForm.value);
  }

  setAvatar() {
    if (this.file) {
      this.filePath = `images/${this.userId}/profile-${this.userId}`;
      this.storage.upload(this.filePath, this.file).then( () => {this.file = "";
      this.filePath = ""});
    }
  }

  uploadFile(event) {
    this.file = event.target.files[0];
  }
}
