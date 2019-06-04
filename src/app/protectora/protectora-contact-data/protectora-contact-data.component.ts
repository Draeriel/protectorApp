import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../../core/user.model';

@Component({
  selector: 'app-protectora-contact-data',
  templateUrl: './protectora-contact-data.component.html',
  styleUrls: ['./protectora-contact-data.component.css']
})
export class ProtectoraContactDataComponent implements OnInit {

  profileId = '';
  user: User;
  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    public storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.profileId = param.id;
      this.getUser();
    });
  }

  getUser() {
    this.firebaseService.getUser(this.profileId).subscribe( user => {
      this.user = user;
      this.user.protectoraName = user.protectoraName ? user.protectoraName : 'Sin Nombre';
      this.setAvatar();
    })
  }

  setAvatar() {
    this.storage.storage
        .ref(`images/${this.profileId}/profile-${this.profileId}`)
        .getDownloadURL()
        .then(img => {
          console.log('avatar', img);
          this.user['avatar'] = img;
        }).catch( () => {
          this.storage.storage
        .ref(`images/`)
        .child(`default-protector.jpg`)
        .getDownloadURL()
        .then(img => {
          console.log('avatar', img);
          this.user['avatar'] = img;
        });
        });
  }

  formatedAddress() {
    const addressArray = [this.user.address, this.user.location, this.user.province, this.user.country];
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
}