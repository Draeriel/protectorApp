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
  return this.db.collection('users').doc(userKey).collection('publications').valueChanges();
  }

  publicateComment(userKey, value, publicationId) {
    const publicationData = value;
    publicationData['userId'] = userKey;
    this.db.collection('publications').doc(publicationId).set(publicationData);
    return this.db.collection(`users`).doc(userKey).collection('publications').doc(publicationId).set(value);
  }

  getProtectorsPublications() {
    return this.db.collection('publications').valueChanges();
  }
}
