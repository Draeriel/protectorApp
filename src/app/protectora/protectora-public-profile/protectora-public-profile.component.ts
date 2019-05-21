import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AngularFireAuth } from "angularfire2/auth";
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
  constructor(private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    public storage: AngularFireStorage) { }

  ngOnInit() {
    this.userId = this.afAuth.auth.currentUser.uid;
    this.route.params.subscribe(param => {
      this.profileId = param.id;
      this.getUserPublications();
    });
}

  getUserPublications() {
    this.firebaseService.getCommentsByUser(this.profileId).subscribe( publications => {
      publications.forEach(publication => {
        this.storage.storage.ref(publication.image).getDownloadURL().then( img => {
          console.log(img);
        this.publications.push({description: publication.description, image: img})
      console.log(this.publications)});
        
      })
      
      
      //this.publications = publications;
    });
  }

  getPublicationImage(imageId) {
    let img = '';
    if (imageId) {
      console.log(this.storage.storage.ref(imageId).getDownloadURL());
    }
  }
 }
