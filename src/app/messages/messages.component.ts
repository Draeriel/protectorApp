import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { ActivatedRoute } from "@angular/router";
import { User } from "../core/user.model";
import { AngularFireDatabase } from "@angular/fire/database";
import { FirebaseService } from "../services/firebase.service";
import * as firebase from "firebase";
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  messagesPath = null;
  messages: Observable<any[]>;
  userId = "";
  profileId = "";
  data = null;
  hasAlreadyMessages = false;
  messagesId = "";
  otherUser = "";
  file = '';
  filePath = '';

  constructor(
    private afs: AngularFirestore,
    private afdb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.profileId = param.id;
      this.firebaseService.getUser(this.profileId).subscribe(user => {
        this.otherUser =
          user.type === "protector"
            ? user.protectoraName
            : `${user.name} ${user.surname}`;
      });
      this.userId = JSON.parse(localStorage.getItem("user")).id;
      this.firebaseService
        .getMessagesWithUser(this.userId, this.profileId)
        .subscribe(result => {
          this.hasAlreadyMessages = result !== undefined;
          if (this.hasAlreadyMessages) {
            this.messagesId = result["messagesId"];
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
    if (message.value === '' && !this.file) {
      return;
    }
    const timestamp = firebase.database["ServerValue"]["TIMESTAMP"];
    if (!this.hasAlreadyMessages) {
      let messagesId = {
        messagesId: this.afs.createId(),
        receptorId: this.profileId
      };
      this.firebaseService.postMessagesIdWithUser(
        this.userId,
        this.profileId,
        messagesId
      );
      messagesId["receptorId"] = this.userId;
      this.firebaseService.postMessagesIdWithUser(
        this.profileId,
        this.userId,
        messagesId
      );
      this.getChatData();
    }

    const currentMessage = {
      userId: this.userId,
      profileId: this.profileId,
      'timestamp': timestamp
    }

    if (message.value) {
      currentMessage['message'] = message.value;
      message.value = '';
    }

    if (this.file) {
      const fileId = this.afdb.createPushId();
      this.saveFile(fileId, currentMessage);
    } else {
    setTimeout(() => {
      this.messagesPath.push(currentMessage);
    }, 500);
  }
   }

  formatTimestamp(timestamp) {
    if (!timestamp) {
      return;
    }
    const event = new Date(timestamp);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    return event.toLocaleDateString("es-ES", options);
  }

  saveFile(fileId, currentMessage) {
    if (this.file) {
      this.filePath = `messages/${this.messagesId}/${fileId}`;
      this.storage.ref(this.filePath).put(this.file).then(() => {
        this.storage.storage
      .ref(this.filePath)
      .getDownloadURL()
      .then(file => {
        currentMessage['file'] = file;
        currentMessage['type'] = this.file['type'].includes('image') ? 'image' : this.file['type'];
        this.messagesPath.push(currentMessage);
        this.file = '';
        this.filePath = '';
        document.getElementById('file')['value'] = '';
      });
      });
    }
  }

  uploadFile(event) {
    this.file = event.target.files[0];
  }
}
