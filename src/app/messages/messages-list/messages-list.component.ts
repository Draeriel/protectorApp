import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

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
    private firebaseService: FirebaseService
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
      console.log(message);
      this.firebaseService.getUser(message.receptorId).subscribe( user => {
        this.receptorsList.push(user);
      });
    });
  }
}
