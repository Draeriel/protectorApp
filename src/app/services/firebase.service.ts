import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore,
              public db2: AngularFireDatabase) {}

  getAvatars() {
      return this.db.collection('/avatar').valueChanges();
  }

  getUser(userKey): Observable<any> {
    return this.db.collection('users').doc(userKey).valueChanges();
  }

  updateUser(userKey, value) {
    // value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getProtectors() {
    return this.db.collection('users', ref => ref.where('type', '==', 'protector')).valueChanges();
  }

  getVolunteers() {
    return this.db.collection('users', ref => ref.where('type', '==', 'volunteer')).valueChanges();
  }

  searchUsers(searchValue) {
    return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(userData) {
    return this.db.collection('users').add(userData);
  }

 getCommentsByUser(userKey) {
  return this.db.collection('publications', ref => ref.where('userId', '==', userKey)).valueChanges();
  }

  publicateComment(userKey, value, publicationId) {
    return this.db.collection('publications').doc(publicationId).set(value);
    // return this.db.collection(`users`).doc(userKey).collection('publications').doc(publicationId).set(value);
  }

  postPublicationComment(value, publicationId, commentId) {
    return this.db.collection('publications').doc(publicationId).collection('comments').doc(commentId).set(value);
  }

  getProtectorsPublications() {
    return this.db.collection('publications').valueChanges();
  }

  getPublicationsComments(publicationId) {
    return this.db.collection('publications').doc(publicationId).collection('comments').valueChanges();
  }

  getMessagesWithUser(userId, receptorId) {
    return this.db.collection('users').doc(userId).collection('messages').doc(receptorId).valueChanges();
  }

  postMessagesIdWithUser(userId, receptorId, messagesId) {
    return this.db.collection('users').doc(userId).collection('messages').doc(receptorId).set(messagesId);
  }
}
