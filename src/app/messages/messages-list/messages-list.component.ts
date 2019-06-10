import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  userId = '';
  userType = '';
  messagesList = [];
  receptorsList = [];
  constructor(
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    private afdb: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.userType = JSON.parse(localStorage.getItem('user')).type;
    this.firebaseService.getUserMessages(this.userId).subscribe( messages => {
      this.messagesList = messages;
      console.log(messages);
      this.setReceptorsList();
    })
  }

  setReceptorsList() {
    this.receptorsList = [];
    this.messagesList.forEach(message => {
      console.log(this.afdb.list(`messages/${message.messagesId}`, ref => {
        console.log(ref.limitToLast(1));
        return ref.limitToLast(1);
      }));
      this.firebaseService.getUser(message.receptorId).subscribe( user => {
        this.setAvatar(user);
      });
    });
  }

  setAvatar(user) {
    const id = user.id;
    this.storage.storage
        .ref(`images/${id}/profile-${id}`)
        .getDownloadURL()
        .then(img => {
          user.avatar = img;
          this.receptorsList.push(user);
        }).catch( () => {
          this.storage.storage
        .ref(`images/`)
        .child(`default-${user.type}.jpg`)
        .getDownloadURL()
        .then(img => {
          user.avatar = img;
          this.receptorsList.push(user);
        });
        });
  }
}
