import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-protectora-create-publication',
  templateUrl: './protectora-create-publication.component.html',
  styleUrls: ['./protectora-create-publication.component.css']
})
export class ProtectoraCreatePublicationComponent implements OnInit {
  userId = '';
  publicationForm: FormGroup;
  file = '';
  filePath = '';

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.userId = this.afAuth.auth.currentUser.uid;
  }

  createForm() {
    this.publicationForm = this.formBuilder.group({
      description: [''],
      image: [''],
    });
  }
  publicate() {
    const publicationId = `publications-${this.db.createId()}`;
    if (this.file) {
      this.filePath = `images/${this.userId}/${publicationId}`;
      this.storage.upload(this.filePath, this.file);
      this.publicationForm.get('image').setValue(`/images/${this.userId}/${publicationId}`);
    }
    const currentPublication = this.publicationForm.value;
    currentPublication['id'] = publicationId;
    currentPublication['userId'] = this.userId
    this.firebaseService.publicateComment(
      this.userId,
      currentPublication,
      publicationId
    ).then(() => {
      this.createForm();
      this.file = '';
      this.filePath = '';
    }
    );
  }

  uploadFile(event) {
    this.file = event.target.files[0];
  }
}
