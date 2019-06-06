import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  publications = [];

    constructor(private firebaseService: FirebaseService,
      public storage: AngularFireStorage,
      private router: Router) { }

  ngOnInit() {
    this.firebaseService.getProtectorsPublications().subscribe(publications => {
      publications.forEach(publication => {
        this.firebaseService.getUser(publication['userId']).subscribe( user => {
        this.storage.storage.ref(publication['image']).getDownloadURL().then( img => {
            const currentPublication = {
              description: publication['description'],
              image: img,
              userId: publication['userId'],
              user: user,
              id: publication['id']
            };
           this.setAvatar(publication['userId'], currentPublication);
          })
        });
      });
    });
  }

  getPublicationImage(imageId) {
    const img = '';
    if (imageId) {
      console.log(this.storage.storage.ref(imageId).getDownloadURL());
    }
  }

  setAvatar(userId, currentPublication) {
    this.storage.storage
        .ref(`images/${userId}/profile-${userId}`)
        .getDownloadURL()
        .then(img => {
          console.log('avatar', img);
          currentPublication['avatar'] = img;
          this.publications.push(currentPublication);
        }).catch( () => {
          this.storage.storage
        .ref(`images/`)
        .child(`default-protector.jpg`)
        .getDownloadURL()
        .then(img => {
          currentPublication['avatar'] = img;
          this.publications.push(currentPublication);
        });
        });
  }
}
