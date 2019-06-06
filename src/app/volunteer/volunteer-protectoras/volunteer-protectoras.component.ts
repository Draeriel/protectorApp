import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volunteer-protectoras',
  templateUrl: './volunteer-protectoras.component.html',
  styleUrls: ['./volunteer-protectoras.component.css']
})
export class VolunteerProtectorasComponent implements OnInit {

  protectoras = [];
  constructor(private firebaseService: FirebaseService,
    public storage: AngularFireStorage,
    private router: Router) { }

  ngOnInit() {
    this.firebaseService.getProtectors().subscribe(protectoras => {
      this.protectoras = protectoras;
      this.protectoras.map( protectora => {
      this.setAvatar(protectora);
      })
    })
  }

  formatedAddress(protectora) {
    const addressArray = [protectora.address, protectora.location, protectora.province, protectora.country];
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

  setAvatar(protectora) {
    const id = protectora.id;
    this.storage.storage
        .ref(`images/${id}/profile-${id}`)
        .getDownloadURL()
        .then(img => {
          console.log('avatar', img);
          protectora.avatar = img;
        }).catch( () => {
          this.storage.storage
        .ref(`images/`)
        .child(`default-protector.jpg`)
        .getDownloadURL()
        .then(img => {
          console.log('avatar', img);
          protectora.avatar = img;
        });
        });
  }
}
