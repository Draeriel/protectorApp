import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../core/user.model';


@Component({
  selector: 'app-protectora-profile',
  templateUrl: './protectora-profile.component.html',
  styleUrls: ['./protectora-profile.component.css']
})
export class ProtectoraProfileComponent implements OnInit {
  userId = '';
  user: User;
  userForm: FormGroup;
  ambits = ['Perros', 'Gatos', 'Roedores', 'Fauna silvestre', 'Animales marinos', 'Reptiles', 'Aves', 'Otros']
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
      visitTime: ['']
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
    this.firebaseService.updateUser(this.userId, this.userForm.value);
  }
}
