import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { from } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: User;
  fromLogin: number;
  myAuthState: any;
  constructor(
    private afAuth: AngularFireAuth,
    private angulareFire: AngularFireAuth,
    private firebaseDb: AngularFirestore,
    private router: Router
  ) { }

  login(email: string, password: string) {
   return this.afAuth.signInWithEmailAndPassword(
      email,
      password
    )
  }

  emailSignup(email: string, password: string, name: string) {
  return this.afAuth.createUserWithEmailAndPassword(email, password)

  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
       this.router.navigate(['/index']);
    })
  }
  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider);
  }
  getState() {
    (this.afAuth.authState).pipe(
      map(authState => {
        this.myAuthState = authState;
        console.log(authState);
        if (authState !== null) {
          // console.log(state);
          return true } else {
            return false;
          // console.log(state)
          // this.router.navigate(['/profile'], {
          //   queryParams: { ref: state.url }
          // })
        }
      })
    )
    if (this.myAuthState !== null) {
      return true;
    } else {
      return false;
    }
  }
  setUser(user: User) {
    this.user$ = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.fromLogin = 1;
  }
  getUser(): User {
    if (this.user$ != null) {
      return {...this.user$};
    } else {
      return null;
    }
  }
  addToUser(collection: any, user: User) {
    return this.firebaseDb.collection(collection).add({...user});
  }
  getFullUser(collection: string, uid: string) {
    return this.firebaseDb.collection<User>(collection, ref =>
      ref
        .where('uid', '==', uid)
        .limit(1)
    ).snapshotChanges();
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }
  
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.firebaseDb.doc(`users/${user.uid}`);
/*
uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL
*/
    const data = {
      displayName: user.displayName,
      email: user.email,
      followers: [],
      following: [],
      hasChannel: false,
      isVerified: false,
      content: [],
      uid: user.uid,
      photoURL: 'assets/img/default-avatar'
    }

    return userRef.set(data, { merge: true })

  }
}
