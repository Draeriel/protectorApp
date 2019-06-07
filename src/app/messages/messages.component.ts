import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { User } from '../core/user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messagesPath = null;
  messages: Observable<any[]>;
  userId = '';
  profileId = '';
  data = null;
  hasAlreadyMessages = false;
  messagesId = '';

  constructor(private afs: AngularFirestore,
              private afdb: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.profileId = param.id;
      this.userId = JSON.parse(localStorage.getItem('user')).id;
      this.firebaseService.getMessagesWithUser(this.userId, this.profileId).subscribe( result => {
        this.hasAlreadyMessages = result !== undefined;
        if (this.hasAlreadyMessages) {
          this.messagesId = result['messagesId'];
          this.getChatData();
        }
      });
    });
  }

  getChatData() {
    this.messagesPath = this.afdb.list(`messages/${this.messagesId}`);
    this.messages = this.messagesPath.valueChanges();
  }

  newMessage(message) {
    if (!this.hasAlreadyMessages) {
      const messagesId = {messagesId: this.afs.createId()};
      this.firebaseService.postMessagesIdWithUser(this.userId, this.profileId, messagesId);
      this.firebaseService.postMessagesIdWithUser(this.profileId, this.userId, messagesId);
      this.getChatData();
    }
    this.messagesPath.push({message: message.value, userId: this.userId, profileId: this.profileId});
  }

}
