import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  userId = '';
  commentForm: FormGroup;
  comments = [];
  @Input() publicationId = '';

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
    this.getComments();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      description: [''],
    });
  }

  publicate() {
    const commentId = `comment-${this.db.createId()}`;
    const currentComment = this.commentForm.value;
    currentComment['id'] = commentId;
    currentComment['userId'] = this.userId;
    currentComment['parentPublication'] = this.publicationId;
    this.firebaseService.postPublicationComment(
      currentComment,
      this.publicationId,
      commentId
    ).then(() => {
      this.createForm();
    }
    );
  }

  getComments() {
    this.firebaseService.getPublicationsComments(this.publicationId).subscribe(comments => {
      comments.forEach(comment => {
        this.firebaseService.getUser(comment['userId']).subscribe( user => {
            const currentComment = {
              description: comment['description'],
              userId: comment['userId'],
              user: user,
              id: comment['id']
            };
           this.setAvatar(comment['userId'], currentComment, user.type);
        });
      });
    });
  }

  setAvatar(userId, currentComment, type) {
    this.storage.storage
        .ref(`images/${userId}/profile-${userId}`)
        .getDownloadURL()
        .then(img => {
          console.log('avatar', img);
          currentComment['avatar'] = img;
          this.comments.push(currentComment);
        }).catch( () => {
          this.storage.storage
        .ref(`images/`)
        .child(`default-${type}.jpg`)
        .getDownloadURL()
        .then(img => {
          currentComment['avatar'] = img;
          this.comments.push(currentComment);
        });
        });
  }
}