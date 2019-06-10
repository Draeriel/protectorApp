import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { storage } from 'firebase';


@Component({
  selector: 'app-protectora-public-profile',
  templateUrl: './protectora-public-profile.component.html',
  styleUrls: ['./protectora-public-profile.component.css']
})
export class ProtectoraPublicProfileComponent implements OnInit {
  userId = '';
  publications = [];
  profileId = '';
  user = {};
  isProfileOwner: boolean;
  constructor(private firebaseService: FirebaseService,
              public afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              public storage: AngularFireStorage) { }

  ngOnInit() {
    console.log(this.afAuth.auth);
    this.userId = this.afAuth.auth.currentUser ? this.afAuth.auth.currentUser.uid : this.afAuth.auth['O'];
    this.route.params.subscribe(param => {
      this.profileId = param.id;
      this.isProfileOwner = this.userId === this.profileId;
      this.getUserPublications();
      this.getUser();
    });

}

  getUserPublications() {
    this.firebaseService.getCommentsByUser(this.profileId).subscribe( publications => {
      publications.forEach(publication => {
        this.storage.storage.ref(publication['image']).getDownloadURL().then( img => {
          const currentPublication = publication;
          currentPublication['image'] = img;
          this.publications.push(currentPublication);
        });
      });
    });
  }

  getUser() {
    this.firebaseService.getUser(this.profileId).subscribe( user => {
      this.user['protectoraName'] = user.protectoraName ? user.protectoraName : 'Sin Nombre';
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
 }
