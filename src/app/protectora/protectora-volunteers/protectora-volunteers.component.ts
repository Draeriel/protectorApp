import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Volunteer } from '../../core/user.model';

@Component({
  selector: 'app-protectora-volunteers',
  templateUrl: './protectora-volunteers.component.html',
  styleUrls: ['./protectora-volunteers.component.css']
})
export class ProtectoraVolunteersComponent implements OnInit {

  volunteers = [];
  constructor(private firebaseService: FirebaseService,
    public storage: AngularFireStorage,
    private router: Router) { }

  ngOnInit() {
    this.firebaseService.getVolunteers().subscribe(volunteers => {
      this.volunteers = volunteers;
      this.volunteers.map( volunteer => {
        console.log(volunteer);
      this.setAvatar(volunteer);
      })
    })
  }

  formatedAddress(volunteer) {
    const addressArray = [volunteer.location, volunteer.province, volunteer.country];
    let formatedAddress = '';
    let first = true;
    addressArray.forEach( data => {
      if (data && first) {
        formatedAddress = data;
        first = false;
      } else if (data && !first) {
        formatedAddress += `, ${data}`;
      }
    });
    return formatedAddress;
  }

  setAvatar(volunteer) {
    const id = volunteer.id;
    this.storage.storage
        .ref(`images/${id}/profile-${id}`)
        .getDownloadURL()
        .then(img => {
          console.log('avatar', img);
          volunteer.avatar = img;
        }).catch( () => {
          this.storage.storage
        .ref(`images/`)
        .child(`default-volunteer.jpg`)
        .getDownloadURL()
        .then(img => {
          console.log('avatar', img);
          volunteer.avatar = img;
        });
        });
  }
}
