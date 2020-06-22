import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private afAuth: AngularFireAuth,
    private angulareFire: AngularFireAuth,
    private firebaseDb: AngularFirestore,
    private router: Router
  ) { }
  checkDocument(collection: any, id: string){
    const checkUserDoc = this.firebaseDb.collection(collection, ref =>
      ref.where('uid', '==', id).limit(1));
      return checkUserDoc;
  }
}
